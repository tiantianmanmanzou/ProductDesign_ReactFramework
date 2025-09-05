import React, { useState } from 'react'
import '../../styles/TreeNode.scss'

interface TreeNodeData {
  label: string
  value: string | number
  count?: number
  children?: TreeNodeData[]
}

interface TreeNodeProps {
  node: TreeNodeData
  selected?: string | number
  level?: number
  onSelect?: (value: string | number) => void
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  selected,
  level = 0,
  onSelect
}) => {
  const [expanded, setExpanded] = useState(level === 0) // 只展开一级节点

  const isSelected = selected === node.value
  const hasChildren = node.children && node.children.length > 0

  const selectNode = () => {
    if (onSelect) {
      onSelect(node.value)
    }
  }

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(!expanded)
  }

  return (
    <div>
      <div
        className={`tree-node ${isSelected ? 'active' : ''} ${expanded ? 'expanded' : ''}`}
        onClick={selectNode}
      >
        {hasChildren && (
          <span className="tree-node-icon" onClick={toggleExpand}></span>
        )}
        <span className="tree-node-label">{node.label}</span>
        {node.count !== undefined && (
          <span className="count">({node.count})</span>
        )}
      </div>
      
      {hasChildren && expanded && (
        <div className="tree-children">
          {node.children!.map((child) => (
            <TreeNode
              key={child.value}
              node={child}
              selected={selected}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeNode