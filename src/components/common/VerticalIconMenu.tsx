import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, Tooltip } from 'antd'
import type { MenuProps } from 'antd'

export interface VerticalIconMenuItem {
  key: string
  icon: React.ReactNode
  label: string
  tooltip?: string
}

interface VerticalIconMenuProps {
  items: VerticalIconMenuItem[]
  width?: number
  backgroundColor?: string
  selectedKeys?: string[]
  onMenuClick?: (key: string) => void
  className?: string
  showBorder?: boolean
}

const VerticalIconMenu: React.FC<VerticalIconMenuProps> = ({
  items,
  width = 60,
  backgroundColor = '#fafafa',
  selectedKeys,
  onMenuClick,
  className = '',
  showBorder = true
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  // 转换为Ant Design Menu格式
  const menuItems: MenuProps['items'] = items.map(item => ({
    key: item.key,
    icon: (
      <Tooltip title={item.tooltip || item.label} placement="right">
        <div style={{ 
          fontSize: '24px', // 增大图标字体大小到24px，与CSS样式一致
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '32px', // 图标区域32px，与CSS样式一致
          height: '32px'
        }}>
          {item.icon}
        </div>
      </Tooltip>
    ),
    label: null
  }))

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (onMenuClick) {
      onMenuClick(key as string)
    } else {
      navigate(key as string)
    }
  }

  const currentSelectedKeys = selectedKeys || [location.pathname]

  return (
    <div style={{ 
      width: `${width}px`, 
      backgroundColor,
      borderRight: showBorder ? '1px solid #e8e8e8' : 'none',
      padding: '0',
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // 确保内容水平居中
      boxSizing: 'border-box'
    }}>
      <Menu
        selectedKeys={currentSelectedKeys}
        mode="vertical"
        items={menuItems}
        onClick={handleMenuClick}
        style={{ 
          border: 'none',
          backgroundColor: 'transparent',
          width: '100%', // 使用100%宽度
          margin: '0',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Menu组件内容也居中
          gap: '0', // 确保没有间隙
          lineHeight: '1' // 重置行高避免额外空间
        }}
        className={`icon-only-menu ${className}`}
      />
    </div>
  )
}

export default VerticalIconMenu