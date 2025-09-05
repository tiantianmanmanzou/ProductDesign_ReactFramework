# ProductDesign_ReactFramework

Enterprise-side software product manager prototype design framework based on React

## 项目简介

这是一个基于 React + TypeScript + Ant Design 的企业级产品原型设计框架，提供了常用的页面布局模板和组件，帮助产品经理和开发者快速构建企业管理系统原型。

## 技术栈

- **React 19** - 用户界面框架
- **TypeScript** - 类型安全的 JavaScript
- **Ant Design 5** - 企业级 UI 设计语言
- **React Router 7** - 路由管理
- **Redux Toolkit** - 状态管理
- **Vite** - 构建工具
- **Axios** - HTTP 请求库
- **Sass** - CSS 预处理器

## 项目结构

```
ProductDesign_ReactFramework/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── common/         # 通用组件（表格、搜索栏、分页等）
│   │   └── layouts/        # 布局组件
│   ├── views/              # 页面视图
│   │   ├── UserManagement/ # 用户管理模块
│   │   ├── productsale/    # 产品销售模块
│   │   └── LogManagement/  # 日志管理模块
│   ├── router/             # 路由配置
│   ├── store/              # Redux 状态管理
│   ├── utils/              # 工具函数
│   └── types/              # TypeScript 类型定义
├── public/                 # 静态资源
└── dist/                   # 构建输出

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

访问 http://localhost:5173

### 构建项目

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 功能特性

### 布局组件
- **NavigationLayout** - 带侧边导航的主布局
- **NavigationBLayout** - 备选导航布局
- **FilterBarTablePageLayout** - 带筛选栏的表格页面
- **HorizontalTabsPageLayout** - 横向标签页布局
- **VerticalTabsPageLayout** - 纵向标签页布局
- **TablePageLayout** - 标准表格页面布局
- **BlankLayout** - 空白布局

### 通用组件
- **DataTable** - 数据表格
- **FilterBar** - 筛选栏
- **SearchBar** - 搜索栏
- **Pagination** - 分页组件
- **DialogWrapper** - 弹窗包装器
- **PageHeader** - 页面标题
- **ActionButton** - 操作按钮
- **Tabs** - 标签页
- **TreeNode** - 树形节点
- **VerticalIconMenu** - 垂直图标菜单

### 业务模块
- **用户管理** - 用户、角色、权限管理
- **产品销售** - 申请、审核、展示管理
- **日志管理** - 系统日志查询

## 开发指南

### 新增页面

1. 在 `src/views/` 下创建新的页面组件
2. 在 `src/router/index.tsx` 中添加路由配置
3. 选择合适的布局组件包装页面内容

### 使用布局组件

```tsx
import { FilterBarTablePageLayout } from '@/components/layouts/FilterBarTablePageLayout';

const MyPage = () => {
  return (
    <FilterBarTablePageLayout
      title="页面标题"
      filterFields={[...]}
      columns={[...]}
      dataSource={[...]}
    />
  );
};
```

### 状态管理

使用 Redux Toolkit 进行状态管理：

```tsx
// 使用状态
const user = useSelector((state) => state.user);

// 分发动作
const dispatch = useDispatch();
dispatch(userSlice.actions.setUser(userData));
```

## 注意事项

- 项目使用 TypeScript，请确保类型定义完整
- 遵循组件化开发原则，保持组件职责单一
- 使用 Ant Design 组件库，保持 UI 风格一致
- 代码提交前请运行 `npm run lint` 检查代码规范

## License

MIT
^-^