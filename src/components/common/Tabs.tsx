import React, { useState, useEffect, type ReactNode } from 'react'
import { Tooltip } from 'antd'
import '../../styles/Tabs.scss'

interface Tab {
  id: string | number
  label: string
  icon?: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab?: string | number
  onTabChange?: (tabId: string | number) => void
  children?: ReactNode
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  children
}) => {
  const [activeTabId, setActiveTabId] = useState<string | number>(
    activeTab || (tabs.length > 0 ? tabs[0].id : '')
  )

  useEffect(() => {
    if (activeTab && tabs.some(tab => tab.id === activeTab)) {
      setActiveTabId(activeTab)
    }
  }, [activeTab, tabs])

  useEffect(() => {
    if (!tabs.some(tab => tab.id === activeTabId)) {
      const newActiveId = tabs.length > 0 ? tabs[0].id : ''
      setActiveTabId(newActiveId)
      if (onTabChange) {
        onTabChange(newActiveId)
      }
    }
  }, [tabs, activeTabId, onTabChange])

  const selectTab = (tabId: string | number) => {
    if (activeTabId !== tabId) {
      setActiveTabId(tabId)
      if (onTabChange) {
        onTabChange(tabId)
      }
    }
  }

  return (
    <div className="tabs-container">
      <ul className="tabs-list">
        {tabs.map(tab => (
          <li
            key={tab.id}
            className={`tabs-item ${tab.id === activeTabId ? 'active' : ''}`}
            onClick={() => selectTab(tab.id)}
          >
            <Tooltip title={tab.label} placement="right" mouseEnterDelay={0.3}>
              <div className="tab-item-content">
                {tab.icon && <i className={`tab-icon ${tab.icon}`} />}
                <span className="tab-label">{tab.label}</span>
              </div>
            </Tooltip>
          </li>
        ))}
      </ul>
      
      {/* Tab content area - hidden by default but can be used if needed */}
      <div className="tab-content" style={{ display: 'none' }}>
        {children}
      </div>
    </div>
  )
}

export default Tabs