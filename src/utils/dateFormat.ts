import dayjs from 'dayjs'

/**
 * 格式化日期
 * @param date 日期
 * @param format 格式
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: string | Date | number, format: string = 'YYYY-MM-DD'): string {
  return dayjs(date).format(format)
}

/**
 * 格式化日期时间
 * @param date 日期时间
 * @param format 格式
 * @returns 格式化后的日期时间字符串
 */
export function formatDateTime(date: string | Date | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(date).format(format)
}

/**
 * 获取相对时间
 * @param date 日期
 * @returns 相对时间字符串
 */
export function getRelativeTime(date: string | Date | number): string {
  const now = dayjs()
  const target = dayjs(date)
  const diff = now.diff(target, 'minute')

  if (diff < 1) {
    return '刚刚'
  } else if (diff < 60) {
    return `${diff}分钟前`
  } else if (diff < 24 * 60) {
    return `${Math.floor(diff / 60)}小时前`
  } else if (diff < 7 * 24 * 60) {
    return `${Math.floor(diff / (24 * 60))}天前`
  } else {
    return formatDate(date)
  }
}

/**
 * 检查日期是否为今天
 * @param date 日期
 * @returns 是否为今天
 */
export function isToday(date: string | Date | number): boolean {
  return dayjs(date).isSame(dayjs(), 'day')
}

/**
 * 检查日期是否为本周
 * @param date 日期
 * @returns 是否为本周
 */
export function isThisWeek(date: string | Date | number): boolean {
  return dayjs(date).isSame(dayjs(), 'week')
}