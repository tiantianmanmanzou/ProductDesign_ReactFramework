import React, { useState, useCallback } from 'react'
import FilterBarTablePageLayout from '../../components/layouts/FilterBarTablePageLayout'
import ProductApplyNew from './ProductSale-Apply-New'
import { Card, Tag, Space, Typography } from 'antd'
import type { SearchItem, ActionButton, TableColumn } from '../../types'

const { Text } = Typography

const ProductSaleApply: React.FC = () => {
  const [loading] = useState(false)
  const [newModalVisible, setNewModalVisible] = useState(false)
  const [tableData, setTableData] = useState<any[]>([
    {
      id: '1',
      productName: 'iPhone 15 Pro',
      description: '苹果最新旗舰手机，搭载A17 Pro芯片，支持钛金属机身设计',
      reason: '新品上市，市场需求旺盛',
      shelfTime: '2024-02-01',
      applicant: '张三',
      approver: '李四',
      status: 'pending',
      applyTime: '2024-01-30 10:30:00'
    },
    {
      id: '2',
      productName: 'MacBook Air M3',
      description: '轻薄便携的笔记本电脑，搭载M3芯片，续航长达18小时',
      reason: '学生返校季促销',
      shelfTime: '2024-02-15',
      applicant: '王五',
      approver: '赵六',
      status: 'approved',
      applyTime: '2024-01-31 14:20:00'
    },
    {
      id: '3',
      productName: 'AirPods Pro 3',
      description: '主动降噪无线耳机，支持空间音频和自适应音频',
      reason: '音频设备市场空缺',
      shelfTime: '2024-02-20',
      applicant: '孙七',
      approver: '周八',
      status: 'pending',
      applyTime: '2024-02-01 09:15:00'
    },
    {
      id: '4',
      productName: 'iPad Air 6',
      description: '轻薄平板电脑，支持Apple Pencil，适合创意工作',
      reason: '教育市场推广',
      shelfTime: '2024-03-01',
      applicant: '吴九',
      approver: '郑十',
      status: 'approved',
      applyTime: '2024-02-02 16:45:00'
    },
    {
      id: '5',
      productName: 'Apple Watch Series 10',
      description: '智能手表，健康监测功能强大，支持心电图检测',
      reason: '健康设备市场扩张',
      shelfTime: '2024-03-15',
      applicant: '刘一',
      approver: '陈二',
      status: 'pending',
      applyTime: '2024-02-03 11:30:00'
    }
  ])

  // 搜索配置
  const searchItems: SearchItem[] = [
    { type: 'input', label: '商品名称', prop: 'productName', placeholder: '请输入商品名称' },
    { 
      type: 'select', 
      label: '状态', 
      prop: 'status', 
      placeholder: '请选择状态',
      options: [
        { label: '全部', value: 'all' },
        { label: '待审核', value: 'pending' },
        { label: '已审核', value: 'approved' }
      ]
    },
    { 
      type: 'select', 
      label: '申请人', 
      prop: 'applicant', 
      placeholder: '请选择申请人',
      options: [
        { label: '全部', value: 'all' },
        { label: '张三', value: 'zhangsan' },
        { label: '李四', value: 'lisi' },
        { label: '王五', value: 'wangwu' }
      ]
    }
  ]

  // 操作按钮配置
  const actionButtons: ActionButton[] = [
    { name: 'add', label: '新增申请', type: 'primary' },
    { name: 'export', label: '导出数据', type: 'default' }
  ]

  // 表格列配置
  const tableColumns: TableColumn[] = [
    { prop: 'productName', label: '商品名称', minWidth: 150 },
    { prop: 'description', label: '商品描述', minWidth: 200 },
    { prop: 'reason', label: '上架原因', width: 150 },
    { prop: 'shelfTime', label: '上架时间', width: 120 },
    { prop: 'applicant', label: '申请人', width: 100 },
    { prop: 'approver', label: '审批人', width: 100 },
    { 
      prop: 'status', 
      label: '状态', 
      width: 100,
      formatter: (row: any) => {
        const statusMap: Record<string, { text: string; color: string }> = {
          pending: { text: '待审核', color: '#faad14' },
          approved: { text: '已审核', color: '#52c41a' },
          rejected: { text: '已拒绝', color: '#ff4d4f' }
        }
        const status = statusMap[row.status] || { text: row.status, color: '#666' }
        return `<span style="color: ${status.color}; font-weight: 500;">${status.text}</span>`
      }
    },
    { prop: 'applyTime', label: '申请时间', width: 150 }
  ]

  // 事件处理
  const handleSearch = useCallback((formData: Record<string, any>) => {
    console.log('搜索参数:', formData)
    // 执行搜索逻辑
  }, [])

  const handleAction = useCallback((action: string) => {
    console.log('操作:', action)
    if (action === 'add') {
      setNewModalVisible(true)
    }
  }, [])

  // 新增申请成功处理
  const handleNewSuccess = useCallback((formData: any) => {
    // 生成新的申请记录
    const newApply = {
      id: String(tableData.length + 1),
      productName: formData.productName,
      description: formData.description,
      reason: formData.reason,
      shelfTime: formData.shelfTime,
      applicant: '当前用户', // 实际应用中从用户上下文获取
      approver: formData.approver,
      status: 'pending',
      applyTime: new Date().toLocaleString()
    }
    
    // 添加到表格数据
    setTableData(prev => [newApply, ...prev])
  }, [tableData.length])

  // 左侧筛选栏内容
  const filterContent = (
    <div style={{ padding: '16px' }}>
      <Card size="small" title="申请状态统计" style={{ marginBottom: '16px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text>待审核</Text>
            <Tag color="orange" style={{ marginLeft: '8px' }}>
              {tableData.filter(item => item.status === 'pending').length}
            </Tag>
          </div>
          <div>
            <Text>已审核</Text>
            <Tag color="green" style={{ marginLeft: '8px' }}>
              {tableData.filter(item => item.status === 'approved').length}
            </Tag>
          </div>
          <div>
            <Text>已拒绝</Text>
            <Tag color="red" style={{ marginLeft: '8px' }}>
              {tableData.filter(item => item.status === 'rejected').length}
            </Tag>
          </div>
        </Space>
      </Card>

      <Card size="small" title="快速筛选" style={{ marginBottom: '16px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>按状态筛选</Text>
          </div>
          <div>
            <Tag 
              color="orange" 
              style={{ cursor: 'pointer', marginBottom: '8px' }}
              onClick={() => console.log('筛选待审核')}
            >
              待审核
            </Tag>
            <Tag 
              color="green" 
              style={{ cursor: 'pointer', marginBottom: '8px' }}
              onClick={() => console.log('筛选已审核')}
            >
              已审核
            </Tag>
            <Tag 
              color="red" 
              style={{ cursor: 'pointer', marginBottom: '8px' }}
              onClick={() => console.log('筛选已拒绝')}
            >
              已拒绝
            </Tag>
          </div>
        </Space>
      </Card>

      <Card size="small" title="申请信息">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text type="secondary">总申请数</Text>
            <Text strong style={{ marginLeft: '8px' }}>
              {tableData.length}
            </Text>
          </div>
          <div>
            <Text type="secondary">本月申请</Text>
            <Text strong style={{ marginLeft: '8px' }}>
              {tableData.filter(item => {
                const applyDate = new Date(item.applyTime)
                const now = new Date()
                return applyDate.getMonth() === now.getMonth() && 
                       applyDate.getFullYear() === now.getFullYear()
              }).length}
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  )

  return (
    <>
      <FilterBarTablePageLayout
        title="商品上架申请管理"
        searchItems={searchItems}
        actionButtons={actionButtons}
        tableColumns={tableColumns}
        tableData={tableData}
        loading={loading}
        onSearch={handleSearch}
        onAction={handleAction}
        showSelection={true}
        showIndex={true}
        showTableAction={true}
        filterHeader="筛选内容"
        filterContent={filterContent}
        total={tableData.length}
        current={1}
        pageSize={10}
      />
      
      {/* 新增申请弹窗 */}
      <ProductApplyNew
        visible={newModalVisible}
        onCancel={() => setNewModalVisible(false)}
        onSuccess={handleNewSuccess}
      />
    </>
  )
}

export default ProductSaleApply
