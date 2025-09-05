import React, { useState, useEffect } from 'react'
import { message, Form, Select, DatePicker, Button } from 'antd'
import TablePageLayout from '../../components/layouts/TablePageLayout'
import DialogWrapper from '../../components/common/DialogWrapper'
import type { LogEntry, TableColumn, ActionButton as ActionButtonType, SearchItem } from '../../types'
const { RangePicker } = DatePicker

const LogManagement: React.FC = () => {
  const [searchForm, setSearchForm] = useState({
    level: '',
    source: '',
    dateRange: [] as string[]
  })
  
  const [logList, setLogList] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(false)
  // const [selectedRowKeys] = useState<React.Key[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  // 弹窗状态
  const [exportDialogVisible, setExportDialogVisible] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)
  const [exportForm] = Form.useForm()
  
  const [clearDialogVisible, setClearDialogVisible] = useState(false)
  const [clearLoading, setClearLoading] = useState(false)
  const [clearForm] = Form.useForm()
  
  const [viewLogVisible, setViewLogVisible] = useState(false)
  const [currentViewLog, setCurrentViewLog] = useState<LogEntry | null>(null)

  // 搜索配置
  const searchItems: SearchItem[] = [
    { 
      label: '日志级别', 
      prop: 'level', 
      type: 'select',
      options: [
        { label: '全部', value: '' },
        { label: 'ERROR', value: 'ERROR' },
        { label: 'WARN', value: 'WARN' },
        { label: 'INFO', value: 'INFO' },
        { label: 'DEBUG', value: 'DEBUG' }
      ]
    },
    { 
      label: '来源', 
      prop: 'source', 
      type: 'select',
      options: [
        { label: '全部', value: '' },
        { label: '用户管理', value: 'user' },
        { label: '系统管理', value: 'system' },
        { label: '数据管理', value: 'data' }
      ]
    },
    { 
      label: '时间范围', 
      prop: 'dateRange', 
      type: 'daterange',
      placeholder: ['开始时间', '结束时间']
    }
  ]

  // 操作按钮配置
  const actionButtons: ActionButtonType[] = [
    { name: 'export', label: '导出日志', type: 'primary' },
    { name: 'clear', label: '清理日志', type: 'default' },
    { name: 'refresh', label: '刷新', type: 'default' }
  ]

  // 表格列配置
  const tableColumns: TableColumn[] = [
    { 
      prop: 'level', 
      label: '级别',
      formatter: (row: LogEntry) => {
        const colors: Record<string, string> = {
          'ERROR': '#ff4d4f',
          'WARN': '#faad14', 
          'INFO': '#52c41a',
          'DEBUG': '#1890ff'
        }
        return `<span style="color: ${colors[row.level] || '#666'}">${row.level}</span>`
      }
    },
    { prop: 'message', label: '消息' },
    { prop: 'source', label: '来源' },
    { prop: 'userId', label: '用户ID' },
    { prop: 'timestamp', label: '时间' }
  ]

  // 表格操作按钮配置
  const tableActions: ActionButtonType[] = [
    { name: 'view', label: '查看详情', type: 'link' }
  ]

  useEffect(() => {
    fetchLogList()
  }, [currentPage, pageSize, searchForm])

  const fetchLogList = () => {
    setLoading(true)
    
    setTimeout(() => {
      const mockData: LogEntry[] = []
      const levels = ['ERROR', 'WARN', 'INFO', 'DEBUG']
      const sources = ['user', 'system', 'data']
      const messages = [
        '用户登录成功',
        '密码修改',
        '数据导出',
        '系统启动',
        '连接失败',
        '权限验证',
        '数据同步',
        '配置更新'
      ]
      
      for (let i = 1; i <= 100; i++) {
        mockData.push({
          id: i.toString(),
          level: levels[Math.floor(Math.random() * levels.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          source: sources[Math.floor(Math.random() * sources.length)],
          userId: Math.random() > 0.5 ? `user${Math.floor(Math.random() * 100) + 1}` : undefined
        })
      }

      let filteredData = [...mockData]
      
      if (searchForm.level) {
        filteredData = filteredData.filter(item => item.level === searchForm.level)
      }
      
      if (searchForm.source) {
        filteredData = filteredData.filter(item => item.source === searchForm.source)
      }
      
      if (searchForm.dateRange && searchForm.dateRange.length === 2) {
        const [start, end] = searchForm.dateRange
        filteredData = filteredData.filter(item => {
          const timestamp = new Date(item.timestamp).getTime()
          return timestamp >= new Date(start).getTime() && timestamp <= new Date(end).getTime()
        })
      }

      // Sort by timestamp desc
      filteredData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

      const start = (currentPage - 1) * pageSize
      const end = start + pageSize
      const paginatedData = filteredData.slice(start, end)

      setLogList(paginatedData)
      setTotal(filteredData.length)
      setLoading(false)
    }, 500)
  }

  const handleSearch = (data: Record<string, any>) => {
    setSearchForm({
      level: data.level || '',
      source: data.source || '',
      dateRange: data.dateRange || []
    })
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearchForm({
      level: '',
      source: '',
      dateRange: []
    })
    setCurrentPage(1)
  }

  const handleAction = (action: string) => {
    switch (action) {
      case 'export':
        exportForm.resetFields()
        setExportDialogVisible(true)
        break
      case 'clear':
        clearForm.resetFields()
        setClearDialogVisible(true)
        break
      case 'refresh':
        fetchLogList()
        message.success('刷新成功')
        break
    }
  }

  const handleTableAction = (action: string, row: LogEntry) => {
    switch (action) {
      case 'view':
        setCurrentViewLog(row)
        setViewLogVisible(true)
        break
    }
  }

  // 导出日志处理
  const handleExportLog = async () => {
    try {
      setExportLoading(true)
      const values = await exportForm.validateFields()
      
      // 模拟导出处理
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('导出参数:', values)
      message.success('日志导出成功')
      setExportDialogVisible(false)
      
    } catch (error) {
      console.error('导出失败:', error)
    } finally {
      setExportLoading(false)
    }
  }

  // 清理日志处理
  const handleClearLog = async () => {
    try {
      setClearLoading(true)
      const values = await clearForm.validateFields()
      
      // 模拟清理处理
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('清理参数:', values)
      message.success('日志清理成功')
      setClearDialogVisible(false)
      fetchLogList() // 重新加载列表
      
    } catch (error) {
      console.error('清理失败:', error)
    } finally {
      setClearLoading(false)
    }
  }

  // const handleSelectionChange = (selectedRowKeys: React.Key[]) => {
  //   setSelectedRowKeys(selectedRowKeys)
  // }

  const handlePagination = (page: number, size: number) => {
    setCurrentPage(page)
    setPageSize(size)
  }

  return (
    <TablePageLayout
      title="日志管理"
      searchItems={searchItems}
      initialFormData={searchForm}
      onSearch={handleSearch}
      onReset={handleReset}
      actionButtons={actionButtons}
      onAction={handleAction}
      tableData={logList}
      tableColumns={tableColumns}
      loading={loading}
      showSelection={true}
      showTableAction={true}
      tableActions={tableActions}
      rowKey="id"
      // onSelectionChange={handleSelectionChange}
      onTableAction={handleTableAction}
      total={total}
      current={currentPage}
      pageSize={pageSize}
      onPagination={handlePagination}
    >
      {/* 导出日志弹窗 */}
      <DialogWrapper
        visible={exportDialogVisible}
        title="导出日志"
        width={600}
        loading={exportLoading}
        onConfirm={handleExportLog}
        onCancel={() => setExportDialogVisible(false)}
        confirmText="开始导出"
        cancelText="取消"
      >
        <Form form={exportForm} layout="vertical" requiredMark={false}>
          <Form.Item
            label="导出格式"
            name="format"
            rules={[{ required: true, message: '请选择导出格式' }]}
            initialValue="xlsx"
          >
            <Select placeholder="请选择导出格式">
              <Select.Option value="xlsx">Excel (.xlsx)</Select.Option>
              <Select.Option value="csv">CSV (.csv)</Select.Option>
              <Select.Option value="txt">文本文件 (.txt)</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="日志级别"
            name="levels"
            rules={[{ required: true, message: '请选择日志级别' }]}
            initialValue={['ERROR', 'WARN', 'INFO', 'DEBUG']}
          >
            <Select mode="multiple" placeholder="请选择要导出的日志级别">
              <Select.Option value="ERROR">ERROR</Select.Option>
              <Select.Option value="WARN">WARN</Select.Option>
              <Select.Option value="INFO">INFO</Select.Option>
              <Select.Option value="DEBUG">DEBUG</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="时间范围"
            name="dateRange"
            rules={[{ required: true, message: '请选择时间范围' }]}
          >
            <RangePicker 
              showTime 
              placeholder={['开始时间', '结束时间']}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="来源"
            name="sources"
            initialValue={['user', 'system', 'data']}
          >
            <Select mode="multiple" placeholder="请选择来源（不选则导出全部）">
              <Select.Option value="user">用户管理</Select.Option>
              <Select.Option value="system">系统管理</Select.Option>
              <Select.Option value="data">数据管理</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </DialogWrapper>

      {/* 清理日志弹窗 */}
      <DialogWrapper
        visible={clearDialogVisible}
        title="清理日志"
        width={500}
        loading={clearLoading}
        onConfirm={handleClearLog}
        onCancel={() => setClearDialogVisible(false)}
        confirmText="确认清理"
        cancelText="取消"
      >
        <Form form={clearForm} layout="vertical" requiredMark={false}>
          <Form.Item
            label="清理策略"
            name="strategy"
            rules={[{ required: true, message: '请选择清理策略' }]}
            initialValue="byTime"
          >
            <Select placeholder="请选择清理策略">
              <Select.Option value="byTime">按时间清理</Select.Option>
              <Select.Option value="byLevel">按级别清理</Select.Option>
              <Select.Option value="bySource">按来源清理</Select.Option>
              <Select.Option value="all">清理全部</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="保留时长"
            name="keepDays"
            rules={[{ required: true, message: '请选择保留时长' }]}
            initialValue={30}
          >
            <Select placeholder="请选择要保留的日志时长">
              <Select.Option value={7}>保留7天</Select.Option>
              <Select.Option value={30}>保留30天</Select.Option>
              <Select.Option value={90}>保留90天</Select.Option>
              <Select.Option value={180}>保留180天</Select.Option>
              <Select.Option value={365}>保留1年</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="清理级别"
            name="clearLevels"
            initialValue={['DEBUG', 'INFO']}
          >
            <Select mode="multiple" placeholder="请选择要清理的日志级别">
              <Select.Option value="ERROR">ERROR</Select.Option>
              <Select.Option value="WARN">WARN</Select.Option>
              <Select.Option value="INFO">INFO</Select.Option>
              <Select.Option value="DEBUG">DEBUG</Select.Option>
            </Select>
          </Form.Item>
        </Form>
        
        <div style={{ 
          padding: '16px', 
          background: '#fff7e6', 
          border: '1px solid #ffd591',
          borderRadius: '6px',
          marginTop: '16px'
        }}>
          <p style={{ margin: 0, color: '#fa8c16' }}>
            ⚠️ 警告：此操作将永久删除选定的日志记录，无法恢复，请谨慎操作！
          </p>
        </div>
      </DialogWrapper>

      {/* 查看日志详情弹窗 */}
      <DialogWrapper
        visible={viewLogVisible}
        title="日志详情"
        width={700}
        onCancel={() => {
          setViewLogVisible(false)
          setCurrentViewLog(null)
        }}
        footer={
          <div className="dialog-footer">
            <Button size="middle" onClick={() => {
              setViewLogVisible(false)
              setCurrentViewLog(null)
            }}>
              关闭
            </Button>
          </div>
        }
      >
        {currentViewLog && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>日志ID：</span>
              <span>{currentViewLog.id}</span>
            </div>
            
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>级别：</span>
              <span style={{ 
                color: {
                  'ERROR': '#ff4d4f',
                  'WARN': '#faad14', 
                  'INFO': '#52c41a',
                  'DEBUG': '#1890ff'
                }[currentViewLog.level] || '#666',
                fontWeight: 'bold'
              }}>
                {currentViewLog.level}
              </span>
            </div>
            
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>消息：</span>
              <div style={{ flex: 1, lineHeight: '1.6' }}>{currentViewLog.message}</div>
            </div>
            
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>来源：</span>
              <span>{currentViewLog.source}</span>
            </div>
            
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>用户ID：</span>
              <span>{currentViewLog.userId || '系统'}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#666' }}>时间：</span>
              <span>{new Date(currentViewLog.timestamp).toLocaleString('zh-CN')}</span>
            </div>
            
            {/* 额外的技术信息 */}
            <div style={{ 
              marginTop: '24px',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '6px'
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#666' }}>技术信息</h4>
              <div style={{ fontSize: '12px', color: '#999', fontFamily: 'monospace' }}>
                <div>Timestamp: {currentViewLog.timestamp}</div>
                <div>Log ID: {currentViewLog.id}</div>
                <div>Source Module: {currentViewLog.source}</div>
              </div>
            </div>
          </div>
        )}
      </DialogWrapper>
    </TablePageLayout>
  )
}

export default LogManagement