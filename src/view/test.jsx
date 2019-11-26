import React from 'react'
import {render} from 'react-dom'
import '@common/flexible'
import '@scss/test';

class Index extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <div class="container">
      我是测试页面
    </div>
  }
}

render(<Index />, document.body)
