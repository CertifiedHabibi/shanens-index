const withBase = path => import.meta.env.BASE_URL.replace(/\/$/, '') + path;

export const PROFILE = {
  name: 'Shanen',
  name2: 'Shanen\'s Index',
  tagline: 'ദ്ദി ( ᵔ ᗜ ᵔ )',
  avatar: withBase('/images/shanen/shanen.png'),
  logo: withBase('/images/shanen/shanen.png'),
  aboutImage: withBase('/images/shanen/Shanenbutreal.png'),
};

export const SOCIALS = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/anennom2' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/shanen-red-balcos-2687ab3a2/' },
  { id: 'x', label: 'X', href: 'https://x.com/anennom2' },
  { id: 'bluesky', label: 'Bluesky', href: 'https://bsky.app/profile/anennom2.bsky.social' }
];

export const ABOUT = {
  heading: 'About me',
  paragraphs: [
    'I am currently an ongoing Multimedia Arts undergraduate\n' +
    'student, specifically in my Junior year at the moment.\n' +
    'Working towards my degree in Multimedia Arts, I have\n' +
    'always been passionate with illustration and ideation of\n' +
    'concepts in digital arts and storytelling in animation and\n' +
    'film. I am constantly trying to grow and improve my artistic\n' +
    'and problem solving skills everyday that reflects my\n' +
    'signature style.',
  ],
  software: [
    { name: 'Photoshop', icon: withBase('/images/software/APS.svg') },
    { name: 'Clip Studio Paint', icon: withBase('/images/software/CSP.png') },
    { name: 'Premiere Pro', icon: withBase('/images/software/APP.svg') },
    { name: 'DaVinci Resolve', icon: withBase('/images/software/DVR.svg') },
    { name: 'Blender', icon: withBase('/images/software/Blender.svg') }
  ]
};

export const CONTACT = {
  heading: 'Get in touch!',
  text: 'If you have any inquiries or remarks, write me a message! Let\'s collaborate.',
  email: 'shanenred@gmail.com'
};

export const COPYRIGHT = '© 2026 Shanen. All rights reserved.';

export const AUTOPLAY_SECONDS = 2.5;

const gallery = (dir, files) =>
    files.map(file => {
      const name = file.replace(/\.png$/i, '').replace(/_/g, ' ');
      return { src: withBase(`/images/${dir}/${encodeURIComponent(file)}`), alt: name, title: name };
    });

export const COLLECTIONS = [
  {
    id: 'illustrations',
    label: 'Illustration',
    items: gallery('illustrations', [
      'Anen Birthday (2026).png',
      'Anen HK Fit (2026).png',
      'Frieren (2026).png',
      'Hatsune Miku (2026).png',
      'Peter (2026).png',
      'Nero (2026).png',
      'The Cat Whisperer (2026).png',
      'Yume CNY (2026).png'
    ])
  },
  {
    id: 'characters',
    label: 'Concept Art'  ,
    items: gallery('characters', [
      'Idris Bust (2026).png',
      'Idris (2026).png',
      'Idris Turnaround (2026).png',
      'Kiri (2026).png',
      'Phoney (2026).png',
      'Ryoko (2026).png',
      'Sinigang Mafia (2026).png',
      'Sinigang Gang Concept (2026).png'
    ])
  },
  {
    id: 'environments',
    label: 'Environmental art',
    items: gallery('environments', ['Mount Plein Air (2025).png', 'Cerulean Blue (2025).png', 'Skruvby Ruins (2025).png', 'Porta Mundi (2026).png'])
  }
];