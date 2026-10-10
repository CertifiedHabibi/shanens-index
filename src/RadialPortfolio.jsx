import { useCallback, useEffect, useRef, useState } from 'react';
import FlexCarousel from './FlexCarousel.jsx';
import './RadialPortfolio.css';

import { PROFILE, SOCIALS, ABOUT, CONTACT, COPYRIGHT, COLLECTIONS, AUTOPLAY_SECONDS } from './portfolio-data.js';

const NAV = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact', cta: true }
];

const T = { collapse: 750, dot: 140, line: 650, open: 800, content: 380, grow: 900 };

const CX = 200;
const CY = 200;
const R_OUTER = 180;
const R_INNER = 124;
const GAP_DEG = 2.4;
const f = n => n.toFixed(2);

const polar = (deg, r) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
};

const arcPath = (a0, a1) => {
    const o0 = polar(a0, R_OUTER);
    const o1 = polar(a1, R_OUTER);
    const i1 = polar(a1, R_INNER);
    const i0 = polar(a0, R_INNER);
    const large = a1 - a0 > 180 ? 1 : 0;
    return [
        `M ${f(o0.x)} ${f(o0.y)}`,
        `A ${R_OUTER} ${R_OUTER} 0 ${large} 1 ${f(o1.x)} ${f(o1.y)}`,
        `L ${f(i1.x)} ${f(i1.y)}`,
        `A ${R_INNER} ${R_INNER} 0 ${large} 0 ${f(i0.x)} ${f(i0.y)}`,
        'Z'
    ].join(' ');
};

const SLICE = 360 / COLLECTIONS.length;
const START = -SLICE / 2;

const TEXT_CAP = 4.5;
const R_MID = (R_OUTER + R_INNER) / 2;

const ARCS = COLLECTIONS.map((c, i) => {
    const a0 = START + i * SLICE + GAP_DEG / 2;
    const a1 = START + (i + 1) * SLICE - GAP_DEG / 2;
    const midDeg = (a0 + a1) / 2;
    const norm = ((midDeg % 360) + 360) % 360;
    const flip = norm > 90 && norm < 270;
    const large = a1 - a0 > 180 ? 1 : 0;

    const rText = flip ? R_MID + TEXT_CAP : R_MID - TEXT_CAP;

    const t0 = polar(a0, rText);
    const t1 = polar(a1, rText);
    const textPath = flip
        ? `M ${f(t1.x)} ${f(t1.y)} A ${f(rText)} ${f(rText)} 0 ${large} 0 ${f(t0.x)} ${f(t0.y)}`
        : `M ${f(t0.x)} ${f(t0.y)} A ${f(rText)} ${f(rText)} 0 ${large} 1 ${f(t1.x)} ${f(t1.y)}`;

    return {
        id: c.id,
        label: c.label,
        d: arcPath(a0, a1),
        textPath,
        rot: f(flip ? norm + 180 : norm)
    };
});

const BOW_COUNT = 24;
const BOW_TONES = ['#ff779a', '#f65e85', '#8f8310'];
const BOWS = Array.from({ length: BOW_COUNT }, (_, i) => {
    const p = polar(i * (360 / BOW_COUNT), 190.5);
    return {
        x: f(p.x),
        y: f(p.y),
        color: BOW_TONES[i % BOW_TONES.length],
        dur: `${9 + (i % 5) * 1.5}s`,
        reverse: i % 2 === 1
    };
});

function SocialIcon({ id }) {
    if (id === 'instagram') {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" strokeWidth="2.1" />
                <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="2.1" />
                <circle cx="17.4" cy="6.6" r="1.25" fill="currentColor" />
            </svg>
        );
    }
    if (id === 'linkedin') {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <defs>
                    <mask id="rp-in-mask">
                        <rect width="24" height="24" fill="#fff" />
                        <g fill="#000">
                            <circle cx="7.3" cy="7.6" r="1.55" />
                            <rect x="5.9" y="10.2" width="2.8" height="7.6" />
                            <rect x="10.4" y="10.2" width="2.8" height="7.6" />
                            <path d="M13.2 12.3C13.8 10.9 15 10 16.7 10C19 10 20 11.4 20 14V17.8H17.2V14.5C17.2 13.3 16.7 12.6 15.7 12.6C14.5 12.6 13.2 13.4 13.2 15Z" />
                        </g>
                    </mask>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="3.6" fill="currentColor" mask="url(#rp-in-mask)" />
            </svg>
        );
    }
    if (id === 'x') {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    fill="currentColor"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
            </svg>
        );
    }
    if (id === 'bluesky') {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    fill="currentColor"
                    d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.479 0-.688-.139-1.86-.902-2.203-.659-.299-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"
                />
            </svg>
        );
    }
    return null;
}

