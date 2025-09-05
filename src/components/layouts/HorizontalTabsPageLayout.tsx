import React, { useState, useEffect, useRef, type ReactNode } from 'react'
import PageHeader from '../common/PageHeader'
import Tabs from '../common/Tabs'
import SearchBar from '../common/SearchBar'
import ActionButton from '../common/ActionButton'
import DataTable from '../common/DataTable'
import Pagination from '../common/Pagination'
import type { 
  SearchItem, 
  ActionButton as ActionButtonType, 
  TableColumn, 
  TabItem 
} from '../../types'
import '../../styles/HorizontalTabsPageLayout.scss'

interface HorizontalTabsPageLayoutProps {
  // PageHeader props
  pageTitle?: string
  // Tabs props
  tabList?: TabItem[]
  activeTab?: string | number
  onTabChange?: (tabId: string | number) => void
  // SearchBar props
  showSearch?: boolean
  searchItems?: SearchItem[]
  initialFormData?: Record<string, any>
  onSearch?: (formData: Record<string, any>) => void
  onReset?: () => void
  // ActionButton props
  showAction?: boolean
  actionButtons?: ActionButtonType[]
  onAction?: (action: string) => void
  extraActions?: ReactNode
  // DataTable props
  tableData?: any[]
  tableColumns?: TableColumn[]
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
  // Pagination props
  showPagination?: boolean
  total?: number
  currentPage?: number
  pageSize?: number
  pageSizes?: number[]
  onPagination?: (page: number, size: number) => void
  // Content
  children?: ReactNode
  pageTitleSlot?: ReactNode
  tabsSlot?: ReactNode
}

const HorizontalTabsPageLayout: React.FC<HorizontalTabsPageLayoutProps> = ({
  pageTitle = '页面标题',
  tabList = [],
  activeTab,
  onTabChange,
  showSearch = true,
  searchItems = [],
  initialFormData = {},
  onSearch,
  onReset,
  showAction = true,
  actionButtons = [],
  onAction,
  extraActions,
  tableData = [],
  tableColumns = [],
  loading = false,
  showSelection = false,
  showIndex = false,
  tableBorder = true,
  tableStripe = true,
  showTableAction = false,
  tableActions = [],
  actionWidth = 150,
  actionFixed = false,
  onSelectionChange,
  onRowClick,
  onTableAction,
  showPagination = true,
  total = 0,
  currentPage = 1,
  pageSize = 10,
  pageSizes = [10, 20, 30, 50],
  onPagination,
  children,
  pageTitleSlot,
  tabsSlot
}) => {
  const [activeTabId, setActiveTabId] = useState<string | number>(activeTab || '')
  const [innerCurrentPage, setInnerCurrentPage] = useState(currentPage)
  const [innerPageSize, setInnerPageSize] = useState(pageSize)
  const [tableMaxHeight, setTableMaxHeight] = useState<string>('auto')
  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const paginationContainerRef = useRef<HTMLDivElement>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    if (activeTab) {
      setActiveTabId(activeTab)
    }
  }, [activeTab])

  useEffect(() => {
    setInnerCurrentPage(currentPage)
  }, [currentPage])

  useEffect(() => {
    setInnerPageSize(pageSize)
  }, [pageSize])

  useEffect(() => {
    if (tableWrapperRef.current) {
      resizeObserverRef.current = new ResizeObserver(updateTableMaxHeight)
      resizeObserverRef.current.observe(tableWrapperRef.current)
      updateTableMaxHeight()
    }

    return () => {
      if (resizeObserverRef.current && tableWrapperRef.current) {
        resizeObserverRef.current.unobserve(tableWrapperRef.current)
        resizeObserverRef.current.disconnect()
      }
      resizeObserverRef.current = null
    }
  }, [])

  const handleTabChange = (tabId: string | number) => {
    setActiveTabId(tabId)
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

  const handlePagination = (page: number, size: number) => {
    setInnerCurrentPage(page)
    setInnerPageSize(size)
    if (onPagination) {
      onPagination(page, size)
    }
  }

  const updateTableMaxHeight = () => {
    setTimeout(() => {
      const wrapper = tableWrapperRef.current
      const pagination = paginationContainerRef.current
      if (wrapper && pagination) {
        const wrapperHeight = wrapper.offsetHeight
        const paginationHeight = pagination.offsetHeight
        setTableMaxHeight(`${wrapperHeight - paginationHeight - 10}px`)
      } else if (wrapper) {
        setTableMaxHeight(`${wrapper.offsetHeight}px`)
      } else {
        setTableMaxHeight('400px')
      }
    }, 0)
  }

  return (
    <div className="tabs-page-layout">
      {/* 页面标题区域 */}
      <div className="page-title-container">
        {pageTitleSlot || <PageHeader title={pageTitle} />}
      </div>

      {/* 标签页区域 */}
      <div className="tabs-container">
        {tabsSlot || (
          <Tabs
            tabs={tabList}
            activeTab={activeTabId}
            onTabChange={handleTabChange}
          />
        )}
      </div>

      {/* 主要内容区域 */}
      <div className="main-content-area">
        {children || (
          <>
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
                {extraActions}
              </div>
            </div>

            {/* 内容主体 */}
            <div className="page-content">
              {/* 数据表格 */}
              <div className="data-table-wrapper" ref={tableWrapperRef}>
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
                  height={tableMaxHeight}
                  onSelectionChange={onSelectionChange}
                  onRowClick={onRowClick}
                  onAction={onTableAction}
                />
                
                {/* 分页 */}
                <div className="pagination-container" ref={paginationContainerRef}>
                  {showPagination && (
                    <Pagination
                      total={total}
                      current={innerCurrentPage}
                      pageSize={innerPageSize}
                      pageSizes={pageSizes}
                      onChange={handlePagination}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HorizontalTabsPageLayout