import React 							from 'react'
import {render} 					from 'react-dom'
import BrowserRouter    from 'react-router/BrowserRouter'
import {AppContainer}   	from 'react-hot-loader'
import App  							from './app'

render(
  <AppContainer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('application-container')
)

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    render(
      <AppContainer>
        <BrowserRouter>
          <NextApp />
        </BrowserRouter>
      </AppContainer>,
      document.getElementById('application-container')
    )
  })
}