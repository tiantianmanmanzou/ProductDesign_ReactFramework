import React, { useEffect, useRef } from 'react'
import { Table } from 'antd'
import type { TableProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { TableColumn, ActionButton } from '../../types'
import ActionButtonComponent from './ActionButton'
import '../../styles/DataTable.scss'

interface DataTableProps extends Omit<TableProps<any>, 'columns'> {
  tableData: any[]
  columns: TableColumn[]
  loading?: boolean
  showSelection?: boolean
  showIndex?: boolean
  stripe?: boolean
  showAction?: boolean
  actions?: ActionButton[]
  actionWidth?: number | string
  actionFixed?: boolean
  height?: number | string
  rowKey?: string | ((record: any) => string)
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: any[]) => void
  onRowClick?: (row: any) => void
  onAction?: (action: string, row: any) => void
}

const DataTable = React.forwardRef<any, DataTableProps>(({
  tableData,
  columns,
  loading = false,
  showSelection = false,
  showIndex = true,
  showAction = false,
  actions = [],
  actionWidth = 200,
  actionFixed = false,
  height = 'auto',
  rowKey = 'id',
  onSelectionChange,
  onRowClick,
  onAction,
  ...restProps
}, ref) => {
  const tableRef = useRef<any>(null)

  const convertColumns = (vueCols: TableColumn[]): ColumnsType<any> => {
    const antdColumns: ColumnsType<any> = []

    if (showIndex) {
      antdColumns.push({
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 60,
        align: 'center' as const,
        render: (_, __, index) => index + 1
      })
    }

    const processColumns = (cols: TableColumn[]): ColumnsType<any> => {
      return cols.map((col) => {
        const antdCol: any = {
          title: col.label,
          dataIndex: col.prop,
          key: col.prop || col.label,
          width: col.width,
          minWidth: col.minWidth,
          sorter: col.sortable,
          fixed: col.fixed,
          align: 'center' as const,
          ellipsis: true,
          render: col.formatter ? (_: any, record: any) => col.formatter!(record, col) : undefined
        }

        if (col.children && col.children.length > 0) {
          antdCol.children = processColumns(col.children)
        }

        return antdCol
      })
    }

    antdColumns.push(...processColumns(vueCols))

    if (showAction && actions.length > 0) {
      antdColumns.push({
        title: '操作',
        key: 'action',
        width: actionWidth,
        align: 'center' as const,
        fixed: actionFixed ? 'right' : undefined,
        render: (_, record) => {
          // 为每个按钮添加当前行的disabled状态
          const actionsWithDisabled = actions.map(action => ({
            ...action,
            disabled: typeof action.disabled === 'function' ? action.disabled(record) : (action.disabled || false)
          }))
          
          return (
            <div className="table-action-buttons">
              <ActionButtonComponent
                buttons={actionsWithDisabled}
                onAction={(actionName) => {
                  onAction?.(actionName, record)
                }}
                isTableAction={true}
              />
            </div>
          )
        }
      })
    }

    return antdColumns
  }

  const antdColumns = convertColumns(columns)

  const rowSelection = showSelection ? {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      onSelectionChange?.(selectedRowKeys, selectedRows)
    }
  } : undefined

  useEffect(() => {
    // Table layout adjustment if needed
  }, [tableData, columns])

  return (
    <div className="data-table" style={{ height: height }}>
      <Table
        ref={ref || tableRef}
        columns={antdColumns}
        dataSource={tableData}
        loading={loading}
        rowKey={rowKey}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => onRowClick?.(record)
        })}
        pagination={false}
        scroll={{ x: true }}
        tableLayout="auto"
        size="middle"
        {...restProps}
      />
    </div>
  )
})

export default DataTable