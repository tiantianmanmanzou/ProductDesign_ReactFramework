import React from 'react'
import { Outlet } from 'react-router-dom'
import VerticalIconMenu from '../common/VerticalIconMenu'
import type { VerticalIconMenuItem } from '../common/VerticalIconMenu'
import '../../styles/VerticalTabsPageLayout.scss'

interface VerticalTabsPageLayoutProps {
  menuItems: VerticalIconMenuItem[]
  menuWidth?: number
  menuBackgroundColor?: string
}

const VerticalTabsPageLayout: React.FC<VerticalTabsPageLayoutProps> = ({
  menuItems,
  menuWidth = 60,
  menuBackgroundColor = '#fafafa'
}) => {
  return (
    <div className="vertical-tabs-page-layout">
      {/* 左侧仅图标标签栏 - 完全贴边贴顶 */}
      <VerticalIconMenu 
        items={menuItems}
        width={menuWidth}
        backgroundColor={menuBackgroundColor}
        showBorder={false}
      />
      
      {/* 右侧内容区域 */}
      <div className="vertical-tabs-content">
        <Outlet />
      </div>
    </div>
  )
}

export default VerticalTabsPageLayout