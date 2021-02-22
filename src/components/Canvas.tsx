import { KonvaEventObject } from 'konva/types/Node'
import React, { forwardRef } from 'react'
import { Layer, Stage } from 'react-konva'
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { selectedShapeIdState, shapeIdListState } from '../atoms/shapes'
import Rectangle from '../components/Rectangle'

export interface CanvasProps {
  width: number
  height: number
}

export default forwardRef<HTMLDivElement, CanvasProps>(function Canvas(
  { width, height },
  ref,
) {
  console.log('render <Canvas />')
  const Bridge = useRecoilBridgeAcrossReactRoots_UNSTABLE()
  const shapeIdList = useRecoilValue(shapeIdListState)
  const setSelectedShapeId = useSetRecoilState(selectedShapeIdState)

  const checkDeselect = (event: KonvaEventObject<TouchEvent | MouseEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = event.target === event.target.getStage()
    if (clickedOnEmpty) {
      setSelectedShapeId(null)
    }
  }

  return (
    <section ref={ref} className="content">
      <Stage
        {...{ width, height }}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Bridge>
          <Layer>
            {shapeIdList.map(shapeId => (
              <Rectangle key={shapeId} id={shapeId} />
            ))}
          </Layer>
        </Bridge>
      </Stage>
    </section>
  )
})
