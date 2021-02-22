import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { Rect, Transformer } from 'react-konva'
import { Rect as IRect } from 'konva/types/shapes/Rect'
import { Transformer as ITransformer } from 'konva/types/shapes/Transformer'
import { KonvaEventObject } from 'konva/types/Node'

import { rectStateFamily, selectedShapeIdState } from '../atoms/shapes'
import { getColorFromName } from './App/colors'

export interface RectangleProps {
  id: string
}

const Rectangle = ({ id }: RectangleProps) => {
  console.log('render <Rectangle />')
  const [shape, setShape] = useRecoilState(rectStateFamily(id))
  const [selectedId, setSelectedId] = useRecoilState(selectedShapeIdState)
  const shapeRef = React.useRef<IRect | null>(null)
  const trRef = React.useRef<ITransformer | null>(null)
  const isSelected = id === selectedId

  const handleSelect = () => {
    setSelectedId(id)
  }

  const handleTransformEnd = () => {
    const node = shapeRef.current
    if (!node) return

    // transformer is changing scale of the node
    // and NOT its width or height
    // but in the store we have only width and height
    // to match the data better we will reset scale on transform end
    const scaleX = node.scaleX()
    const scaleY = node.scaleY()

    // we will reset it back
    node.scaleX(1)
    node.scaleY(1)

    setShape({
      ...shape,
      x: node.x(),
      y: node.y(),
      // set minimal value
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
      rotation: node.rotation(),
    })
  }

  const handleDragEnd = (event: KonvaEventObject<DragEvent>) => {
    setShape({
      ...shape,
      x: event.target.x(),
      y: event.target.y(),
    })
  }

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer()?.batchDraw()
    }
  }, [isSelected])

  return (
    <>
      <Rect
        {...shape}
        onClick={handleSelect}
        onTap={handleSelect}
        ref={shapeRef}
        fill={getColorFromName(shape.color)}
        draggable
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && <Transformer ref={trRef} />}
    </>
  )
}

export default Rectangle
