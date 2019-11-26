import React from 'react'
import {
  render
} from 'react-dom'
import classnames from 'classnames'
import '@scss/login'

class Index extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return <div class="container">
      我是登录页面
    </div>
  }
}

render(<Index />, document.body)
