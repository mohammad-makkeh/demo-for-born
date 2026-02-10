import { DEBUG_MODE } from '../config/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { GSDevTools } from 'gsap/GSDevTools';

let initialized = false;
export const initGsap = () => {
  if (initialized) return;
  initialized = true;
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, GSDevTools);
  gsap.defaults({ duration: 0.5, ease: 'power2.out' });
  ScrollTrigger.defaults({
    markers: DEBUG_MODE,
    fastScrollEnd: 800
  });
  gsap.config({
    autoSleep: 5 * 60,
    force3D: true
  });

  ScrollTrigger.normalizeScroll(true);
  ScrollTrigger.config({
    ignoreMobileResize: true
  });
};

export const vh = (value: number) => {
  return (value * window.innerHeight) / 100;
};

export const vw = (value: number) => {
  return (value * window.innerWidth) / 100;
};

export const vmin = (value: number) => {
  return (value * Math.min(window.innerWidth, window.innerHeight)) / 100;
};

export const vmax = (value: number) => {
  return (value * Math.max(window.innerWidth, window.innerHeight)) / 100;
};

export const dvh = (value: number) => {
  return (value * document.documentElement.clientHeight) / 100;
};

export const dvw = (value: number) => {
  return (value * document.documentElement.clientWidth) / 100;
};

export const dmin = (value: number) => {
  return (value * Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight)) / 100;
};

export const dmax = (value: number) => {
  return (value * Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight)) / 100;
};
