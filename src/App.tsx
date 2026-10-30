import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Cake, Heart, Volume2, VolumeX, X, Sparkles, Stars } from 'lucide-react'
import { birthday } from './config'

type Memory = typeof birthday.memories[number]

function Confetti({ active }: { active: boolean }) {
  if (!active) return null
  return <div className="confetti-layer" aria-hidden="true">{Array.from({ length: 74 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 17) * -0.19}s`, animationDuration: `${4 + (i % 9) * .35}s`, background: ['#e8c78d','#e7a8c4','#b9b1e8','#fff1d8'][i % 4] }} />)}</div>
}

function App() {
  const [opened, setOpened] = useState(false)
  const [candlesOut, setCandlesOut] = useState(false)
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null)
  const [revealed, setRevealed] = useState<number[]>([])
  const [musicOn, setMusicOn] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!opened) return
    const timer = window.setTimeout(() => document.getElementById('reveal')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }), 350)
    return () => window.clearTimeout(timer)
  }, [opened, reduceMotion])

  useEffect(() => {
    if (!activeMemory) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveMemory(null) }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [activeMemory])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio || !birthday.music) return
    if (musicOn) { audio.pause(); setMusicOn(false) }
    else { try { await audio.play(); setMusicOn(true) } catch { setMusicOn(false) } }
  }

  const celebrate = () => { setCandlesOut(true); setConfetti(true); window.setTimeout(() => setConfetti(false), 6500) }
  const toggleQuality = (index: number) => setRevealed(current => current.includes(index) ? current.filter(x => x !== index) : [...current, index])
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })

  return <main>
    <audio ref={audioRef} src={birthday.music || undefined} loop preload="none" onError={() => setMusicOn(false)} />
    <div className="ambient" aria-hidden="true"><span /><span /><span /><span /><span /></div>
    <header className="topbar"><a className="wordmark" href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>M<span>✦</span></a><div className="topbar-right"><span className="edition">A BIRTHDAY EDITION · {new Date().getFullYear()}</span>{birthday.music && <button className="sound-toggle" onClick={toggleMusic} aria-label={musicOn ? 'Pause music' : 'Play music'}>{musicOn ? <Volume2 size={16}/> : <VolumeX size={16}/>}<span>{musicOn ? 'Sound on' : 'Sound off'}</span></button>}</div></header>

    <section className="intro" id="top">
      <div className="intro-orbit orbit-one"/><div className="intro-orbit orbit-two"/>
      <motion.div className="intro-content" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
        <div className="eyebrow"><span className="eyebrow-line"/>{birthday.eyebrow}<span className="eyebrow-line"/></div>
        <h1>{birthday.openingLine.split('world')[0]}<em>world</em>{birthday.openingLine.split('world')[1]}</h1>
        <p className="intro-sub">A small collection of moments, words, and all the things that make you <i>you.</i></p>
        <button className="primary-button" onClick={() => { setOpened(true); setConfetti(true); window.setTimeout(() => setConfetti(false), 6000) }}>Open your surprise <ArrowUpRight size={17}/></button>
        <div className="scroll-cue"><span>TAKE YOUR TIME</span><ArrowDown size={14}/></div>
      </motion.div>
      <div className="side-note">MADE WITH LOVE<br/>JUST FOR {birthday.name.toUpperCase()}</div>
      <div className="hero-stamp"><Heart size={15} fill="currentColor"/><span>one of one</span></div>
    </section>

    <AnimatePresence>{opened && <motion.section id="reveal" className="reveal-section" initial={{ opacity: 0, y: 50, clipPath: 'inset(45% 0 45% 0)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0% 0)' }} transition={{ duration: 1.1, ease: [0.22,1,0.36,1] }}>
      <Confetti active={confetti}/><div className="reveal-inner"><div className="tiny-label"><Sparkles size={13}/> TODAY IS ALL ABOUT YOU <Sparkles size={13}/></div><p className="script-kicker">the world got a little brighter</p><h2>{birthday.birthdayHeading}<br/><em>{birthday.name}.</em></h2><p className="reveal-sub">{birthday.birthdaySubheading}</p>
        <div className="cake-wrap"><div className="cake-glow"/><div className="cake"><div className="candle candle-a"><i className={candlesOut ? 'flame off' : 'flame'}/></div><div className="candle candle-b"><i className={candlesOut ? 'flame off' : 'flame'}/></div><div className="candle candle-c"><i className={candlesOut ? 'flame off' : 'flame'}/></div><div className="icing"/><div className="cake-top"/><div className="cake-body"><span>for {birthday.name}</span></div><div className="cake-plate"/></div></div>
        <button className="wish-button" onClick={candlesOut ? () => { setCandlesOut(false); setConfetti(false) } : celebrate}><Cake size={16}/>{candlesOut ? 'Relight the candles' : 'Make a wish & blow'}</button><p className="wish-hint">{candlesOut ? 'A wish made just for you.' : 'Go on. The universe is listening.'}</p>
      </div><button className="continue-link" onClick={() => scrollTo('letter')}>A LETTER FOR YOU <ArrowDown size={14}/></button>
    </motion.section>}</AnimatePresence>

    <section className="letter-section section-pad" id="letter">
      <div className="section-heading"><span className="section-index">01 / A NOTE FROM ME</span><p className="script-kicker">a little something, from my heart</p><h2>Words I hope<br/><em>you keep.</em></h2></div>
      <motion.article className="letter-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8 }}>
        <div className="letter-top"><span>THE PERSONAL EDITION</span><Heart size={17}/><span>FOR {birthday.name.toUpperCase()}</span></div>
        <div className="letter-body">{birthday.letter.map((paragraph, i) => <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .12, duration: .55 }} className={i === 0 ? 'letter-salutation' : ''}>{paragraph}</motion.p>)}</div>
        <div className="letter-sign"><span>with all my love,</span><strong>{birthday.from}</strong><span className="sign-heart">♥</span></div>
        <div className="letter-seal">M<span>✦</span></div>
      </motion.article>
    </section>

    <section className="memories-section section-pad" id="memories"><div className="section-heading centered"><span className="section-index">02 / THE MEMORY LANE</span><p className="script-kicker">little moments, big feelings</p><h2>A life in <em>little frames.</em></h2><p className="section-description">Some moments deserve more than a place in the camera roll. Tap a frame to see it a little closer.</p></div>
      <div className="memory-grid">{birthday.memories.map((memory, i) => <motion.button key={memory.src} className={`memory-card memory-${i + 1}`} onClick={() => setActiveMemory(memory)} initial={{ opacity: 0, y: 25, rotate: (i % 2 ? 2 : -2) }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: .15 }} transition={{ delay: i * .07, duration: .6 }} whileHover={{ y: -7, rotate: i % 2 ? 1 : -1 }} aria-label={`Open memory: ${memory.caption}`}><div className="memory-image"><img src={memory.src} alt={memory.caption} loading="lazy" onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }}/><div className="photo-placeholder"><Heart size={24}/><span>YOUR PHOTO HERE</span><small>replace in public/photos</small></div></div><div className="memory-meta"><span>{memory.date}</span><p>{memory.caption}</p></div><span className="memory-number">0{i + 1}</span></motion.button>)}</div>
      <p className="gallery-note">A FEW OF OUR FAVOURITE CHAPTERS · MORE TO COME</p>
    </section>

    <section className="qualities-section section-pad" id="little-things"><div className="section-heading"><span className="section-index">03 / THE LITTLE THINGS</span><p className="script-kicker">in case you ever forget</p><h2>There is so much<br/><em>to love about you.</em></h2><p className="section-description">A few reminders. Open each one — I saved these just for you.</p></div>
      <div className="quality-grid">{birthday.qualities.map((quality, i) => <motion.button key={quality.title} className={`quality-card ${revealed.includes(i) ? 'is-open' : ''}`} onClick={() => toggleQuality(i)} whileTap={{ scale: .97 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }}><span className="quality-count">0{i + 1}</span><span className="quality-icon"><Heart size={17}/></span><strong>{quality.title}</strong><AnimatePresence>{revealed.includes(i) && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{quality.note}</motion.p>}</AnimatePresence><span className="quality-action">{revealed.includes(i) ? 'CLOSE −' : 'OPEN +'} </span></motion.button>)}</div>
    </section>

    <section className="next-section section-pad" id="next-chapter"><div className="next-stars"><Stars size={20}/><span>04 / WHAT COMES NEXT</span><Stars size={20}/></div><p className="script-kicker">to all the beautiful things ahead</p><h2>Your next chapter<br/>looks <em>good on you.</em></h2><p className="next-copy">{birthday.nextChapter}</p><div className="wish-list"><span>MORE SUNSHINES</span><i>✦</i><span>MORE PANIPURI</span><i>✦</i><span>MORE LITTLE WINS</span><i>✦</i><span>MORE YOU</span></div><div className="closing-note"><span>AND ONE LAST THING...</span><p>{birthday.closingLine}</p><Heart size={19} fill="currentColor"/></div><button className="back-top" onClick={() => { setOpened(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>BACK TO THE BEGINNING <ArrowUpRight size={15}/></button></section>

    <footer><a className="wordmark" href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>M<span>✦</span></a><p>MADE WITH A LITTLE TOO MUCH LOVE · {new Date().getFullYear()}</p><span>FOR {birthday.name.toUpperCase()}, ALWAYS.</span></footer>

    <AnimatePresence>{activeMemory && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo memory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveMemory(null)}><button className="lightbox-close" onClick={() => setActiveMemory(null)} aria-label="Close photo"><X/></button><motion.div className="lightbox-content" initial={{ scale: .92, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .95 }} onClick={e => e.stopPropagation()}><img src={activeMemory.src} alt={activeMemory.caption} /><p>{activeMemory.caption}</p><span>{activeMemory.date}</span></motion.div></motion.div>}</AnimatePresence>
  </main>
}

export default App
