import React from 'react'
import { v4 as uuid } from 'uuid'
import { useSetRecoilState } from 'recoil'
import { selectedShapeIdState, shapeIdListState } from '../atoms/shapes'

export default function AddShapeButton() {
  console.log('render <AddShapeButton />')
  const setShapeIdList = useSetRecoilState(shapeIdListState)
  const setSelectedId = useSetRecoilState(selectedShapeIdState)

  const add = () => {
    const id = uuid()
    setSelectedId(id)
    setShapeIdList(prevList => [...prevList, id])
  }

  return <button onClick={add}>+ Rect</button>
}