function About() {
    return (
        <div className="rp-about">
            <div className="rp-about__media">
                <img src={PROFILE.aboutImage} alt={`Shanen Red Balcos`} />
            </div>
            <div className="rp-about__text">
                <h2>{ABOUT.heading}</h2>
                {ABOUT.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                ))}
                <ul className="rp-software">
                    {ABOUT.software.map(s => (
                        <li key={s.name} title={s.name}>
                            <img src={s.icon} alt={s.name} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function Contact() {
    return (
        <div className="rp-contact">
            <h2>{CONTACT.heading}</h2>
            <p>{CONTACT.text}</p>
            <a className="rp-btn" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
            </a>
            <ul className="rp-links">
                {SOCIALS.map(l => (
                    <li key={l.id}>
                        <a href={l.href} target="_blank" rel="noreferrer">
                            {l.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const collectionById = id => COLLECTIONS.find(c => c.id === id);
const isWork = key => Boolean(collectionById(key));
const titleFor = key => {
    if (key === 'about') return 'About';
    if (key === 'contact') return 'Contact';
    return collectionById(key)?.label ?? '';
};

export default function RadialPortfolio() {
    const [dial, setDial] = useState('collapsed');
    const [shape, setShape] = useState('hidden');
    const [section, setSection] = useState(null);
    const [view, setView] = useState('home');
    const [contentOn, setContentOn] = useState(false);
    const [shown, setShown] = useState(false);
    const [carousel, setCarousel] = useState(false);
    const [k, setK] = useState(1);
    const [glow, setGlow] = useState(-1);
    const [hovering, setHovering] = useState(false);

    const seq = useRef(0);
    const glowAt = useRef(0);
    const target = useRef('home');
    const shapeRef = useRef('hidden');
    const kRef = useRef(1);

    const putShape = useCallback(s => {
        shapeRef.current = s;
        setShape(s);
    }, []);

    const pause = useCallback(
        async (tok, ms) => {
            await new Promise(r => setTimeout(r, ms * kRef.current));
            return tok === seq.current;
        },
        []
    );

    useEffect(() => {
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            kRef.current = 0.01;
            setK(0.01);
        }
        let r2 = 0;
        const r1 = requestAnimationFrame(() => {
            r2 = requestAnimationFrame(() => setDial(d => (target.current === 'home' ? 'shown' : d)));
        });
        return () => {
            cancelAnimationFrame(r1);
            cancelAnimationFrame(r2);
        };
    }, []);

    const openSeq = useCallback(
        async (key, tok) => {
            setSection(key);
            setShown(false);
            setCarousel(false);
            setContentOn(false);

            if (shapeRef.current === 'hidden') {
                setDial('collapsed');
                if (!(await pause(tok, T.collapse))) return;
                putShape('dot');
                if (!(await pause(tok, T.dot))) return;
            }
            if (shapeRef.current === 'dot') {
                putShape('line');
                if (!(await pause(tok, T.line))) return;
            }
            if (shapeRef.current === 'line') {
                putShape('full');
                if (!(await pause(tok, T.open))) return;
            }
            setContentOn(true);
            setShown(true);
            setCarousel(isWork(key));
        },
        [pause, putShape]
    );

    const closeSeq = useCallback(
        async tok => {
            if (shapeRef.current === 'full') {
                setShown(false);
                if (!(await pause(tok, T.content))) return;
                setCarousel(false);
                setContentOn(false);
                putShape('line');
                if (!(await pause(tok, T.line))) return;
            }
            if (shapeRef.current === 'line') {
                setCarousel(false);
                setContentOn(false);
                putShape('dot');
                if (!(await pause(tok, T.line * 0.8))) return;
            }
            putShape('hidden');
            setDial('shown');
        },
        [pause, putShape]
    );

    const switchSeq = useCallback(
        async (key, tok) => {
            setShown(false);
            if (!(await pause(tok, T.content))) return;
            setCarousel(false);
            setSection(key);
            setContentOn(true);
            if (!(await pause(tok, 60))) return;
            setShown(true);
            setCarousel(isWork(key));
        },
        [pause]
    );

    const navigate = useCallback(
        id => {
            if (target.current === id) return;
            target.current = id;
            setView(id);
            const tok = ++seq.current;
            if (id === 'home') closeSeq(tok);
            else if (shapeRef.current === 'full') switchSeq(id, tok);
            else openSeq(id, tok);
        },
        [closeSeq, switchSeq, openSeq]
    );

    useEffect(() => {
        if (!contentOn) return undefined;
        const onKey = e => {
            if (e.key === 'Escape' && !e.defaultPrevented) navigate('home');
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [contentOn, navigate]);

    const rootStyle = Object.fromEntries(Object.entries(T).map(([name, ms]) => [`--t-${name}`, `${Math.round(ms * k)}ms`]));
    const still = k !== 1;
    const interactive = dial === 'shown';

    useEffect(() => {
        if (!interactive || still || hovering) {
            setGlow(-1);
            return undefined;
        }
        setGlow(glowAt.current);
        const id = setInterval(() => {
            glowAt.current = (glowAt.current + 1) % COLLECTIONS.length;
            setGlow(glowAt.current);
        }, 1000);
        return () => clearInterval(id);
    }, [interactive, still, hovering]);

    const activeNav = view === 'about' || view === 'contact' ? view : isWork(view) ? null : 'home';
    const current = collectionById(section);
    const at = COLLECTIONS.findIndex(c => c.id === section);
    const prevCollection = COLLECTIONS[(at - 1 + COLLECTIONS.length) % COLLECTIONS.length];
    const nextCollection = COLLECTIONS[(at + 1) % COLLECTIONS.length];

    return (
        <div className="rp-root" style={rootStyle}>
            <header className="rp-nav">
                <button type="button" className="rp-nav__brand" onClick={() => navigate('home')}>
                    <img className="rp-nav__logo" src={PROFILE.avatar} alt="" />
                    {PROFILE.name2}
                </button>
                <nav className="rp-nav__links" aria-label="Primary">
                    {NAV.map(n => (
                        <button
                            key={n.id}
                            type="button"
                            className={n.cta ? 'rp-nav__link rp-nav__link--cta' : 'rp-nav__link'}
                            aria-current={activeNav === n.id ? 'page' : undefined}
                            onClick={() => navigate(n.id)}
                        >
                            {n.label}
                        </button>
                    ))}
                </nav>
            </header>

            <div className="rp-stage">
                <div
                    className="rp-dial"
                    data-dial={dial}
                    data-hidden={shape !== 'hidden' ? '' : undefined}
                    data-still={still ? '' : undefined}
                >
                    <svg className="rp-svg" viewBox="0 0 400 400" role="group" aria-label="Featured work">
                        <defs>
                            {ARCS.map(a => (
                                <path key={a.id} id={`rp-tp-${a.id}`} d={a.textPath} />
                            ))}
                            <g id="rp-bow">
                                <path d="M0 0 C-2 -7 -11 -8 -11 0 C-11 8 -2 7 0 0 Z" fill="currentColor" />
                                <path d="M0 0 C2 -7 11 -8 11 0 C11 8 2 7 0 0 Z" fill="currentColor" />
                                <path d="M-1 2 L-6 11 L-2.5 9.5 L-0.5 4 Z" fill="currentColor" />
                                <path d="M1 2 L6 11 L2.5 9.5 L0.5 4 Z" fill="currentColor" />
                                <ellipse cx="0" cy="0" rx="2.4" ry="2.8" fill="currentColor" stroke="#fffbec" strokeWidth="1.3" />
                            </g>
                        </defs>

                        <g className="rp-bows" aria-hidden="true">
                            {BOWS.map((b, i) => (
                                <g key={i} transform={`translate(${b.x} ${b.y})`}>
                                    <g>
                                        {!still && (
                                            <animateTransform
                                                attributeName="transform"
                                                type="rotate"
                                                from={b.reverse ? '360 0 0' : '0 0 0'}
                                                to={b.reverse ? '0 0 0' : '360 0 0'}
                                                dur={b.dur}
                                                repeatCount="indefinite"
                                            />
                                        )}
                                        <use href="#rp-bow" transform="scale(0.55)" style={{ color: b.color }} />
                                    </g>
                                </g>
                            ))}
                        </g>

                        <circle className="rp-hole" cx={CX} cy={CY} r={R_INNER - 6} />

                        {ARCS.map((a, idx) => (
                            <g
                                key={a.id}
                                className="rp-seg"
                                data-glow={glow === idx ? '' : undefined}
                                onMouseEnter={() => {
                                    glowAt.current = idx;
                                    setHovering(true);
                                }}
                                onMouseLeave={() => setHovering(false)}
                                onFocus={() => {
                                    glowAt.current = idx;
                                    setHovering(true);
                                }}
                                onBlur={() => setHovering(false)}
                                role="button"
                                tabIndex={interactive ? 0 : -1}
                                aria-label={`Open ${a.label}`}
                                onClick={() => interactive && navigate(a.id)}
                                onKeyDown={e => {
                                    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                                        e.preventDefault();
                                        navigate(a.id);
                                    }
                                }}
                            >
                                <path className="rp-seg__shape" d={a.d} />
                                <g className="rp-seg__label">
                                    <text textAnchor="middle">
                                        <textPath href={`#rp-tp-${a.id}`} startOffset="50%">
                                            {a.label}
                                        </textPath>
                                    </text>
                                </g>
                            </g>
                        ))}
                    </svg>

                    <div className="rp-hero">
                        <img className="rp-hero__avatar" src={PROFILE.avatar} alt={`Shanen`} width="120" height="120" />
                        <h1 className="rp-hero__name">{PROFILE.name}</h1>
                        <p className="rp-hero__tagline">{PROFILE.tagline}</p>
                        <div className="rp-socials">
                            {SOCIALS.map(l => (
                                <a
                                    key={l.id}
                                    className="rp-social"
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${l.label} (opens in a new tab)`}
                                    tabIndex={interactive ? 0 : -1}
                                >
                                    <SocialIcon id={l.id} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <section
                    className="rp-window"
                    data-shape={shape}
                    aria-label={section ? titleFor(section) : 'Portfolio section'}
                    aria-hidden={shape !== 'full'}
                >
                    {contentOn && (
                        <>
                            <header className="rp-bar" data-on={shown ? '' : undefined}>
                                <button type="button" className="rp-back" onClick={() => navigate('home')}>
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M19 12H5M11 6l-6 6 6 6" />
                                    </svg>
                                    Back to dial
                                </button>
                                <p className="rp-bar__title">{titleFor(section)}</p>
                            </header>

                            <div className={`rp-body rp-body--${isWork(section) ? 'works' : section}`} data-on={shown ? '' : undefined}>
                                {section === 'about' && <About />}
                                {section === 'contact' && <Contact />}
                                {current && (
                                    <div className="rp-works">
                                        {carousel && (
                                            <FlexCarousel
                                                key={current.id}
                                                items={current.items}
                                                cardHeight={0.5}
                                                intro="rise"
                                                autoplay
                                                interval={AUTOPLAY_SECONDS}
                                                pauseOnHover={false}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </section>

                {contentOn && current && COLLECTIONS.length > 1 && (
                    <>
                        <button
                            type="button"
                            className="rp-collnav rp-collnav--prev"
                            data-on={shown ? '' : undefined}
                            aria-label={`Previous collection: ${prevCollection.label}`}
                            onClick={() => navigate(prevCollection.id)}
                        >
                            <span className="rp-collnav__arrow">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M15 5l-7 7 7 7" />
                                </svg>
                            </span>
                            <span className="rp-collnav__label">{prevCollection.label}</span>
                        </button>
                        <button
                            type="button"
                            className="rp-collnav rp-collnav--next"
                            data-on={shown ? '' : undefined}
                            aria-label={`Next collection: ${nextCollection.label}`}
                            onClick={() => navigate(nextCollection.id)}
                        >
                            <span className="rp-collnav__arrow">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                            <span className="rp-collnav__label">{nextCollection.label}</span>
                        </button>
                    </>
                )}

                <p className="rp-copy">{COPYRIGHT}</p>
            </div>
        </div>
    );
}