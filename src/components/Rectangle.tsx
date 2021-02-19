import React, { useEffect, useRef } from 'react'
import { Rect, Transformer } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'
import { RectConfig, Rect as IRect } from 'konva/types/shapes/Rect'
import { Transformer as ITransformer } from 'konva/types/shapes/Transformer'

export interface RectModel extends RectConfig {
  id: string
  x: number
  y: number
  width: number
  height: number
}

export interface RectangleProps {
  shapeProps: RectModel
  isSelected: boolean
  onSelect: () => void
  onChange: (newAttrs: RectModel) => void
}

function Rectangle({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: RectangleProps) {
  const shapeRef = useRef<IRect | null>(null)
  const transformerRef = useRef<ITransformer | null>(null)

  const handleDragEnd = (event: KonvaEventObject<DragEvent>) => {
    onChange(event.target.attrs)
  }

  const handleTransformEnd = (event: KonvaEventObject<DragEvent>) => {
    onChange(event.target.attrs)
  }

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      // we need to attach transformer manually
      transformerRef.current.nodes([shapeRef.current])
      transformerRef.current?.getLayer()?.batchDraw()
    }
  }, [isSelected])

  return (
    <>
      <Rect
        {...shapeProps}
        ref={shapeRef}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />

      {isSelected && <Transformer ref={transformerRef} />}
    </>
  )
}

export default Rectangle
