# IRIS//ONE — Scrollytelling Landing Page Plan (Desktop)

## 1) ONE-LINE CONCEPT

**IRIS//ONE** — a pocket cinema camera that turns everyday moments into film; promise: “carry cinema, capture feeling”; emotional theme: **memory through light, focus, and time**.

## 2) STYLE & MOTION DIRECTION (brief but specific)

- **Typography vibe:** cinematic editorial (high-contrast serif display) + quiet utilitarian UI sans; big type, generous tracking, strict baseline rhythm.
- **Layout / grid:** 12-col grid, wide gutters; full-bleed “film frames” inside a persistent gate (rounded-rect mask + subtle perforations); copy sits on a consistent left column while imagery breathes full width.
- **Color palette mood:** near-black `#0B0B0D`, bone `#F5F2EA`, tungsten amber `#FFB25B`, cold teal `#2FB7B3` (sparingly), “print gray” `#8A8F98`; chapter-based grading shifts (cool → warm → cool → neutral).
- **Motion language rules:**
  - **Slow macro camera moves** (scale/translate drift, 6–12% ranges) + **fast micro type** (0.25–0.6s beats) for cadence.
  - **Transform-first:** translate/scale/rotate/opacity; filters only in short windows (focus chapter) and clamped.
  - **Transitions motif:** aperture/iris + film-gate wipes + light leaks (used as narrative punctuation, not constant decoration).
- **Easing philosophy:**
  - Reveals: `expo.out`, `power3.out`
  - Camera moves: `power4.inOut`
  - Scrubbed parallax: `none`
  - Snap settle: `power2.out`
- **Signature transition:** “**Zoom through the lens**” — clip-path iris closes → camera zoom ramps → iris reopens into the next chapter’s palette.

## 3) FULL PAGE MAP (A → B)

1. **`#s0-hero` — Open the Iris (Pinned):** set tone + first product glimpse. **Key visual:** dark film gate + iris opening on the camera. **Transitions into:** bright manifesto cut (hard contrast).
2. **`#s1-manifesto` — Not content. Cinema. (Flow):** brand POV + intention. **Key visual:** editorial type over a 3-frame still strip. **Transitions into:** Chapter I title slams in with shutter flicker.
3. **`#s2-ch1-light` — Chapter I: Light (Pinned):** show dynamic range + “light as emotion.” **Key visual:** tungsten leaks + highlight rolloff. **Transitions into:** iris “pre-close” framing the lens.
4. **`#s3-iris-dive` — Dive Through the Lens (Pinned, pinSpacing:false):** chapter transition. **Key visual:** macro lens + iris closes + zoom-through. **Transitions into:** cool focus world (bokeh + focus grid).
5. **`#s4-ch2-focus` — Chapter II: Focus (Pinned):** focus as decision; UI becomes tactile. **Key visual:** focus box + line-drawn grid. **Transitions into:** motion streaks + stabilization.
6. **`#s5-ch3-motion` — Chapter III: Motion (Pinned):** stabilization + shutter-angle; energy spike. **Key visual:** streak layers + velocity skew. **Transitions into:** horizontal filmstrip “toolkit”.
7. **`#s6-filmstrip` — Toolkit Filmstrip (Pinned, Horizontal):** feature gallery in cinematic rhythm. **Key visual:** 6 panels, film-perf edges, parallax inside panels. **Transitions into:** full-bleed proof section.
8. **`#s7-proof-video` — Shot on IRIS//ONE (Pinned, Video Scrub):** proof via frame-perfect scroll-scrubbed video. **Key visual:** video inside film gate expands to full bleed. **Transitions into:** calm spec recap.
9. **`#s8-specs` — Specs you feel (Pinned-short):** numbers + credibility without killing mood. **Key visual:** rolling counters + minimal icons + product still. **Transitions into:** final warm invitation.
10. **`#s9-finale` — Reserve (Pinned):** emotional close + CTA. **Key visual:** iris closes to a glowing point, spotlight cursor on CTA. **Transitions into:** credits.
11. **`#s10-footer` — Credits (Flow):** practical end state. **Key visual:** clean list + legal + links.

## 4) THE SCROLLTELLING SCRIPT (the core)

### Scene 01 — `#s0-hero` / **OPEN THE IRIS**

**Visual layout (back → front):**

1. `bgSolid` (near-black)
2. `grainOverlay` (tileable noise, subtle animated drift)
3. `vignette` (soft radial darkening)
4. `frameStillStrip` (3 faint stills, blurred, parallax)
5. `productSilhouette` (center)
6. `productReveal` (same camera image but hidden via clip-path iris)
7. `headlineBlock` (left column)
8. `ctaRow` (Reserve + Scroll hint)
9. `filmPerforationOverlay` (top/bottom perforations, 10–15% opacity)

**Exact copy:**

- **Headline:** “Open the iris.”
- **Subhead:** “Carry cinema. Capture feeling.”
- **Body:** “IRIS//ONE is a pocket cinema camera built for true 24p, honest color, and the moments you don’t get back.”
- **CTA:** Primary “Reserve the first run” · Secondary “Scroll to begin”

**User scroll behavior:**

- **Pinned** (`pin: true`), **duration:** `end: "+=240%"` (≈ 2.4 viewport lengths), **scrub:** `0.8` (slight inertia).

**Animation beats (micro-beats in order):**

- **Beat 1 (0.0s → 0.5s, label `hero:in`):** `grainOverlay` opacity `0 → 1`, background-position drift starts (time-based loop, 12s).
  - Ease: `power2.out`
- **Beat 2 (0.0s → 0.8s, `hero:typeIn`):** headline/subhead **line-mask reveal** (SplitType lines).
  - From: `yPercent: 120`, `opacity: 0`
  - To: `yPercent: 0`, `opacity: 1`
  - Duration: `0.8s`, ease `expo.out`
  - Stagger: `each: 0.08`, `from: "start"`
- **Beat 3 (0.2s → 1.0s, overlaps `"<0.2"`):** `productSilhouette` lifts in.
  - From: `y: 42`, `opacity: 0`, `scale: 1.03`
  - To: `y: 0`, `opacity: 1`, `scale: 1`
  - Duration: `0.8s`, ease `power3.out`
- **Beat 4 (0.8s → 2.0s, label `hero:irisOpen`):** **clip-path iris opens** on `productReveal` + subtle zoom settle.
  - `clip-path: circle(0% at 50% 52%) → circle(74% at 50% 52%)`
  - `productReveal` scale `1.12 → 1.0`
  - Duration: `1.2s`, ease `expo.out`
- **Beat 5 (1.4s → 2.2s, label `hero:gradeShift`):** color grade warms slightly (overlay gradient).
  - Overlay opacity `0 → 0.55`, duration `0.8s`, ease `power2.out`
- **Beat 6 (2.0s → 2.6s, label `hero:cta`):** CTA row fades + slides.
  - From: `y: 16`, `opacity: 0` → To: `y: 0`, `opacity: 1`
  - Duration: `0.6s`, ease `power3.out`

**Synchronization rules:**

