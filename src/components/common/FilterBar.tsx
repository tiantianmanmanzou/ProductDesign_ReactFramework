import React, { useState, type ReactNode } from 'react'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import '../../styles/FilterBar.scss'

interface FilterBarProps {
  children?: ReactNode
  header?: ReactNode
  className?: string
  onCollapseChange?: (collapsed: boolean) => void
}

const FilterBar: React.FC<FilterBarProps> = ({
  children,
  header,
  className = '',
  onCollapseChange
}) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapse = () => {
    const newCollapsed = !collapsed
    setCollapsed(newCollapsed)
    if (onCollapseChange) {
      onCollapseChange(newCollapsed)
    }
  }

  return (
    <div className={`filter-bar ${collapsed ? 'collapsed' : ''} ${className}`}>
      <Button
        className="collapse-btn-outer-left"
        onClick={toggleCollapse}
        icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
        size="small"
        type="text"
      />
      
      {header && !collapsed && (
        <div className="filter-bar-header">
          {header}
        </div>
      )}
      
      <div 
        className="filter-bar-content"
        style={{
          opacity: collapsed ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
      >
        {!collapsed && (children || '筛选内容')}
      </div>
    </div>
  )
}

export default FilterBar