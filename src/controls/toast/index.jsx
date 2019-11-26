import * as React from 'react'
import Create from '@controls/create'
import './index.scss'

export default class Toast extends React.Component {

  render() {
    const { children } = this.props
    return <div className="toast">{children}</div>
  }
}

export const toast = function (content, options) {
  return new Create(Toast, content, options || { width: "200px", height: "80px" })
}
