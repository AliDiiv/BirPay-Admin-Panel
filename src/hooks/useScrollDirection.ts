import { useEffect, useState } from 'react'

export default function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up')

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDir = () => {
      const scrollY = window.scrollY
      if (Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDir(scrollY > lastScrollY ? 'down' : 'up')
        lastScrollY = scrollY
      }
    }

    window.addEventListener('scroll', updateScrollDir)
    return () => window.removeEventListener('scroll', updateScrollDir)
  }, [])

  return scrollDir
}
