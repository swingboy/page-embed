import axios from 'axios'

const headers = {
  "x-xx": "test"
}
if (localStorage.getItem('x-device-id')) {
  headers['x-device-id'] = localStorage.getItem('x-device-id')
}
if (localStorage.getItem('x-token')) {
  headers['x-token'] = localStorage.getItem('x-token')
}
const BaseApi = function() {
  if (process.env.NODE_ENV === 'development') {
    return '/api'
  }
  return 'https://hello.workd.com'
}()
const Axios = axios.create({
  headers,
  baseURL: BaseApi
})

Axios.interceptors.response.use(
  res => {
    if (res.headers['x-device-id']) {
      localStorage.setItem('x-device-id', res.headers['x-device-id'])
    }
    if (res.headers['x-token']) {
      localStorage.setItem('x-token', res.headers['x-token'])
    }
    if (res.status === 200) {
      return Promise.resolve(res.data)
    }
    return Promise.reject(res)
  }
)

export default Axios
export {
  BaseApi
}