- Main `tlHero` is **scroll-scrubbed**; ambient loops are **time-based**:
  - Time-based: `grainOverlay` drift (12s), `filmPerforationOverlay` subtle opacity breathing (6s yoyo).
- Labels:
  - `hero:in` starts overlays + sets initial state.
  - `hero:irisOpen` ties `productReveal` clip-path + zoom + a tiny camera shake (1–2px).
  - `hero:cta` aligns CTA reveal with grade warmth so CTA feels “earned”.

**Parallax spec:**

- `frameStillStrip` **0.18x** (slow upward drift)
- `productSilhouette` **0.35x**
- `productReveal` **0.42x**
- `filmPerforationOverlay` **0x** (locked)
- Direction change: last 20% of the scene reverses `frameStillStrip` by **-6px** to create a “pull-back” before the cut.

**Clip-path reveal spec:**

- **Shape:** `circle()`
- **Animated params:** radius `%`, center position `at x y`
- **Zoom interaction:** `productReveal` scales down as iris expands (lens “settle”)
- **Reveal target:** `productReveal` (full-detail camera image)

**Video (this scene):** Not used.

---

### Scene 02 — `#s1-manifesto` / **NOT CONTENT. CINEMA.**

**Visual layout (back → front):**

1. `bgBone` (bone white)
2. `paperTexture` (very subtle fiber)
3. `stillTriptych` (3 “film frames” with rounded gate + thin border)
4. `headlineKinetic` (large editorial type)
5. `bodyCopy` (left column)
6. `ruleLineSvg` (thin line + dot, animated draw)

**Exact copy:**

- **Headline:** “Not content. Cinema.”
- **Subhead:** “The difference is intention.”
- **Body:** “Lock exposure with a tap. Pull focus with your thumb. Let color stay honest when the light runs away.”
- **CTA:** “Keep scrolling — Chapter I: Light”

**User scroll behavior:**

- **Normal flow** (no pin). Scroll-linked animation window: `start: "top 75%"`, `end: "+=140%"`, **scrub:** `0.6`.

**Animation beats:**

- **Beat 1 (0.0s → 0.6s, label `man:headline`):** **word-pop reveal** (SplitType words).
  - From: `y: 22`, `opacity: 0`, `scale: 0.985`, `letterSpacing: 0.06em`
  - To: `y: 0`, `opacity: 1`, `scale: 1`, `letterSpacing: 0em`
  - Duration: `0.6s`, ease `power3.out`
  - Stagger: `each: 0.05`, `from: "center"`
- **Beat 2 (0.2s → 0.9s, overlaps `"<0.2"`, `man:triptych`):** triptych frames **clip-reveal** + slight parallax.
  - Each frame: `clip-path: inset(0 100% 0 0 round 28px) → inset(0 0 0 0 round 28px)`
  - Duration: `0.7s`, ease `power2.out`
  - Stagger: `each: 0.12`, `from: "start"`
- **Beat 3 (0.6s → 1.0s, `man:rule`):** SVG rule line draws left→right.
  - Duration: `0.4s`, ease `none`
- **Beat 4 (0.7s → 1.2s, `man:body`):** body copy fades in with slight y.
  - From: `y: 10`, `opacity: 0` → To: `y: 0`, `opacity: 1`
  - Duration: `0.5s`, ease `power2.out`

**Synchronization rules:**

- `tlManifesto` is scrubbed; `paperTexture` drift is time-based (20s loop).
- Labels:
  - `man:triptych` locks clip-path + border opacity so frames feel “printed” as they appear.
  - `man:rule` aligns with the end of headline pop to act like a typographic “cut”.

**Parallax spec:**

- `stillTriptych` **0.15x** (subtle vertical)
- `headlineKinetic` **0x** (locked for readability)
- `paperTexture` **time-based** (not scroll-linked)

**Clip-path reveal spec:**

- **Shape:** `inset()` with rounded corners
- **Animated params:** right inset (100% → 0%), corner radius fixed `28px`
- **Zoom interaction:** none (no scale; keeps this section calm)
- **Reveal target:** each `stillTriptych` frame

**Video (this scene):** Not used.

---

### Scene 03 — `#s2-ch1-light` / **CHAPTER I — LIGHT**

**Visual layout (back → front):**

1. `bgNightCity` (still, soft blur)
2. `hazeGradient` (cool → warm)
3. `lightLeakLayerA` (moving leak, screen blend)
4. `lightLeakLayerB` (secondary, slower)
5. `productFront` (center-right)
6. `dustParticles` (subtle, foreground)
7. `chapterTitle` (left column)
8. `specCallouts` (numbers + labels)
9. `filmGateMask` (rounded-rect clipping container)

**Exact copy:**

- **Headline:** “Chapter I — Light”
- **Subhead:** “Expose what matters.”
- **Body:** “Dual native ISO and a 14‑stop latitude keep skin soft in the dark and highlights intact in the sun.”
- **CTA:** “See the latitude”

**User scroll behavior:**

- **Pinned**, duration `end: "+=300%"`, **scrub:** `0.9`.

**Animation beats:**

- **Beat 1 (0.0s → 0.7s, label `ch1:title`):** **shutter-flicker character reveal** on “LIGHT” (SplitType chars).
  - From: `opacity: 0`, `y: 18`, `rotationZ: -3`, `filter: brightness(1.4)`
  - To: `opacity: 1`, `y: 0`, `rotationZ: 0`, `filter: brightness(1)`
  - Duration: `0.7s`, ease `power2.out`
  - Stagger: `each: 0.018`, `from: "random"`
- **Beat 2 (0.3s → 1.2s, `ch1:productIn`, overlaps `"<0.3"`):** product glides in.
  - From: `x: 64`, `opacity: 0`, `scale: 1.05`
  - To: `x: 0`, `opacity: 1`, `scale: 1`
  - Duration: `0.9s`, ease `power3.out`
- **Beat 3 (0.9s → 1.6s, `ch1:leaks`):** light leaks bloom (opacity + x drift).
  - Layer A: `opacity 0 → 0.65`, `x: -40 → 40`, duration `0.7s`, ease `none`
  - Layer B: `opacity 0 → 0.45`, `x: 30 → -30`, duration `0.7s`, ease `none`
- **Beat 4 (1.4s → 2.1s, `ch1:specs`):** **number counter** reveals (14, 2 ISO modes).
  - From: `y: 14`, `opacity: 0` → To: `y: 0`, `opacity: 1`
  - Duration: `0.7s`, ease `power2.out`
  - Stagger: `each: 0.12`, `from: "start"`
- **Beat 5 (2.1s → 2.6s, `ch1:gatePulse`):** film gate subtly tightens then relaxes (a “breath”).
  - `clip-path: inset(2% 3% 2% 3% round 28px) → inset(4% 6% 4% 6% round 32px) → inset(2% 3% 2% 3% round 28px)`
  - Total duration: `0.5s`, ease `power1.inOut`
- **Beat 6 (2.6s → 3.2s, `ch1:prepDive`):** pre-close framing for transition.
  - Gate tightens to: `inset(10% 14% 10% 14% round 36px)`
  - CTA opacity `1 → 0`
  - Duration: `0.6s`, ease `power4.inOut`

**Synchronization rules:**

