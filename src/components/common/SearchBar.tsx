import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Select, DatePicker, Button, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import '../../styles/SearchBar.scss'

const { RangePicker } = DatePicker

interface SearchItem {
  prop: string
  label: string
  type: 'input' | 'select' | 'date' | 'daterange'
  placeholder?: string | string[]
  startPlaceholder?: string
  endPlaceholder?: string
  options?: { label: string; value: any }[]
  dateType?: string
  format?: string
  valueFormat?: string
}

interface SearchBarProps {
  searchItems: SearchItem[]
  initialFormData?: Record<string, any>
  onSearch: (data: Record<string, any>) => void
  onReset: () => void
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchItems,
  initialFormData = {},
  onSearch,
  onReset,
  className
}) => {
  const [form] = Form.useForm()
  const [moreOpen, setMoreOpen] = useState(false)
  const [maxFields, setMaxFields] = useState(2)
  const containerRef = useRef<HTMLDivElement>(null)

  const showMore = searchItems.length > maxFields
  const visibleItems = moreOpen || !showMore 
    ? searchItems 
    : searchItems.slice(0, maxFields)

  const calcMaxFields = () => {
    if (containerRef.current) {
      const parentWidth = containerRef.current.offsetWidth
      const fieldWidth = 220
      const max = Math.floor((parentWidth * 0.5) / fieldWidth)
      setMaxFields(Math.max(1, max))
    }
  }

  useEffect(() => {
    calcMaxFields()
    window.addEventListener('resize', calcMaxFields)
    return () => window.removeEventListener('resize', calcMaxFields)
  }, [])

  useEffect(() => {
    form.setFieldsValue(initialFormData)
  }, [initialFormData, form])

  const handleSearch = () => {
    const values = form.getFieldsValue()
    onSearch(values)
  }

  const handleReset = () => {
    form.resetFields()
    onReset()
  }

  const toggleMore = () => {
    setMoreOpen(!moreOpen)
  }

  const getStartPlaceholder = (item: SearchItem) => {
    if (item.startPlaceholder) return item.startPlaceholder
    if (Array.isArray(item.placeholder) && item.placeholder.length > 0) {
      return item.placeholder[0]
    }
    return '开始时间'
  }

  const getEndPlaceholder = (item: SearchItem) => {
    if (item.endPlaceholder) return item.endPlaceholder
    if (Array.isArray(item.placeholder) && item.placeholder.length > 1) {
      return item.placeholder[1]
    }
    return '结束时间'
  }

  const renderFormItem = (item: SearchItem) => {
    switch (item.type) {
      case 'input':
        return (
          <Input
            placeholder={item.placeholder as string || `请输入${item.label}`}
            allowClear
          />
        )
      case 'select':
        return (
          <Select
            placeholder={item.placeholder as string || `请选择${item.label}`}
            allowClear
            options={item.options}
          />
        )
      case 'date':
        return (
          <DatePicker
            placeholder={item.placeholder as string || `请选择${item.label}`}
            format={item.format}
            allowClear
          />
        )
      case 'daterange':
        return (
          <RangePicker
            placeholder={[getStartPlaceholder(item), getEndPlaceholder(item)]}
            format={item.format || 'YYYY-MM-DD'}
            allowClear
          />
        )
      default:
        return <Input />
    }
  }

  return (
    <div className={`search-bar ${className || ''}`} ref={containerRef}>
      <Form
        form={form}
        layout="inline"
        className={`search-form ${moreOpen ? 'more-open' : ''}`}
      >
        {visibleItems.map((item) => (
          <Form.Item key={item.prop} name={item.prop} label={item.label}>
            {renderFormItem(item)}
          </Form.Item>
        ))}
        
        {showMore && (
          <Form.Item>
            <Button type="link" onClick={toggleMore}>
              {moreOpen ? '收起' : '更多'}
              <DownOutlined 
                style={{ 
                  marginLeft: '2px',
                  transform: moreOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }} 
              />
            </Button>
          </Form.Item>
        )}
        
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleSearch}>
              搜索
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SearchBar