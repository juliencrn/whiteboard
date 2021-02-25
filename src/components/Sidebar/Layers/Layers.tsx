import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  shapeStateFamily,
  selectedShapeIdState,
  shapeIdListState,
} from '../../../atoms/shapes'
import './Layers.css'

function Layer(props: { shapeId: string }) {
  console.log('render <Layer />')

  const [shape, setShape] = useRecoilState(shapeStateFamily(props.shapeId))
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
      className={`Layer ${active ? 'active' : ''}`}
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

export default function Layers() {
  console.log('render <Layers />')

  const shapeIdList = useRecoilValue(shapeIdListState)

  return (
    <div className="Layers">
      <h2 className="Sidebar-title">Shapes</h2>
      <ul>
        {shapeIdList.map(shapeId => (
          <Layer key={shapeId} shapeId={shapeId} />
        ))}
      </ul>
    </div>
  )
}