- `tlCh1Light` is scrubbed; `dustParticles` float is time-based (10s loop, yoyo).
- Labels:
  - `ch1:specs` aligns with a warmer grade shift (+15% amber overlay) so the numbers feel “lit”.
  - `ch1:prepDive` begins before leaks fully fade (overlap `>-0.2`) to keep momentum into the transition.

**Parallax spec:**

- `bgNightCity` **0.08x**
- `hazeGradient` **0.18x**
- `productFront` **0.35x**
- `lightLeakLayerA` **0.70x** (dramatic)
- `dustParticles` **0.90x** (very subtle opacity, tiny movement)
- Direction: leaks drift opposite directions (A L→R, B R→L) for depth tension.

**Clip-path reveal spec:**

- **Shape:** `inset()` rounded “film gate”
- **Animated params:** insets + corner radius
- **Zoom interaction:** minimal (product scale only; gate does not scale)
- **Reveal target:** entire scene container (everything lives inside the gate)

**Video (this scene):** Not used.

---

### Scene 04 — `#s3-iris-dive` / **ZOOM THROUGH THE LENS** (Chapter Transition)

**Visual layout (back → front):**

1. `lensMacroBg` (macro still of lens glass + concentric texture)
2. `dustRadial` (tiny particles, subtle)
3. `irisPortal` (clip-path circle that becomes the transition “hole”)
4. `chapterMarker` (small: “Light → Focus”)
5. `blackMatte` (used to hide edges during extreme zoom)

**Exact copy:**

- **Headline:** “Step into the lens.”
- **Subhead:** “Focus is a decision.”
- **Body:** “Close the iris. Lose the noise. Land on the subject.”
- **CTA:** None (keep it cinematic; no buttons during transition)

**User scroll behavior:**

- **Pinned**, duration `end: "+=160%"`, **scrub:** `1.1`
- **pinSpacing:** `false` (next scene is positioned underneath to be revealed by the portal).

**Animation beats:**

- **Beat 1 (0.0s → 0.6s, label `dive:arrive`):** lens macro sharpens in.
  - From: `opacity: 0`, `scale: 1.08`, `filter: blur(10px)`
  - To: `opacity: 1`, `scale: 1`, `filter: blur(0px)`
  - Duration: `0.6s`, ease `expo.out`
- **Beat 2 (0.4s → 1.0s, label `dive:irisClose`, overlaps `"<0.4"`):** **iris closes** around the lens center.
  - `clip-path: circle(78% at 50% 50%) → circle(14% at 50% 50%)`
  - Duration: `0.6s`, ease `power4.inOut`
- **Beat 3 (0.9s → 1.7s, label `dive:zoomThrough`):** **zoom into** the portal while crossfading palettes.
  - Section scale `1 → 6.5`, rotationZ `0 → 1.5deg`, transform-origin `50% 50%`
  - `blackMatte` opacity `0 → 1` (edge safety)
  - Micro camera shake: `x/y` ±2px for `0.25s` inside this beat (tasteful)
  - Duration: `0.8s`, ease `power4.inOut`
- **Beat 4 (1.6s → 2.3s, label `dive:irisOpen`):** iris re-opens revealing Scene 05 underneath.
  - `clip-path: circle(14% at 50% 50%) → circle(130% at 52% 48%)`
  - Duration: `0.7s`, ease `expo.out`
- **Beat 5 (2.1s → 2.5s, `dive:clean`):** dissolve transition UI text.
  - `chapterMarker` opacity `1 → 0`, duration `0.4s`, ease `power2.out`

**Synchronization rules:**

- `tlIrisDive` is scrubbed.
- Palette swap happens at `dive:zoomThrough` (crossfading Scene 03 warm overlay → Scene 05 cool overlay).
- Overlap rationale: iris open starts before zoom finishes (`dive:irisOpen` at `zoomThrough>-0.1`) so it feels like you “break through” the glass.

**Parallax spec:**

- `lensMacroBg` **0.22x**
- `dustRadial` **0.85x**
- Direction change: dust subtly shifts outward during `dive:zoomThrough` (radial expansion feel).

**Clip-path reveal spec:**

- **Shape:** `circle()`
- **Animated params:** radius + center offset (slight drift to avoid static perfection)
- **Zoom interaction:** extreme section scale (1 → 6.5) synchronized with circle radius (closing then opening)
- **Reveal target:** Scene 05 (positioned below, revealed through the portal)

**Video (this scene):** Not used.

---

### Scene 05 — `#s4-ch2-focus` / **CHAPTER II — FOCUS**

**Visual layout (back → front):**

1. `bgBokehFar` (soft bokeh layer)
2. `bgBokehNear` (larger bokeh, slower)
3. `subjectStill` (portrait/product-in-use still)
4. `focusBoxUI` (rect + corner brackets)
5. `focusGridSvg` (line draw overlay)
6. `chapterTitle` (left column)
7. `focusRingDial` (small circular UI)
8. `spotlightCursor` (subtle, only when section is dark enough)

**Exact copy:**

- **Headline:** “Chapter II — Focus”
- **Subhead:** “Hold the subject. Let the world drift.”
- **Body:** “Magnetic AF with manual override—tuned for human hands, not menus.”
- **CTA:** “See focus modes”

**User scroll behavior:**

- **Pinned**, duration `end: "+=260%"`, **scrub:** `0.8`.

**Animation beats:**

- **Beat 1 (0.0s → 0.6s, label `ch2:title`):** **kinetic typography** on headline (SplitType words).
  - “Chapter II” slides in from `x: -40 → 0`, `opacity 0 → 1`
  - “Focus” words stagger with alternating directions:
    - Word odd: `x: -28 → 0`
    - Word even: `x: 28 → 0`
  - Duration: `0.6s`, ease `power3.out`, stagger `each: 0.06`, `from: "start"`
- **Beat 2 (0.4s → 1.1s, label `ch2:boxIn`, overlaps `"<0.4"`):** focus box pops into place.
  - From: `scale: 0.86`, `opacity: 0`
  - To: `scale: 1`, `opacity: 1`
  - Duration: `0.7s`, ease `back.out(1.6)`
- **Beat 3 (0.7s → 1.3s, label `ch2:gridDraw`):** focus grid SVG line-draw (strokeDashoffset).
  - Duration: `0.6s`, ease `power1.inOut`
- **Beat 4 (1.0s → 2.0s, label `ch2:dof`):** depth-of-field focus shift (short window).
  - `bgBokehFar` blur `18px → 8px`
  - `subjectStill` blur `6px → 0px`, contrast `1.0 → 1.08`
  - Duration: `1.0s`, ease `power2.out`
- **Beat 5 (1.8s → 2.5s, label `ch2:manual`):** focus ring dial rotates + tick labels reveal.
  - Dial rotation `-25deg → 90deg`, duration `0.7s`, ease `power3.inOut`
  - Tick labels stagger: `opacity 0 → 1`, `y 6 → 0`, stagger `0.04`
- **Beat 6 (2.4s → 3.0s, label `ch2:exit`):** UI elements soften out to prep motion chapter.
  - Grid opacity `1 → 0`, duration `0.6s`, ease `power2.inOut`

