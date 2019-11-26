class Storage {
  classid
  data

  constructor() {
    this.data = {}
    this.classid = null
  }

  init(classid) {
    this.classid = classid
    const str = localStorage.getItem(classid)
    if (str) {
      try {
        const data = JSON.parse(str)
        if (data) {
          this.data = data
        }
      } finally {
        //
      }
    }
  }

  get(key) {
    if (Reflect.has(this.data, key)) {
      return this.data[key]
    }
    return null
  }

  set(key, value) {
    this.data[key] = value
    localStorage.setItem(this.classid, JSON.stringify(this.data))
    return value
  }

  remove(key) {
    if (Reflect.has(this.data, key)) {
      Reflect.deleteProperty(this.data, key)
      localStorage.setItem(this.classid, JSON.stringify(this.data))
      return true
    }
    return false
  }
}

const _storage = new Storage()

export default new Proxy(_storage, {
  get: function (target, name) {
    if (Reflect.has(target, name)) {
      return Reflect.get(target, name)
    }
    return target.get(name)
  },

  set: function (target, name, value) {
    if (Reflect.has(target, name)) {
      return Reflect.set(target, name, value)
    }
    target.set(name, value)
    return true
  }
})
