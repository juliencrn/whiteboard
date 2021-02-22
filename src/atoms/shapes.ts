import { atom, atomFamily } from 'recoil'
import { RectConfig } from 'konva/types/shapes/Rect'
import { Color } from '../components/App/colors'

export interface RectModel extends RectConfig {
  id: string
  name: string
  createdAt: number
  x: number
  y: number
  width: number
  height: number
  rotation: number
  color: Color
}

export const shapeIdListState = atom<string[]>({
  key: 'shape-id-list-state',
  default: [],
})

export const selectedShapeIdState = atom<string | null>({
  key: 'selected-shape-id-state',
  default: null,
})

export const rectStateFamily = atomFamily<RectModel, string>({
  key: 'rect-state-family',
  default: id => ({
    id,
    name: 'Rect',
    createdAt: Date.now(),
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    rotation: 0,
    color: 'blue',
  }),
})