**Synchronization rules:**

- `tlCh2Focus` is scrubbed; `spotlightCursor` follows pointer **time-based** only while this scene is active (enabled onEnter, disabled onLeave).
- Labels:
  - `ch2:dof` is a bounded segment (avoid long blur scrubs; keep it intentional and short).
  - `ch2:manual` overlaps the tail of `ch2:dof` (`manual` at `dof>-0.2`) so focus feels continuous, not stepped.

**Parallax spec:**

- `bgBokehFar` **0.06x**
- `bgBokehNear` **0.14x**
- `subjectStill` **0.32x**
- `focusGridSvg` **0.52x**
- `focusBoxUI` **0x** (stays locked; it’s a “tool”)

**Clip-path reveal spec:**

- **Shape:** `inset()` (focus-window motif)
- **Animated params:** `subjectStill` mask expands
  - From: `inset(32% 28% 32% 28% round 18px)`
  - To: `inset(0% 0% 0% 0% round 24px)`
- **Zoom interaction:** subtle `subjectStill` scale `1.06 → 1.0` during mask expansion
- **Reveal target:** `subjectStill` (feels like “finding” focus)

**Video (this scene):** Not used.

---

### Scene 06 — `#s5-ch3-motion` / **CHAPTER III — MOTION**

**Visual layout (back → front):**

1. `bgStreakFar` (soft streaks)
2. `bgStreakMid` (stronger streaks)
3. `bgStreakNear` (foreground streaks)
4. `productSide` (camera profile)
5. `shutterDialUI` (semi-circular dial + numbers)
6. `chapterTitle` (left column)
7. `speedLinesSvg` (minimal line accents)
8. `grainOverlay` (slightly stronger here)

**Exact copy:**

- **Headline:** “Chapter III — Motion”
- **Subhead:** “Stabilize the rush.”
- **Body:** “5‑axis hybrid stabilization and shutter‑angle control keep movement cinematic—not chaotic.”
- **CTA:** “Feel the glide”

**User scroll behavior:**

- **Pinned**, duration `end: "+=220%"`, **scrub:** `0.6` (snappier, more energetic).

**Animation beats:**

- **Beat 1 (0.0s → 0.5s, label `ch3:title`):** headline **slam-in** (SplitType chars).
  - From: `y: 24`, `opacity: 0`, `skewY: 6`
  - To: `y: 0`, `opacity: 1`, `skewY: 0`
  - Duration: `0.5s`, ease `power3.out`
  - Stagger: `each: 0.012`, `from: "start"`
- **Beat 2 (0.2s → 1.4s, label `ch3:streaks`, overlaps `"<0.2"`):** streak layers translate horizontally (counter-motion depth).
  - Far: `xPercent: -6 → 6` (0.15x feel), ease `none`
  - Mid: `xPercent: -14 → 14` (0.35x feel), ease `none`
  - Near: `xPercent: 22 → -22` (0.80x feel), ease `none` (opposite direction)
- **Beat 3 (0.9s → 1.7s, label `ch3:dial`):** shutter dial rotates + angle number rolls.
  - Dial rotation `0deg → 160deg`, duration `0.8s`, ease `power3.inOut`
  - Number counter (scroll-linked): `90° → 180° → 90°` (emphasize “cinema”)
- **Beat 4 (1.2s → 2.0s, label `ch3:stabilize`):** stabilization “settle” micro-shake to stillness.
  - `productSide` starts with micro jitter ±3px, decays to 0 (0.8s), ease `expo.out`
- **Beat 5 (1.8s → 2.4s, label `ch3:handoff`):** film perforation edges fade in to foreshadow filmstrip section.
  - Opacity `0 → 1`, duration `0.6s`, ease `power2.out`

**Synchronization rules:**

- `tlCh3Motion` scrubbed.
- **Velocity-based skew (polish):** on `ScrollTrigger.onUpdate`, use `getVelocity()` to drive `skewX` on `bgStreakNear` (clamp ±10deg) and ease back to 0 within 0.2s.
- Overlap rationale: streak movement begins before title completes to feel like motion is already happening.

**Parallax spec:**

- `bgStreakFar` **0.15x**
- `bgStreakMid` **0.35x**
- `bgStreakNear` **0.80x** + velocity skew
- `productSide` **0.28x**
- Direction change: foreground streaks move opposite the background (counter-motion depth).

**Clip-path reveal spec:**

- **Shape:** `polygon()` diagonal wipe (handoff into filmstrip)
- **Animated params:** right-edge diagonal advances
  - From: `polygon(0 0, 100% 0, 92% 100%, 0 100%)`
  - To: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`
- **Zoom interaction:** none (keep energy on streaks)
- **Reveal target:** transition matte that introduces the film perforations

**Video (this scene):** Not used.

---

### Scene 07 — `#s6-filmstrip` / **TOOLKIT FILMSTRIP** (Horizontal Scroll)

**Visual layout (back → front):**

1. `bgDeep` (dark, subtle gradient)
2. `filmPerfTopBottom` (perforations, static)
3. `track` (horizontal container)
   - `panel[1..6]` each with: `panelBg`, `panelFg`, `panelType`, `panelUI`
4. `sectionTitle` (left column overlay, stays pinned)
5. `progressTicks` (small markers for panels 1–6)

**Exact copy:**

- **Headline:** “Tools, frame by frame.”
- **Subhead:** “Scroll the filmstrip.”
- **Body:** “Six tools you’ll reach for without thinking—each one a small decision that makes the story cleaner.”
- **CTA:** “Jump to proof”

**User scroll behavior:**

- **Pinned**, horizontal mapped to vertical scroll.
- Duration: `end: () => "+=" + (track.scrollWidth - window.innerWidth)` (≈ `+=9000` on a 1440px-wide layout with 6 panels).
- **scrub:** `0.5`
- **snap:** to panels (either `snap: 1/(6-1)` or label-based snap).

**Animation beats (ordered across panels):**

- **Beat 1 (enter, label `strip:in`):** title line-mask reveal (lines) + progress ticks fade in.
  - Duration `0.6s`, ease `power3.out`, stagger `0.08`
- **Beat 2 (scroll-driven, `strip:pan`):** `track` translateX `0 → -maxX`, ease `none`.
- **Beat 3 (at each panel label `strip:pN`):** panel type reveals (word stagger) + micro UI motion (see Section 6 for panel details).
  - Duration per panel: `0.35–0.6s` micro-bursts
- **Beat 4 (exit, label `strip:out`):** perforations dim and background gradient warms slightly (handoff to video proof).

**Synchronization rules:**

- Main `tlFilmstrip` is scrubbed; per-panel micro interactions are nested at labels (`strip:p1`…`strip:p6`) and are **time-shaped** inside the scrubbed timeline (short bursts so they feel intentional).
- Snap aligns to labels:
  - `strip:p1`..`strip:p6` are the only snap points (prevents “half-panel” resting).

**Parallax spec (inside horizontal panels):**

- Per panel:
  - `panelBg` moves at **0.25x** of the track translation (slower)
  - `panelFg` moves at **0.65x** (faster)
  - `panelType` moves at **0x** (locked to panel)
