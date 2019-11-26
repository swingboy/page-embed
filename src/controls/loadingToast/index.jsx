import React from 'react'
import * as ReactDOM from 'react-dom'
import './index.scss'

let toast = (content = '', timeout = 3000, cb = () => {}) => {
  class Toast {
    constructor() {
      this.timer = null
      this.show()
    }

    show() {
      const container = document.createElement('div')
      container.className = 'my-alert'
      document.body.appendChild(container)
      ReactDOM.render(
        <div className="alert-wrap" onClick={this.destory.bind(this)}>
          <div className="content">
            { timeout <= 0 &&
              <svg viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20"></circle>
              </svg>
            }
            <div className="content-text">{ content }</div>
          </div>
        </div>, container)

      this.container = container
      if (timeout > 0) {
        this.timer = setTimeout(() => {
          this.destory()
        }, timeout)
      }
    }

    destory() {
      if (ReactDOM.unmountComponentAtNode(this.container)) {
        document.body.removeChild(this.container)
        if (typeof cb === 'function') {
          cb()
        }
      }
    }
  }

  return new Toast()
}

export default toast
