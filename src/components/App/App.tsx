import React, { useEffect, useRef, useState } from 'react'

import './global.css'
import './App.css'

import 'normalize-css'
import useEventListener from '../../hooks/useEventListener'

import Navbar from '../Navbar/Navbar'
import Canvas, { CanvasProps } from '../Canvas'
import LeftSidebar from '../Sidebar/LeftSidebar'
import RightSidebar from '../Sidebar/RightSidebar'

function App() {
  console.log('render <App />')
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const [canvasSize, setCanvasSize] = useState<CanvasProps>({
    width: 0,
    height: 0,
  })

  const updateCanvasSize = () => {
    const canvas = canvasRef.current
    if (canvas) {
      setCanvasSize({
        width: canvas.offsetWidth,
        height: canvas.offsetHeight,
      })
    }
  }

  useEventListener('resize', updateCanvasSize)

  useEffect(() => updateCanvasSize(), [])

  return (
    <main className="App">
      <Navbar />
      <LeftSidebar />
      <Canvas ref={canvasRef} {...canvasSize} />
      <RightSidebar />
    </main>
  )
}

export default App
