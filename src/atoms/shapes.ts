import { atom, atomFamily } from 'recoil'
import { Color, navbarHeight, sidebarWidth } from '../components/App/theme'
import { RectConfig } from 'konva/types/shapes/Rect'
import { CircleConfig } from 'konva/types/shapes/Circle'

export type ShapeType =
  | 'Rect'
  | 'Circle'
  | 'Triangle'
  | 'Text'
  | 'Line'
  | 'Image'

export interface IShape {
  id: string
  type: ShapeType
  name: string
  createdAt: number
  color: Color
  shapeProps: RectConfig | CircleConfig
}

export const shapeIdListState = atom<string[]>({
  key: 'shape-id-list-state',
  default: [],
})

export const selectedShapeIdState = atom<string | null>({
  key: 'selected-shape-id-state',
  default: null,
})

export const shapeStateFamily = atomFamily<IShape, string>({
  key: 'shape-state-family',
  default: id => {
    const type = id.split('-')[0] as ShapeType
    return {
      id: `${type}-${id}`,
      type,
      name: `${type}`,
      createdAt: Date.now(),
      color: 'blue',
      shapeProps: {
        x: 48 + sidebarWidth,
        y: 48 + navbarHeight,
        width: 100,
        height: 100,
        rotation: 0,
        radius: type === 'Circle' ? 50 : 0,
      },
    }
  },
})
