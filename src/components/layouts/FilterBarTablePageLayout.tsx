import React, { useState, useEffect, useRef, type ReactNode } from 'react'
import PageHeader from '../common/PageHeader'
import SearchBar from '../common/SearchBar'
import ActionButton from '../common/ActionButton'
import DataTable from '../common/DataTable'
import Pagination from '../common/Pagination'
import FilterBar from '../common/FilterBar'
import type { 
  SearchItem, 
  ActionButton as ActionButtonType, 
  TableColumn
} from '../../types'
import '../../styles/FilterBarTablePageLayout.scss'

interface FilterBarTablePageLayoutProps {
  // 页面标题
  title?: string
  headerExtra?: ReactNode
  // 搜索相关
  showSearch?: boolean
  searchItems?: SearchItem[]
  initialFormData?: Record<string, any>
  onSearch?: (formData: Record<string, any>) => void
  onReset?: () => void
  // 操作按钮相关
  showAction?: boolean
  showOperationButtons?: boolean
  actionButtons?: ActionButtonType[]
  onAction?: (action: string) => void
  operationButtons?: ReactNode
  extraActions?: ReactNode
  // 表格相关
  tableData: any[]
  tableColumns: TableColumn[]
  loading?: boolean
  showSelection?: boolean
  showIndex?: boolean
  tableBorder?: boolean
  tableStripe?: boolean
  showTableAction?: boolean
  tableActions?: ActionButtonType[]
  actionWidth?: string | number
  actionFixed?: boolean
  onSelectionChange?: (selectedRowKeys: React.Key[]) => void
  onRowClick?: (row: any) => void
  onTableAction?: (action: string, row: any) => void
  // 筛选栏相关
  filterHeader?: ReactNode
  filterContent?: ReactNode
  // 分页相关
  showPagination?: boolean
  total?: number
  current?: number
  pageSize?: number
  pageSizes?: number[]
  onPagination?: (page: number, size: number) => void
  // 其他
  disableInternalScroll?: boolean
}

