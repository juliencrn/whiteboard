import React from 'react'
import './Sidebar.css'

import MenuCreator from './MenuCreator/MenuCreator'
import EditShapeForm from './EditShapeForm'
import Layers from './Layers/Layers'

export default function Sidebar() {
  console.log('render <Sidebar />')

  return (
    <aside className="Sidebar">
      <div className="Sidebar-menu-creator">
        <MenuCreator />
      </div>
      <div className="Sidebar-shape-list">
        <Layers />
      </div>
      <EditShapeForm />
    </aside>
  )
}
