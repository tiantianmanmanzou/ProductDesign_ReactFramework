#!/bin/bash

# 修复React项目中的TypeScript类型错误

echo "修复TypeScript类型错误..."

# 修复HorizontalTabsPageLayout.tsx中的错误
sed -i '' 's/border={tableBorder}/bordered={tableBorder}/g' "/Users/zhangxy/GAFile/上海SDC/ProductDesign_ReactFramework/src/components/layouts/HorizontalTabsPageLayout.tsx"
sed -i '' 's/onSearch={onSearch}/onSearch={onSearch || (() => {})}/g' "/Users/zhangxy/GAFile/上海SDC/ProductDesign_ReactFramework/src/components/layouts/HorizontalTabsPageLayout.tsx"
sed -i '' 's/onReset={onReset}/onReset={onReset || (() => {})}/g' "/Users/zhangxy/GAFile/上海SDC/ProductDesign_ReactFramework/src/components/layouts/HorizontalTabsPageLayout.tsx"
sed -i '' 's/onAction={onAction}/onAction={onAction || (() => {})}/g' "/Users/zhangxy/GAFile/上海SDC/ProductDesign_ReactFramework/src/components/layouts/HorizontalTabsPageLayout.tsx"

# 修复TablePageLayout.tsx中的错误
sed -i '' 's/import React, { useState, useEffect, useRef, ReactNode } from '\''react'\''/import React, { useState, useEffect, useRef, type ReactNode } from '\''react'\''/g' "/Users/zhangxy/GAFile/上海SDC/ProductDesign_ReactFramework/src/components/layouts/TablePageLayout.tsx"
sed -i '' 's/border={tableBorder}/bordered={tableBorder}/g' "/Users/zhangxy/GAFile/上海SDC/ProductDesign_ReactFramework/src/components/layouts/TablePageLayout.tsx"
sed -i '' 's/onSearch={onSearch}/onSearch={onSearch || (() => {})}/g' "/Users/zhangxy/GAFile/上海SDC/ProductDesign_ReactFramework/src/components/layouts/TablePageLayout.tsx"
sed -i '' 's/onReset={onReset}/onReset={onReset || (() => {})}/g' "/Users/zhangxy/GAFile/上海SDC/ProductDesign_ReactFramework/src/components/layouts/TablePageLayout.tsx"
sed -i '' 's/onAction={onAction}/onAction={onAction || (() => {})}/g' "/Users/zhangxy/GAFile/上海SDC/ProductDesign_ReactFramework/src/components/layouts/TablePageLayout.tsx"

echo "类型错误修复完成！"