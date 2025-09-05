import React from 'react'
import { Button, Space } from 'antd'
import type { ActionButton as ActionButtonType } from '../../types'
import '../../styles/ActionButton.scss'

interface ActionButtonProps {
  buttons: ActionButtonType[]
  onAction: (action: string) => void
  isTableAction?: boolean // 新增属性，标识是否为表格操作按钮
}

const ActionButton: React.FC<ActionButtonProps> = ({ buttons, onAction, isTableAction = false }) => {
  const handleClick = (action: string) => {
    onAction(action)
  }

  // 表格操作按钮的特殊样式
  const getTableActionStyle = (button: ActionButtonType) => {
    if (!isTableAction) return {}
    
    return {
      border: 'none',
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      outline: 'none',
      outlineWidth: 0,
      outlineStyle: 'none',
      outlineColor: 'transparent',
      boxShadow: 'none',
      background: 'transparent',
      backgroundColor: 'transparent',
      padding: 0,
      margin: 0,
      height: 'auto',
      minHeight: 'auto',
      lineHeight: 1.4,
      fontSize: '14px',
      color: button.name === 'delete' ? '#F56C6C' : '#1890ff',
      textDecoration: 'none',
      transition: 'color 0.3s'
    }
  }

  // 表格操作按钮的事件处理
  const getTableActionEvents = (button: ActionButtonType) => {
    if (!isTableAction) return {}
    
    return {
      onFocus: (e: React.FocusEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        target.style.outline = 'none';
        target.style.border = 'none';
        target.style.boxShadow = 'none';
      },
      onBlur: (e: React.FocusEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        target.style.outline = 'none';
        target.style.border = 'none';
        target.style.boxShadow = 'none';
      },
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        target.style.color = button.name === 'delete' ? '#f78989' : '#40a9ff';
        target.style.outline = 'none';
        target.style.border = 'none';
        target.style.boxShadow = 'none';
      },
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        target.style.color = button.name === 'delete' ? '#F56C6C' : '#1890ff';
        target.style.outline = 'none';
        target.style.border = 'none';
        target.style.boxShadow = 'none';
      }
    }
  }

  return (
    <div className={`action-button ${isTableAction ? 'table-action' : ''}`}>
      <Space>
        {buttons.map((button) => (
          <Button
            key={button.name}
            type={button.type || 'primary'}
            size={button.size || 'middle'}
            disabled={typeof button.disabled === 'function' ? button.disabled({}) : button.disabled}
            onClick={() => handleClick(button.name)}
            data-action={button.name}
            style={getTableActionStyle(button)}
            {...getTableActionEvents(button)}
          >
            {button.label}
          </Button>
        ))}
      </Space>
    </div>
  )
}

export default ActionButton