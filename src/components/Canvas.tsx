import { KonvaEventObject } from 'konva/types/Node'
import { Stage as IStage } from 'konva/types/Stage'
import React, { useRef } from 'react'
import { Circle, Layer, Stage } from 'react-konva'
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { selectedShapeIdState, shapeIdListState } from '../atoms/shapes'
import Shape from './Shape'

export interface CanvasProps {
  width: number
  height: number
}

export default function Canvas({ width, height }: CanvasProps) {
  console.log('render <Canvas />')
  const Bridge = useRecoilBridgeAcrossReactRoots_UNSTABLE()
  const shapeIdList = useRecoilValue(shapeIdListState)
  const setSelectedShapeId = useSetRecoilState(selectedShapeIdState)
  const stageRef = useRef<IStage | null>(null)

  const checkDeselect = (event: KonvaEventObject<TouchEvent | MouseEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = event.target === event.target.getStage()
    if (clickedOnEmpty) {
      setSelectedShapeId(null)
    }
  }

  const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
    const stage = stageRef.current
    if (stage) {
      event.evt.preventDefault()

      const scaleBy = 1.1
      const oldScale = stage.scaleX()
      const pointer = stage.getPointerPosition()
      const deltaY = event.evt.deltaY
      const newScale = deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy

      if (pointer) {
        const mousePointTo = {
          x: (pointer.x - stage.x()) / oldScale,
          y: (pointer.y - stage.y()) / oldScale,
        }

        stage.position({
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale,
        })
        stage.scale({ x: newScale, y: newScale })
        stage.batchDraw()
      }
    }
  }

  return (
    <Stage
      {...{ width, height }}
      ref={stageRef}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      onWheel={handleWheel}
      draggable
    >
      <Bridge>
        <Layer>
          {shapeIdList.map(shapeId => (
            <Shape key={shapeId} id={shapeId} />
          ))}
        </Layer>
      </Bridge>
    </Stage>
  )
}
