import Cookies from 'js-cookie'

// Token相关
export const getToken = (): string | undefined => {
  return Cookies.get('token')
}

export const setToken = (token: string): void => {
  Cookies.set('token', token)
}

export const removeToken = (): void => {
  Cookies.remove('token')
}

// LocalStorage 封装
export const storage = {
  get(key: string): any {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('Storage get error:', error)
      return null
    }
  },

  set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Storage set error:', error)
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Storage remove error:', error)
    }
  },

  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Storage clear error:', error)
    }
  }
}

// SessionStorage 封装
export const sessionStorage = {
  get(key: string): any {
    try {
      const value = window.sessionStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('SessionStorage get error:', error)
      return null
    }
  },

  set(key: string, value: any): void {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('SessionStorage set error:', error)
    }
  },

  remove(key: string): void {
    try {
      window.sessionStorage.removeItem(key)
    } catch (error) {
      console.error('SessionStorage remove error:', error)
    }
  },

  clear(): void {
    try {
      window.sessionStorage.clear()
    } catch (error) {
      console.error('SessionStorage clear error:', error)
    }
  }
}