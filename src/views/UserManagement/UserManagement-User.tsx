import React, { useState, useEffect } from 'react'
import { message, Modal, Form, Input, Select, Button } from 'antd'
import TablePageLayout from '../../components/layouts/TablePageLayout'
import DialogWrapper from '../../components/common/DialogWrapper'
import type { User, TableColumn, ActionButton as ActionButtonType, SearchItem } from '../../types'

const UserManagementUser: React.FC = () => {
  const [searchForm, setSearchForm] = useState({
    username: '',
    department: '',
    status: ''
  })
  
  const [userList, setUserList] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  
  // 新增用户弹窗相关状态
  const [addUserVisible, setAddUserVisible] = useState(false)
  const [addUserLoading, setAddUserLoading] = useState(false)
  const [form] = Form.useForm()
  
  // 编辑用户弹窗相关状态
  const [editUserVisible, setEditUserVisible] = useState(false)
  const [editUserLoading, setEditUserLoading] = useState(false)
  const [editForm] = Form.useForm()
  const [currentEditUser, setCurrentEditUser] = useState<User | null>(null)
  
  // 查看用户弹窗相关状态
  const [viewUserVisible, setViewUserVisible] = useState(false)
  const [currentViewUser, setCurrentViewUser] = useState<User | null>(null)

  const searchItems: SearchItem[] = [
    { 
      label: '用户名', 
      prop: 'username', 
      type: 'input' as const, 
      placeholder: '请输入用户名' 
    },
    { 
      label: '部门', 
      prop: 'department', 
      type: 'select' as const, 
      options: [
        { label: '全部', value: '' },
        { label: '研发部', value: 'dev' },
        { label: '产品部', value: 'product' },
        { label: '市场部', value: 'market' }
      ] 
    },
    { 
      label: '状态', 
      prop: 'status', 
      type: 'select' as const, 
      options: [
        { label: '全部', value: '' },
        { label: '在职', value: 'active' },
        { label: '离职', value: 'inactive' }
      ] 
    }
  ]

  const actionButtons: ActionButtonType[] = [
    { name: 'add', label: '新增用户', type: 'primary' },
    { name: 'batchDelete', label: '批量删除', type: 'default' },
    { name: 'export', label: '导出', type: 'default' }
  ]

  const tableColumns: TableColumn[] = [
    { prop: 'username', label: '用户名' },
    { prop: 'realName', label: '姓名' },
    { prop: 'department', label: '部门' },
    { prop: 'email', label: '邮箱' },
    { prop: 'mobile', label: '手机号' },
    { 
      prop: 'status', 
      label: '状态',
      formatter: (row: User) => row.status === 'active' ? '在职' : '离职'
    }
  ]

  const tableActions: ActionButtonType[] = [
    { name: 'edit', label: '编辑', type: 'link' },
    { name: 'view', label: '查看', type: 'link' },
    { name: 'resetPassword', label: '重置密码', type: 'link' },
    { 
      name: 'delete', 
      label: '删除', 
      type: 'link',
      disabled: (row: User) => row.status === 'inactive'
    }
  ]

  useEffect(() => {
    fetchUserList()
  }, [currentPage, pageSize, searchForm])

  const fetchUserList = () => {
    setLoading(true)
    
    // Mock data generation
    setTimeout(() => {
      const mockData: User[] = []
      for (let i = 1; i <= 35; i++) {
        mockData.push({
          id: i.toString(),
          username: `user${i}`,
          email: `user${i}@example.com`,
          role: ['admin', 'user', 'manager'][i % 3],
          status: i % 5 === 0 ? 'inactive' : 'active',
          createTime: new Date().toISOString(),
          realName: `用户${i}`,
          department: ['研发部', '产品部', '市场部'][i % 3],
          mobile: `1381234${i.toString().padStart(4, '0')}`
        })
      }

      let filteredData = [...mockData]
      
      // Apply filters
      if (searchForm.username) {
        filteredData = filteredData.filter(item => 
          item.username.includes(searchForm.username)
        )
      }
      if (searchForm.department) {
        const deptMap: Record<string, string> = {
          'dev': '研发部',
          'product': '产品部', 
          'market': '市场部'
        }
        filteredData = filteredData.filter(item => 
          item.department === deptMap[searchForm.department]
        )
      }
      if (searchForm.status) {
        filteredData = filteredData.filter(item => 
          item.status === searchForm.status
        )
      }

      // Pagination
      const start = (currentPage - 1) * pageSize
      const end = start + pageSize
      const paginatedData = filteredData.slice(start, end)

      setUserList(paginatedData)
      setTotal(filteredData.length)
      setLoading(false)
    }, 500)
  }

  const handleSearch = (data: Record<string, any>) => {
    setSearchForm({
      username: data.username || '',
      department: data.department || '',
      status: data.status || ''
    })
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearchForm({
      username: '',
      department: '',
      status: ''
    })
    setCurrentPage(1)
  }

  // 打开新增用户弹窗
  const openAddUserDialog = () => {
    form.resetFields()
    setAddUserVisible(true)
  }

  // 关闭新增用户弹窗
  const closeAddUserDialog = () => {
    setAddUserVisible(false)
    form.resetFields()
  }

  // 提交新增用户
  const handleAddUser = async () => {
    try {
      setAddUserLoading(true)
      const values = await form.validateFields()
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 这里应该调用真实的API
      console.log('新增用户数据:', values)
      
      message.success('用户添加成功')
      closeAddUserDialog()
      fetchUserList() // 重新加载用户列表
      
    } catch (error) {
      console.error('表单验证失败:', error)
    } finally {
      setAddUserLoading(false)
    }
  }

  // 打开编辑用户弹窗
  const openEditUserDialog = (user: User) => {
    setCurrentEditUser(user)
    editForm.setFieldsValue({
      username: user.username,
      realName: user.realName,
      email: user.email,
      mobile: user.mobile,
      department: user.department,
      role: user.role
    })
    setEditUserVisible(true)
  }

  // 关闭编辑用户弹窗
  const closeEditUserDialog = () => {
    setEditUserVisible(false)
    setCurrentEditUser(null)
    editForm.resetFields()
  }

  // 提交编辑用户
  const handleEditUser = async () => {
    try {
      setEditUserLoading(true)
      const values = await editForm.validateFields()
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 这里应该调用真实的API
      console.log('编辑用户数据:', { ...currentEditUser, ...values })
      
      message.success('用户信息更新成功')
      closeEditUserDialog()
      fetchUserList() // 重新加载用户列表
      
    } catch (error) {
      console.error('表单验证失败:', error)
    } finally {
      setEditUserLoading(false)
    }
  }

  // 打开查看用户弹窗
  const openViewUserDialog = (user: User) => {
    setCurrentViewUser(user)
    setViewUserVisible(true)
  }

  // 关闭查看用户弹窗
  const closeViewUserDialog = () => {
    setViewUserVisible(false)
    setCurrentViewUser(null)
  }

  const handleAction = (action: string) => {
    switch (action) {
      case 'add':
        openAddUserDialog()
        break
      case 'batchDelete':
        if (selectedRowKeys.length === 0) {
          message.warning('请选择要删除的用户')
          return
        }
        Modal.confirm({
          title: '确认删除',
          content: `确定要删除选中的 ${selectedRowKeys.length} 个用户吗？`,
          onOk: () => {
            message.success('删除成功')
            setSelectedRowKeys([])
            fetchUserList()
          }
        })
        break
      case 'export':
        message.info('导出功能开发中')
        break
    }
  }

  const handleTableAction = (action: string, row: User) => {
    switch (action) {
      case 'edit':
        openEditUserDialog(row)
        break
      case 'view':
        openViewUserDialog(row)
        break
      case 'resetPassword':
        Modal.confirm({
          title: '确认重置密码',
          content: `确定要重置用户 ${row.username} 的密码吗？`,
          onOk: () => {
            message.success('密码重置成功')
          }
        })
        break
      case 'delete':
        Modal.confirm({
          title: '确认删除',
          content: `确定要删除用户 ${row.username} 吗？`,
          onOk: () => {
            message.success('删除成功')
            fetchUserList()
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
      title="用户管理"
      searchItems={searchItems}
      initialFormData={searchForm}
      onSearch={handleSearch}
      onReset={handleReset}
      actionButtons={actionButtons}
      onAction={handleAction}
      tableData={userList}
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
    >

      {/* 新增用户弹窗 */}
      <DialogWrapper
        visible={addUserVisible}
        title="新增用户"
        width={600}
        loading={addUserLoading}
        onConfirm={handleAddUser}
        onCancel={closeAddUserDialog}
        confirmText="确认添加"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, max: 20, message: '用户名长度为3-20个字符' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="真实姓名"
            name="realName"
            rules={[
              { required: true, message: '请输入真实姓名' },
              { max: 50, message: '姓名长度不能超过50个字符' }
            ]}
          >
            <Input placeholder="请输入真实姓名" />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱地址' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱地址" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            label="部门"
            name="department"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <Select placeholder="请选择部门">
              <Select.Option value="研发部">研发部</Select.Option>
              <Select.Option value="产品部">产品部</Select.Option>
              <Select.Option value="市场部">市场部</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Select.Option value="admin">管理员</Select.Option>
              <Select.Option value="user">普通用户</Select.Option>
              <Select.Option value="manager">部门经理</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="初始密码"
            name="password"
            rules={[
              { required: true, message: '请输入初始密码' },
              { min: 6, max: 20, message: '密码长度为6-20个字符' }
            ]}
          >
            <Input.Password placeholder="请输入初始密码" />
          </Form.Item>
        </Form>
      </DialogWrapper>

      {/* 编辑用户弹窗 */}
      <DialogWrapper
        visible={editUserVisible}
        title="编辑用户"
        width={600}
        loading={editUserLoading}
        onConfirm={handleEditUser}
        onCancel={closeEditUserDialog}
        confirmText="确认更新"
        cancelText="取消"
      >
        <Form
          form={editForm}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, max: 20, message: '用户名长度为3-20个字符' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
            ]}
          >
            <Input placeholder="请输入用户名" disabled />
          </Form.Item>

          <Form.Item
            label="真实姓名"
            name="realName"
            rules={[
              { required: true, message: '请输入真实姓名' },
              { max: 50, message: '姓名长度不能超过50个字符' }
            ]}
          >
            <Input placeholder="请输入真实姓名" />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱地址' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱地址" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            label="部门"
            name="department"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <Select placeholder="请选择部门">
              <Select.Option value="研发部">研发部</Select.Option>
              <Select.Option value="产品部">产品部</Select.Option>
              <Select.Option value="市场部">市场部</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Select.Option value="admin">管理员</Select.Option>
              <Select.Option value="user">普通用户</Select.Option>
              <Select.Option value="manager">部门经理</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </DialogWrapper>

      {/* 查看用户弹窗 */}
      <DialogWrapper
        visible={viewUserVisible}
        title="查看用户信息"
        width={600}
        onCancel={closeViewUserDialog}
        footer={
          <div className="dialog-footer">
            <Button size="middle" onClick={() => setViewUserVisible(false)}>
              关闭
            </Button>
          </div>
        }
      >
        {currentViewUser && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>用户名：</span>
              <span>{currentViewUser.username}</span>
            </div>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>真实姓名：</span>
              <span>{currentViewUser.realName}</span>
            </div>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>邮箱：</span>
              <span>{currentViewUser.email}</span>
            </div>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>手机号：</span>
              <span>{currentViewUser.mobile}</span>
            </div>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>部门：</span>
              <span>{currentViewUser.department}</span>
            </div>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>角色：</span>
              <span>{currentViewUser.role === 'admin' ? '管理员' : currentViewUser.role === 'manager' ? '部门经理' : '普通用户'}</span>
            </div>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>状态：</span>
              <span style={{ color: currentViewUser.status === 'active' ? '#52c41a' : '#ff4d4f' }}>
                {currentViewUser.status === 'active' ? '在职' : '离职'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>创建时间：</span>
              <span>{new Date(currentViewUser.createTime).toLocaleString('zh-CN')}</span>
            </div>
          </div>
        )}
      </DialogWrapper>
    </TablePageLayout>
  )
}

export default UserManagementUser