import { CSSProperties } from 'react'

export type Color =
  | 'bg'
  | 'selection'
  | 'white'
  | 'blue'
  | 'cyan'
  | 'green'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'yellow'

export const colors: [Color, CSSProperties['color']][] = [
  ['bg', '#282a36'],
  ['selection', '#44475a'],
  ['white', '#f8f8f2'],
  ['blue', '#6272a4'],
  ['cyan', '#8be9fd'],
  ['green', '#50fa7b'],
  ['orange', '#ffb86c'],
  ['pink', '#ff79c6'],
  ['purple', '#bd93f9'],
  ['red', '#ff5555'],
  ['yellow', '#f1fa8c'],
]

export function getColorFromName(name: Color): CSSProperties['color'] {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return colors.find(color => color[0] === name)![1]
}
