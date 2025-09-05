import React from 'react'
import { UserOutlined, SafetyOutlined, KeyOutlined } from '@ant-design/icons'
import VerticalTabsPageLayout from '../../components/layouts/VerticalTabsPageLayout'
import type { VerticalIconMenuItem } from '../../components/common/VerticalIconMenu'

const UserManagementTabs: React.FC = () => {
  // 标签页菜单配置
  const menuItems: VerticalIconMenuItem[] = [
    {
      key: '/user-management/user',
      icon: <UserOutlined />,
      label: '用户管理'
    },
    {
      key: '/user-management/role',
      icon: <SafetyOutlined />,
      label: '角色管理'
    },
    {
      key: '/user-management/permission',
      icon: <KeyOutlined />,
      label: '权限管理'
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

export default UserManagementTabs 