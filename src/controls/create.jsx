import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Events from 'events'
import { addClass } from '@common/util'
import './index.scss'

const { body } = document

const awaits = []
let active = null,
  zIndex = 9999

export default class Create extends Events {
  content
  container
  constructor(Control, content, options = {}) {
    super()
    const container = document.createElement('div')
    container.className = 'control'
    container.style.zIndex = (++zIndex).toString()
    container.style.width = options.width || 'auto'
    container.style.height = options.height || 'auto'
    container.style.minWidth = options.minWidth || 'auto'
    container.style.minHeight = options.minHeight || 'auto'
    if (options.className) {
      addClass(container, options.className)
    }
    body.appendChild(container)
    ReactDOM.render(<Control>{content}</Control>, container)
    this.container = container
    this.toCenter()
    this.content = content
    // 同一时间整个页面只允许一个提示，后续窗体处于等待显示状态
    if (!active) {
      active = this
    } else {
      awaits.push(this)
      container.style.display = 'none'
    }
  }

  // 获取当前激活窗口
  static active() {
    return active
  }

  set timeout(timeout) {
    setTimeout(() => {
      this.close()
    }, timeout)
  }

  toCenter() {
    const { offsetWidth, offsetHeight } = this.container,
      doc = window.document.documentElement
    this.container.style.left = (doc.offsetWidth - offsetWidth) / 2 + 'px'
    this.container.style.top = (doc.offsetHeight - offsetHeight) / 2 + 'px'
  }

  close() {
    if (ReactDOM.unmountComponentAtNode(this.container)) {
      this.emit('close')
      body.removeChild(this.container)
      active = null
      const create = awaits.shift()
      if (create) {
        active = create
        active.container.style.display = ''
      }
    }
  }
}
