import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGsap } from './utils/gsap';
import {
  BASE_URL,
  COLOR_WHEEL_COLORS_STEP,
  COLOR_WHEEL_IMAGE_STEP,
  COLORS,
  PRODUCT_CAROUSEL_ITEMS,
  SCENE_IDS
} from './config/constants';
import { SplitText } from 'gsap/SplitText';
import { FlickeringGrid } from './components/flickering-grid';
import { usePreloadAssets } from './hooks/use-asset-prelaod';

initGsap();
function App() {
  const { progress, isLoading, error } = usePreloadAssets({
    root: document,
    videoMode: 'metadata',
    weights: { fonts: 10, images: 60, videos: 40 },
    timeoutMs: 20000,
    rescanDelayMs: 200,
    lockScroll: true
  });
  console.log(progress, isLoading, error);

  useGSAP(() => {
    const titleSplit = new SplitText(`#${SCENE_IDS.HERO} [data-name="hero-title"]`, { type: 'chars' });
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
        end: '+=600%',
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

    heroTl.to(
      titleSplit.chars,
      {
        ease: 'power2.out',
        x: (i: number) => {
          const n = titleSplit.chars.length;
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
    heroTl.to(
      `#${SCENE_IDS.HERO} [data-name="hero-still"]`,
      {
        z: 1170,
        duration: 2
      },
      '1.5'
    );
    heroTl
      .to(
        `#${SCENE_IDS.HERO} [data-name="growing-circle"]`,
        {
          backgroundColor: 'white'
        },
        '>-0.2'
      )
      .addLabel('product-reveal-start');
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

    // SCENE 02 - CINEMA
    const cinemaScene = document.querySelector(`#${SCENE_IDS.CINEMA}`);
    const cinemaSceneInner = document.querySelector(`#${SCENE_IDS.CINEMA} .inner`);
    const cinemaStillContainer = document.querySelector(`#${SCENE_IDS.CINEMA} [data-name="cinema-still-container"]`);
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
    const lightAdjustmentKnob = document.querySelector(`#${SCENE_IDS.CINEMA} [data-name="light-adjustment-knob"]`);
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
        end: '+=740%',
        scrub: 1
      },
      invalidateOnRefresh: true
    });
    ScrollTrigger.create({
      trigger: cinemaScene,
      start: 'top top',
      end: '+=700%',
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
    gsap.set(focusTransitionLensMacroContainer, {
      '--hole': '32vmin'
    });
    gsap.set(focusTransitionLensMacro, {
      transformOrigin: '50% 50%'
    });
    const focusTl = gsap.timeline({
      defaults: {
        ease: 'none'
      },
      scrollTrigger: {
        trigger: focusScene,
        start: 'top top',
        end: '+=500%',
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
    new SplitText(focusTitleWheelText, { type: 'chars', charsClass: 'focus-text-wheel-char', position: 'absolute' });
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
        clipPath: 'polygon(14% 90%, 14% 12%, 78% 12%, 78% 26%, 28% 26%, 28% 42%, 70% 42%, 70% 56%, 28% 56%, 28% 90%)'
      },
      {
        clipPath: 'polygon(0% 100%, 0% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%)',
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

    const productCarouselTl = gsap.timeline({
      scrollTrigger: {
        trigger: productCarouselScene,
        start: 'top top',
        end: () => `+=${(productCarouselViewport?.scrollWidth || 0) + 2200}`,
        pin: true,
        scrub: 1.5,
        onUpdate: () => {
          videoLayersVideo.currentTime = videoProxy.progress;
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

    const carouselImageElements = Array.from(productCarouselItemImgs) as HTMLElement[];
    const carouselImageCount = carouselImageElements.length;
    const carouselImageProgressByIndex = carouselImageElements.map((_, index) =>
      carouselImageCount <= 1 ? 0 : index / (carouselImageCount - 1)
    );
    const carouselImageSetXPercent = carouselImageElements.map((imgElement) =>
      gsap.quickSetter(imgElement, 'xPercent')
    );
    const carouselImagePanMaxPercent = 20;
    const carouselImagePanDirection = -1;
    const carouselImageMinSpeedFactor = 0.5;
    const carouselImageMaxSpeedFactor = window.innerWidth * 0.003;
    const carouselImageInfluenceRangeInItems = 2.5;
    const carouselImageProximityExponent = 0.3;

    const carouselImageSpeedRange = carouselImageMaxSpeedFactor - carouselImageMinSpeedFactor;
    const carouselImageItemSpan = Math.max(1, carouselImageCount - 1);
    const carouselImageInfluenceRangeNormalized = Math.min(
      1,
      carouselImageInfluenceRangeInItems / carouselImageItemSpan
    );
    const carouselImageInfluenceRangeInverse =
      carouselImageInfluenceRangeNormalized > 0 ? 1 / carouselImageInfluenceRangeNormalized : 0;

    ScrollTrigger.create({
      trigger: productCarouselTrack,
      containerAnimation: productCarouselTl,
      onUpdate: (self) => {
        if (!carouselImageCount) return;
        const scrollProgress = self.progress;
        const basePanAmount = scrollProgress * carouselImagePanMaxPercent;

        for (let index = 0; index < carouselImageCount; index += 1) {
          const itemProgress = carouselImageProgressByIndex[index];
          const progressDelta = scrollProgress - itemProgress;
          const distanceFromProgress = progressDelta < 0 ? -progressDelta : progressDelta;
          const normalizedDistance =
            carouselImageInfluenceRangeInverse > 0 ? distanceFromProgress * carouselImageInfluenceRangeInverse : 1;
          const clampedDistance = normalizedDistance > 1 ? 1 : normalizedDistance;
          const proximity = 1 - clampedDistance;
          const easedProximity = Math.pow(proximity, carouselImageProximityExponent);
          const speedFactor = carouselImageMinSpeedFactor + carouselImageSpeedRange * easedProximity;
          const panAmount = basePanAmount * speedFactor;
          const clampedPan =
            panAmount > carouselImagePanMaxPercent ? carouselImagePanMaxPercent : panAmount < 0 ? 0 : panAmount;

          carouselImageSetXPercent[index](carouselImagePanDirection * clampedPan);
        }
      }
    });

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
          duration: 4,
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

    // SCENE 06 - Colors Gallery
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
          background: `linear-gradient(${(index + 2.5) * COLOR_WHEEL_COLORS_STEP}deg, ${color.hex} 20%, var(--color-bone))`,
          duration: 3.5
        },
        '0+=' + index * 3.5
      );
    });

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
          'relative w-full flex flex-col items-center py-12 h-screen min-h-screen bg-ink text-bone overflow-hidden transform-3d perspective-distant' +
          (!isLoading ? ' fade-in' : '')
        }
      >
        <img
          data-name="hero-still"
          src={BASE_URL + '/assets/images/hero-still.png'}
          alt="Hero"
          className="w-[50vw] h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover z-20 transform-3d"
        />

        <h1
          data-name="hero-title"
          className="text-bone text-display-lg font-bold absolute top-1/12 left-1/2 -translate-x-1/2 z-10"
        >
          IRIS
        </h1>
        <p
          data-name="hero-subtitle"
          className="text-bone text-display-sm font-mono absolute bottom-[7vw] left-1/2 -translate-x-1/2"
        >
          Close your camera and...
        </p>
        <div data-name="fully-dotted-grid" className="fully-dotted-grid opacity-0 z-30">
          <FlickeringGrid className="absolute top-0 left-0 w-full h-full z-30 bg-bone" gridGap={25} flickerChance={2} />
          <div
            data-name="dotted-grid-item-ISO"
            className="text-ink opacity-60 text-display-xs absolute top-8 right-10 font-mono z-30"
          >
            ISO 400
          </div>
          <div
            data-name="dotted-grid-item-F"
            className="text-ink opacity-60 text-display-xs absolute top-8 left-10 font-mono z-30"
          >
            F/1.4
          </div>
          <div
            data-name="dotted-grid-item-4k"
            className="text-ink opacity-60 text-display-xs absolute bottom-8 right-10 font-mono z-30"
          >
            4k
          </div>
          <div
            data-name="dotted-grid-item-24p"
            className="text-ink opacity-60 text-display-xs absolute bottom-8 left-10 font-mono z-30"
          >
            24p
          </div>
        </div>
        <h2 data-name="header-2" className="text-ink text-9xl z-30 absolute top-28 w-full text-center left-0">
          Open the Iris
        </h2>
        <div id="product-reveal" className="w-[30vh] h-[45vh] absolute bottom-1/5 left-1/2 -translate-x-1/2 z-30">
          <img
            data-name="hero-product-silhouette"
            src={BASE_URL + '/assets/images/product_silhouette.png'}
            alt="Hero"
            className="w-full h-full absolute inset-0 object-cover z-30"
          />
          <img
            data-name="hero-product-reveal"
            src={BASE_URL + '/assets/images/product_reveal_front.png'}
            alt="Hero"
            className="w-full h-full absolute inset-0 object-cover z-30"
          />
          <div
            data-name="scan-line"
            className="scan-line-glow w-[120%] h-1 bg-teal absolute top-0 left-1/2 -translate-x-1/2 z-30 opacity-0"
          ></div>
          <div
            data-name="scan-line-shadow"
            className="scan-line-shadow w-[200%] h-8 bg-teal absolute top-0 left-1/2 -translate-x-1/2 z-20 opacity-50"
          ></div>
        </div>
      </section>

      {/* SCENE 02 - CINEMA */}
      <section id={SCENE_IDS.CINEMA} className="w-full h-screen min-h-screen bg-ink">
        <div className="inner relative w-full px-12 py-20 flex h-screen min-h-screen">
          <div data-name="cinema-still-container" className="w-[50%] flex gap-4 shrink-0 grow">
            <div
              data-name="cinema-still"
              className="cinema-still-hero rounded-xl overflow-hidden w-full relative grow shrink-0"
            >
              <img
                data-name="city-night-sharp"
                src={BASE_URL + '/assets/images/ch1_city_night_sharp.png'}
                alt="Cinema"
                className="absolute top-0 right-0 bottom-0 w-full h-full object-cover hidden"
              />
              <img
                data-name="cinema-still-img"
                src={BASE_URL + '/assets/images/ch1_city_night.png'}
                alt="Cinema"
                className="absolute top-0 right-0 bottom-0 h-full object-cover"
              />
              <div data-name="light-adjustment-knob" className="absolute top-1/2 left-0 h-[25vh]">
                <img
                  data-name="light-adjustment-knob-product"
                  src={BASE_URL + '/assets/images/product_light_knob.png'}
                  alt="Light Adjustment"
                  className="w-auto h-full object-cover"
                />
                <img
                  data-name="light-adjustment-knob-gear"
                  src={BASE_URL + '/assets/images/light_knob_gear.png'}
                  alt="Light Adjustment"
                  className="absolute top-[36%] left-[70%] w-auto h-[40%] object-cover"
                />
              </div>
            </div>
            <div data-name="cinema-still" className="rounded-xl overflow-hidden w-full relative shrink">
              <img
                data-name="cinema-still-img"
                src={BASE_URL + '/assets/images/hero_still_02.webp'}
                alt="Cinema"
                className="absolute top-0 right-0 bottom-0 h-full object-cover"
              />
            </div>
            <div data-name="cinema-still" className="rounded-xl overflow-hidden w-full relative shrink">
              <img
                data-name="cinema-still-img"
                src={BASE_URL + '/assets/images/hero_still_03.webp'}
                alt="Cinema"
                className="absolute top-0 right-0 bottom-0 h-full object-cover"
              />
            </div>
          </div>
          <div data-name="cinema-copy-container" className="relative w-[50%] pl-20 shrink">
            <div className="absolute inset-0 left-20 w-[40vw] h-full flex flex-col justify-center">
              <h2 data-name="cinema-title" className="text-bone text-display-md leading-none  font-bold z-10 relative">
                Not content.
                <br /> Cinema.
              </h2>
              <p
                data-name="cinema-subtitle"
                className="text-bone text-body-lg uppercase tracking-widest font-mono opacity-60 mt-8"
              >
                The difference is intention.
              </p>
              <p data-name="cinema-body" className="text-bone text-body max-w-[35ch] mt-3">
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
          className="relative w-full h-full grid grid-cols-2 gap-4 items-center justify-centers px-12 py-20"
        >
          <div
            data-name="focus-title-wheel"
            className="col-span-1 flex items-center justify-center h-full text-wheel-container text-bone z-10 relative"
          >
            <div className="text-wheel-inner">
              <p className="text-wheel text-shadow-2xs text-9xl font-bold">FOCUS</p>
            </div>
          </div>
          <div data-name="focus-object-container" className="col-span-1 relative w-full h-full overflow-hidden">
            <img
              data-name="focus-object-img"
              src={BASE_URL + '/assets/images/ch2_subject_still.webp'}
              alt="Focus"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <img
              data-name="focus-grid-svg"
              src={BASE_URL + '/assets/svgs/focus_grid.svg'}
              alt="grid"
              className="absolute top-[20%] right-[18%] w-[25vw] h-[25vw] object-cover"
            />
          </div>
        </div>
        <div
          data-name="focus-transition-lens-macro-container"
          className="absolute inset-0 z-30 w-screen h-screen invisible opacity-0"
        >
          <img
            data-name="focus-transition-lens-macro"
            src={BASE_URL + '/assets/images/lens_macro.png'}
            alt="Focus"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-origin-center w-[100vh] h-[100vh]"
          />
        </div>
        <div
          data-name="focus-transition-end"
          className="bg-bone text-ink text-display-sm text-centers uppercase tracking-widest absolute inset-0 w-screen h-screen flex items-center justify-center z-20 invisible opacity-0"
        >
          <p>CINEMA FOCUS I VISION DETAIL</p>
        </div>
      </section>

      {/* SCENE 04 - Product Carousel (horizontal scroll) (SCENE 05 is nested inside)*/}
      <section
        id={SCENE_IDS.PRODUCT_CAROUSEL}
        className="relative w-full flex h-screen min-h-screen bg-bone text-ink overflow-hidden"
      >
        <div className="inner relative w-full py-8 h-screen min-h-screen flex flex-col">
          <h1 data-name="product-carousel-title" className="text-ink text-display-md font-bold mb-8 pl-12">
            Welcome to IRIS
          </h1>
          <div data-name="product-carousel-viewport" className="max-w-[100vw] overflow-hidden h-full grow pb-8">
            <div data-name="product-carousel-track" className="h-full pl-14 flex">
              {PRODUCT_CAROUSEL_ITEMS.map((item) => (
                <div
                  data-name="product-carousel-item"
                  key={item.id}
                  className="min-w-[50vw] h-full overflow-hidden bg-gray-400 rounded-xl mr-5 relative border "
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
          <div data-name="video-layers-inner" className="inner relative w-full h-screen grid grid-cols-2 border-b">
            <div data-name="video-layers-container" className="w-full h-full col-span-1 border-r">
              <video
                data-name="video-layers-video"
                src={BASE_URL + '/assets/videos/exposing-layers.mp4'}
                className="w-full h-full object-cover"
                muted
              />
            </div>
            <div data-name="video-layers-right-container" className="w-[49vw] h-full col-span-1 flex flex-col">
              <div data-name="video-layers-copy-container" className="px-10 py-6 border-b">
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
                  src={BASE_URL + '/assets/images/exposing_layers_poster.png'}
                  alt="Video Layers"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* SCENE 06 - Colors Gallery */}
      <section
        id={SCENE_IDS.COLORS_GALLERY}
        className="relative w-full flex h-screen min-h-screen max-h-screen bg-bone text-ink overflow-hidden"
      >
        <div data-name="colors-gallery-inner" className="inner relative w-full h-screen flex flex-col">
          <h1 className="text-ink text-center text-display-sm font-bold py-3 border-b">A Plathera of Colors.</h1>
          <div data-name="color-wheel-container" className="bg-bone grow relative overflow-hidden">
            {/* actual wheel */}
            <div
              data-name="color-wheel"
              className="absolute top-1/2 left-20 -translate-y-1/2 -translate-x-1/2 rounded-full h-[110vh] aspect-square z-20"
            >
              {COLORS.map((color) => {
                return (
                  <div
                    key={color.id + color.label}
                    className="absolute top-1/2 -translate-y-1/2 w-1/2 left-1/2 text-right pr-8 origin-[0px_50%] font-mono text-ink before:block before:w-[30%] before:h-px before:top-1/2 before:-translate-y-1/2 before:bg-ink/30 before:absolute before:left-1/5"
                  >
                    {color.label}
                  </div>
                );
              })}
            </div>

            {/* images */}
            <div data-name="color-wheel-images" className="absolute top-0 right-0 w-full h-full z-10 origin-[0px_50%]">
              {COLORS.map((color) => {
                return (
                  <div className="absolute bg-pink-400 top-0 right-0 w-full h-full z-10  origin-[0px_50%]">
                    <img className="absolute w-full h-full inset-0 object-cover" src={color.img} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full h-[60vh] p-16 bg-ink text-bone relative overflow-hidden">
        <img
          data-name="footer-product"
          src={BASE_URL + '/assets/images/footer-product.png'}
          alt="Footer"
          className="w-auto h-2/3 object-cover absolute bottom-0 right-1/12"
        />
        <div className="relative z-10 flex flex-col h-full">
          <p data-name="footer-title" className="text-bone text-display-xs font-mono opacity-80 mb-4">
            Built for the ones who care.
          </p>
          <p data-name="footer-subtitle" className="text-bone text-display-md font-bold leading-none tracking-widest">
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
