import { DEBUG_MODE } from "../config/constants"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"

let initialized = false;
export const initGsap = () => {
    if (initialized) return;
    initialized = true;
    gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin)
    gsap.defaults({ duration: 0.5, ease: "power2.out" })
    ScrollTrigger.defaults({
        markers: DEBUG_MODE
    })
    gsap.config({
        autoSleep: 5 * 60,
        force3D: true,
    });
}
