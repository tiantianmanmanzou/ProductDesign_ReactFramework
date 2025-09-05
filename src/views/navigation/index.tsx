import React from 'react'
import { Card, Row, Col, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Navigation: React.FC = () => {
  const navigate = useNavigate()

  const navigationItems = [
    {
      title: '上架申请',
      description: '商品上架申请管理',
      path: '/product-sale/apply',
      category: '商品管理'
    },
    {
      title: '上架审核',
      description: '商品上架申请审核',
      path: '/product-sale/audit',
      category: '商品管理'
    },
    {
      title: '商品展示',
      description: '已审核商品展示',
      path: '/product-sale/display',
      category: '商品管理'
    },
    {
      title: '用户管理',
      description: '用户信息管理与维护',
      path: '/user-management/user',
      category: '系统管理'
    },
    {
      title: '角色管理',
      description: '角色权限配置管理',
      path: '/user-management/role',
      category: '系统管理'
    },
    {
      title: '权限管理',
      description: '系统权限分配管理',
      path: '/user-management/permission',
      category: '系统管理'
    },
    {
      title: '日志管理',
      description: '系统日志查看与分析',
      path: '/log-management',
      category: '系统管理'
    }
  ]

  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof navigationItems>)

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  return (
    <div style={{ padding: '24px', minHeight: '100vh', background: '#f0f2f5' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            页面导航
          </h1>
          <p style={{ fontSize: '16px', color: '#666' }}>
            快速访问系统各个功能模块
          </p>
        </div>
        
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>
              {category}
            </h2>
            <Row gutter={[16, 16]}>
              {items.map((item, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <Card
                    hoverable
                    style={{ height: '160px' }}
                    bodyStyle={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between' 
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>
                        {item.title}
                      </h4>
                      <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                        {item.description}
                      </p>
                    </div>
                    <Button 
                      type="primary" 
                      size="small"
                      onClick={() => handleNavigate(item.path)}
                      style={{ alignSelf: 'flex-start' }}
                    >
                      访问
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Navigation