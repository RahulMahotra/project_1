import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Stats from './components/Stats'
import Work from './components/Work'
import Experience from './components/Experience'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    console.log(
      '%c Hey, you opened devtools. \n%c I like you already. Let\'s talk: rahulmahotra707@gmail.com ',
      'background:#ff5a1f;color:#0a0a0b;font:600 14px monospace;padding:6px 10px;',
      'color:#e2b96f;font:12px monospace;padding:4px 10px;',
    )
  }, [])

  return (
    <MotionConfig reducedMotion="user">
    <div className="grain">
      <Cursor />
      <Preloader onDone={() => setReady(true)} />
      {ready && (
        <>
          <Nav />
          <main className="mx-auto max-w-[1600px]">
            <Hero />
            <Marquee items={['Frontend', 'React', 'TypeScript', 'Design systems', 'Performance', 'AI tooling', 'Web3', 'Open source']} />
            <Stats />
            <Work />
            <Experience />
            <About />
            <Contact />
          </main>
        </>
      )}
    </div>
    </MotionConfig>
  )
}
