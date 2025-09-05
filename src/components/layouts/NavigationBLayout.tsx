import React, { useState, useEffect, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { message } from 'antd'
import '../../styles/NavigationLayout.scss'

interface NavigationBLayoutProps {
  pageName?: string
  breadcrumbs?: string[]
  children?: ReactNode
}

interface RouteConfig {
  [key: string]: {
    [key: string]: string
  }
}

const NavigationBLayout: React.FC<NavigationBLayoutProps> = ({
  pageName = '默认页面',
  breadcrumbs = [],
  children
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [dropdowns, setDropdowns] = useState({
    'identify-task': false,
    'resource-management': false,
    'asset-list': false,
    'data-filing': false,
    'system-admin': false
  })
  
  const [activePage, setActivePage] = useState('')
  
  const routeConfig: RouteConfig = {
    'identify-task': {
      '数据资源管理': '/resource-identify',
      '敏感数据管理': '/sensitive-identify',
      '数据同步配置': '/sync-config'
    },
    'resource-management': {
      '待认领数据查询': '/resource-query',
      '数据认领': '/resource-claim',
      '数据清单': '/resource-list'
    },
    'asset-list': {
      '全量数据清单': '/asset/list',
      '敏感数据清单': '/sensitive-assets',
      '数据监控报表配置': '/asset-report-config',
      '数据清单批量更新': '/asset-batch-update'
    },
    'data-filing': {
      '敏感数据登记': '/data-filing/filing',
      '敏感数据特殊情况': '/data-filing/claim'
    },
    'system-admin': {
      '用户管理': '/user-management',
      '日志管理': '/log-management'
    }
  }

  // 计算最终面包屑
  const getFinalBreadcrumbs = (): string[] => {
    // 优先使用路由元信息中的 customBreadcrumb（目前React Router没有meta，可以扩展）
    // 这里可以通过路由配置来实现类似功能
    
    // 格式化面包屑字符串
    if (pageName && (pageName.includes('>') || pageName.includes('/'))) {
      const separator = pageName.includes('>') ? '>' : '/'
      return pageName.split(separator).map(item => item.trim())
    }
    
    // 如果传入了breadcrumbs参数，使用它
    if (breadcrumbs.length > 0) {
      return breadcrumbs
    }
    
    // 如果没有分隔符，返回空数组
    return []
  }

  const finalBreadcrumbs = getFinalBreadcrumbs()

  useEffect(() => {
    // 根据当前路由设置激活页面
    setActivePage(pageName)
  }, [pageName])

  const showDropdown = (menuId: string) => {
    setDropdowns(prev => ({ ...prev, [menuId]: true }))
  }

  const hideDropdown = (menuId: string) => {
    setDropdowns(prev => ({ ...prev, [menuId]: false }))
  }

  const navigateTo = (target: string) => {
    // 检查目标是否与当前路由相同
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

  const isActiveModule = (moduleId: string): boolean => {
    if (activePage === '') return false
    
    const modulePages = Object.keys(routeConfig[moduleId] || {})
    if (modulePages.includes(pageName)) {
      return true
    }
    
    const currentPath = location.pathname
    const modulePaths = Object.values(routeConfig[moduleId] || {})
    if (modulePaths.includes(currentPath)) {
      return true
    }
    
    if (modulePages.includes(activePage)) {
      return true
    }
    
    return false
  }

  const showDevelopingTip = () => {
    message.info('功能开发中，敬请期待')
  }

  return (
    <div className="governance-layout">
      {/* 顶部导航栏 */}
      <div className="header">
        <div className="logo">
          <div className="system-name">企业数据管理平台</div>
        </div>
        <div className="nav-menu">
          <div 
            className={`nav-item ${isActiveModule('identify-task') ? 'active' : ''}`}
            onMouseEnter={() => showDropdown('identify-task')}
            onMouseLeave={() => hideDropdown('identify-task')}
          >
            <i className="icon icon-eye"></i>
            <span>数据任务管理</span>
            <div className="dropdown-menu" style={{ display: dropdowns['identify-task'] ? 'block' : 'none' }}>
              <div 
                className={`dropdown-item ${activePage === '数据资源管理' ? 'active' : ''}`}
                onClick={() => navigateTo('/resource-identify')}
              >
                数据资源管理
              </div>
              <div 
                className={`dropdown-item ${activePage === '敏感数据管理' ? 'active' : ''}`}
                onClick={() => navigateTo('/sensitive-identify')}
              >
                敏感数据管理
              </div>
              <div 
                className={`dropdown-item ${activePage === '数据同步配置' ? 'active' : ''}`}
                onClick={() => navigateTo('/sync-config')}
              >
                数据同步配置
              </div>
            </div>
          </div>
          
          <div 
            className={`nav-item ${isActiveModule('resource-management') ? 'active' : ''}`}
            onMouseEnter={() => showDropdown('resource-management')}
            onMouseLeave={() => hideDropdown('resource-management')}
          >
            <i className="icon icon-list"></i>
            <span>数据管理</span>
            <div className="dropdown-menu" style={{ display: dropdowns['resource-management'] ? 'block' : 'none' }}>
              <div 
                className={`dropdown-item ${activePage === '待认领数据查询' ? 'active' : ''}`}
                onClick={() => navigateTo('/resource-query')}
              >
                待认领数据查询
              </div>
              <div 
                className={`dropdown-item ${activePage === '数据认领' ? 'active' : ''}`}
                onClick={() => navigateTo('/resource-claim')}
              >
                数据认领
              </div>
              <div 
                className={`dropdown-item ${activePage === '数据清单' ? 'active' : ''}`}
                onClick={() => navigateTo('/resource-list')}
              >
                数据清单
              </div>
            </div>
          </div>
          
          <div 
            className={`nav-item ${isActiveModule('asset-list') ? 'active' : ''}`}
            onMouseEnter={() => showDropdown('asset-list')}
            onMouseLeave={() => hideDropdown('asset-list')}
          >
            <i className="icon icon-list"></i>
            <span>数据清单</span>
            <div className="dropdown-menu" style={{ display: dropdowns['asset-list'] ? 'block' : 'none' }}>
              <div 
                className={`dropdown-item ${activePage === '全量数据清单' ? 'active' : ''}`}
                onClick={() => navigateTo('/asset/list')}
              >
                全量数据清单
              </div>
              <div 
                className={`dropdown-item ${activePage === '敏感数据清单' ? 'active' : ''}`}
                onClick={() => navigateTo('/sensitive-assets')}
              >
                敏感数据清单
              </div>
              <div 
                className={`dropdown-item ${activePage === '数据监控报表配置' ? 'active' : ''}`}
                onClick={() => navigateTo('/asset-report-config')}
              >
                数据监控报表配置
              </div>
              <div 
                className={`dropdown-item ${activePage === '数据清单批量更新' ? 'active' : ''}`}
                onClick={() => navigateTo('/asset-batch-update')}
              >
                数据清单批量更新
              </div>
            </div>
          </div>
          
          <div 
            className={`nav-item ${isActiveModule('data-filing') ? 'active' : ''}`}
            onMouseEnter={() => showDropdown('data-filing')}
            onMouseLeave={() => hideDropdown('data-filing')}
          >
            <i className="icon icon-shield"></i>
            <span>数据登记</span>
            <div className="dropdown-menu" style={{ display: dropdowns['data-filing'] ? 'block' : 'none' }}>
              <div 
                className={`dropdown-item ${activePage === '敏感数据登记' ? 'active' : ''}`}
                onClick={() => navigateTo('/data-filing/filing')}
              >
                敏感数据登记
              </div>
              <div 
                className={`dropdown-item ${activePage === '敏感数据特殊情况' ? 'active' : ''}`}
                onClick={showDevelopingTip}
              >
                敏感数据特殊情况
              </div>
            </div>
          </div>
          
          <div 
            className={`nav-item ${isActiveModule('system-admin') ? 'active' : ''}`}
            onMouseEnter={() => showDropdown('system-admin')}
            onMouseLeave={() => hideDropdown('system-admin')}
          >
            <i className="icon icon-chart"></i>
            <span>系统管理</span>
            <div className="dropdown-menu" style={{ display: dropdowns['system-admin'] ? 'block' : 'none' }}>
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
        </div>
      </div>
      
      {/* 面包屑导航 */}
      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <i className="icon icon-home"></i>
          {finalBreadcrumbs.length > 0 ? (
            finalBreadcrumbs.map((item, index) => (
              <span key={index}>
                <span className="breadcrumb-separator">/</span>
                <span>{item}</span>
              </span>
            ))
          ) : (
            pageName && !(pageName.includes('>') || pageName.includes('/')) && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span id="current-page">{pageName}</span>
              </>
            )
          )}
        </div>
      </div>
      
      {/* 页面内容 */}
      <div className="layout-content">
        <div className="router-view-wrapper">
          {children}
        </div>
      </div>
    </div>
  )
}

export default NavigationBLayout