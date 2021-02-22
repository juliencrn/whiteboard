import React, { ChangeEvent } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import './Sidebar.css'
import { round } from '../../utils'

import { rectStateFamily, selectedShapeIdState } from '../../atoms/shapes'
import { Color, colors, getColorFromName } from '../App/colors'

function SidebarSelectedShape({ id }: { id: string }) {
  console.log('render <SidebarSelectedShape />')
  const [shape, setShape] = useRecoilState(rectStateFamily(id))

  const handleNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    setShape(prev => ({ ...prev, [name]: Number(event.target.value) }))
  }

  const handleColorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const color = event.target.value as Color
    setShape(prev => ({ ...prev, color, fill: getColorFromName(color) }))
  }

  const fields = ['x', 'y', 'width', 'height', 'rotation']

  return (
    <div>
      <h2 className="Sidebar-title">Selected shape</h2>

      <form>
        {fields.map(key => (
          <div key={key} className="input-group">
            <label>{key}:</label>
            <input
              type="number"
              name={key}
              onChange={e => handleNumberChange(e, key)}
              value={round(shape[key])}
            />
          </div>
        ))}

        <div className="input-group">
          <label>color:</label>
          <select name="color" onChange={handleColorChange} value={shape.color}>
            {colors.map(([name]) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}

export default function RightSidebar() {
  console.log('render <RightSidebar />')

  const id = useRecoilValue(selectedShapeIdState)

  return (
    <aside className="Sidebar Right-Sidebar">
      {id && <SidebarSelectedShape id={id} />}
    </aside>
  )
}
