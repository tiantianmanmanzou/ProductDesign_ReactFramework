import React, { useState, useCallback } from 'react'
import { Modal, Form, Input, DatePicker, Select, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const { TextArea } = Input
const { Option } = Select

interface ProductApplyForm {
  productName: string
  description: string
  reason: string
  shelfTime: string
  applyDesc: string
  approver: string
  remark: string
}

interface ProductApplyNewProps {
  visible: boolean
  onCancel: () => void
  onSuccess: (data: ProductApplyForm) => void
}

const ProductApplyNew: React.FC<ProductApplyNewProps> = ({
  visible,
  onCancel,
  onSuccess
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // 审批人选项（模拟数据）
  const approverOptions = [
    { label: '李四', value: 'lisi' },
    { label: '赵六', value: 'zhaoliu' },
    { label: '周八', value: 'zhouba' },
    { label: '郑十', value: 'zhengshi' },
    { label: '陈二', value: 'chener' }
  ]

  // 表单提交处理
  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 格式化数据
      const formData: ProductApplyForm = {
        ...values,
        shelfTime: values.shelfTime.format('YYYY-MM-DD')
      }
      
      message.success('申请提交成功！')
      onSuccess(formData)
      handleCancel()
    } catch (error) {
      console.error('表单验证失败:', error)
    } finally {
      setLoading(false)
    }
  }, [form, onSuccess])

  // 取消处理
  const handleCancel = useCallback(() => {
    form.resetFields()
    onCancel()
  }, [form, onCancel])

  // 表单验证规则
  const formRules = {
    productName: [
      { required: true, message: '请输入商品名称' },
      { max: 100, message: '商品名称不能超过100个字符' }
    ],
    reason: [
      { required: true, message: '请输入上架原因' },
      { max: 200, message: '上架原因不能超过200个字符' }
    ],
    shelfTime: [
      { required: true, message: '请选择上架时间' },
      {
        validator: (_: any, value: any) => {
          if (value && value.isBefore(dayjs(), 'day')) {
            return Promise.reject(new Error('上架时间不能早于今天'))
          }
          return Promise.resolve()
        }
      }
    ],
    approver: [
      { required: true, message: '请选择审批人' }
    ],
    description: [
      { max: 500, message: '商品描述不能超过500个字符' }
    ],
    applyDesc: [
      { max: 500, message: '申请描述不能超过500个字符' }
    ],
    remark: [
      { max: 200, message: '备注不能超过200个字符' }
    ]
  }

  return (
    <Modal
      title="新增商品上架申请"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          loading={loading}
          onClick={handleSubmit}
          icon={<PlusOutlined />}
        >
          确认
        </Button>
      ]}
      width={600}
      destroyOnClose
    >
      <div style={{ marginBottom: '16px', color: '#666' }}>
        请填写商品上架申请信息
      </div>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          shelfTime: dayjs().add(1, 'day') // 默认明天
        }}
      >
        <Form.Item
          label="商品名称"
          name="productName"
          rules={formRules.productName}
          required
        >
          <Input 
            placeholder="请输入商品名称" 
            maxLength={100}
            showCount
          />
        </Form.Item>

        <Form.Item
          label="商品描述"
          name="description"
          rules={formRules.description}
        >
          <TextArea
            placeholder="请输入商品描述"
            rows={3}
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item
          label="上架原因"
          name="reason"
          rules={formRules.reason}
          required
        >
          <Input 
            placeholder="请输入上架原因" 
            maxLength={200}
            showCount
          />
        </Form.Item>

        <Form.Item
          label="上架时间"
          name="shelfTime"
          rules={formRules.shelfTime}
          required
        >
          <DatePicker
            placeholder="选择上架时间"
            style={{ width: '100%' }}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
          />
        </Form.Item>

        <Form.Item
          label="申请描述"
          name="applyDesc"
          rules={formRules.applyDesc}
        >
          <TextArea
            placeholder="请输入申请描述"
            rows={3}
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item
          label="审批人"
          name="approver"
          rules={formRules.approver}
          required
        >
          <Select
            placeholder="选择审批人"
            showSearch
            filterOption={(input, option) =>
              String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          >
            {approverOptions.map(option => (
              <Option key={option.value} value={option.value} label={option.label}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
          rules={formRules.remark}
        >
          <TextArea
            placeholder="可选备注信息"
            rows={2}
            maxLength={200}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ProductApplyNew

