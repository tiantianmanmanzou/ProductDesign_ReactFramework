import React from 'react'
import { ShoppingOutlined, CheckCircleOutlined, EyeOutlined } from '@ant-design/icons'
import VerticalTabsPageLayout from '../../components/layouts/VerticalTabsPageLayout'
import type { VerticalIconMenuItem } from '../../components/common/VerticalIconMenu'

const ProductSaleTabs: React.FC = () => {
  // 标签页菜单配置
  const menuItems: VerticalIconMenuItem[] = [
    {
      key: '/product-sale/apply',
      icon: <ShoppingOutlined />,
      label: '上架申请'
    },
    {
      key: '/product-sale/audit',
      icon: <CheckCircleOutlined />,
      label: '上架审核'
    },
    {
      key: '/product-sale/display',
      icon: <EyeOutlined />,
      label: '商品展示'
    }
  ]

  return (
    <VerticalTabsPageLayout 
      menuItems={menuItems}
      menuWidth={60}
      menuBackgroundColor="#fafafa"
    />
  )
}

export default ProductSaleTabs
