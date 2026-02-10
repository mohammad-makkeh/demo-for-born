import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initGsap, refreshScrollTrigger } from './utils/gsap';
import {
  BASE_URL,
  COLOR_WHEEL_COLORS_STEP,
  COLOR_WHEEL_IMAGE_STEP,
  COLORS,
  MOBILE_BREAKPOINT,
  PRODUCT_CAROUSEL_ITEMS,
  SCENE_IDS,
  type AnimConfig
} from './config/constants';
import { SplitText } from 'gsap/SplitText';
import { FlickeringGrid } from './components/flickering-grid';
import { usePreloadAssets } from './hooks/use-asset-prelaod';

initGsap();
function App() {
  const { progress, isLoading, error } = usePreloadAssets({
    root: document,
    videoMode: 'canplaythrough',
    weights: { fonts: 10, images: 70, videos: 30 },
    lockScroll: true
  });

  // Lenis smooth scroll + GSAP ScrollTrigger integration
  useGSAP(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true
    });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const run = (config: AnimConfig) => {
      const {
        heroEnd,
        cinemaScrollEnd,
        cinemaPinEnd,
        focusEnd,
        useSplitText,
        skipCinema,
        skipFocusTransition,
        colorsUseGrid
      } = config;
      const ctx = gsap.context(() => {
        const heroTitleEl = document.querySelector(`#${SCENE_IDS.HERO} [data-name="hero-title"]`);
        const titleSplit = useSplitText && heroTitleEl ? new SplitText(heroTitleEl, { type: 'chars' }) : null;
        const header2 = document.querySelector(`#${SCENE_IDS.HERO} [data-name="header-2"]`);
        const productReveal = document.querySelector(`#${SCENE_IDS.HERO} #product-reveal`);
        const scanLine = document.querySelector(`#${SCENE_IDS.HERO} [data-name="scan-line"]`);
        const scanLineShadow = document.querySelector(`#${SCENE_IDS.HERO} [data-name="scan-line-shadow"]`);
        const scans = [scanLine, scanLineShadow];
        gsap.set(productReveal, {
          y: 200,
          opacity: 0,
          scale: 0.6,
          rotate: -3
        });
        gsap.set(header2, {
          overflow: 'hidden'
        });
        gsap.set(`#${SCENE_IDS.HERO} [data-name="hero-still"]`, {
          y: '-50%'
        });
        const heroTl = gsap.timeline({
          defaults: {
            ease: 'none'
          },
          scrollTrigger: {
            trigger: `#${SCENE_IDS.HERO}`,
            start: 'top top',
            end: heroEnd,
            pin: true,
            scrub: 1
          }
        });
        heroTl.fromTo(
          `#${SCENE_IDS.HERO} [data-name="hero-still"]`,
          {
            filter: 'grayscale(0%)'
          },
          {
            filter: 'grayscale(100%)',
            duration: 1
          }
        );

        if (titleSplit?.chars) {
          heroTl.to(
            titleSplit.chars,
            {
              ease: 'power2.out',
              x: (i: number) => {
                const n = titleSplit!.chars.length;
                const center = (n - 1) / 2;
                const offset = i - center;
                const direction = Math.sign(offset) || 1;
                const distance = Math.abs(offset);
                return direction * distance * 300;
              }
            },
            '1'
          );
          heroTl.to(
            titleSplit.chars,
            {
              ease: 'power2.out',
              y: -400,
              stagger: 0.1
            },
            '1.5'
          );
        } else if (heroTitleEl) {
          heroTl.fromTo(
            heroTitleEl,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '0.2'
          );
        }
        heroTl
          .to(
            `#${SCENE_IDS.HERO} [data-name="hero-still"]`,
            {
              z: 1170,
              duration: 2
            },
            '1.5'
          )
          .addLabel('product-reveal-start', '>-0.2');
        heroTl.to(
          `#${SCENE_IDS.HERO} [data-name="fully-dotted-grid"]`,
          {
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out'
          },
          'product-reveal-start+=0.2'
        );
        heroTl.to(
          `#${SCENE_IDS.HERO} [data-name="dotted-grid-item-ISO"]`,
          {
            scrambleText: {
              text: 'ISO 400',
              speed: 0.3
            },
            duration: 0.8,
            ease: 'none'
          },
          'product-reveal-start+=0.2'
        );
        heroTl.to(
          `#${SCENE_IDS.HERO} [data-name="dotted-grid-item-F"]`,
          {
            scrambleText: {
              text: 'F/1.4',
              speed: 0.3
            },
            duration: 0.8,
            ease: 'none'
          },
          'product-reveal-start+=0.2'
        );
        heroTl.to(
          `#${SCENE_IDS.HERO} [data-name="dotted-grid-item-4k"]`,
          {
            scrambleText: {
              text: '4k',
              speed: 0.3
            },
            duration: 0.8,
            ease: 'none'
          },
          'product-reveal-start+=0.2'
        );
        heroTl.to(
          `#${SCENE_IDS.HERO} [data-name="dotted-grid-item-24p"]`,
          {
            scrambleText: {
              text: '24p',
              speed: 0.3
            },
            duration: 0.8,
            ease: 'none'
          },
          'product-reveal-start+=0.2'
        );
        const header2Split = new SplitText(header2, { type: 'chars' });
        gsap.set(header2Split.chars, {
          y: 200
        });
        heroTl.to(
          header2Split.chars,
          {
            y: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: 'expo.out'
          },
          'product-reveal-start+=0.3'
        );
        heroTl.to(
          productReveal,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: -20,
            duration: 1.2,
            ease: 'expo.out'
          },
          'product-reveal-start+=0.4'
        );
        heroTl.to(
          scanLine,
          { opacity: 1, ease: 'none', duration: 0.1, repeat: 4, yoyo: true },
          'product-reveal-start+=0.6'
        );
        heroTl.to(
          scanLineShadow,
          { opacity: 0.4, ease: 'none', duration: 0.1, repeat: 4, yoyo: true },
          'product-reveal-start+=0.6'
        );
        heroTl.fromTo(
          productReveal?.querySelector(`[data-name="hero-product-reveal"]`) as HTMLElement,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: 'power2.inOut' },
          'product-reveal-start+=1'
        );
        heroTl.to(scans, { top: '100%', duration: 1.5, ease: 'power2.inOut' }, 'product-reveal-start+=1');
        heroTl.to(scans, { top: '150%', opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 'product-reveal-start+=2.5');
        heroTl.to(
          productReveal?.querySelector(`[data-name="hero-product-silhouette"]`) as HTMLElement,
          { opacity: 0, duration: 0 },
          'product-reveal-start+=2.5'
        );
        heroTl.to(
          header2Split.chars,
          {
            y: '-120%',
            stagger: 0.03,
            ease: 'expo.out'
          },
          'product-reveal-start+=2.5'
        );
        heroTl.to(productReveal, { rotate: 0, scale: 1.4 }, 'product-reveal-start+=2.5');

        // SCENE 02 - CINEMA (skipped on mobile)
        if (!skipCinema) {
          const cinemaScene = document.querySelector(`#${SCENE_IDS.CINEMA}`);
          const cinemaSceneInner = document.querySelector(`#${SCENE_IDS.CINEMA} .inner`);
          const cinemaStillContainer = document.querySelector(
            `#${SCENE_IDS.CINEMA} [data-name="cinema-still-container"]`
          );
          const cinemaTitle = document.querySelector(`#${SCENE_IDS.CINEMA} [data-name="cinema-title"]`);
          const cinemaSubtitle = document.querySelector(`#${SCENE_IDS.CINEMA} [data-name="cinema-subtitle"]`);
          const cinemaBody = document.querySelector(`#${SCENE_IDS.CINEMA} [data-name="cinema-body"]`);
          const cinemaStillHero = document.querySelector(`#${SCENE_IDS.CINEMA} .cinema-still-hero`);
          const cinemaStillHeroImage = document.querySelector(
            `#${SCENE_IDS.CINEMA} .cinema-still-hero [data-name="cinema-still-img"]`
          );
          const cinemaStillHeroSharpImage = document.querySelector(
            `#${SCENE_IDS.CINEMA} .cinema-still-hero [data-name="city-night-sharp"]`
          );
          const cinemaBodySplit = new SplitText(cinemaBody, { type: 'lines', mask: 'lines' });
          const cinemaStill = gsap.utils.toArray(`#${SCENE_IDS.CINEMA} [data-name="cinema-still"]`);
          const cinemaStillImages = gsap.utils.toArray(`#${SCENE_IDS.CINEMA} [data-name="cinema-still-img"]`);
          const lightAdjustmentTexts = gsap.utils.toArray(
            `#${SCENE_IDS.CINEMA} [data-name="light-adjustment-copy"] p`
          ) as HTMLElement[];
          const lightAdjustmentKnob = document.querySelector(
            `#${SCENE_IDS.CINEMA} [data-name="light-adjustment-knob"]`
          );
          const lightAdjustmentKnobGear = document.querySelector(
            `#${SCENE_IDS.CINEMA} [data-name="light-adjustment-knob-gear"]`
          );
          const lightAdjustmentKnobProduct = document.querySelector(
            `#${SCENE_IDS.CINEMA} [data-name="light-adjustment-knob-product"]`
          );

          const cinemaStillContainerWidth = cinemaStillContainer?.clientWidth || 0;

          gsap.set(cinemaStillImages, {
            width: cinemaStillContainerWidth,
            minWidth: cinemaStillContainerWidth
          });

          const cinemaTl = gsap.timeline({
            defaults: {
              ease: 'none'
            },
            scrollTrigger: {
              trigger: cinemaScene,
              start: 'top-=40% top',
              end: cinemaScrollEnd,
              scrub: 1
            },
            invalidateOnRefresh: true
          });
          ScrollTrigger.create({
            trigger: cinemaScene,
            start: 'top top',
            end: cinemaPinEnd,
            pin: true,
            anticipatePin: 1
          });
          gsap.set(cinemaStill, {
            width: cinemaStillContainerWidth / 3,
            transformOrigin: 'left center'
          });
          cinemaTl.to(
            cinemaStillImages,
            {
              x: '50%',
              ease: 'none',
              stagger: 0.1,
              duration: 1
            },
            '>-0.3'
          );

          gsap.set(cinemaBody, {
            overflow: 'hidden'
          });
          gsap.set(cinemaBodySplit.lines, {
            y: 50
          });
          gsap.set(cinemaTitle, {
            y: 200,
            opacity: 0
          });
          gsap.set(cinemaSubtitle, {
            x: -100,
            opacity: 0
          });
          cinemaTl.to(
            cinemaTitle,
            {
              y: 0,
              opacity: 1,
              ease: 'expo.out'
            },
            0.3
          );
          cinemaTl.to(
            cinemaSubtitle,
            {
              x: 0,
              opacity: 1,
              ease: 'expo.out'
            },
            0.4
          );
          cinemaTl.to(
            cinemaBodySplit.lines,
            {
              y: 0,
              ease: 'expo.out',
              stagger: 0.08
            },
            0.45
          );
          // expand the cinema-still-hero
          cinemaTl.to(
            cinemaStillHero,
            {
              width: cinemaStillContainerWidth,
              minWidth: cinemaStillContainerWidth
            },
            '>'
          );
          cinemaTl.to(
            cinemaStillHeroImage,
            {
              width: cinemaStillContainerWidth,
              x: 0,
              ease: 'none',
              stagger: 0.1
            },
            '<'
          );
          cinemaTl.to(
            cinemaStillContainer,
            {
              width: '100%'
            },
            '>-0.01'
          );
          cinemaTl.to(
            cinemaStillHero,
            {
              width: '100%',
              ease: 'none'
            },
            '<'
          );
          cinemaTl.to(
            cinemaStillHeroImage,
            {
              width: '100%',
              ease: 'none'
            },
            '<'
          );
          cinemaTl.to(
            cinemaStillContainer,
            {
              gap: 0,
              ease: 'step(1)'
            },
            '<'
          );
          cinemaTl.to(
            cinemaSceneInner,
            {
              padding: 0
            },
            '>-0.3'
          );
          cinemaTl.addLabel('light-start');
          cinemaTl.to(
            cinemaStillHeroImage,
            {
              opacity: 0,
              duration: 4,
              ease: 'none'
            },
            'light-start'
          );
          cinemaTl.to(
            cinemaStillHeroSharpImage,
            {
              display: 'block',
              ease: 'none'
            },
            'light-start'
          );
          for (let i = 0; i < lightAdjustmentTexts.length; i++) {
            const lightAdjustmentText = lightAdjustmentTexts[i];
            cinemaTl.fromTo(
              new SplitText(lightAdjustmentText, { type: 'chars' }).chars,
              {
                opacity: 0,
                y: 100
              },
              {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.3,
                ease: 'expo.out'
              },
              `light-start-=${1.2 - i * 0.7}`
            );
          }
          cinemaTl.fromTo(
            lightAdjustmentKnob,
            {
              xPercent: -100
            },
            {
              xPercent: 0,
              ease: 'power2.out'
            },
            'light-start-=1'
          );
          cinemaTl.fromTo(
            lightAdjustmentKnobProduct,
            { filter: 'brightness(1)' },
            {
              filter: 'brightness(0.6)',
              ease: 'none'
            },
            'light-start'
          );
          cinemaTl.to(
            lightAdjustmentKnobGear,
            {
              rotate: 360,
              duration: 4,
              ease: 'none'
            },
            'light-start'
          );
        }

        // SCENE 03 - FOCUS
        const focusScene = document.querySelector(`#${SCENE_IDS.FOCUS}`);
        const focusObjectImg = document.querySelector(`#${SCENE_IDS.FOCUS} [data-name="focus-object-img"]`);
        const focusGridSvg = document.querySelector(`#${SCENE_IDS.FOCUS} [data-name="focus-grid-svg"]`);
        const focusTitleWheel = document.querySelector(
          `#${SCENE_IDS.FOCUS} [data-name="focus-title-wheel"] .text-wheel-inner`
        );
        const focusTitleWheelText = focusTitleWheel?.querySelector('.text-wheel') as HTMLElement;
        const focusObjectContainer = document.querySelector(`#${SCENE_IDS.FOCUS} [data-name="focus-object-container"]`);
        const focusTransitionLensMacroContainer = document.querySelector(
          `#${SCENE_IDS.FOCUS} [data-name="focus-transition-lens-macro-container"]`
        );
        const focusTransitionLensMacro = document.querySelector(
          `#${SCENE_IDS.FOCUS} [data-name="focus-transition-lens-macro"]`
        );
        const focusTransitionEnd = document.querySelector(`#${SCENE_IDS.FOCUS} [data-name="focus-transition-end"]`);
        const focusTransitionEndText = focusTransitionEnd?.querySelector('p') as HTMLElement;
        const focusSceneInner = document.querySelector(`#${SCENE_IDS.FOCUS} [data-name="focus-scene-inner"]`);

        gsap.set(focusObjectImg, {
          filter: 'blur(10px)'
        });
        gsap.set(focusGridSvg, {
          scale: 0,
          opacity: 0,
          transformOrigin: 'center center'
        });
        if (!skipFocusTransition) {
          gsap.set(focusTransitionLensMacroContainer, {
            '--hole': '32vmin'
          });
          gsap.set(focusTransitionLensMacro, {
            transformOrigin: '50% 50%'
          });
        }
        const focusTl = gsap.timeline({
          defaults: {
            ease: 'none'
          },
          scrollTrigger: {
            trigger: focusScene,
            start: 'top top',
            end: focusEnd,
            pin: true,
            scrub: 1
          }
        });
        const wheelTl = gsap.timeline({
          scrollTrigger: {
            trigger: focusScene,
            start: 'top bottom-=10%',
            end: 'bottom top'
          },
          defaults: {
            ease: 'none',
            duration: 3,
            yoyo: true
          },
          repeat: -1
        });
        const fontSize = +gsap.getProperty(focusTitleWheelText, 'font-size') || 20;
        new SplitText(focusTitleWheelText, {
          type: 'chars',
          charsClass: 'focus-text-wheel-char',
          position: 'absolute'
        });
        const numLines = 10;
        const radius = fontSize / 2 / Math.sin((180 / numLines) * (Math.PI / 180)); // from Pythagoras Eq
        const angle = 360 / numLines;
        const origin = `50% 50% -${radius}px`;
        const parentHeight = (numLines * fontSize) / 3;
        gsap.set(focusTitleWheel, {
          height: parentHeight
        });

        // clone texts
        for (let i = 0; i < numLines - 1; i++) {
          const clone = focusTitleWheelText.cloneNode(true);
          focusTitleWheel?.appendChild(clone);
        }

        // position texts
        if (!focusTitleWheel?.children) return;
        gsap.set(focusTitleWheel.children, {
          rotationX: function (index) {
            return angle * index;
          },
          z: radius,
          transformOrigin: origin
        });

        wheelTl
          .to(focusTitleWheel, {
            rotationX: 360,
            transformOrigin: '50% 50%'
          })
          .to(
            '.focus-text-wheel-char:nth-of-type(even)',
            {
              rotationX: 360 / numLines,
              transformOrigin: origin,
              filter: 'blur(0px)',
              duration: 2
            },
            '-=1'
          )
          .to(
            focusTitleWheel,
            {
              rotationX: -((360 / (numLines / 5)) * 2),
              transformOrigin: '50% 50%'
            },
            '-=0.5'
          )
          .to(
            '.focus-text-wheel-char:nth-of-type(odd)',
            {
              rotationX: (360 / numLines) * 2,
              transformOrigin: origin,
              filter: 'blur(3px)',
              duration: 2
            },
            '-=1'
          )
          .to(
            focusTitleWheel,
            {
              rotationX: -((360 / (numLines / 5)) * 3),
              transformOrigin: '50% 50%'
            },
            '-=0.5'
          )
          .to(
            '.focus-text-wheel-char:nth-of-type(even)',
            {
              rotationX: (360 / numLines) * 3,
              transformOrigin: origin,
              filter: 'blur(3px)',
              duration: 2
            },
            '-=1'
          )
          .to(
            '.focus-text-wheel-char:nth-of-type(odd)',
            {
              filter: 'blur(0px)'
            },
            '<'
          )
          .to(
            focusTitleWheel,
            {
              rotationX: -((360 / (numLines / 5)) * 4),
              transformOrigin: '50% 50%'
            },
            '-=0.5'
          )
          .to(
            '.focus-text-wheel-char:nth-of-type(odd)',
            {
              rotationX: (360 / numLines) * 4,
              transformOrigin: origin,
              filter: 'blur(0px)',
              duration: 2
            },
            '-=1'
          )
          .set('.focus-text-wheel-char', {
            rotationX: 0,
            immediateRender: false
          })
          .set(focusTitleWheel, {
            rotationX: 0,
            immediateRender: false
          });

        focusTl.fromTo(
          focusObjectContainer,
          {
            clipPath:
              'polygon(14% 90%, 14% 12%, 78% 12%, 78% 26%, 28% 26%, 28% 42%, 70% 42%, 70% 56%, 28% 56%, 28% 90%)'
          },
          {
            clipPath:
              'polygon(0% 100%, 0% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%)',
            ease: 'power2.out'
          },
          0
        );
        focusTl.to(
          focusObjectContainer,
          {
            borderRadius: 20,
            ease: 'power2.out'
          },
          0
        );
        focusTl.to(
          focusObjectImg,
          {
            scale: 1.06,
            ease: 'power2.out'
          },
          '<+=0.1'
        );
        focusTl.to(
          focusGridSvg,
          {
            scale: 1,
            opacity: 0.8,
            ease: 'power2.out'
          },
          '>-=0.5'
        );
        focusTl.to(
          focusObjectImg,
          {
            filter: 'blur(0px)',
            ease: 'none'
          },
          '<+=0.2'
        );
        focusTl.to(
          focusGridSvg,
          {
            opacity: 0,
            duration: 0.5,
            ease: 'none'
          },
          '>'
        );
        if (!skipFocusTransition) {
          focusTl.set(focusTransitionLensMacroContainer, { autoAlpha: 1 });
          focusTl
            .to(
              focusTransitionLensMacroContainer,
              {
                '--hole': '0vmin',
                duration: 1.7,
                ease: 'none'
              },
              '>'
            )
            .addLabel('lens-macro-hole-ended');
          focusTl.fromTo(
            focusTransitionLensMacroContainer,
            { scale: 3.7 },
            {
              scale: 1,
              duration: 3,
              ease: 'none'
            },
            '<'
          );
          focusTl.to(
            focusTransitionLensMacroContainer,
            {
              scale: 0.1,
              duration: 1,
              ease: 'none'
            },
            '>'
          );
          focusTl.to(
            focusTransitionLensMacroContainer,
            {
              rotate: 360,
              duration: 1,
              ease: 'none'
            },
            '<'
          );
          focusTl.set(
            focusSceneInner,
            {
              autoAlpha: 0,
              display: 'none'
            },
            'lens-macro-hole-ended'
          );

          focusTl.set(
            focusTransitionEnd,
            {
              autoAlpha: 1
            },
            'lens-macro-hole-ended'
          );
          const focusTransitionEndTextSplit = new SplitText(focusTransitionEndText, { type: 'words' });
          focusTl.set(
            focusTransitionEndTextSplit.words,
            {
              x: (i: number) => {
                const n = focusTransitionEndTextSplit.words.length;
                const center = (n - 1) / 2;
                const offset = i - center;
                const direction = Math.sign(offset) || 1;
                const distance = Math.abs(offset);
                return direction * distance * 2000;
              }
            },
            'lens-macro-hole-ended'
          );
          focusTl.to(
            focusTransitionEndTextSplit.words,
            {
              x: (i: number) => {
                const n = focusTransitionEndTextSplit.words.length;
                const center = (n - 1) / 2;
                const offset = i - center;
                const direction = Math.sign(offset) || 1;
                const distance = Math.abs(offset);
                return (direction * distance * window.innerWidth) / 15;
              },
              duration: 1.2
            },
            'lens-macro-hole-ended+=1'
          );
        }

        // SCENE 04 - Product Carousel
        const productCarouselScene = document.querySelector(`#${SCENE_IDS.PRODUCT_CAROUSEL}`);
        const productCarouselViewport = document.querySelector(
          `#${SCENE_IDS.PRODUCT_CAROUSEL} [data-name="product-carousel-viewport"]`
        );
        const productCarouselTrack = document.querySelector(
          `#${SCENE_IDS.PRODUCT_CAROUSEL} [data-name="product-carousel-track"]`
        ) as HTMLElement;
        const productCarouselItemImgs = document.querySelectorAll(
          `#${SCENE_IDS.PRODUCT_CAROUSEL} [data-name="product-carousel-item-img"]`
        );
        const productCarouselItems = document.querySelectorAll(
          `#${SCENE_IDS.PRODUCT_CAROUSEL} [data-name="product-carousel-item"]`
        );
        const trackLeft = Number(getComputedStyle(productCarouselTrack).paddingLeft.replace('px', ''));
        const productCarouselTitle = document.querySelector(
          `#${SCENE_IDS.PRODUCT_CAROUSEL} [data-name="product-carousel-title"]`
        ) as HTMLElement;
        const productCarouselTitleSplit = new SplitText(productCarouselTitle, { type: 'chars' });

        // SCENE 05 - Video Layers
        const videoLayersScene = document.querySelector(`#${SCENE_IDS.VIDEO_LAYERS}`);
        const videoLayersVideo = document.querySelector(
          `#${SCENE_IDS.VIDEO_LAYERS} [data-name="video-layers-video"]`
        ) as HTMLVideoElement;

        const videoProxy = {
          progress: 0
        };

        let last = 0;
        const fps = 60;
        const frameMs = 1000 / fps;

        const clampTime = (t: number) => {
          const d = videoLayersVideo.duration || 0;
          return Math.max(0, Math.min(t, Math.max(0, d - 0.001)));
        };

        const productCarouselTl = gsap.timeline({
          scrollTrigger: {
            trigger: productCarouselScene,
            start: 'top top',
            end: () => `+=${(productCarouselViewport?.scrollWidth || 0) + 2200}`,
            pin: true,
            scrub: 1,
            onUpdate: () => {
              const now = performance.now();
              if (now - last < frameMs) return;
              last = now;

              const target = clampTime(videoProxy.progress);
              if (Math.abs(videoLayersVideo.currentTime - target) > 1 / 240) {
                videoLayersVideo.currentTime = target;
              }
            },
            invalidateOnRefresh: true
          }
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: productCarouselTitle,
              start: 'top center',
              end: '+=70%',
              scrub: 1
            }
          })
          .fromTo(
            productCarouselTitleSplit.chars,
            {
              opacity: 0,
              y: 100
            },
            {
              opacity: 1,
              y: 0,
              ease: 'expo.out',
              stagger: 0.05
            },
            0
          )
          .from(
            productCarouselItems,
            {
              y: 300,
              opacity: 0,
              ease: 'expo.out',
              stagger: 0.1
            },
            0
          );

        productCarouselTl.to(productCarouselTrack, {
          x: () => window.innerWidth - ((productCarouselViewport?.scrollWidth || 0) + trackLeft),
          duration: 1,
          ease: 'none'
        });
        productCarouselTl.to(
          productCarouselItemImgs,
          {
            xPercent: -20,
            duration: 0.4,
            stagger: 0.15,
            ease: 'none'
          },
          '<'
        );

        videoLayersVideo.preload = 'auto';
        videoLayersVideo.muted = true; // avoids some browser weirdness
        videoLayersVideo.playsInline = true; // iOS

        productCarouselTl.set(videoLayersScene, {
          autoAlpha: 1
        });
        productCarouselTl
          .fromTo(
            videoLayersScene,
            { top: '900%' },
            {
              top: 0,
              ease: 'power2.out'
            }
          )
          .addLabel('video-layers-in-view');

        productCarouselTl.fromTo(
          videoLayersVideo,
          { x: -300, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: 'expo.out'
          },
          'video-layers-in-view-=0.2'
        );

        videoLayersVideo.addEventListener('loadedmetadata', () => {
          const videoDuration = videoLayersVideo?.duration;
          productCarouselTl.to(
            videoProxy,
            {
              progress: videoDuration,
              duration: 1.5,
              ease: 'none'
            },
            'video-layers-in-view'
          );
        });

        const videoCopyTitleSplit = new SplitText(
          videoLayersScene?.querySelector(`[data-name="video-layers-copy-container"] h1`) as HTMLElement,
          { type: 'chars' }
        );
        productCarouselTl.fromTo(
          videoCopyTitleSplit.chars,
          {
            opacity: 0,
            y: 100
          },
          {
            opacity: 1,
            y: 0,
            ease: 'expo.out',
            stagger: {
              amount: 0.1,
              from: 'random'
            }
          },
          '>-=0.5'
        );
        const videoCopySubtitleSplit = new SplitText(
          videoLayersScene?.querySelector(`[data-name="video-layers-copy-container"] p`) as HTMLElement,
          { type: 'chars', charsClass: 'opacity-0' }
        );
        productCarouselTl.set(
          videoCopySubtitleSplit.chars,
          {
            opacity: 1,
            stagger: 0.04
          },
          '>'
        );

        const videoPoster = videoLayersScene?.querySelector(`[data-name="video-layers-poster"]`) as HTMLImageElement;
        productCarouselTl.fromTo(
          videoPoster,
          { x: '-100%' },
          {
            x: '0%',
            duration: 0.5,
            ease: 'expo.out'
          },
          '<'
        );

        // SCENE 06 - Colors Gallery (mobile: grid + batch; desktop: wheel)
        if (colorsUseGrid) {
          const colorsGridItems = gsap.utils.toArray<HTMLElement>(`#${SCENE_IDS.COLORS_GALLERY} .colors-grid-item`);
          gsap.set(colorsGridItems, { opacity: 0, y: 50 });
          ScrollTrigger.batch(colorsGridItems, {
            start: 'top 90%',
            end: 'bottom 10%',
            onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }),
            onLeave: (batch) => gsap.to(batch, { opacity: 0, y: -50, duration: 0.4, ease: 'power2.out' }),
            onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: -50, duration: 0.4, ease: 'power2.out' }),
            onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
          });
        } else {
          const colorsGallery = document.querySelector(`#${SCENE_IDS.COLORS_GALLERY}`);
          const colorWheelColors = Array.from(
            document.querySelector(`#${SCENE_IDS.COLORS_GALLERY} [data-name="color-wheel"]`)?.children || []
          );
          const colorWheel = document.querySelector(`#${SCENE_IDS.COLORS_GALLERY} [data-name="color-wheel"]`);
          const colorWheelImagesContainer = document.querySelector(
            `#${SCENE_IDS.COLORS_GALLERY} [data-name="color-wheel-images"]`
          );
          const colorWheelImages = Array.from(colorWheelImagesContainer?.children || []) as HTMLElement[];

          const snapToColor = (progress: number) => {
            const totalDegress = (colorWheelColors.length - 1) * COLOR_WHEEL_COLORS_STEP;
            const currentDegree = progress * totalDegress;
            const snappedDegree = gsap.utils.snap(COLOR_WHEEL_COLORS_STEP, currentDegree);
            const snappedProgress = snappedDegree / totalDegress;
            return snappedProgress;
          };

          const colorsGalleryTl = gsap.timeline({
            scrollTrigger: {
              trigger: colorsGallery,
              start: 'top top',
              end: () => `+=${(colorWheelColors.length - 1) * 150}%`,
              snap: {
                snapTo: snapToColor,
                delay: 0.1,
                duration: 0.3
              },
              anticipatePin: 1,
              pin: true,
              scrub: 1
            }
          });
          colorsGalleryTl.set(colorWheelImages, {
            rotate: (index) => index * COLOR_WHEEL_IMAGE_STEP
          });
          colorsGalleryTl.set(colorWheelColors, {
            rotate: (index) => index * COLOR_WHEEL_COLORS_STEP
          });
          colorsGalleryTl.to(
            colorWheel,
            {
              rotate: -(colorWheelColors.length - 1) * COLOR_WHEEL_COLORS_STEP,
              duration: colorWheelColors.length * 3,
              ease: 'none'
            },
            0
          );

          colorsGalleryTl.to(
            colorWheelImages.slice(1),
            {
              rotate: 0,
              duration: (index) => (index + 1) * (colorWheelColors.length * 0.5),
              ease: 'none'
            },
            0
          );

          gsap.set(colorWheel, {
            background: `linear-gradient(${0}deg, ${COLORS[0].hex}, var(--color-bone))`
          });
          COLORS.slice(1).forEach((color, index) => {
            colorsGalleryTl.to(
              colorWheel,
              {
                background: `linear-gradient(${(index + 2.5) * COLOR_WHEEL_COLORS_STEP}deg, ${color.hex} 40%, var(--color-bone))`,
                duration: 3.5
              },
              '0+=' + index * 3.5
            );
          });
        }

        // footer
        const footerProduct = document.querySelector('footer [data-name="footer-product"]');
        const footerTitle = document.querySelector('footer [data-name="footer-title"]');
        const footerSubtitle = document.querySelector('footer [data-name="footer-subtitle"]');
        const footerTl = gsap.timeline({
          scrollTrigger: {
            trigger: 'footer',
            start: 'top 80%',
            end: '+=100%',
            toggleActions: 'play pause resume reset'
          }
        });
        gsap.set(footerProduct, {
          y: 300
        });
        footerTl.fromTo(
          new SplitText(footerSubtitle, { type: 'chars' }).chars,
          {
            opacity: 0,
            x: 150
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: 'power2.out',
            stagger: 0.05
          }
        );
        footerTl.to(
          footerProduct,
          {
            y: 0,
            duration: 1,
            ease: 'power2.out'
          },
          0
        );
        footerTl.fromTo(
          new SplitText(footerTitle, { type: 'chars' }).chars,
          {
            opacity: 0,
            x: 50
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.2,
            ease: 'power2.out',
            stagger: 0.02
          },
          '<'
        );
      });
      requestAnimationFrame(() => refreshScrollTrigger());
      return ctx;
    };
    mm.add(`(min-width: ${MOBILE_BREAKPOINT}px)`, () => {
      const ctx = run({
        heroEnd: '+=600%',
        cinemaScrollEnd: '+=740%',
        cinemaPinEnd: '+=700%',
        focusEnd: '+=500%',
        useSplitText: true,
        skipCinema: false,
        skipFocusTransition: false,
        colorsUseGrid: false
      });
      return () => ctx.revert();
    });
    mm.add(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`, () => {
      const ctx = run({
        heroEnd: '+=300%',
        cinemaScrollEnd: '+=400%',
        cinemaPinEnd: '+=400%',
        focusEnd: '+=280%',
        useSplitText: false,
        skipCinema: true,
        skipFocusTransition: true,
        colorsUseGrid: true
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  });

  if (error) {
    return (
      <div className="fixed inset-0 bg-ink text-bone z-50 flex flex-col items-center justify-center font-mono">
        <div className="text-display-xs mb-4">Error loading assets: {error.message}</div>
      </div>
    );
  }

  return (
    <main className="min-h-[500vh] bg-ink text-bone">
      {/* Preloader */}
      {isLoading && (
        <div id="preloader" className="fixed inset-0 bg-ink z-50 flex flex-col items-center justify-center font-mono">
          <div className="text-display-xs mb-4">Hold your breath...</div>
          <div className="relative w-[20vw] h-2 rounded-full bg-white/20">
            <div
              className="absolute top-0 left-0 w-0 h-full bg-white rounded-full"
              style={{ width: `${progress * 100}%` }}
            ></div>
          </div>
          <div className="text-display-xs mt-4">{Math.round(progress * 100)}%</div>
        </div>
      )}

      {/* SCENE 01 - HERO */}
      <section
        id={SCENE_IDS.HERO}
        className={
          'relative w-full flex flex-col items-center py-6 md:py-12 h-screen min-h-screen bg-ink text-bone overflow-hidden transform-3d perspective-distant will-change-transform ' +
          (!isLoading ? ' fade-in' : '')
        }
      >
        <img
          data-name="hero-still"
          src={BASE_URL + '/assets/images/hero-still.webp'}
          alt="Hero"
          className="w-[85vw] md:w-[50vw] h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover z-20 transform-3d will-change-transform"
        />

        <h1
          data-name="hero-title"
          className="text-bone text-display-lg font-bold absolute top-1/6 md:top-1/12 left-1/2 -translate-x-1/2 z-10 will-change-transform text-center max-w-[90vw]"
        >
          IRIS
        </h1>
        <p
          data-name="hero-subtitle"
          className="text-bone w-full text-xl md:text-display-sm font-mono absolute bottom-[15vh] md:bottom-[7vw] left-1/2 -translate-x-1/2 text-center px-4"
        >
          Close your bulky camera
        </p>
        <div data-name="fully-dotted-grid" className="fully-dotted-grid opacity-0 z-30 will-change-[opacity]">
          <FlickeringGrid className="absolute top-0 left-0 w-full h-full z-30 bg-bone" gridGap={25} flickerChance={2} />
          <div
            data-name="dotted-grid-item-ISO"
            className="text-ink opacity-60 text-display-xs absolute top-4 right-4 md:top-8 md:right-10 font-mono z-30 will-change-transform"
          >
            ISO 400
          </div>
          <div
            data-name="dotted-grid-item-F"
            className="text-ink opacity-60 text-display-xs absolute top-4 left-4 md:top-8 md:left-10 font-mono z-30 will-change-transform"
          >
            F/1.4
          </div>
          <div
            data-name="dotted-grid-item-4k"
            className="text-ink opacity-60 text-display-xs absolute bottom-4 right-4 md:bottom-8 md:right-10 font-mono z-30 will-change-transform"
          >
            4k
          </div>
          <div
            data-name="dotted-grid-item-24p"
            className="text-ink opacity-60 text-display-xs absolute bottom-4 left-4 md:bottom-8 md:left-10 font-mono z-30 will-change-transform"
          >
            24p
          </div>
        </div>
        <h2
          data-name="header-2"
          className="text-ink text-4xl sm:text-6xl md:text-8xl lg:text-9xl z-30 absolute top-20 md:top-28 w-full text-center left-0 will-change-transform px-2"
        >
          Open the Iris
        </h2>
        <div
          id="product-reveal"
          className="w-[45vw] h-[35vh] sm:w-[35vh] sm:h-[45vh] md:w-[30vh] md:h-[45vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 will-change-[transform,opacity]"
        >
          <img
            data-name="hero-product-silhouette"
            src={BASE_URL + '/assets/images/product_silhouette.webp'}
            alt="Hero"
            className="w-full h-full absolute inset-0 object-cover z-30"
          />
          <img
            data-name="hero-product-reveal"
            src={BASE_URL + '/assets/images/product_reveal_front.webp'}
            alt="Hero"
            className="w-full h-full absolute inset-0 object-cover z-30"
          />
          <div
            data-name="scan-line"
            className="scan-line-glow w-[120%] h-1 bg-teal absolute top-0 left-1/2 -translate-x-1/2 z-30 opacity-0 will-change-[opacity]"
          ></div>
          <div
            data-name="scan-line-shadow"
            className="scan-line-shadow w-[200%] h-8 bg-teal absolute top-0 left-1/2 -translate-x-1/2 z-20 opacity-50 will-change-[opacity]"
          ></div>
        </div>
      </section>

      {/* SCENE 02 - CINEMA (hidden on mobile) */}
      <section id={SCENE_IDS.CINEMA} className="hidden md:block w-full h-screen min-h-screen bg-ink">
        <div className="inner relative w-full px-4 py-12 md:px-12 md:py-20 flex flex-col md:flex-row h-screen min-h-screen gap-6 md:gap-4">
          <div
            data-name="cinema-still-container"
            className="w-full md:w-[50%] flex flex-col sm:flex-row gap-4 shrink-0 grow will-change-transform order-2 md:order-1"
          >
            <div
              data-name="cinema-still"
              className="cinema-still-hero rounded-xl overflow-hidden w-full relative grow shrink-0 will-change-transform"
            >
              <img
                data-name="city-night-sharp"
                src={BASE_URL + '/assets/images/ch1_city_night_sharp.webp'}
                alt="Cinema"
                className="absolute top-0 right-0 bottom-0 w-full h-full object-cover hidden"
              />
              <img
                data-name="cinema-still-img"
                src={BASE_URL + '/assets/images/ch1_city_night.webp'}
                alt="Cinema"
                className="absolute top-0 right-0 bottom-0 h-full object-cover"
              />
              <div
                data-name="light-adjustment-knob"
                className="absolute top-1/2 left-0 h-[20vh] md:h-[25vh] w-12 md:w-auto hidden sm:block"
              >
                <img
                  data-name="light-adjustment-knob-product"
                  src={BASE_URL + '/assets/images/product_light_knob.webp'}
                  alt="Light Adjustment"
                  className="w-auto h-full object-cover"
                />
                <img
                  data-name="light-adjustment-knob-gear"
                  src={BASE_URL + '/assets/images/light_knob_gear.webp'}
                  alt="Light Adjustment"
                  className="absolute top-[36%] left-[70%] w-auto h-[40%] object-cover"
                />
              </div>
            </div>
            <div
              data-name="cinema-still"
              className="rounded-xl overflow-hidden w-full relative shrink will-change-transform"
            >
              <img
                data-name="cinema-still-img"
                src={BASE_URL + '/assets/images/hero_still_02.webp'}
                alt="Cinema"
                className="absolute top-0 right-0 bottom-0 h-full object-cover"
              />
            </div>
            <div
              data-name="cinema-still"
              className="rounded-xl overflow-hidden w-full relative shrink will-change-transform"
            >
              <img
                data-name="cinema-still-img"
                src={BASE_URL + '/assets/images/hero_still_03.webp'}
                alt="Cinema"
                className="absolute top-0 right-0 bottom-0 h-full object-cover"
              />
            </div>
          </div>
          <div
            data-name="cinema-copy-container"
            className="relative w-full md:w-[50%] pl-0 md:pl-20 shrink order-1 md:order-2"
          >
            <div className="relative md:absolute inset-0 md:left-20 w-full md:w-[40vw] h-full flex flex-col justify-center">
              <h2
                data-name="cinema-title"
                className="text-bone text-display-md leading-none font-bold z-10 relative will-change-transform"
              >
                Not content.
                <br /> Cinema.
              </h2>
              <p
                data-name="cinema-subtitle"
                className="text-bone text-body-lg uppercase tracking-widest font-mono opacity-60 mt-8 will-change-transform"
              >
                The difference is intention.
              </p>
              <p data-name="cinema-body" className="text-bone text-body max-w-[35ch] mt-3 will-change-transform">
                Lock exposure with a tap. Pull focus with your thumb. Let color stay honest when the light runs away.
              </p>
            </div>
          </div>
          <div data-name="light-adjustment-copy" className="absolute top-32 left-20">
            <p
              data-name="light-adjustment-title"
              className="text-bone text-display-md leading-none font-bold z-10 relative"
            >
              Light Adjustment.
            </p>
            <p
              data-name="light-adjustment-subtitle"
              className="text-bone text-body-lg leading-none opacity-80 uppercase tracking-widest font-mono mt-8 relative z-10"
            >
              Like never before.
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 03 - FOCUS */}
      <section
        id={SCENE_IDS.FOCUS}
        className="relative w-full flex h-screen min-h-screen bg-ink text-bone overflow-hidden"
      >
        <div
          data-name="focus-scene-inner"
          className="relative w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-center justify-center px-4 py-12 md:px-12 md:py-20"
        >
          <div
            data-name="focus-title-wheel"
            className="col-span-1 flex items-center justify-center min-h-[30vh] md:min-h-0 h-full text-wheel-container text-bone z-10 relative will-change-transform"
          >
            <div className="text-wheel-inner">
              <p className="text-wheel text-shadow-2xs text-5xl sm:text-7xl md:text-9xl font-bold">FOCUS</p>
            </div>
          </div>
          <div
            data-name="focus-object-container"
            className="col-span-1 relative w-full min-h-[50vh] md:min-h-0 h-full overflow-hidden will-change-transform"
          >
            <img
              data-name="focus-object-img"
              src={BASE_URL + '/assets/images/ch2_subject_still.webp'}
              alt="Focus"
              className="absolute top-0 left-0 w-full h-full object-cover will-change-[filter,transform]"
            />
            <img
              data-name="focus-grid-svg"
              className="absolute bottom-[30%] left-[25%] md:bottom-auto md:left-auto md:top-[20%] md:right-[18%] w-[50vw] h-[50vw] md:w-[25vw] md:h-[25vw] max-w-[200px] max-h-[200px] md:max-w-none md:max-h-none object-cover will-change-transform"
              src={BASE_URL + '/assets/svgs/focus_grid.svg'}
              alt="grid"
            />
          </div>
        </div>
        <div
          data-name="focus-transition-lens-macro-container"
          className="absolute inset-0 z-30 w-screen h-screen invisible opacity-0 will-change-[transform,opacity] hidden md:block"
        >
          <img
            data-name="focus-transition-lens-macro"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-origin-center w-[90vmin] h-[90vmin] md:w-[100vh] md:h-screen will-change-transform"
            src={BASE_URL + '/assets/images/lens_macro.webp'}
            alt="Focus"
          />
        </div>
        <div
          data-name="focus-transition-end"
          className="bg-bone text-ink text-display-sm text-centers uppercase tracking-widest absolute inset-0 w-screen h-screen z-20 invisible opacity-0 max-md:hidden md:flex md:items-center md:justify-center"
        >
          <p>CINEMA FOCUS I VISION DETAIL</p>
        </div>
      </section>

      {/* SCENE 04 - Product Carousel (horizontal scroll) (SCENE 05 is nested inside)*/}
      <section
        id={SCENE_IDS.PRODUCT_CAROUSEL}
        className="relative w-full flex h-screen min-h-screen bg-bone text-ink overflow-hidden"
      >
        <div className="inner relative w-full py-8 h-screen min-h-screen flex flex-col px-4 md:px-0">
          <h1
            data-name="product-carousel-title"
            className="text-ink text-display-md font-bold mb-20 md:mb-8 pl-4 md:pl-12"
          >
            Welcome to IRIS
          </h1>
          <div
            data-name="product-carousel-viewport"
            className="max-w-[100vw] overflow-hidden h-[50dvh] md:h-full md:grow pb-4 md:pb-8 will-change-transform -mx-4 md:mx-0"
          >
            <div
              data-name="product-carousel-track"
              className="h-full pl-4 md:pl-14 flex gap-3 md:gap-0 will-change-transform"
            >
              {PRODUCT_CAROUSEL_ITEMS.map((item) => (
                <div
                  data-name="product-carousel-item"
                  key={item.id}
                  className="min-w-[85vw] sm:min-w-[70vw] md:min-w-[50vw] h-full overflow-hidden bg-gray-400 rounded-xl mr-3 md:mr-5 relative border flex-shrink-0"
                >
                  {item.cardType === 'overlay' && (
                    <>
                      <img
                        src={item.image}
                        alt={item.title}
                        data-name="product-carousel-item-img"
                        className="absolute top-0 left-0 min-w-[150%] h-full object-cover"
                      />
                      <div className="relative z-10 px-8 py-6">
                        <h2 className="text-bone text-display-sm font-bold font-sans">{item.title}</h2>
                        <p className="text-bone text-body-lg font-mono opacity-80">{item.subtitle}</p>
                      </div>
                    </>
                  )}
                  {item.cardType === 'specs' && (
                    <div className="grid grid-cols-2 h-full bg-bone">
                      <div className="col-span-1 relative">
                        <h2 className="px-4 py-6 text-ink text-display-sm font-bold font-sans leading-tight border-b">
                          {item.title}
                        </h2>
                        <ul className="px-4 py-6">
                          {item.specs?.map((spec) => (
                            <li
                              key={spec.label}
                              className="text-ink text-body-lg font-mono opacity-80 flex items-center justify-between mb-1"
                            >
                              <span className="opacity-60">{spec.label}</span>
                              <span className="font-bold">{spec.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-1 relative z-10 overflow-hidden h-full">
                        <img
                          data-name="product-carousel-item-img"
                          src={item.image}
                          alt={item.title}
                          className="absolute top-0 left-0 min-w-[150%] h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SCENE 05 - Video Layers */}
        <section
          id={SCENE_IDS.VIDEO_LAYERS}
          className="absolute left-0 top-[900%] w-full flex h-screen min-h-screen bg-white text-ink overflow-hidden"
        >
          <div
            data-name="video-layers-inner"
            className="inner relative w-full h-screen grid grid-cols-1 md:grid-cols-2 border-b"
          >
            <div data-name="video-layers-container" className="w-full h-full col-span-1 border-r">
              <video
                data-name="video-layers-video"
                src={BASE_URL + '/assets/videos/exposing-layers.mp4'}
                className="w-full h-full object-cover"
                muted
              />
            </div>
            <div
              data-name="video-layers-right-container"
              className="w-full md:w-[49vw] h-full col-span-1 flex flex-col"
            >
              <div data-name="video-layers-copy-container" className="px-4 py-4 md:px-10 md:py-6 border-b">
                <h1 className="leading-none text-ink text-display-md font-bold mb-4">
                  Exposing
                  <br />
                  Layers.
                </h1>
                <p className="text-ink text-body-lg font-mono opacity-80">A True Engineering breakthrough.</p>
              </div>
              <div data-name="video-layers-poster-container" className="grow w-full h-full relative overflow-hidden">
                <img
                  data-name="video-layers-poster"
                  className="absolute top-0 left-0 w-full h-full object-cover will-change-transform"
                  src={BASE_URL + '/assets/images/exposing_layers_poster.webp'}
                  alt="Video Layers"
                />
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* SCENE 06 - Colors Gallery */}
      <section
        id={SCENE_IDS.COLORS_GALLERY}
        className="relative w-full flex md:h-screen min-h-screen md:max-h-screen bg-bone text-ink overflow-hidden"
      >
        <div data-name="colors-gallery-inner" className="inner relative w-full md:h-screen flex flex-col px-4 md:px-0">
          <h1 className="text-ink text-center text-display-sm font-bold py-3 border-b">A Plathera of Colors.</h1>
          <div data-name="color-wheel-container" className="bg-bone grow relative overflow-hidden">
            {/* Desktop: wheel + rotations (hidden on mobile) */}
            <div className="hidden md:block absolute inset-0">
              <div
                data-name="color-wheel"
                className="absolute top-1/2 left-1/2 md:left-20 -translate-y-1/2 -translate-x-1/2 rounded-full h-[80vmin] w-[80vmin] md:h-[110vh] md:w-auto md:aspect-square z-20 will-change-transform"
              >
                {COLORS.map((color) => (
                  <div
                    key={color.id + color.label}
                    className="absolute top-1/2 -translate-y-1/2 w-1/2 left-1/2 text-right pr-8 origin-[0px_50%] font-mono text-ink before:block before:w-[30%] before:h-px before:top-1/2 before:-translate-y-1/2 before:bg-ink/30 before:absolute before:left-1/5"
                  >
                    {color.label}
                  </div>
                ))}
              </div>
              <div
                data-name="color-wheel-images"
                className="absolute top-0 right-0 w-full h-full z-10 origin-[0px_50%] will-change-transform"
              >
                {COLORS.map((color) => (
                  <div
                    key={color.id + color.label}
                    className="absolute bg-pink-400 top-0 right-0 w-full h-full z-10 origin-[0px_50%]"
                  >
                    <img className="absolute w-full h-full inset-0 object-cover" src={color.img} alt={color.label} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: 2-col grid, animated via ScrollTrigger.batch */}
            <div data-name="colors-grid-mobile" className="md:hidden pt-4 h-full overflow-hidden">
              {COLORS.map((color) => (
                <div
                  key={color.id}
                  className="colors-grid-item mb-4 rounded-lg aspect-square relative overflow-hidden will-change-transform"
                >
                  <img className="absolute inset-0 w-full h-full object-cover" src={color.img} alt={color.label} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full h-[30vh] md:h-[60vh] p-6 md:p-16 bg-ink text-bone relative overflow-hidden flex flex-col">
        <img
          data-name="footer-product"
          src={BASE_URL + '/assets/images/footer-product.webp'}
          alt="Footer"
          className="w-auto h-2/3 object-cover absolute bottom-0 right-0 md:right-1/12 will-change-transform"
        />
        <div className="relative z-10 flex flex-col h-full">
          <p
            data-name="footer-title"
            className="text-bone text-display-xs font-mono opacity-80 mb-4 will-change-transform"
          >
            Built for the ones who care.
          </p>
          <p
            data-name="footer-subtitle"
            className="text-bone text-display-md font-bold leading-none tracking-widest will-change-transform"
          >
            IRIS
          </p>
          <button className="text-ink text-display-xs font-mono opacity-80 bg-bone px-8 py-3 rounded-full mt-auto w-fit cursor-pointer hover:bg-white transition-all duration-300">
            Get IRIS Now
          </button>
        </div>
      </footer>
    </main>
  );
}

export default App;