- Direction: `panelBg` drifts opposite to `panelFg` by ±18px for depth.

**Clip-path reveal spec:**

- **Shape:** `inset()` rounded “film frame” per panel
- **Animated params:** slight “breathing” on active panel
  - Idle: `inset(6% 7% 6% 7% round 28px)`
  - Active: `inset(4% 5% 4% 5% round 30px)`
- **Zoom interaction:** active panel scales `1.0 → 1.03` (subtle)
- **Reveal target:** panel content (keeps everything inside a cinematic gate)

**Video (this scene):** Not used.

---

### Scene 08 — `#s7-proof-video` / **SHOT ON IRIS//ONE** (Scroll-Scrubbed Video)

**Visual layout (back → front):**

1. `videoPoster` (static image while loading)
2. `proofVideo` (full-bleed background, muted)
3. `gradeOverlay` (subtle LUT-like gradient)
4. `copyOverlay` (headline + subhead + body)
5. `timecode` (00:00–00:10)
6. `downloadCTA` (small button)
7. `filmGateMatte` (clip-path mask that expands)

**Exact copy:**

- **Headline:** “Shot on IRIS//ONE.”
- **Subhead:** “Scrub the moment.”
- **Body:** “Scroll controls playback—frame-perfect from 00:00 to 00:10. Hold to feel the cut.”
- **CTA:** “Download sample clips”

**User scroll behavior:**

- **Pinned**, duration `end: "+=240%"`, **scrub:** `0.35` (keeps video responsive without jitter).

**Animation beats:**

- **Beat 1 (0.0s → 0.7s, label `vid:gateOpen`):** video revealed via **rounded-rect gate** that expands + zoom settles.
  - `filmGateMatte` clip-path:
    - From: `inset(22% 18% 22% 18% round 34px)`
    - To: `inset(0% 0% 0% 0% round 0px)`
  - `proofVideo` scale `1.08 → 1.0`
  - Duration: `0.7s`, ease `expo.out`
- **Beat 2 (0.4s → 1.0s, label `vid:typeIn`, overlaps `"<0.4"`):** copy overlay line-mask reveal.
  - Duration: `0.6s`, ease `power3.out`, stagger `0.08`
- **Beat 3 (scroll-driven, label `vid:scrub`):** **video currentTime mapped to scroll progress** with 2 “hold” beats.
  - Segment A: `0.0s → 2.4s`
  - Hold 1: stay at `2.4s` (short pause for the first caption)
  - Segment B: `2.4s → 6.8s`
  - Hold 2: stay at `6.8s` (pause for second caption)
  - Segment C: `6.8s → 10.0s`
- **Beat 4 (near end, label `vid:fadeOut`):** copy dims and grade cools back toward neutral.
  - Copy opacity `1 → 0`, duration `0.6s`, ease `power2.inOut`

**Synchronization rules:**

- `tlProofVideo` scrubbed.
- `timecode` updates are tied to the same labels as video segments:
  - `vid:scrubA`, `vid:hold1`, `vid:scrubB`, `vid:hold2`, `vid:scrubC`
- Holds are implemented as timeline segments with constant `currentTime` (no interpolation) so the user “rests” on key frames.

**Parallax spec:**

- `gradeOverlay` **0.10x** (subtle drift)
- `copyOverlay` **0x** (locked)
- `timecode` **0x**

**Clip-path reveal spec:**

- **Shape:** `inset()` rounded-rect → full-bleed
- **Animated params:** insets + radius (34px → 0px)
- **Zoom interaction:** simultaneous video scale settle (1.08 → 1.0)
- **Reveal target:** `proofVideo` (starts as “film frame”, becomes immersive)

**Video (used):**

- **Role:** background proof reel (muted), with overlay text and timecode.
- **Scroll-to-time mapping:** scroll progress `0..1` maps to `0..10.0s` via segmented keyframes (A/Hold/B/Hold/C).
- **Hold moments:** at **2.4s** and **6.8s** (caption beats).
- **Transition into/out of video:** enters via gate expansion + zoom settle; exits via copy fade + grade neutralization.
- **Poster + loading strategy:**
  - Use a matching **poster frame** (`videoPoster`) that is visually identical to frame at `t=0.0s`.
  - Show poster until `loadedmetadata` + first frame ready; then fade poster `opacity 1 → 0` over `0.25s`.
  - After metadata, set `currentTime = 0.0`, call `ScrollTrigger.refresh()` so durations are correct.
  - If video fails to load: keep poster and replace scrubbed playback with subtle parallax + captions (same timeline labels).

---

### Scene 09 — `#s8-specs` / **SPECS YOU FEEL**

**Visual layout (back → front):**

1. `bgBone` (bone white)
2. `gridLines` (faint, 12-col overlay)
3. `productStillTop` (large still, right side)
4. `specList` (left column)
5. `iconRow` (minimal monoline icons)
6. `microGrain` (very subtle)

**Exact copy:**

- **Headline:** “Specs that disappear in use.”
- **Subhead:** “Because the story is the point.”
- **Body:** “True 24p. 14 stops. Built-in grade. Pro audio. All inside a camera that fits your jacket.”
- **CTA:** “See full spec sheet”

**User scroll behavior:**

- **Pinned (short)**, duration `end: "+=160%"`, **scrub:** `0.7`.

**Animation beats:**

- **Beat 1 (0.0s → 0.6s, label `spec:in`):** headline line-mask reveal.
  - Duration `0.6s`, ease `power3.out`, stagger `0.08`
- **Beat 2 (0.3s → 1.1s, label `spec:numbers`, overlaps `"<0.3"`):** **scroll-synced counters** roll in.
  - `14` (stops), `24` (fps), `2` (dual ISO), `48kHz` (audio)
  - Each counter: `opacity 0 → 1`, `y 10 → 0`, duration `0.5s`, ease `power2.out`
  - Stagger: `0.1`
- **Beat 3 (0.9s → 1.5s, label `spec:icons`):** icon strokes draw (SVG strokeDashoffset).
  - Duration `0.6s`, ease `power1.inOut`
- **Beat 4 (1.4s → 2.0s, label `spec:cta`):** CTA appears with magnetic hover enabled.
  - From `opacity 0, y 10` → `opacity 1, y 0`, duration `0.6s`, ease `power2.out`

**Synchronization rules:**

- `tlSpecs` scrubbed.
- Counter values are tied to label ranges:
  - `spec:numbers` range maps to `0% → 100%` of each number (no time-based counting; truly scroll-driven).

**Parallax spec:**

- `productStillTop` **0.22x**
- `gridLines` **0.06x**
- `specList` **0x**

**Clip-path reveal spec:**

- **Shape:** none (static)
- **Animated params:** `clip-path: inset(0 0 0 0 round 0)` throughout
- **Zoom interaction:** none
- **Reveal target:** N/A

**Video (this scene):** Not used.

---

### Scene 10 — `#s9-finale` / **RESERVE THE FIRST RUN**

**Visual layout (back → front):**

