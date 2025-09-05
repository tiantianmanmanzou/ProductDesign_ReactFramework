import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import TablePageLayout from '../../components/layouts/TablePageLayout'
import type { Role, TableColumn, ActionButton as ActionButtonType, SearchItem } from '../../types'

const UserManagementRole: React.FC = () => {
  const [searchForm, setSearchForm] = useState({
    name: ''
  })
  
  const [roleList, setRoleList] = useState<Role[]>([])
  const [loading, setLoading] = useState(false)
  const [, setSelectedRowKeys] = useState<React.Key[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  const searchItems: SearchItem[] = [
    { 
      label: '角色名', 
      prop: 'name', 
      type: 'input' as const, 
      placeholder: '请输入角色名' 
    }
  ]

  const actionButtons: ActionButtonType[] = [
    { name: 'add', label: '新增角色', type: 'primary' },
    { name: 'batchDelete', label: '批量删除', type: 'default' },
    { name: 'export', label: '导出', type: 'default' }
  ]

  const tableColumns: TableColumn[] = [
    { prop: 'name', label: '角色名' },
    { prop: 'description', label: '描述' },
    { 
      prop: 'permissions', 
      label: '权限数量',
      formatter: (row: Role) => row.permissions.length.toString()
    },
    { prop: 'createTime', label: '创建时间' }
  ]

  const tableActions: ActionButtonType[] = [
    { name: 'edit', label: '编辑', type: 'link' },
    { name: 'permissions', label: '权限管理', type: 'link' },
    { name: 'delete', label: '删除', type: 'link' }
  ]

  useEffect(() => {
    fetchRoleList()
  }, [currentPage, pageSize, searchForm])

  const fetchRoleList = () => {
    setLoading(true)
    
    setTimeout(() => {
      const mockData: Role[] = []
      const roleNames = ['管理员', '编辑者', '查看者', '审核员', '操作员']
      const permissions = ['user:read', 'user:write', 'user:delete', 'role:read', 'role:write', 'log:read']
      
      for (let i = 1; i <= 15; i++) {
        const roleName = roleNames[i % roleNames.length]
        const rolePerms = permissions.slice(0, Math.floor(Math.random() * permissions.length) + 1)
        
        mockData.push({
          id: i.toString(),
          name: `${roleName}${i > roleNames.length ? Math.ceil(i / roleNames.length) : ''}`,
          description: `这是${roleName}角色的描述信息`,
          permissions: rolePerms,
          createTime: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
        })
      }

      let filteredData = [...mockData]
      
      if (searchForm.name) {
        filteredData = filteredData.filter(item => 
          item.name.includes(searchForm.name)
        )
      }

      const start = (currentPage - 1) * pageSize
      const end = start + pageSize
      const paginatedData = filteredData.slice(start, end)

      setRoleList(paginatedData)
      setTotal(filteredData.length)
      setLoading(false)
    }, 500)
  }

  const handleSearch = (data: Record<string, any>) => {
    setSearchForm({
      name: data.name || ''
    })
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearchForm({
      name: ''
    })
    setCurrentPage(1)
  }

  const handleAction = (action: string) => {
    switch (action) {
      case 'add':
        message.info('新增角色功能开发中')
        break
      case 'batchDelete':
        message.info('批量删除功能开发中')
        break
      case 'export':
        message.info('导出功能开发中')
        break
    }
  }

  const handleTableAction = (action: string, row: Role) => {
    switch (action) {
      case 'edit':
        message.info(`编辑角色: ${row.name}`)
        break
      case 'permissions':
        message.info(`管理角色权限: ${row.name}`)
        break
      case 'delete':
        message.info(`删除角色: ${row.name}`)
        break
    }
  }

  const handleSelectionChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const handlePagination = (page: number, size: number) => {
    setCurrentPage(page)
    setPageSize(size)
  }

  return (
    <TablePageLayout
      title="角色管理"
      searchItems={searchItems}
      initialFormData={searchForm}
      onSearch={handleSearch}
      onReset={handleReset}
      actionButtons={actionButtons}
      onAction={handleAction}
      tableData={roleList}
      tableColumns={tableColumns}
      loading={loading}
      showSelection={true}
      showTableAction={true}
      tableActions={tableActions}
      rowKey="id"
      onSelectionChange={handleSelectionChange}
      onTableAction={handleTableAction}
      total={total}
      current={currentPage}
      pageSize={pageSize}
      onPagination={handlePagination}
    />
  )
}

export default UserManagementRole