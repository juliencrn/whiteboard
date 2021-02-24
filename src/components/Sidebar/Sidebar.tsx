import React from 'react'
import './Sidebar.css'

import AddShapeButton from './AddShapeButton'
import EditShapeForm from './EditShapeForm'
import Layers from './Layers/Layers'

export default function Sidebar() {
  console.log('render <Sidebar />')

  return (
    <aside className="Sidebar">
      <div className="Sidebar-menu-creator">
        <AddShapeButton />
      </div>
      <div className="Sidebar-shape-list">
        <Layers />
      </div>
      <EditShapeForm />
    </aside>
  )
}
