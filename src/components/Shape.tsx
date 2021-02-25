import React, { RefObject, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { Circle, Rect, Transformer } from 'react-konva'
import { Rect as IRect } from 'konva/types/shapes/Rect'
import { Circle as ICircle } from 'konva/types/shapes/Circle'
import { Transformer as ITransformer } from 'konva/types/shapes/Transformer'
import { KonvaEventObject } from 'konva/types/Node'

import {
  shapeStateFamily,
  selectedShapeIdState,
  IShape,
  ShapeType,
} from '../atoms/shapes'
import { getColorFromName } from './App/theme'

export interface ShapeProps {
  id: string
}

const Shape = ({ id }: ShapeProps) => {
  console.log('render <Rectangle />')
  const [shape, setShape] = useRecoilState(shapeStateFamily(id))
  const [selectedId, setSelectedId] = useRecoilState(selectedShapeIdState)
  const shapeRef = React.useRef<ICircle | IRect | null>(null)
  const trRef = React.useRef<ITransformer | null>(null)
  const isSelected = id === selectedId
  const type = id.split('-')[0] as ShapeType

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
      shapeProps: {
        ...shape.shapeProps,
        x: node.x(),
        y: node.y(),
        // set minimal value
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(node.height() * scaleY),
        rotation: node.rotation(),
      },
    })
  }

  const handleDragEnd = (event: KonvaEventObject<DragEvent>) => {
    setShape({
      ...shape,
      shapeProps: {
        ...shape.shapeProps,
        x: event.target.x(),
        y: event.target.y(),
      },
    })
  }

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer()?.batchDraw()
    }
  }, [isSelected])

  const props = {
    ...shape.shapeProps,
    draggable: true,
    fill: getColorFromName(shape.color),
    onClick: handleSelect,
    onTap: handleSelect,
    onDragEnd: handleDragEnd,
    onTransformEnd: handleTransformEnd,
  }

  return (
    <>
      {type === 'Circle' && (
        <Circle {...props} ref={shapeRef as RefObject<ICircle>} radius={50} />
      )}

      {type === 'Rect' && (
        <Rect {...props} ref={shapeRef as RefObject<IRect>} radius={50} />
      )}

      {isSelected && <Transformer ref={trRef} />}
    </>
  )
}

export default Shape
