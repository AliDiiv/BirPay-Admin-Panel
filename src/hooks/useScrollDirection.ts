import { useEffect, useState } from 'react'

// Custom hook to detect scroll direction: 'up' or 'down'
export default function useScrollDirection() {
  // State to keep track of current scroll direction
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up')

  useEffect(() => {
    // Store the last scroll position
    let lastScrollY = window.scrollY

    // Function to determine scroll direction
    const updateScrollDir = () => {
      const scrollY = window.scrollY

      // Only update direction if the scroll difference is significant (>10px)
      if (Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDir(scrollY > lastScrollY ? 'down' : 'up')
        lastScrollY = scrollY
      }
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', updateScrollDir)

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', updateScrollDir)
  }, [])

  // Return the current scroll direction
  return scrollDir
}
