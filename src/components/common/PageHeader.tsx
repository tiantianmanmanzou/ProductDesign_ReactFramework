import React, { type ReactNode } from 'react'
import '../../styles/PageHeader.scss'

interface PageHeaderProps {
  title: string
  children?: ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <div className="page-header">
      <h1 className="page-header__title">{title}</h1>
      {children}
    </div>
  )
}

export default PageHeader