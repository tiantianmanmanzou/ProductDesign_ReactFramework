# 商品上架管理系统

## 页面结构

本系统包含以下三个主要页面，采用垂直标签页布局：

### 1. 上架申请页面 (`ProductSale-Apply.tsx`)
- **功能**: 管理商品上架申请的创建、编辑、删除和查看
- **布局**: 使用 `FilterBarTablePageLayout` 组件
- **主要功能**:
  - 申请查询筛选（商品名称、状态、申请人）
  - 申请列表展示
  - 新增申请
  - 编辑申请
  - 删除申请
  - 查看详情

### 2. 上架审核页面 (`ProductSale-Audit.tsx`)
- **功能**: 管理商品上架申请的审核流程
- **布局**: 使用 `FilterBarTablePageLayout` 组件
- **主要功能**:
  - 审核查询筛选
  - 审核列表展示
  - 同意申请
  - 拒绝申请
  - 查看详情

### 3. 商品展示页面 (`ProductSale-Display.tsx`)
- **功能**: 展示已通过审核的商品信息
- **布局**: 使用卡片网格布局
- **主要功能**:
  - 商品搜索筛选
  - 商品卡片展示
  - 商品详情查看

## 技术实现

### 标签页容器
- **组件**: `ProductSaleTabs.tsx`
- **布局**: `VerticalTabsPageLayout`
- **图标**: 使用 Ant Design 图标库
  - 上架申请: `ShoppingOutlined`
  - 上架审核: `CheckCircleOutlined`
  - 商品展示: `EyeOutlined`

### 路由配置
- **路径**: `/product-sale`
- **默认页面**: 上架申请页面 (`/product-sale/apply`)
- **面包屑**: 商品管理 > 商品上架管理 > [具体页面]

### 类型定义
在 `src/types/index.ts` 中添加了：
- `ProductApply`: 商品申请接口
- `ProductDisplay`: 商品展示接口

## 开发规范

严格按照 `Code_React_TabsPage标签页开发方法.md` 规范实现：

1. **文件命名**: 使用 `{ModuleName}Tabs.tsx` 和 `{ModuleName}-{SubPage}.tsx` 格式
2. **组件结构**: 使用 `VerticalTabsPageLayout` + `Outlet` 模式
3. **配置驱动**: 通过配置对象定义菜单项和页面功能
4. **类型安全**: 使用 TypeScript 严格类型定义

## 使用方法

1. 访问 `/product-sale` 路径
2. 左侧垂直图标菜单切换不同功能页面
3. 每个页面都有独立的查询筛选和操作功能
4. 支持响应式布局，适配不同屏幕尺寸

## 扩展开发

如需添加新的标签页：
1. 在 `menuItems` 中添加新的菜单项
2. 创建对应的子页面组件
3. 在路由配置中添加子路由
4. 更新类型定义（如需要）
