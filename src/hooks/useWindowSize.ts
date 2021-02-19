import { useEffect, useState } from 'react'

interface WindowSize {
  width: number
  height: number
}

function useWindowSize(): WindowSize {
  const getWindowSize = () =>
    typeof window !== 'undefined'
      ? {
          width: window.innerWidth,
          height: window.innerHeight,
        }
      : {
          width: 0,
          height: 0,
        }

  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize())

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // Empty array ensures that effect is only run on mount and unmount
  }, [])

  return windowSize
}

export default useWindowSize
