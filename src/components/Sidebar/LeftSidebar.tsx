import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import './Sidebar.css'

import {
  rectStateFamily,
  selectedShapeIdState,
  shapeIdListState,
} from '../../atoms/shapes'
import AddShapeButton from '../AddShapeButton'

function SidebarItem(props: { shapeId: string }) {
  console.log('render <SidebarItem />')

  const [shape, setShape] = useRecoilState(rectStateFamily(props.shapeId))
  const [selectedId, setSelectedId] = useRecoilState(selectedShapeIdState)
  const active = shape.id === selectedId
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleClick = () => {
    setSelectedId(shape.id)
    setIsEditing(true)
  }

  useEffect(() => {
    if (selectedId !== shape.id) {
      setIsEditing(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShape(prev => ({ ...prev, name: event.target.value }))
  }

  return (
    <li
      key={props.shapeId}
      className={`Sidebar-item ${active ? 'active' : ''}`}
      onClick={handleClick}
    >
      {isEditing ? (
        <input autoFocus onChange={handleChange} value={shape.name} />
      ) : (
        shape.name
      )}
    </li>
  )
}

export default function LeftSidebar() {
  console.log('render <Sidebar />')
  const shapeIdList = useRecoilValue(shapeIdListState)

  return (
    <aside className="Sidebar Left-Sidebar">
      <h2 className="Sidebar-title">
        Shapes
        <AddShapeButton />
      </h2>
      <ul className="Sidebar-shape-list">
        {shapeIdList.map(shapeId => (
          <SidebarItem key={shapeId} shapeId={shapeId} />
        ))}
      </ul>
    </aside>
  )
}
