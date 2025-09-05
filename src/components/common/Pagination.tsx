import React from 'react'
import { Pagination as AntdPagination } from 'antd'
import '../../styles/Pagination.scss'

interface PaginationProps {
  current: number
  total: number
  pageSize: number
  pageSizes?: number[]
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: boolean
  onChange: (page: number, pageSize: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  pageSize,
  pageSizes = [10, 20, 50, 100],
  showSizeChanger = true,
  showQuickJumper = true,
  showTotal = true,
  onChange
}) => {
  const showTotalFn = showTotal 
    ? (total: number, range: [number, number]) => 
        `共 ${total} 条记录，显示第 ${range[0]}-${range[1]} 条`
    : undefined

  return (
    <div style={{ padding: '16px 0', textAlign: 'right' }}>
      <AntdPagination
        current={current}
        total={total}
        pageSize={pageSize}
        showSizeChanger={showSizeChanger}
        showQuickJumper={showQuickJumper}
        showTotal={showTotalFn}
        onChange={onChange}
        onShowSizeChange={onChange}
        pageSizeOptions={pageSizes.map(size => size.toString())}
      />
    </div>
  )
}

export default Pagination