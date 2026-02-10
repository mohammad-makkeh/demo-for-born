export const DEBUG_MODE = false;
export const BASE_URL = import.meta.env.VITE_NODE_ENV === 'production' ? '/iris' : '';

export const SCENE_IDS = {
  HERO: 'hero-scene',
  CINEMA: 'cinema-scene',
  FOCUS: 'focus-scene',
  PRODUCT_CAROUSEL: 'product-carousel-scene',
  VIDEO_LAYERS: 'video-layers-scene',
  COLORS_GALLERY: 'colors-gallery-scene'
};

export const PRODUCT_CAROUSEL_ITEMS = [
  {
    id: 3,
    image: BASE_URL + '/assets/images/filmstrip_panel_04.png',
    title: 'Tactile Buttons',
    subtitle: 'Just feels right - feels better.',
    cardType: 'overlay'
  },

  {
    id: 2,
    image: BASE_URL + '/assets/images/filmstrip_panel_02.png',
    title: 'Cutting Edge Lens System.',
    cardType: 'specs',
    specs: [
      { label: 'Focal Length', value: '24mm' },
      { label: 'Aperture', value: 'f/1.4' },
      { label: 'Resolution', value: '4K' },
      { label: 'Zoom', value: '20x' }
    ]
  },
  {
    id: 1,
    image: BASE_URL + '/assets/images/filmstrip_panel_01.png',
    title: 'Simple To Use.',
    subtitle: 'As simple as a camera can get',
    cardType: 'overlay'
  },
  {
    id: 4,
    image: BASE_URL + '/assets/images/filmstrip_panel_03.png',
    title: 'High Quality Titanium.',
    cardType: 'specs',
    specs: [
      { label: 'Material', value: 'Titanium' },
      { label: 'Finish', value: 'Brushed' },
      { label: 'Corrosion', value: 'Nevers' },
      { label: 'Weight', value: '800g' }
    ]
  }
];

export const COLORS = [
  {
    id: 'silver',
    label: 'Metallic Silver',
    img: BASE_URL + '/assets/images/product-silver.png',
    hex: '#a4a4a4'
  },
  {
    id: 'gold',
    label: 'Priceless Gold',
    img: BASE_URL + '/assets/images/product-gold.png',
    hex: '#cca054'
  },
  {
    id: 'black',
    label: 'Matte Black',
    img: BASE_URL + '/assets/images/product-black.png',
    hex: '#262626'
  },
  {
    id: 'pink',
    label: 'Brave Pink',
    img: BASE_URL + '/assets/images/product-pink.png',
    hex: '#d2a3b2'
  },
  {
    id: 'green',
    label: 'Smart Green',
    img: BASE_URL + '/assets/images/product-green.png',
    hex: '#9eb890'
  },
  {
    id: 'blue',
    label: 'Cool Blue',
    img: BASE_URL + '/assets/images/product-blue.png',
    hex: '#6eadaf'
  },
  {
    id: 'bronze',
    label: 'Classic Bronze',
    img: BASE_URL + '/assets/images/product-bronze.png',
    hex: '#af7960'
  }
];
export const COLOR_WHEEL_COLORS_STEP = 40;
export const COLOR_WHEEL_IMAGE_STEP = 40;