const FilterBarTablePageLayout: React.FC<FilterBarTablePageLayoutProps> = ({
  title = '数据列表',
  headerExtra,
  showSearch = true,
  searchItems = [],
  initialFormData = {},
  onSearch,
  onReset,
  showAction = true,
  showOperationButtons = true,
  actionButtons = [],
  onAction,
  operationButtons,
  extraActions,
  tableData,
  tableColumns,
  loading = false,
  showSelection = false,
  showIndex = true,
  tableBorder = true,
  tableStripe = true,
  showTableAction = true,
  tableActions = [],
  actionWidth = 200,
  actionFixed = true,
  onSelectionChange,
  onRowClick,
  onTableAction,
  filterHeader,
  filterContent,
  showPagination = true,
  total = 0,
  current = 1,
  pageSize = 10,
  pageSizes = [10, 20, 30, 50],
  onPagination,
  disableInternalScroll = false
}) => {
  const [tableHeight, setTableHeight] = useState<number | string>('auto')
  const [isFilterBarCollapsed, setIsFilterBarCollapsed] = useState(false)
  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const paginationContainerRef = useRef<HTMLDivElement>(null)

  // 防抖函数
  const debounce = (fn: Function, delay: number) => {
    let timer: number | null = null
    return function (this: any, ...args: any[]) {
      const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }

  // 调整表格高度
  const adjustTableMaxHeight = () => {
    if (disableInternalScroll) {
      setTableHeight('auto')
      return
    }

    if (!tableWrapperRef.current) return

    const tableWrapperEl = tableWrapperRef.current
    const rightContentAreaEl = tableWrapperEl.parentElement
    if (!rightContentAreaEl) return

    let paginationHeight = 0
    if (paginationContainerRef.current && showPagination) {
      paginationHeight = paginationContainerRef.current.offsetHeight
    }

    // 获取视口高度
    const viewportHeight = window.innerHeight
    // 获取表格容器到视口顶部的距离
    const tableTopOffset = getOffsetTop(tableWrapperEl)
    
    // 计算最大可用高度
    const bottomMargin = 20
    const maxAvailableHeight = viewportHeight - tableTopOffset - paginationHeight - bottomMargin
    
    // 同时考虑父容器的高度约束
    const availableHeightInRightContent = rightContentAreaEl.offsetHeight
    
    // 取两种计算方式中的较小值
    let calculatedMaxHeight = Math.min(maxAvailableHeight, availableHeightInRightContent - paginationHeight)
    
    // 设置最小高度为150px
    const finalMaxHeight = Math.max(calculatedMaxHeight, 150)
    setTableHeight(finalMaxHeight)
  }

  // 获取元素到视口顶部的距离
  const getOffsetTop = (element: HTMLElement): number => {
    let offsetTop = 0
    let currentElement: HTMLElement | null = element
    while (currentElement) {
      offsetTop += currentElement.offsetTop
      currentElement = currentElement.offsetParent as HTMLElement
    }
    return offsetTop
  }

  // 筛选栏折叠状态变化
  const onFilterBarCollapseChange = (collapsed: boolean) => {
    setIsFilterBarCollapsed(collapsed)
  }

  const debouncedResizeHandler = debounce(adjustTableMaxHeight, 200)

  useEffect(() => {
    if (!disableInternalScroll) {
      adjustTableMaxHeight()
      
      window.addEventListener('resize', debouncedResizeHandler)
      
      // 监听DOM变化
      const contentEl = document.querySelector('.page-content')
      let observer: MutationObserver | null = null
      
      if (contentEl && window.MutationObserver) {
        observer = new MutationObserver(debouncedResizeHandler)
        observer.observe(contentEl, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'class']
        })
      }

      return () => {
        window.removeEventListener('resize', debouncedResizeHandler)
        if (observer) {
          observer.disconnect()
        }
      }
    } else {
      setTableHeight('auto')
    }
  }, [disableInternalScroll, tableData, loading, showPagination])

  return (
    <div className={`page-layout ${disableInternalScroll ? 'layout-auto-height' : ''}`}>
      {/* 页面标题 */}
      <PageHeader title={title}>
        {headerExtra}
      </PageHeader>

      {/* 搜索栏和操作按钮 */}
      <div className="search-action-container">
        {showSearch && (
          <SearchBar
            searchItems={searchItems}
            initialFormData={initialFormData}
            onSearch={onSearch || (() => {})}
            onReset={onReset || (() => {})}
            className="search-area"
          />
        )}

        <div className="action-area">
          {showAction && (
            <ActionButton
              buttons={actionButtons}
              onAction={onAction || (() => {})}
            />
          )}
          {showOperationButtons && operationButtons}
          {extraActions}
        </div>
      </div>

      {/* 页面主要内容区域 */}
      <div className="page-content filter-bar-layout">
        {/* 左侧筛选栏 */}
        <FilterBar 
          className={`left-filter-bar ${isFilterBarCollapsed ? 'shrunk-to-button' : ''}`}
          onCollapseChange={onFilterBarCollapseChange}
          header={filterHeader}
        >
          {filterContent}
        </FilterBar>

        {/* 右侧内容区域 (表格 + 分页) */}
        <div className={`right-content-area ${disableInternalScroll ? 'no-internal-scroll' : ''}`}>
          {/* 表格容器 */}
          <div 
            className={`data-table-wrapper ${disableInternalScroll ? 'no-internal-scroll' : ''}`}
            ref={tableWrapperRef}
          >
            <DataTable
              tableData={tableData}
              columns={tableColumns}
              loading={loading}
              showSelection={showSelection}
              showIndex={showIndex}
              bordered={tableBorder}
              stripe={tableStripe}
              showAction={showTableAction}
              actions={tableActions}
              actionWidth={actionWidth}
              actionFixed={actionFixed}
              height={tableHeight}
              onSelectionChange={onSelectionChange}
              onRowClick={onRowClick}
              onAction={onTableAction}
            />
          </div>
          
          {/* 分页容器 */}
          <div className="pagination-container" ref={paginationContainerRef}>
            {showPagination && (
              <Pagination
                total={total}
                current={current}
                pageSize={pageSize}
                pageSizes={pageSizes}
                onChange={onPagination || (() => {})}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBarTablePageLayout