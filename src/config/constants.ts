export const DEBUG_MODE = false

export const SCENE_IDS = {
    HERO: "hero-scene",
    CINEMA: "cinema-scene",
    FOCUS: "focus-scene",
    PRODUCT_CAROUSEL: "product-carousel-scene",
}


export const PRODUCT_CAROUSEL_ITEMS = [
    {
        id: 3,
        image: "/assets/images/filmstrip_panel_04.png",
        title: "Tactile Buttons",
        subtitle: "Just feels right - feels better.",
        cardType: 'overlay',
    },

    {
        id: 2,
        image: "/assets/images/filmstrip_panel_02.png",
        title: "Cutting Edge Lens System.",
        cardType: 'specs',
        specs: [{ label: 'Focal Length', value: '24mm' }, { label: 'Aperture', value: 'f/1.4' }, { label: 'Resolution', value: '4K' }, { label: 'Zoom', value: '20x' }],
    },
    {
        id: 1,
        image: "/assets/images/filmstrip_panel_01.png",
        title: "Simple To Use.",
        subtitle: "As simple as a camera can get",
        cardType: 'overlay',
    },
    {
        id: 4,
        image: "/assets/images/filmstrip_panel_03.png",
        title: "High Quality Titanium.",
        cardType: 'specs',
        specs: [{ label: 'Weight', value: '800g' }, { label: 'Material', value: 'Titanium' }],
    },

]