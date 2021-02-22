import React, { CSSProperties, FC, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'

import App from './components/App/App'
import { colors } from './components/App/colors'
import reportWebVitals from './reportWebVitals'

const variables = colors.map(([name, hex]) => ({
  [`--${name}-color`]: hex,
}))

const ThemeProvider: FC = ({ children }) => (
  <div style={Object.assign({}, ...variables) as CSSProperties}>{children}</div>
)

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
