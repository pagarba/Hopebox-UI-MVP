
import '@babel/polyfill'
import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import {Provider} from 'react-redux'
import React from 'react'
import Reducers from './common/Reducers'
import {render} from 'react-dom'
import thunk from 'redux-thunk'

import App from './App'
import {HashRouter} from 'react-router-dom'

const store = createStore(
  Reducers,
  applyMiddleware(createLogger(), thunk),
)

render((
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
), document.getElementById('app-root'))

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .catch(err => console.log('react app load error:', err))

  navigator.serviceWorker.addEventListener('message', ev => {
    store.dispatch(ev.data)
  })
}
