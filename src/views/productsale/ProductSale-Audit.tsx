import React, { useState, useCallback } from 'react'
import FilterBarTablePageLayout from '../../components/layouts/FilterBarTablePageLayout'
import type { SearchItem, ActionButton, TableColumn } from '../../types'

const ProductSaleAudit: React.FC = () => {
  const [loading] = useState(false)
  const [tableData] = useState<any[]>([
    {
      id: '1',
      productName: 'iPhone 15 Pro',
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
      reason: '健康设备市场扩张',
      shelfTime: '2024-03-15',
      applicant: '刘一',
      approver: '陈二',
      status: 'pending',
      applyTime: '2024-02-03 11:30:00'
    },
    {
      id: '6',
      productName: 'iMac 27"',
      reason: '设计师工作站需求',
      shelfTime: '2024-02-28',
      applicant: '钱一',
      approver: '孙二',
      status: 'rejected',
      applyTime: '2024-02-04 15:20:00'
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
        { label: '已审核', value: 'approved' },
        { label: '已拒绝', value: 'rejected' }
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
        { label: '王五', value: 'wangwu' },
        { label: '孙七', value: 'sunqi' },
        { label: '吴九', value: 'wujiu' },
        { label: '刘一', value: 'liuyi' },
        { label: '钱一', value: 'qianyi' }
      ]
    }
  ]

  // 操作按钮配置 - 审核页面不需要新增按钮
  const actionButtons: ActionButton[] = [
    { name: 'export', label: '导出数据', type: 'default' }
  ]

  // 表格列配置
  const tableColumns: TableColumn[] = [
    { prop: 'productName', label: '商品名称', minWidth: 150 },
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

  // 筛栏内容配置
  const filterContent = (
    <div className="filter-content">
      <div className="filter-section">
        <h4>状态筛选</h4>
        <div className="filter-options">
          <label className="filter-option">
            <input type="checkbox" defaultChecked /> 待审核
          </label>
          <label className="filter-option">
            <input type="checkbox" defaultChecked /> 已审核
          </label>
          <label className="filter-option">
            <input type="checkbox" defaultChecked /> 已拒绝
          </label>
        </div>
      </div>
      
      <div className="filter-section">
        <h4>时间范围</h4>
        <div className="filter-options">
          <label className="filter-option">
            <input type="radio" name="timeRange" value="today" /> 今天
          </label>
          <label className="filter-option">
            <input type="radio" name="timeRange" value="week" defaultChecked /> 本周
          </label>
          <label className="filter-option">
            <input type="radio" name="timeRange" value="month" /> 本月
          </label>
          <label className="filter-option">
            <input type="radio" name="timeRange" value="all" /> 全部
          </label>
        </div>
      </div>
      
      <div className="filter-section">
        <h4>申请人筛选</h4>
        <div className="filter-options">
          <label className="filter-option">
            <input type="checkbox" defaultChecked /> 张三
          </label>
          <label className="filter-option">
            <input type="checkbox" defaultChecked /> 王五
          </label>
          <label className="filter-option">
            <input type="checkbox" defaultChecked /> 孙七
          </label>
          <label className="filter-option">
            <input type="checkbox" defaultChecked /> 吴九
          </label>
          <label className="filter-option">
            <input type="checkbox" defaultChecked /> 刘一
          </label>
          <label className="filter-option">
            <input type="checkbox" defaultChecked /> 钱一
          </label>
        </div>
      </div>
      
      <div className="filter-section">
        <h4>快速操作</h4>
        <div className="filter-actions">
          <button className="filter-btn primary">应用筛选</button>
          <button className="filter-btn">重置</button>
        </div>
      </div>
    </div>
  )

  // 事件处理
  const handleSearch = useCallback((formData: Record<string, any>) => {
    console.log('搜索参数:', formData)
    // 执行搜索逻辑
  }, [])

  const handleAction = useCallback((action: string) => {
    console.log('操作:', action)
    // 执行对应操作
  }, [])

  const handlePagination = useCallback((page: number, size: number) => {
    console.log('分页变化:', { page, size })
    // 处理分页逻辑
  }, [])

  return (
    <FilterBarTablePageLayout
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
      filterContent={filterContent}
      total={tableData.length}
      current={1}
      pageSize={10}
      onPagination={handlePagination}
    />
  )
}

export default ProductSaleAudit
