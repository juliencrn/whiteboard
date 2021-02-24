import React, { CSSProperties } from 'react'

import './global.css'
import './App.css'

import 'normalize-css'

import Navbar from '../Navbar/Navbar'
import Canvas from '../Canvas'
import Sidebar from '../Sidebar/Sidebar'
import useWindowSize from '../../hooks/useWindowSize'
import { borderSize, colors, navbarHeight, sidebarWidth } from './theme'

const cssVariables = Object.assign(
  {},
  ...colors.map(([name, hex]) => ({
    [`--${name}-color`]: hex,
  })),
  { '--sidebar-width': `${sidebarWidth}px` },
  { '--navbar-height': `${navbarHeight}px` },
  { '--border-size': `${borderSize}px` },
) as CSSProperties

function App() {
  console.log('render <App />')

  const { width, height } = useWindowSize()

  return (
    <main className="App" style={cssVariables}>
      <Navbar />
      <Sidebar />
      <Canvas width={width} height={height} />
    </main>
  )
}

export default App
