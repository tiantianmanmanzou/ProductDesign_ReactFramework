import { Suspense, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, Spin } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import router from './router'
import { isInIframe, hasIframeParam } from './utils/iframe'
import './App.css'

function App() {
  const isIframeMode = isInIframe() || hasIframeParam()

  useEffect(() => {
    // Set global iframe mode
    ;(window as any).VUE_APP_IFRAME_MODE = isIframeMode

    if (isIframeMode) {
      console.log('应用运行在iframe模式下')
      document.body.classList.add('iframe-embedded')
    }

    // Trigger render complete event
    const timer = setTimeout(() => {
      document.dispatchEvent(new Event('render-event'))
    }, 100)

    return () => clearTimeout(timer)
  }, [isIframeMode])

  return (
    <ConfigProvider locale={zhCN}>
      <div 
        id="app"
        className={isIframeMode ? 'iframe-mode' : ''}
        style={{
          height: '100%',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        }}
      >
        <Suspense fallback={
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
          }}>
            <Spin size="large" />
          </div>
        }>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </ConfigProvider>
  )
}

export default App
