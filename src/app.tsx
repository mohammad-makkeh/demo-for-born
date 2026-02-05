import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { initGsap } from "./utils/gsap"
import { SCENE_IDS } from "./config/constants"
import { SplitText } from "gsap/SplitText"



initGsap()
function App() {

  useGSAP(() => {
    const titleSplit = new SplitText(`#${SCENE_IDS.HERO} [data-name="hero-title"]`, { type: "chars" })
    gsap.from(titleSplit.chars, {
      ease: "power2.out",
      opacity: 0,
      y: 100,
      duration: 0.3,
      delay: 0.3,
      stagger: 0.08,
    })
    const header2 = document.querySelector(`#${SCENE_IDS.HERO} [data-name="header-2"]`);
    const productReveal = document.querySelector(`#${SCENE_IDS.HERO} #product-reveal`);
    gsap.set(productReveal, {
      y: 200,
      opacity: 0,
      scale: 0.6,
      rotate: -3,
    })
    gsap.set(header2, {
      overflow: 'hidden',
    })
    const heroTl = gsap.timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: `#${SCENE_IDS.HERO}`,
        start: "top top-=1",
        end: "+=600%",
        pin: true,
        scrub: 1,
      }
    })
    heroTl.to(`#${SCENE_IDS.HERO} [data-name="grain"]`, {
      scale: 1.2,
      duration: 2,
    }, 0)
    heroTl.fromTo(`#${SCENE_IDS.HERO} [data-name="hero-still"]`, {
      filter: 'saturate(0%)'
    }, {
      filter: 'saturate(100%)',
      duration: 1,
    }, 0)
    heroTl.to(`#${SCENE_IDS.HERO} [data-name="hero-still"]`, {
      scale: 1.2,
      duration: 0.5,
    }, "1")

    heroTl.to(titleSplit.chars, {
      ease: "power2.out",
      x: (i: number) => {
        const n = titleSplit.chars.length;
        const center = (n - 1) / 2;
        const offset = i - center;
        const direction = Math.sign(offset) || 1;
        const distance = Math.abs(offset);
        return direction * distance * 300;
      },

    }, "1")
    heroTl.to(titleSplit.chars, {
      ease: "power2.out",
      y: -400,
      stagger: 0.1,
    }, "1.5")
    heroTl.to(`#${SCENE_IDS.HERO} [data-name="hero-still"]`, {
      filter: 'grayscale(100%)',
      scale: 10,
      duration: 2,
    }, "1.5")
    heroTl.to(`#${SCENE_IDS.HERO} [data-name="growing-circle"]`, {
      scale: 1,
      duration: 2,
    }, "2")
    heroTl.to(`#${SCENE_IDS.HERO} [data-name="growing-circle"]`, {
      backgroundColor: 'white'
    }, ">-0.2").addLabel("product-reveal-start")
    heroTl.to(`#${SCENE_IDS.HERO} [data-name="fully-dotted-grid"]`, {
      opacity: 1,
      duration: 0.8,
      ease: "expo.out",
    }, "product-reveal-start+=0.2")
    heroTl.to(`#${SCENE_IDS.HERO} [data-name="dotted-grid-item-ISO"]`, {
      scrambleText: {
        text: "ISO 400",
        speed: 0.3,
      },
      duration: 0.8,
      ease: "none",
    }, "product-reveal-start+=0.2")
    heroTl.to(`#${SCENE_IDS.HERO} [data-name="dotted-grid-item-F"]`, {
      scrambleText: {
        text: "F/1.4",
        speed: 0.3,
      },
      duration: 0.8,
      ease: "none",
    }, "product-reveal-start+=0.2")
    heroTl.to(`#${SCENE_IDS.HERO} [data-name="dotted-grid-item-4k"]`, {
      scrambleText: {
        text: "4k",
        speed: 0.3,
      },
      duration: 0.8,
      ease: "none",
    }, "product-reveal-start+=0.2")
    heroTl.to(`#${SCENE_IDS.HERO} [data-name="dotted-grid-item-24p"]`, {
      scrambleText: {
        text: "24p",
        speed: 0.3,
      },
      duration: 0.8,
      ease: "none",
    }, "product-reveal-start+=0.2")
    const header2Split = new SplitText(header2, { type: "chars" });
    gsap.set(header2Split.chars, {
      y: 200,
    })
    heroTl.to(header2Split.chars,
      {
        y: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "expo.out",
      },
      "product-reveal-start+=0.3")
    heroTl.to(productReveal, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: -20,
      duration: 1.2,
      ease: "expo.out",
    }, "product-reveal-start+=0.4")
    heroTl.to(productReveal?.querySelector(`[data-name="scan-line"]`) as HTMLElement,
      { opacity: 1, ease: "none", duration: 0.1, repeat: 4, yoyo: true },
      "product-reveal-start+=0.6")
    heroTl.fromTo(productReveal?.querySelector(`[data-name="hero-product-reveal"]`) as HTMLElement,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 1.5, ease: "power2.inOut" },
      "product-reveal-start+=1")
    heroTl.to(productReveal?.querySelector(`[data-name="scan-line"]`) as HTMLElement,
      { top: "100%", duration: 1.5, ease: "power2.inOut" },
      "product-reveal-start+=1")
    heroTl.to(productReveal?.querySelector(`[data-name="scan-line"]`) as HTMLElement,
      { top: "150%", opacity: 0, duration: 0.4, ease: "power2.inOut" },
      "product-reveal-start+=2.5")
    heroTl.to(productReveal?.querySelector(`[data-name="hero-product-silhouette"]`) as HTMLElement,
      { opacity: 0, duration: 0 },
      "product-reveal-start+=2.5")
    heroTl.to(header2Split.chars,
      {
        y: '-120%',
        stagger: 0.03,
        ease: "expo.out",
      },
      "product-reveal-start+=2.5")
    heroTl.to(productReveal,
      { rotate: 0, scale: 2 },
      "product-reveal-start+=2.5")




    // SCENE 02 - CINEMA
    const cinemaStillContainer = document.querySelector(`#${SCENE_IDS.CINEMA} [data-name="cinema-still-container"]`);
    const cinemaStill = gsap.utils.toArray(`#${SCENE_IDS.CINEMA} [data-name="cinema-still"]`);
    const cinemaStillImages = gsap.utils.toArray(`#${SCENE_IDS.CINEMA} [data-name="cinema-still"] img`);
    const cinemaStillContainerWidth = cinemaStillContainer?.clientWidth || 0;
    gsap.set(cinemaStillImages, {
      width: cinemaStillContainerWidth,
      minWidth: cinemaStillContainerWidth,
    })

    const cinemaTl = gsap.timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: `#${SCENE_IDS.CINEMA}`,
        start: "top 70%",
        end: "+=100%",
        scrub: 1,
        markers: true,
      }
    })
    gsap.set(cinemaStill, {
      width: cinemaStillContainerWidth / 3,
      transformOrigin: "left center",
    })
    cinemaTl.fromTo(cinemaStill, { scaleX: 0 }, {
      scaleX: 1,
      duration: 0.2,
      ease: "none",
      stagger: 0.05,
    })
    cinemaTl.to(cinemaStillImages, {
      x: '-50%',
      ease: "none",
      stagger: 0.1,
      duration: 1
    }, ">-0.3")

    const cinemaTitle = document.querySelector(`#${SCENE_IDS.CINEMA} [data-name="cinema-title"]`);
    const cinemaSubtitle = document.querySelector(`#${SCENE_IDS.CINEMA} [data-name="cinema-subtitle"]`);
    const cinemaBody = document.querySelector(`#${SCENE_IDS.CINEMA} [data-name="cinema-body"]`);
    const cinemaBodySplit = new SplitText(cinemaBody, { type: "lines", mask: 'lines' });
    gsap.set(cinemaBody, {
      overflow: 'hidden',
    })
    gsap.set(cinemaBodySplit.lines, {
      y: 50,
    })
    gsap.set(cinemaTitle, {
      y: 200,
      opacity: 0,
    })
    gsap.set(cinemaSubtitle, {
      x: -100,
      opacity: 0,
    })
    cinemaTl.to(cinemaTitle, {
      y: 0,
      opacity: 1,
      ease: "expo.out",
    }, 0.3)
    cinemaTl.to(cinemaSubtitle, {
      x: 0,
      opacity: 1,
      ease: "expo.out",
    }, 0.4)
    cinemaTl.to(cinemaBodySplit.lines, {
      y: 0,
      ease: "expo.out",
      stagger: 0.08,
    }, 0.45)

  });





  return (
    <main className="min-h-[500vh] bg-ink text-bone">
      {/* SCENE 01 - HERO */}
      <section id={SCENE_IDS.HERO} className="relative w-full flex flex-col items-center py-12 h-screen min-h-screen bg-ink text-bone overflow-hidden">
        <img data-name="hero-still" src="/assets/images/hero_still_01.webp" alt="Hero" className="w-full h-full absolute top-0 left-0 object-cover" />
        <img data-name="grain" src="/assets/images/grain_tile.png" alt="Hero" className="w-full h-full absolute top-0 left-0 object-cover mix-blend-darken" />
        <h1 data-name="hero-title" className="text-bone text-9xl mt-20 font-bold z-10 relative">IRIS</h1>
        <div data-name="growing-circle" className="w-[120vw] h-[120vw] scale-0 bg-ink rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"></div>
        <div data-name="fully-dotted-grid" className="fully-dotted-grid opacity-0">
          <div data-name="dotted-grid-item-ISO" className="text-ink opacity-60 text-lg absolute top-8 right-10 font-mono">ISO 400</div>
          <div data-name="dotted-grid-item-F" className="text-ink opacity-60 text-lg absolute top-8 left-10 font-mono">F/1.4</div>
          <div data-name="dotted-grid-item-4k" className="text-ink opacity-60 text-lg absolute bottom-8 right-10 font-mono">4k</div>
          <div data-name="dotted-grid-item-24p" className="text-ink opacity-60 text-lg absolute bottom-8 left-10 font-mono">24p</div>
        </div>
        <h2 data-name="header-2" className="text-ink text-9xl z-10 absolute top-40 w-full text-center left-0">Open the Iris</h2>
        <div id="product-reveal" className="h-[30vh] w-[20vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <img data-name="hero-product-silhouette" src="/assets/images/product_silhouette.png" alt="Hero" className="w-full h-full absolute inset-0 object-cover z-20" />
          <img data-name="hero-product-reveal" src="/assets/images/product_reveal_front.png" alt="Hero" className="w-full h-full absolute inset-0 object-cover z-20" />
          <div data-name="scan-line" className="scan-line-glow w-[120%] h-0.5 bg-teal absolute top-0 left-1/2 -translate-x-1/2 z-20 opacity-0"></div>
        </div>
      </section>

      {/* SCENE 02 - CINEMA */}
      <section id={SCENE_IDS.CINEMA} className="relative w-full px-12 py-20 grid grid-cols-2 h-screen min-h-screen bg-ink">
        <div data-name="cinema-still-container" className="col-span-1 flex gap-4">
          <div data-name="cinema-still" className="rounded-xl overflow-hidden w-full relative">
            <img src="/assets/images/hero_still_01.webp" alt="Cinema" className="absolute top-0 left-0 bottom-0 h-full object-cover" />
          </div>
          <div data-name="cinema-still" className="rounded-xl overflow-hidden w-full relative">
            <img src="/assets/images/hero_still_02.webp" alt="Cinema" className="absolute top-0 left-0 bottom-0 h-full object-cover" />
          </div>
          <div data-name="cinema-still" className="rounded-xl overflow-hidden w-full relative">
            <img src="/assets/images/hero_still_03.webp" alt="Cinema" className="absolute top-0 left-0 bottom-0 h-full object-cover" />
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center pl-20">
          <h2 data-name="cinema-title" className="text-bone text-7xl  font-bold z-10 relative">Not content.<br /> Cinema.</h2>
          <p data-name="cinema-subtitle" className="text-bone text-lg uppercase tracking-widest font-mono opacity-60 mt-8">The difference is intention.</p>
          <p data-name="cinema-body" className="text-bone text-xl max-w-[35ch] mt-3">Lock exposure with a tap. Pull focus with your thumb. Let color stay honest when the light runs away.</p>
        </div>


      </section>


    </main >
  )
}

export default App
