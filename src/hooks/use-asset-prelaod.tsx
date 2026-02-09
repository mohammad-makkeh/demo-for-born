import { useEffect, useRef, useState } from 'react';

type Options = {
  root?: ParentNode | null; // usually ref.current
  videoMode?: 'metadata' | 'canplaythrough';
  weights?: { fonts?: number; images?: number; videos?: number };
  timeoutMs?: number;
  lockScroll?: boolean;
  rescanDelayMs?: number; // scan again after X ms for late-mount elements
};

type Result = {
  progress: number; // 0..1
  isLoading: boolean;
  error: Error | null;
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

function withTimeout<T>(p: Promise<T>, ms: number, label: string) {
  if (!ms || ms <= 0) return p;
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      }
    );
  });
}

function waitForImage(img: HTMLImageElement): Promise<void> {
  if (img.complete && img.naturalWidth > 0) {
    return img.decode?.().catch(() => {}) ?? Promise.resolve();
  }
  return new Promise<void>((resolve) => {
    const done = () => {
      img.removeEventListener('load', done);
      img.removeEventListener('error', done);
      (img.decode?.().catch(() => {}) ?? Promise.resolve()).finally(resolve);
    };
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });
}

function waitForVideo(v: HTMLVideoElement, mode: 'metadata' | 'canplaythrough'): Promise<void> {
  const ok = mode === 'metadata' ? v.readyState >= 1 : v.readyState >= 4;
  if (ok) return Promise.resolve();

  const eventName = mode === 'metadata' ? 'loadedmetadata' : 'canplaythrough';

  return new Promise<void>((resolve) => {
    const done = () => {
      v.removeEventListener(eventName, done);
      v.removeEventListener('error', done);
      resolve();
    };
    v.addEventListener(eventName, done, { once: true });
    v.addEventListener('error', done, { once: true });

    if (v.preload !== 'auto') v.preload = 'auto';
    v.load?.();
  });
}

export function usePreloadAssets(opts: Options = {}): Result {
  const {
    root = null,
    videoMode = 'metadata',
    weights = { fonts: 10, images: 60, videos: 40 },
    timeoutMs = 20000,
    lockScroll = true,
    rescanDelayMs = 0
  } = opts;

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;

    const lock = () => {
      const html = document.documentElement;
      const body = document.body;
      const prevHtml = html.style.overflow;
      const prevBody = body.style.overflow;
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      return () => {
        html.style.overflow = prevHtml;
        body.style.overflow = prevBody;
      };
    };

    const unlock = lockScroll ? lock() : () => {};

    const run = async () => {
      setIsLoading(true);
      setError(null);
      setProgress(0);

      const wFonts = Math.max(0, weights.fonts ?? 0);
      const wImages = Math.max(0, weights.images ?? 0);
      const wVideos = Math.max(0, weights.videos ?? 0);
      const sum = wFonts + wImages + wVideos || 1;

      const wf = wFonts / sum;
      const wi = wImages / sum;
      const wv = wVideos / sum;

      // category state
      let fontsDone = wFonts > 0 ? 0 : 1;
      let imagesDone = 0,
        imagesTotal = 0;
      let videosDone = 0,
        videosTotal = 0;

      const update = () => {
        if (cancelled.current) return;
        const fontsRatio = wFonts > 0 ? fontsDone : 1;
        const imagesRatio = imagesTotal > 0 ? imagesDone / imagesTotal : 1;
        const videosRatio = videosTotal > 0 ? videosDone / videosTotal : 1;
        setProgress(clamp01(wf * fontsRatio + wi * imagesRatio + wv * videosRatio));
      };

      const tasks: Promise<void>[] = [];

      // fonts
      if (wFonts > 0 && 'fonts' in document) {
        const p = withTimeout(document.fonts.ready, timeoutMs, 'Fonts')
          .then(() => {
            fontsDone = 1;
            update();
          })
          .catch((e) => {
            fontsDone = 1;
            update();
            setError((prev) => prev ?? e);
          });
        tasks.push(p);
      }

      const scanAndQueue = (rootNode: ParentNode) => {
        const imgs = wImages > 0 ? Array.from(rootNode.querySelectorAll('img')) : [];
        const vids = wVideos > 0 ? Array.from(rootNode.querySelectorAll('video')) : [];

        // IMPORTANT: only increase totals for *newly discovered* elements
        // simplest approach: just use current totals if already scanned once
        if (imagesTotal === 0) imagesTotal = imgs.length;
        if (videosTotal === 0) videosTotal = vids.length;

        update();

        if (wImages > 0) {
          imgs.forEach((img) => {
            tasks.push(
              withTimeout(waitForImage(img), timeoutMs, 'Image')
                .catch((e) => setError((prev) => prev ?? e))
                .finally(() => {
                  imagesDone += 1;
                  update();
                })
            );
          });
        }

        if (wVideos > 0) {
          vids.forEach((v) => {
            tasks.push(
              withTimeout(waitForVideo(v, videoMode), timeoutMs, 'Video')
                .catch((e) => setError((prev) => prev ?? e))
                .finally(() => {
                  videosDone += 1;
                  update();
                })
            );
          });
        }
      };

      // root must exist and content must be mounted for DOM-scan strategy
      const rootNode = (root ?? document) as ParentNode;
      scanAndQueue(rootNode);

      if (rescanDelayMs > 0) {
        await new Promise((r) => setTimeout(r, rescanDelayMs));
        if (!cancelled.current) scanAndQueue(rootNode);
      }

      await Promise.all(tasks);

      if (cancelled.current) return;
      setProgress(1);
      setIsLoading(false);
      unlock();
    };

    run().catch((e) => {
      if (cancelled.current) return;
      setError(e instanceof Error ? e : new Error(String(e)));
      setIsLoading(false);
      unlock();
    });

    return () => {
      cancelled.current = true;
      unlock();
    };
  }, [root, videoMode, timeoutMs, lockScroll, rescanDelayMs, weights.fonts, weights.images, weights.videos]);

  return { progress, isLoading, error };
}
