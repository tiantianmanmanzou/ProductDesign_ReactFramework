import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import TreeNode from './TreeNode'
import '../../styles/FilterFields.scss'

interface TreeFieldData {
  label: string
  value: string | number
  count?: number
  children?: TreeFieldData[]
}

interface FilterField {
  prop: string
  label: string
  type: 'tree' | 'select'
  treeData?: TreeFieldData[]
  options?: Array<{ label: string; value: any }>
}

interface FilterFieldsProps {
  fields: FilterField[]
  value?: Record<string, any>
  onChange?: (values: Record<string, any>) => void
}

const FilterFields: React.FC<FilterFieldsProps> = ({
  fields,
  value = {},
  onChange
}) => {
  const [selected, setSelected] = useState<Record<string, any>>({ ...value })

  useEffect(() => {
    setSelected({ ...value })
  }, [value])

  const handleSelect = (prop: string, val: any) => {
    const newSelected = { ...selected, [prop]: val }
    setSelected(newSelected)
    emitChange(newSelected)
  }

  const emitChange = (newValues: Record<string, any>) => {
    if (onChange) {
      onChange(newValues)
    }
  }

  const handleSelectChange = (prop: string, val: any) => {
    handleSelect(prop, val)
  }

  return (
    <div className="filter-fields">
      {fields.map((field) => (
        <div key={field.prop} className="filter-field">
          {field.type === 'tree' && field.treeData && field.treeData.length > 0 && (
            <div className="filter-tree">
              <TreeNode
                node={field.treeData[0]}
                selected={selected[field.prop]}
                onSelect={(val) => handleSelect(field.prop, val)}
              />
            </div>
          )}
          
          {field.type === 'select' && (
            <div className="filter-select">
              <label>{field.label}</label>
              <Select
                value={selected[field.prop]}
                onChange={(val) => handleSelectChange(field.prop, val)}
                style={{ width: '100%' }}
                placeholder={`请选择${field.label}`}
              >
                {field.options?.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FilterFields