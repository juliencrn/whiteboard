import React from 'react'
import { v4 as uuid } from 'uuid'
import { useSetRecoilState } from 'recoil'
import {
  Square,
  Circle,
  Triangle,
  Type,
  Image,
  ArrowRight,
} from 'react-feather'
import {
  selectedShapeIdState,
  shapeIdListState,
  ShapeType,
} from '../../../atoms/shapes'
import './MenuCreator.css'

export default function MenuCreator() {
  console.log('render <MenuCreator />')
  const setShapeIdList = useSetRecoilState(shapeIdListState)
  const setSelectedId = useSetRecoilState(selectedShapeIdState)

  const add = (type: ShapeType) => {
    const id = `${type}-${uuid()}`
    setSelectedId(id)
    setShapeIdList(prevList => [...prevList, id])
  }

  const addRect = () => add('Rect')
  const addCircle = () => add('Circle')
  const addTriangle = () => add('Triangle')
  const addText = () => add('Text')
  const addLine = () => add('Line')
  const addImage = () => add('Image')

  return (
    <div className="MenuCreator">
      <button onClick={addRect}>
        <Square />
      </button>
      <button onClick={addCircle}>
        <Circle />
      </button>
      <button onClick={addTriangle}>
        <Triangle />
      </button>
      <button onClick={addText}>
        <Type />
      </button>
      <button onClick={addLine}>
        <ArrowRight />
      </button>
      <button onClick={addImage}>
        <Image />
      </button>
    </div>
  )
}