1. `bgDeep` (near-black)
2. `grainOverlay` (slightly stronger than hero)
3. `warmHalo` (tungsten radial glow behind product)
4. `productSilhouette` (center, smaller)
5. `ctaStack` (headline + subhead + buttons)
6. `spotlightCursor` (subtle, only on buttons/halo)
7. `irisCloseMatte` (clip-path circle that closes to end)

**Exact copy:**

- **Headline:** “Reserve the first run.”
- **Subhead:** “Make life feel like film.”
- **Body:** “Ships May 2026. Limited to 5,000 units. Founder’s color pack included.”
- **CTA:** Primary “Reserve now” · Secondary “Get the deck (PDF)”

**User scroll behavior:**

- **Pinned**, duration `end: "+=200%"`, **scrub:** `0.9`.

**Animation beats:**

- **Beat 1 (0.0s → 0.7s, label `fin:in`):** CTA stack line-mask reveal + halo blooms.
  - Halo opacity `0 → 0.75`, scale `0.9 → 1.05`, duration `0.7s`, ease `expo.out`
  - Text lines: `yPercent 120 → 0`, stagger `0.07`, duration `0.7s`
- **Beat 2 (0.6s → 1.2s, label `fin:buttons`):** buttons pop with **magnetic hover** enabled.
  - From: `y: 12`, `opacity: 0`, `scale: 0.98`
  - To: `y: 0`, `opacity: 1`, `scale: 1`
  - Duration: `0.6s`, ease `power3.out`
- **Beat 3 (1.3s → 2.2s, label `fin:irisClose`):** iris closes to a glowing point (ending punctuation).
  - `clip-path: circle(130% at 50% 50%) → circle(0% at 50% 50%)`
  - Simultaneous: halo opacity `0.75 → 0`, duration `0.9s`, ease `power4.inOut`

**Synchronization rules:**

- `tlFinale` scrubbed.
- `spotlightCursor` time-based (enabled only while finale is active).
- `fin:irisClose` begins after CTA is fully readable (no overlap with initial reveal).

**Parallax spec:**

- `warmHalo` **0.14x**
- `productSilhouette` **0.30x**
- `ctaStack` **0x**

**Clip-path reveal spec:**

- **Shape:** `circle()`
- **Animated params:** radius (130% → 0%)
- **Zoom interaction:** none (pure “close”)
- **Reveal target:** `bgDeep` (closing to black)

**Video (this scene):** Not used.

---

### Scene 11 — `#s10-footer` / **CREDITS**

**Visual layout (back → front):**

1. `bgBone`
2. `creditsGrid` (columns: Product, Support, Social, Legal)
3. `microType` (small print)

**Exact copy:**

- **Headline:** “Credits”
- **Subhead:** “Built for the ones who notice light.”
- **Body:** “IRIS Labs · Color science, optics, and sound—designed in-house.”
- **CTA:** Links: “Support”, “Privacy”, “Terms”, “Instagram”, “Vimeo”

**User scroll behavior:**

- **Normal flow**, subtle reveal window `start: "top 80%"`, `end: "+=90%"`, scrub `0.4`.

**Animation beats:**

- **Beat 1:** columns fade/slide in (`y: 10 → 0`, `opacity: 0 → 1`, duration `0.5s`, ease `power2.out`, stagger `0.08`).

**Synchronization rules:**

- No pinned behavior; keep it calm and readable.

**Parallax spec:**

- None (all **0x**; readability > motion).

**Clip-path reveal spec:**

- None (static `clip-path: inset(0 0 0 0 round 0)`).

**Video (this scene):** Not used.

## 5) MASTER TIMELINE & SCROLLTRIGGER ARCHITECTURE

### Global setup

- **Smooth scrolling assumption:** **Yes (desktop)** via Lenis-style smooth scroll _or_ native scroll if you want simplicity.
  - Use Lenis: use `lenis.on("scroll", ScrollTrigger.update)` and `requestAnimationFrame(lenis.raf)`; call `ScrollTrigger.refresh()` after assets load.
- **Global overlays:** `grainOverlay`, `vignette`, and optional `colorGradeOverlay` live once at app root; individual scenes drive their opacity via CSS variables or GSAP.

### Section timelines (one per scene)

- `tlHero` (Scene 01) — pinned, scrub `0.8`
- `tlManifesto` (Scene 02) — flow, scrub `0.6`
- `tlCh1Light` (Scene 03) — pinned, scrub `0.9`
- `tlIrisDive` (Scene 04) — pinned, **pinSpacing:false**, scrub `1.1`
- `tlCh2Focus` (Scene 05) — pinned, scrub `0.8`
- `tlCh3Motion` (Scene 06) — pinned, scrub `0.6` + velocity skew
- `tlFilmstrip` (Scene 07) — pinned horizontal, scrub `0.5` + snap
- `tlProofVideo` (Scene 08) — pinned video scrub, scrub `0.35`
- `tlSpecs` (Scene 09) — pinned short, scrub `0.7`
- `tlFinale` (Scene 10) — pinned, scrub `0.9`
- `tlFooter` (Scene 11) — flow, scrub `0.4`

### Pseudo-code skeleton (to remove ambiguity; not full code)

```js
// Scene pattern (repeat per section)
const tlScene = gsap.timeline({
  defaults: { ease: "none" },
  scrollTrigger: {
    trigger: "#sX-id",
    start: "top top",
    end: "+=240%",
    scrub: 0.8,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  },
});

tlScene.addLabel("scene:in").addLabel("scene:beatA").addLabel("scene:beatB");
```

### How they connect

- **Separate ScrollTriggers per scene** for maintainability.
- **Transitions between scenes** rely on:
  - consistent “film gate” motif (clip-path inset)
  - **z-index stacking** on transition scenes
  - Scene 04 uses **pinSpacing:false** so Scene 05 is physically underneath and revealed through the iris portal.

### PinSpacing decisions

- `pinSpacing: true` for Scenes 01, 03, 05, 06, 07, 08, 09, 10 (keeps layout predictable).
- `pinSpacing: false` for Scene 04 only (overlap reveal into Scene 05).

### Scrub values (why)

- `0.8–1.1` for contemplative moments (hero, light, transition) → feels cinematic and weighty.
- `0.5–0.6` for energetic chapters (motion, horizontal) → stays responsive.
- `0.35` for video → prevents lag and keeps frame sync stable.

### anticipatePin usage

- Default `anticipatePin: 1` globally.
- Increase to `2` on heavy pinned scenes (07, 08) to minimize jumps.

### Snapping strategy

- **Only** in horizontal filmstrip:
  - snap to panel labels `strip:p1..strip:p6` (prevents awkward half-panel stops).
  - duration clamp: `{ min: 0.15, max: 0.45 }` with `power2.out`.
- No global snap on the vertical narrative (keeps the story fluid).

### Performance notes (non-negotiables)

- Use `transform`/`opacity` for >90% of motion; keep `filter` limited to Scene 05 and short windows.
- Apply `will-change: transform, opacity, clip-path` only while a scene is active; remove on leave to avoid memory bloat.
- Prefer single large layers over many small DOM nodes; keep dust/leaks as videos or a few sprites, not hundreds of elements.
- Avoid layout thrash: never animate top/left/width/height; rely on transforms and clip-path only.
- Call `ScrollTrigger.refresh()` after:
  - fonts loaded
  - video metadata loaded
  - images decoded (or after a short debounce)

