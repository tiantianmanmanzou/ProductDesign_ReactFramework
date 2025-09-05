import React, { useState, useEffect } from 'react'
import { message, Modal } from 'antd'
import TablePageLayout from '../../components/layouts/TablePageLayout'
import type { Permission, TableColumn, ActionButton as ActionButtonType, SearchItem } from '../../types'

const UserManagementPermission: React.FC = () => {
  const [searchForm, setSearchForm] = useState({
    name: '',
    module: ''
  })
  
  const [permissionList, setPermissionList] = useState<Permission[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  const searchItems: SearchItem[] = [
    { 
      label: '权限名', 
      prop: 'name', 
      type: 'input' as const, 
      placeholder: '请输入权限名' 
    },
    { 
      label: '模块', 
      prop: 'module', 
      type: 'select' as const, 
      options: [
        { label: '全部', value: '' },
        { label: '用户管理', value: 'user' },
        { label: '角色管理', value: 'role' },
        { label: '系统设置', value: 'system' },
        { label: '日志管理', value: 'log' }
      ] 
    }
  ]

  const actionButtons: ActionButtonType[] = [
    { name: 'add', label: '新增权限', type: 'primary' },
    { name: 'batchDelete', label: '批量删除', type: 'default' },
    { name: 'export', label: '导出', type: 'default' }
  ]

  const tableColumns: TableColumn[] = [
    { prop: 'name', label: '权限名' },
    { prop: 'code', label: '权限编码' },
    { prop: 'module', label: '所属模块' },
    { prop: 'description', label: '描述' },
    { 
      prop: 'type', 
      label: '权限类型',
      formatter: (row: Permission) => {
        const typeMap: Record<string, string> = {
          'menu': '菜单',
          'button': '按钮',
          'api': 'API'
        }
        return typeMap[row.type] || row.type
      }
    },
    { prop: 'createTime', label: '创建时间' }
  ]

  const tableActions: ActionButtonType[] = [
    { name: 'edit', label: '编辑', type: 'link' },
    { name: 'view', label: '查看', type: 'link' },
    { name: 'delete', label: '删除', type: 'link' }
  ]

  useEffect(() => {
    fetchPermissionList()
  }, [currentPage, pageSize, searchForm])

  const fetchPermissionList = () => {
    setLoading(true)
    
    setTimeout(() => {
      const mockData: Permission[] = []
      const modules = ['user', 'role', 'system', 'log']
      const moduleNames = ['用户管理', '角色管理', '系统设置', '日志管理']
      const permissionTypes: ('menu' | 'button' | 'api')[] = ['menu', 'button', 'api']
      const actions = ['read', 'write', 'delete', 'export', 'import']
      
      for (let i = 1; i <= 25; i++) {
        const moduleIndex = i % modules.length
        const module = modules[moduleIndex]
        const moduleName = moduleNames[moduleIndex]
        const action = actions[i % actions.length]
        const type = permissionTypes[i % permissionTypes.length]
        
        mockData.push({
          id: i.toString(),
          name: `${moduleName}${action === 'read' ? '查看' : action === 'write' ? '编辑' : action === 'delete' ? '删除' : action === 'export' ? '导出' : '导入'}`,
          code: `${module}:${action}`,
          module: moduleName,
          description: `允许${action === 'read' ? '查看' : action === 'write' ? '编辑' : action === 'delete' ? '删除' : action === 'export' ? '导出' : '导入'}${moduleName}相关信息`,
          type: type,
          createTime: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
        })
      }

      let filteredData = [...mockData]
      
      if (searchForm.name) {
        filteredData = filteredData.filter(item => 
          item.name.includes(searchForm.name) || item.code.includes(searchForm.name)
        )
      }
      if (searchForm.module) {
        const moduleMap: Record<string, string> = {
          'user': '用户管理',
          'role': '角色管理',
          'system': '系统设置',
          'log': '日志管理'
        }
        filteredData = filteredData.filter(item => 
          item.module === moduleMap[searchForm.module]
        )
      }

      const start = (currentPage - 1) * pageSize
      const end = start + pageSize
      const paginatedData = filteredData.slice(start, end)

      setPermissionList(paginatedData)
      setTotal(filteredData.length)
      setLoading(false)
    }, 500)
  }

  const handleSearch = (data: Record<string, any>) => {
    setSearchForm({
      name: data.name || '',
      module: data.module || ''
    })
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearchForm({
      name: '',
      module: ''
    })
    setCurrentPage(1)
  }

  const handleAction = (action: string) => {
    switch (action) {
      case 'add':
        message.info('新增权限功能开发中')
        break
      case 'batchDelete':
        if (selectedRowKeys.length === 0) {
          message.warning('请选择要删除的权限')
          return
        }
        Modal.confirm({
          title: '确认删除',
          content: `确定要删除选中的 ${selectedRowKeys.length} 个权限吗？`,
          onOk: () => {
            message.success('删除成功')
            setSelectedRowKeys([])
            fetchPermissionList()
          }
        })
        break
      case 'export':
        message.info('导出功能开发中')
        break
    }
  }

  const handleTableAction = (action: string, row: Permission) => {
    switch (action) {
      case 'edit':
        message.info(`编辑权限: ${row.name}`)
        break
      case 'view':
        message.info(`查看权限: ${row.name}`)
        break
      case 'delete':
        Modal.confirm({
          title: '确认删除',
          content: `确定要删除权限 ${row.name} 吗？`,
          onOk: () => {
            message.success('删除成功')
            fetchPermissionList()
          }
        })
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
      title="权限管理"
      searchItems={searchItems}
      initialFormData={searchForm}
      onSearch={handleSearch}
      onReset={handleReset}
      actionButtons={actionButtons}
      onAction={handleAction}
      tableData={permissionList}
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

export default UserManagementPermission 