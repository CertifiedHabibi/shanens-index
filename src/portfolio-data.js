const withBase = path => import.meta.env.BASE_URL.replace(/\/$/, '') + path;

export const PROFILE = {
  name: 'Shanen',
  name2: 'Shanen\'s Index',
  tagline: 'I draw cute girls for a living. ദ്ദി ( ᵔ ᗜ ᵔ )',
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
  heading: 'Bla Blee Bloo',
  text: 'Give me something to put here shanen',
  email: 'something something email'
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
    label: 'Illustrations',
    items: gallery('illustrations', [
      'Anen Eep Duck.png',
      'Anen Ror.png',
      'Frieren.png',
      'HatsuneMiku.png',
      'Peter.png',
      'Renz.png',
      'The Cat Whisperer.png',
      'YumeCNY.png'
    ])
  },
  {
    id: 'characters',
    label: 'Character art',
    items: gallery('characters', [
      'Idris Bust.png',
      'Idris.png',
      'Idris Turnaround.png',
      'Kiri.png',
      'Phoney.png',
      'Ryoko.png',
      'Sinigang.png',
      'Sinigang Char.png'
    ])
  },
  {
    id: 'environments',
    label: 'Environmental art',
    items: gallery('environments', ['env1.png', 'env2.png', 'env3.png', 'env4.png'])
  }
];