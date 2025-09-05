import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useMatches, Outlet } from 'react-router-dom'
// import { message } from 'antd'
import '../../styles/NavigationLayout.scss'

interface NavigationLayoutProps {
  pageName?: string
  breadcrumbs?: string[]
}

const NavigationLayout: React.FC<NavigationLayoutProps> = ({
  pageName = '默认页面',
  breadcrumbs = []
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const matches = useMatches()
  
  const [dropdowns, setDropdowns] = useState({
    'system-admin': false,
    'product-management': false
  })
  
  const [activePage, setActivePage] = useState('')
  
  const routeConfig = {
    'system-admin': {
      '用户管理': '/user-management',
      '日志管理': '/log-management'
    },
    'product-management': {
      '商品上架管理': '/product-sale'
    }
  }

  useEffect(() => {
    setActivePage(pageName)
  }, [pageName])

  const showDropdown = (menuId: string) => {
    setDropdowns(prev => ({ ...prev, [menuId]: true }))
  }

  const hideDropdown = (menuId: string) => {
    setDropdowns(prev => ({ ...prev, [menuId]: false }))
  }

  const navigateTo = (target: string) => {
    if (target === location.pathname) {
      console.log('尝试导航到当前路由，已忽略。')
      return
    }

    try {
      navigate(target)
    } catch (error) {
      console.error(`导航到 ${target} 时出错:`, error)
    }
  }

  const isActiveModule = (moduleId: string) => {
    if (activePage === '') return false
    
    const modulePages = Object.keys(routeConfig[moduleId as keyof typeof routeConfig] || {})
    if (modulePages.includes(pageName)) {
      return true
    }
    
    const currentPath = location.pathname
    const modulePaths = Object.values(routeConfig[moduleId as keyof typeof routeConfig] || {})
    if (modulePaths.includes(currentPath)) {
      return true
    }
    
    if (modulePages.includes(activePage)) {
      return true
    }
    
    return false
  }

  // const showDevelopingTip = () => {
  //   message.info({
  //     content: '功能开发中，敬请期待',
  //     duration: 2
  //   })
  // }

  const getFinalBreadcrumbs = () => {
    // 如果通过props传递了breadcrumbs，优先使用
    if (breadcrumbs.length > 0) {
      return breadcrumbs
    }
    
    // 从路由匹配中获取面包屑
    const routeBreadcrumbs: string[] = []
    
    // 遍历所有匹配的路由，找到包含breadcrumb的handle
    matches.forEach(match => {
      if (match.handle && (match.handle as any).breadcrumb) {
        const breadcrumb = (match.handle as any).breadcrumb
        if (Array.isArray(breadcrumb)) {
          // 如果是数组，直接使用
          routeBreadcrumbs.push(...breadcrumb)
        } else {
          // 如果是字符串，添加到数组
          routeBreadcrumbs.push(breadcrumb)
        }
      }
    })
    
    // 如果从路由中找到了面包屑，使用路由面包屑
    if (routeBreadcrumbs.length > 0) {
      return routeBreadcrumbs
    }
    
    // 最后的备用方案：使用pageName
    return pageName ? [pageName] : []
  }

  const finalBreadcrumbs = getFinalBreadcrumbs()

  return (
    <div className="governance-layout">
      {/* 顶部导航栏 */}
      <div className="header">
        <div className="logo">
          <div className="system-name">企业数据管理平台</div>
        </div>
        <div className="nav-menu">
          <div 
            className={`nav-item ${isActiveModule('system-admin') ? 'active' : ''}`}
            onMouseEnter={() => showDropdown('system-admin')}
            onMouseLeave={() => hideDropdown('system-admin')}
          >
            <i className="icon icon-chart"></i>
            <span>系统管理</span>
            <div className={`dropdown-menu ${dropdowns['system-admin'] ? 'show' : ''}`}>
              <div 
                className={`dropdown-item ${activePage === '用户管理' ? 'active' : ''}`}
                onClick={() => navigateTo('/user-management')}
              >
                用户管理
              </div>
              <div 
                className={`dropdown-item ${activePage === '日志管理' ? 'active' : ''}`}
                onClick={() => navigateTo('/log-management')}
              >
                日志管理
              </div>
            </div>
          </div>
          <div 
            className={`nav-item ${isActiveModule('product-management') ? 'active' : ''}`}
            onMouseEnter={() => showDropdown('product-management')}
            onMouseLeave={() => hideDropdown('product-management')}
          >
            <i className="icon icon-shopping"></i>
            <span>商品管理</span>
            <div className={`dropdown-menu ${dropdowns['product-management'] ? 'show' : ''}`}>
              <div 
                className={`dropdown-item ${activePage === '商品上架管理' ? 'active' : ''}`}
                onClick={() => navigateTo('/product-sale')}
              >
                商品上架管理
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 面包屑导航 */}
      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <i className="icon icon-home"></i>
          {finalBreadcrumbs.length > 0 && finalBreadcrumbs.map((item, index) => (
            <span key={index}>
              <span className="breadcrumb-separator">/</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
      
      {/* 页面内容 */}
      <div className="layout-content">
        <div className="router-view-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default NavigationLayout