### Label map (explicit)

- `tlHero`: `hero:in` (overlays on) · `hero:typeIn` (headline lines) · `hero:irisOpen` (circle reveal) · `hero:gradeShift` (warmth) · `hero:cta`
- `tlManifesto`: `man:headline` · `man:triptych` · `man:rule` · `man:body`
- `tlCh1Light`: `ch1:title` · `ch1:productIn` · `ch1:leaks` · `ch1:specs` · `ch1:gatePulse` · `ch1:prepDive`
- `tlIrisDive`: `dive:arrive` · `dive:irisClose` · `dive:zoomThrough` · `dive:irisOpen` · `dive:clean`
- `tlCh2Focus`: `ch2:title` · `ch2:boxIn` · `ch2:gridDraw` · `ch2:dof` · `ch2:manual` · `ch2:exit`
- `tlCh3Motion`: `ch3:title` · `ch3:streaks` · `ch3:dial` · `ch3:stabilize` · `ch3:handoff`
- `tlFilmstrip`: `strip:in` · `strip:p1` · `strip:p2` · `strip:p3` · `strip:p4` · `strip:p5` · `strip:p6` · `strip:out`
- `tlProofVideo`: `vid:gateOpen` · `vid:typeIn` · `vid:scrubA` · `vid:hold1` · `vid:scrubB` · `vid:hold2` · `vid:scrubC` · `vid:fadeOut`
- `tlSpecs`: `spec:in` · `spec:numbers` · `spec:icons` · `spec:cta`
- `tlFinale`: `fin:in` · `fin:buttons` · `fin:irisClose`

### Scene duration map (% of total scroll) + pacing rationale

- **10% — Scene 01 (Hero):** slow inhale, establish language.
- **6% — Scene 02 (Manifesto):** quick contrast + intent.
- **15% — Scene 03 (Light):** longest emotional chapter; warmth + credibility.
- **5% — Scene 04 (Iris Dive):** fast, cinematic chapter cut.
- **13% — Scene 05 (Focus):** tactile UI + restrained filter moment.
- **9% — Scene 06 (Motion):** energy spike; shorter to avoid fatigue.
- **18% — Scene 07 (Horizontal Filmstrip):** feature tour with controlled snap rhythm.
- **10% — Scene 08 (Video Proof):** proof, but don’t overstay; keep it tight.
- **6% — Scene 09 (Specs):** credibility recap, fast and clean.
- **5% — Scene 10 (Finale CTA):** decisive close, no wandering.
- **3% — Scene 11 (Footer):** calm landing.

## 6) HORIZONTAL SECTION SPEC (must be detailed)

### Structure

- **Panels:** 6 (full-viewport width each, `100vw` panels inside a `track`).
- **Pinned container:** `#s6-filmstrip` pins; the `track` translates left.

### Panel-by-panel (copy, visual, micro-interaction)

**Panel 1 — “One-thumb Focus”**

- **Copy:** Headline “One-thumb focus.” Sub “Pull focus like you mean it.” Body “Drag the focus ring. Tap to lock. No menus.”
- **Visual:** close-up still of thumb on focus ring + UI brackets.
- **Micro-interaction:** focus brackets “snap” shut as panel centers (scale 1.15→1, opacity 0→1, 0.35s, `back.out(1.8)`).

**Panel 2 — “Dual Native ISO”**

- **Copy:** Headline “Dual native ISO.” Sub “Clean shadows, calm highlights.” Body “Switch profiles without changing the mood.”
- **Visual:** split still: night street vs daylight; a vertical divider.
- **Micro-interaction:** divider slides across 30%→70% as you progress through the panel; small numbers tick (ISO 800 ↔ 3200).

**Panel 3 — “Built‑in Grade”**

- **Copy:** Headline “A grade you can feel.” Sub “Skin stays human.” Body “Film curves baked in—editable, not destructive.”
- **Visual:** same still with before/after grade overlays.
- **Micro-interaction:** grade intensity slider fills as panel centers (0→100%); overlay opacity maps to progress with `ease: none`.

**Panel 4 — “Stabilization”**

- **Copy:** Headline “Stabilize the rush.” Sub “Float, don’t wobble.” Body “Hybrid stabilization + horizon lock.”
- **Visual:** handheld walking still + a stabilization grid.
- **Micro-interaction:** grid wobbles then settles to perfect alignment (decay motion) when the panel snaps in.

**Panel 5 — “Pro Audio”**

- **Copy:** Headline “Pro audio, quietly.” Sub “48kHz, no drama.” Body “Auto wind-cut, manual gain, clean preamps.”
- **Visual:** minimal waveform + mic icon.
- **Micro-interaction:** SVG waveform line draws across (0.6s) and pulses at 2–3 beats (time-based loop) while panel is active.

**Panel 6 — “Share & Archive”**

- **Copy:** Headline “Export like a reel.” Sub “Clean files. Clean endings.” Body “Instant proxies. Full-res masters. One button.”
- **Visual:** file stack + film strip icon.
- **Micro-interaction:** progress bar fills to 100% as you leave the panel; on exit, it “prints” a tiny timecode stamp in the corner.

### Mapping: vertical scroll → translateX

- Compute:
  - `maxX = track.scrollWidth - window.innerWidth`
- Core tween (scrubbed):
  - `track.x: 0 → -maxX` with `ease: "none"`
- ScrollTrigger:
  - `trigger: "#s6-filmstrip"`
  - `start: "top top"`
  - `end: () => "+=" + maxX`
  - `pin: true`
  - `scrub: 0.5`

### Snapping points (recommended: label-based)

- Snap to labels at each panel center:
  - `strip:p1..strip:p6`
- Snap configuration:
  - `snapTo`: nearest label progress
  - `duration`: `0.15–0.45`
  - `ease`: `power2.out`

### Parallax inside the horizontal section

- Inside each panel:
  - `panelBg` x shift: `-18px → 18px` (0.25x feel)
  - `panelFg` x shift: `-42px → 42px` (0.65x feel)
  - Optional vertical drift: `panelBg` `y: -8 → 8` across the whole section (0.1x)
- Implementation note (architecture-level): use `containerAnimation: tlFilmstrip` for internal triggers so parallax and micro-interactions key off panel positions (not the window scroll).

### Horizontal timeline pseudo-structure (labels + snap)

```js
const maxX = () => track.scrollWidth - window.innerWidth;

const tlFilmstrip = gsap.timeline({
  scrollTrigger: {
    trigger: "#s6-filmstrip",
    start: "top top",
    end: () => "+=" + maxX(),
    pin: true,
    scrub: 0.5,
    anticipatePin: 2,
    snap: {
      snapTo: panelSnapPoints, // derived from labels strip:p1..strip:p6
      duration: { min: 0.15, max: 0.45 },
      ease: "power2.out",
    },
  },
});

tlFilmstrip
  .to(track, { x: () => -maxX(), ease: "none" }, 0)
  .addLabel("strip:p1")
  .addLabel("strip:p2")
  .addLabel("strip:p3")
  .addLabel("strip:p4")
  .addLabel("strip:p5")
  .addLabel("strip:p6");
```

