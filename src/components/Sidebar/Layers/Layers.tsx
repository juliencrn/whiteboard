import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'

import { useRecoilState } from 'recoil'
import {
  shapeStateFamily,
  selectedShapeIdState,
  shapeIdListState,
} from '../../../atoms/shapes'
import { getColorFromName } from '../../App/theme'
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
    <span
      key={props.shapeId}
      className={`Layer ${active ? 'active' : ''}`}
      onClick={handleClick}
    >
      {isEditing ? (
        <input autoFocus onChange={handleChange} value={shape.name} />
      ) : (
        shape.name
      )}
    </span>
  )
}

// TODO: This follow works but not to the first and last item :/
export default function Layers() {
  console.log('render <Layers />')

  const [shapeIdList, setShapeIdList] = useRecoilState(shapeIdListState)

  const handleDragEnd = (result: DropResult): void => {
    function updateList<T>(prevList: T[]): T[] {
      // dropped outside the list
      if (!result.destination?.index) {
        return prevList
      }
      return reorder(prevList, result.source.index, result.destination.index)
    }

    setShapeIdList(updateList)
  }

  return (
    <div className="Layers">
      <h2 className="Sidebar-title">Shapes</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="LayerList">
          {provided => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {shapeIdList.map((shapeId, index) => (
                <Draggable index={index} draggableId={shapeId} key={shapeId}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      <Layer shapeId={shapeId} />
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  background: isDragging ? getColorFromName('blue') : getColorFromName('bg'),
  color: isDragging ? getColorFromName('bg') : getColorFromName('blue'),
  ...draggableStyle,
})

// a little function to help us with reordering the result
function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
