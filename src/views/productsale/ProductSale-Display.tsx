import React, { useState, useCallback } from 'react'
import { Card, Row, Col, Input, Button, Space, Empty, Spin } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'

const { Search } = Input

interface ProductItem {
  id: string
  productName: string
  description: string
  shelfTime: string
  status: string
  category?: string
  price?: number
  stock?: number
}

const ProductSaleDisplay: React.FC = () => {
  const [loading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [products] = useState<ProductItem[]>([
    {
      id: '1',
      productName: 'MacBook Air M3',
      description: '轻薄便携的笔记本电脑，搭载M3芯片，续航长达18小时，适合学生和商务人士使用',
      shelfTime: '2024-02-15',
      status: 'approved',
      category: '笔记本电脑',
      price: 8999,
      stock: 50
    },
    {
      id: '2',
      productName: 'iPad Air 6',
      description: '轻薄平板电脑，支持Apple Pencil，适合创意工作和学习，性能强劲',
      shelfTime: '2024-03-01',
      status: 'approved',
      category: '平板电脑',
      price: 4799,
      stock: 100
    },
    {
      id: '3',
      productName: 'AirPods Pro 2',
      description: '主动降噪无线耳机，支持空间音频，音质出色，降噪效果优秀',
      shelfTime: '2024-01-20',
      status: 'approved',
      category: '音频设备',
      price: 1899,
      stock: 200
    },
    {
      id: '4',
      productName: 'Apple Watch Series 9',
      description: '智能手表，健康监测功能强大，支持心电图检测，运动追踪准确',
      shelfTime: '2024-01-15',
      status: 'approved',
      category: '智能穿戴',
      price: 2999,
      stock: 80
    },
    {
      id: '5',
      productName: 'iMac 24"',
      description: '一体式台式电脑，M2芯片，4.5K显示屏，适合设计和办公',
      shelfTime: '2024-02-10',
      status: 'approved',
      category: '台式电脑',
      price: 12999,
      stock: 30
    },
    {
      id: '6',
      productName: 'Magic Keyboard',
      description: '无线键盘，剪刀式按键，支持Touch ID，打字体验舒适',
      shelfTime: '2024-01-25',
      status: 'approved',
      category: '配件',
      price: 999,
      stock: 150
    },
    {
      id: '7',
      productName: 'Studio Display',
      description: '27英寸5K显示器，支持True Tone，色彩准确，适合专业工作',
      shelfTime: '2024-02-05',
      status: 'approved',
      category: '显示器',
      price: 11499,
      stock: 25
    },
    {
      id: '8',
      productName: 'HomePod mini',
      description: '智能音箱，S5芯片，支持Siri，音质出色，智能家居控制',
      shelfTime: '2024-01-30',
      status: 'approved',
      category: '智能家居',
      price: 749,
      stock: 120
    }
  ])



  // 事件处理
  const handleSearch = useCallback((value: string) => {
    console.log('搜索关键词:', value)
    setSearchValue(value)
    // 执行搜索逻辑
  }, [])

  const handleReset = useCallback(() => {
    setSearchValue('')
    // 重置搜索，显示所有商品
  }, [])

  const handleProductClick = useCallback((product: ProductItem) => {
    console.log('查看商品详情:', product)
    // 打开商品详情弹窗
  }, [])

  // 过滤商品数据
  const filteredProducts = products.filter(product => 
    product.productName.toLowerCase().includes(searchValue.toLowerCase()) ||
    product.description.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <div style={{ padding: '24px' }}>
      {/* 搜索区域 */}
      <div style={{ marginBottom: '24px' }}>
        <Space>
          <Search
            placeholder="请输入商品名称"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            style={{ width: 300 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
          />
          <Button 
            icon={<ReloadOutlined />} 
            onClick={handleReset}
            size="large"
          >
            重置
          </Button>
        </Space>
      </div>

      {/* 商品展示区域 */}
      <div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <Row gutter={[16, 16]}>
            {filteredProducts.map(product => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={product.id}>
                <Card
                  hoverable
                  style={{ height: '100%' }}
                  onClick={() => handleProductClick(product)}
                >
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '8px', fontSize: '16px' }}>
                      {product.productName}
                    </h3>
                    <p style={{ 
                      color: '#666', 
                      fontSize: '14px',
                      marginBottom: '8px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {product.description}
                    </p>
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ 
                        color: '#1890ff', 
                        fontSize: '16px', 
                        fontWeight: 'bold' 
                      }}>
                        ¥{product.price?.toLocaleString()}
                      </span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      fontSize: '12px',
                      color: '#999'
                    }}>
                      <span>库存: {product.stock}</span>
                      <span>上架: {product.shelfTime}</span>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            description="暂无商品数据，请先创建上架申请"
            style={{ marginTop: '50px' }}
          />
        )}
      </div>
    </div>
  )
}

export default ProductSaleDisplay