### Video scrub pseudo-structure (segmented holds)

```js
const tlVideo = gsap.timeline({
  scrollTrigger: {
    trigger: "#s7-proof-video",
    start: "top top",
    end: "+=240%",
    pin: true,
    scrub: 0.35,
    anticipatePin: 2,
  },
});

tlVideo
  .addLabel("vid:gateOpen")
  .to(filmGateMatte, {
    clipPath: "inset(0% 0% 0% 0% round 0px)",
    ease: "expo.out",
    duration: 0.7,
  })
  .addLabel("vid:scrubA")
  .to(video, { currentTime: 2.4, ease: "none", duration: 0.35 })
  .addLabel("vid:hold1")
  .to(video, { currentTime: 2.4, ease: "none", duration: 0.12 })
  .addLabel("vid:scrubB")
  .to(video, { currentTime: 6.8, ease: "none", duration: 0.55 })
  .addLabel("vid:hold2")
  .to(video, { currentTime: 6.8, ease: "none", duration: 0.12 })
  .addLabel("vid:scrubC")
  .to(video, { currentTime: 10.0, ease: "none", duration: 0.35 });
```

## 7) ASSET LIST (production-like)

### Core imagery

- `hero_still_01.webp` — Image, **3200×1800** (16:9), Scene 01/02 background still strip.
- `hero_still_02.webp` — Image, **3200×1800** (16:9), Scene 01/02 background still strip.
- `hero_still_03.webp` — Image, **3200×1800** (16:9), Scene 01/02 background still strip.
- `product_silhouette.png` — Image w/ alpha, **2000×2000**, Scene 01 + Scene 10.
- `product_reveal_front.webp` — Image, **2600×2600**, Scene 01 reveal layer.
- `ch1_city_night.webp` — Image, **3200×1800**, Scene 03 background.
- `ch1_product_front.webp` — Image, **2600×2600**, Scene 03 product.
- `lens_macro.webp` — Image, **3200×1800**, Scene 04 background.
- `ch2_bokeh_far.png` — Image w/ alpha, **3200×1800**, Scene 05 background layer A.
- `ch2_bokeh_near.png` — Image w/ alpha, **3200×1800**, Scene 05 background layer B.
- `ch2_subject_still.webp` — Image, **3200×1800**, Scene 05 subject still.
- `ch3_streak_far.png` — Image w/ alpha, **3200×1800**, Scene 06 streak layer.
- `ch3_streak_mid.png` — Image w/ alpha, **3200×1800**, Scene 06 streak layer.
- `ch3_streak_near.png` — Image w/ alpha, **3200×1800**, Scene 06 foreground streak layer.
- `filmstrip_panel_01.webp` … `filmstrip_panel_06.webp` — Images, **2800×1800** each, Scene 07 panels.
- `specs_product_still.webp` — Image, **3200×1800**, Scene 09 product.

### Video

- `proof_reel.mp4` — Video, **2560×1440** (or 1920×1080), **10.0s**, H.264, 24fps, Scene 08 scroll-scrubbed background.
- `proof_reel_poster.png` — Image, **2560×1440**, Scene 08 poster (frame at t=0.0).
- `light_leak_loop.mp4` — Video overlay, **1920×1080**, **6–8s loop**, Scenes 03 (optional, can replace png layers).

### SVG / UI assets

- `film_perforations.svg` — SVG, full-width, Scenes 01/07.
- `focus_grid.svg` — SVG, 1000×1000 viewBox, Scene 05 line draw.
- `icons_monoline.svg` — SVG set, Scene 09 icons (stroke-based, rounded caps).

### Textures / overlays

- `grain_tile.png` — Texture, **1024×1024** tileable, global overlay.
- `dust_specks.png` — Texture w/ alpha, **2048×2048** tileable, Scenes 03/04.
- `vignette.png` — Texture, **2048×2048**, global.
- `halation_overlay.png` — Texture, **2048×2048**, warm edge glow (Scenes 03/10).

### Audio cues (described only; optional to implement)

- `shutter_click.wav` — 0.2s, used at chapter title reveals (Scenes 03/05/06).
- `film_reel_loop.mp3` — subtle loop, active only in horizontal filmstrip (Scene 07).
- `soft_whoosh.wav` — 0.4s, iris dive transition (Scene 04).

### Fonts (max 2)

- **Display:** `PP Editorial New` (or equivalent high-contrast serif) — headings, chapter titles. Find in `/public/fonts`
- **UI/Body:** `Inter` — body copy, labels, buttons, timecode.

### Icon style direction

- Minimal monoline icons, rounded caps, 1.5px stroke at 1440px artboard, no fills, “instrument panel” vibe. Use lucid icons (lucide-react) is installed

## 8) QA CHECKLIST (must be concrete)

1. Verify every ScrollTrigger `start/end` matches the plan for each scene (no silent defaults).
2. Confirm pinned scenes don’t “jump” on refresh; tune `anticipatePin` (especially Scenes 07–08).
3. Validate Scene 04 `pinSpacing:false` overlap: Scene 05 must sit underneath and not collapse layout.
4. Check that all timeline **labels** exist and are spelled consistently (label map is the source of truth).
5. Confirm `ScrollTrigger.refresh()` runs after fonts and video metadata; re-check pinned end positions after refresh.
6. Ensure clip-path animations render in Safari:
   - test `clip-path: circle()` and `inset()` with `-webkit-clip-path`
   - watch for pixelated edges; adjust radii or switch to mask-image if needed.
7. Test video scrub stability:
   - no `currentTime` set before `loadedmetadata`
   - no console warnings about playback; video is `muted`, `playsInline`.
8. Confirm “hold” moments in video actually hold (timecode freezes and captions remain stable).
9. Verify poster fade strategy: poster visible until first decoded frame; no flash of black.
10. Confirm velocity-based skew clamps properly (±10deg) and eases back quickly (no stuck skew).
11. Check that blur/filter usage in Scene 05 is short and doesn’t tank FPS; reduce blur radius if needed.
12. Ensure `will-change` is only applied while scenes are active; confirm it’s removed to avoid GPU memory bloat.
13. Confirm transforms are used instead of layout properties (no animating `top/left/width/height`).
14. Check snap behavior in horizontal section:

- snaps only to panel centers
- doesn’t fight user scroll (snap duration clamp works)
- panel micro-interactions trigger at the right labels.

15. Validate horizontal parallax (panelBg/panelFg) doesn’t drift out of frame; clamp x shifts at edges.
16. Confirm magnetic hover doesn’t interfere with clicks; pointer events remain correct.
17. Check “spotlight cursor” doesn’t reduce text contrast; keep spotlight subtle and behind text.
18. Ensure reduced motion mode:

- disables velocity skew, camera shake, extreme zoom
- replaces video scrubbing with still crossfades
- keeps content fully readable and functional.

19. Confirm z-index stacking order across scenes (especially 03→04→05) has no accidental overlay artifacts.
20. Cross-browser sanity (Chrome/Firefox/Safari): pin spacing, clip-path edges, and video decode behavior all consistent.
