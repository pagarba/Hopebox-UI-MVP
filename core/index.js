
import React from 'react'
import {render} from 'react-dom'

import '../sass/main.scss'

const App = () => (
  <div className="container">
    <div className="middle">
      <div className="text-center">
        <img alt="HopeBox" src="img/logo-full.jpg" />
      </div>
      <div className="flex flex-row flex-around margin-top-10">
        <a className="jumbo" href="mobile/">Mobile Device Interface</a>
        <a className="jumbo" href="web/">Command Center Interface</a>
      </div>
    </div>
  </div>
)

render(<App />, document.getElementById('app-root'))
