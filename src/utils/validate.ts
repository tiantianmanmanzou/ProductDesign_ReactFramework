/**
 * 验证邮箱格式
 * @param email 邮箱地址
 * @returns 是否有效
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * 验证手机号格式
 * @param phone 手机号
 * @returns 是否有效
 */
export function validatePhone(phone: string): boolean {
  const re = /^1[3-9]\d{9}$/
  return re.test(phone)
}

/**
 * 验证身份证号格式
 * @param idCard 身份证号
 * @returns 是否有效
 */
export function validateIdCard(idCard: string): boolean {
  const re = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[0-9Xx]$/
  return re.test(idCard)
}

/**
 * 验证密码强度
 * @param password 密码
 * @returns 强度等级 (0-4)
 */
export function validatePasswordStrength(password: string): number {
  let score = 0
  
  // 长度检查
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  
  // 字符类型检查
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z\d]/.test(password)) score++
  
  return Math.min(score, 4)
}

/**
 * 验证URL格式
 * @param url URL地址
 * @returns 是否有效
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 验证IP地址格式
 * @param ip IP地址
 * @returns 是否有效
 */
export function validateIP(ip: string): boolean {
  const re = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return re.test(ip)
}

/**
 * 验证用户名格式
 * @param username 用户名
 * @returns 是否有效
 */
export function validateUsername(username: string): boolean {
  // 4-20位，字母、数字、下划线、中划线
  const re = /^[a-zA-Z0-9_-]{4,20}$/
  return re.test(username)
}

/**
 * 验证中文姓名格式
 * @param name 姓名
 * @returns 是否有效
 */
export function validateChineseName(name: string): boolean {
  const re = /^[\u4e00-\u9fa5]{2,10}$/
  return re.test(name)
}