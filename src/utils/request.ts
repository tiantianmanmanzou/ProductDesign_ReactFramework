import axios from 'axios'
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { message } from 'antd'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '/api', // url = base url + request url
  timeout: 10000, // 请求超时时间
  withCredentials: true // 跨域请求时发送Cookie
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config
  },
  (error: AxiosError) => {
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data

    // 如果返回的状态码不是200，说明接口有问题，将会在下方做错误处理
    if (res.code && res.code !== 200) {
      message.error(res.message || '请求错误')
      return Promise.reject(new Error(res.message || '请求错误'))
    } else {
      return res
    }
  },
  (error: AxiosError) => {
    console.log('err' + error) // for debug
    const { status } = error.response || {}
    const errorMsg = (error.response?.data as any)?.message || error.message
    
    // 根据HTTP状态码显示不同的错误消息
    let messageText = '网络错误，请稍后再试'
    if (status === 400) {
      messageText = '请求参数错误'
    } else if (status === 401) {
      messageText = '未授权，请尝试刷新页面'
    } else if (status === 403) {
      messageText = '拒绝访问'
    } else if (status === 404) {
      messageText = '请求的资源不存在'
    } else if (status && status >= 500) {
      messageText = '服务器错误，请联系管理员'
    }
    
    message.error(errorMsg || messageText)
    
    return Promise.reject(error)
  }
)

export default service