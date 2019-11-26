const slog = require('single-line-log').stdout

class ProgressBar {
  constructor(description = 'Progress', bar_length = 50) {
    this.description = description
    this.bar_length = bar_length
  }

  render(completed, total) {
    let percent = (completed / total).toFixed(4) // 计算进度(子任务的 完成数 除以 总数)
    let cell_num = Math.floor(percent * this.bar_length) // 计算需要多少个 █ 符号来拼凑图案

    // 拼接黑色条
    let cell = ''
    for (let i = 0; i < cell_num; i++) {
      cell += '█'
    }

    // 拼接灰色条
    let empty = ''
    for (let i = 0; i < this.bar_length - cell_num; i++) {
      empty += '░'
    }

    // 拼接最终文本
    const cmd_text = this.description + ': ' + (100 * percent).toFixed(2) + '% ' + cell + empty + ' ' + completed + '/' + total

    // 在单行输出文本
    slog(cmd_text)
  }
}

module.exports = ProgressBar
