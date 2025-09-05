import React, { type ReactNode, type CSSProperties } from 'react'
import { Modal, Button } from 'antd'
import type { ModalProps } from 'antd'
import '../../styles/DialogWrapper.scss'

interface DialogWrapperProps extends Omit<ModalProps, 'visible' | 'onOk' | 'onCancel'> {
  // 控制对话框显示
  visible: boolean
  onVisibleChange?: (visible: boolean) => void
  // 对话框内容
  children?: ReactNode
  footer?: ReactNode
  // 确认/取消按钮相关
  confirmText?: string
  cancelText?: string
  loading?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  // 特殊效果
  slideFromRight?: boolean
  // 事件回调
  onClose?: () => void
  onOpened?: () => void
  onClosed?: () => void
  beforeClose?: (close: () => void) => void
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({
  visible,
  onVisibleChange,
  children,
  footer,
  title = '提示',
  width = '50%',
  confirmText = '确 定',
  cancelText = '取 消',
  loading = false,
  onConfirm,
  onCancel,
  slideFromRight = false,
  onClose,
  onOpened,
  onClosed,
  beforeClose,
  className = '',
  style = {},
  maskClosable = true,
  keyboard = true,
  closable = true,
  centered = false,
  ...restProps
}) => {
  // 处理确认按钮点击
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
  }

  // 处理取消按钮点击
  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    handleClose()
  }

  // 处理关闭
  const handleClose = () => {
    if (onVisibleChange) {
      onVisibleChange(false)
    }
    if (onClose) {
      onClose()
    }
  }

  // 处理Modal的onCancel事件
  const handleModalCancel = () => {
    if (beforeClose) {
      beforeClose(handleClose)
    } else {
      handleCancel()
    }
  }

  // 默认脚部按钮
  const defaultFooter = (
    <div className="dialog-footer">
      <Button size="middle" onClick={handleCancel}>
        {cancelText}
      </Button>
      <Button
        size="middle"
        type="primary"
        onClick={handleConfirm}
        loading={loading}
        style={{ marginLeft: '60px' }}
      >
        {confirmText}
      </Button>
    </div>
  )

  // 样式处理
  const modalClassName = `dialog-wrapper ${slideFromRight ? 'dialog-wrapper-sliding-right' : ''} ${className}`
  
  const modalStyle: CSSProperties = {
    ...style,
    ...(slideFromRight && {
      position: 'fixed',
      right: 0,
      top: '-90px',
      height: 'calc(100% - 101px)',
      margin: 0,
      borderRadius: 0,
      boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.15)',
      maxWidth: 'none'
    })
  }

  return (
    <Modal
      title={title}
      open={visible}
      width={width}
      className={modalClassName}
      style={modalStyle}
      maskClosable={maskClosable}
      keyboard={keyboard}
      closable={closable}
      centered={!slideFromRight && centered}
      footer={footer !== undefined ? footer : defaultFooter}
      onCancel={handleModalCancel}
      afterOpenChange={(open) => {
        if (open && onOpened) {
          onOpened()
        } else if (!open && onClosed) {
          onClosed()
        }
      }}
      {...restProps}
    >
      {children}
    </Modal>
  )
}

export default DialogWrapper