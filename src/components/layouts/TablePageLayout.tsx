import React, { type ReactNode } from 'react'
import SearchBar from '../common/SearchBar'
import ActionButton from '../common/ActionButton'
import DataTable from '../common/DataTable'
import Pagination from '../common/Pagination'
import type { 
  SearchItem, 
  ActionButton as ActionButtonType, 
  TableColumn
} from '../../types'

interface TablePageLayoutProps {
  // 页面标题
  title?: string
  
  // 搜索相关
  showSearch?: boolean
  searchItems?: SearchItem[]
  initialFormData?: Record<string, any>
  onSearch?: (formData: Record<string, any>) => void
  onReset?: () => void
  
  // 操作按钮相关
  showActionButtons?: boolean
  actionButtons?: ActionButtonType[]
  onAction?: (action: string) => void
  
  // 表格相关
  tableData: any[]
  tableColumns: TableColumn[]
  loading?: boolean
  showSelection?: boolean
  showIndex?: boolean
  showTableAction?: boolean
  tableActions?: ActionButtonType[]
  actionWidth?: string | number
  actionFixed?: boolean
  rowKey?: string | ((record: any) => string)
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: any[]) => void
  onRowClick?: (row: any) => void
  onTableAction?: (action: string, row: any) => void
  
  // 分页相关
  showPagination?: boolean
  total?: number
  current?: number
  pageSize?: number
  pageSizes?: number[]
  onPagination?: (page: number, size: number) => void
  
  // 其他内容
  children?: ReactNode
}

const TablePageLayout: React.FC<TablePageLayoutProps> = ({
  title,
  showSearch = true,
  searchItems = [],
  initialFormData = {},
  onSearch,
  onReset,
  showActionButtons = true,
  actionButtons = [],
  onAction,
  tableData,
  tableColumns,
  loading = false,
  showSelection = false,
  showIndex = true,
  showTableAction = true,
  tableActions = [],
  actionWidth = 200,
  actionFixed = false,
  rowKey = 'id',
  onSelectionChange,
  onRowClick,
  onTableAction,
  showPagination = true,
  total = 0,
  current = 1,
  pageSize = 10,
  pageSizes = [10, 20, 30, 50],
  onPagination,
  children
}) => {
  return (
    <div style={{ paddingTop: '25px' }}>
      {/* 页面标题 */}
      {title && (
        <div style={{ marginBottom: '12px', padding: '0 24px' }}>
          <h2 style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}>{title}</h2>
        </div>
      )}
      
      {/* 搜索栏和操作按钮 */}
      {(showSearch || showActionButtons) && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '31px',
          flexShrink: 0,
          padding: '0 24px'
        }}>
          {/* 搜索区域 */}
          {showSearch && (
            <div style={{ 
              flexGrow: 1, 
              marginRight: showActionButtons ? '16px' : '0'
            }}>
              <SearchBar
                searchItems={searchItems}
                initialFormData={initialFormData}
                onSearch={onSearch || (() => {})}
                onReset={onReset || (() => {})}
              />
            </div>
          )}
          
          {/* 操作按钮区域 */}
          {showActionButtons && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              flexShrink: 0 
            }}>
              <ActionButton
                buttons={actionButtons}
                onAction={onAction || (() => {})}
              />
            </div>
          )}
        </div>
      )}
      
      {/* 表格和分页区域 */}
      <div style={{ padding: '0 24px' }}>
        <DataTable
          tableData={tableData}
          columns={tableColumns}
          loading={loading}
          showSelection={showSelection}
          showIndex={showIndex}
          showAction={showTableAction}
          actions={tableActions}
          actionWidth={actionWidth}
          actionFixed={actionFixed}
          rowKey={rowKey}
          onSelectionChange={onSelectionChange}
          onRowClick={onRowClick}
          onAction={onTableAction}
        />
        
        {showPagination && (
          <Pagination
            current={current}
            total={total}
            pageSize={pageSize}
            pageSizes={pageSizes}
            onChange={onPagination || (() => {})}
          />
        )}
      </div>

      {/* 其他自定义内容 */}
      {children}
    </div>
  )
}

export default TablePageLayout