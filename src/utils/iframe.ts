/**
 * 检测应用是否在iframe中运行
 * @returns {boolean} 是否在iframe中
 */
export function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch (e) {
    // 如果访问window.top抛出异常，则说明当前页面在跨域iframe中
    return true;
  }
}

/**
 * 检测URL中是否有iframe参数
 * @returns {boolean} URL中是否包含iframe参数
 */
export function hasIframeParam(): boolean {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('iframe') || urlParams.has('inframe');
}

/**
 * 获取iframe相关URL参数
 * @returns {Object} iframe相关参数对象
 */
export function getIframeParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    isIframe: hasIframeParam(),
    parentId: urlParams.get('parentId') || '',
    parentName: urlParams.get('parentName') || ''
  };
}

/**
 * 判断是否应该显示导航和面包屑
 * 当页面在iframe中运行或URL中有iframe=true参数时返回false
 * @returns {boolean} 是否应该显示导航和面包屑
 */
export function shouldShowNavigation(): boolean {
  const inIframe = isInIframe();
  const hasParam = hasIframeParam();
  const result = !(inIframe || hasParam);
  console.log('iframe检测 - shouldShowNavigation():', result);
  return result;
}