import { KonvaEventObject } from 'konva/types/Node'
import React from 'react'
import { Stage, Layer } from 'react-konva'

import Rectangle, { RectModel } from './components/Rectangle'
import useWindowSize from './hooks/useWindowSize'

const initialRectangles: RectModel[] = [
  {
    id: 'rect1',
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'red',
  },
  {
    id: 'rect2',
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'green',
  },
]

function App() {
  const [rectangles, setRectangles] = React.useState(initialRectangles)
  const [selectedId, selectShape] = React.useState<string | null>(null)
  const windowSize = useWindowSize()

  const checkDeselect = (event: KonvaEventObject<TouchEvent | MouseEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = event.target === event.target.getStage()
    if (clickedOnEmpty) {
      selectShape(null)
    }
  }

  return (
    <Stage
      {...windowSize}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, i) => (
          <Rectangle
            key={i}
            shapeProps={rect}
            isSelected={rect.id === selectedId}
            onSelect={() => {
              selectShape(rect.id)
            }}
            onChange={newAttrs => {
              const rects = rectangles.slice()
              rects[i] = newAttrs
              setRectangles(rects)
            }}
          />
        ))}
      </Layer>
    </Stage>
  )
}

export default App
