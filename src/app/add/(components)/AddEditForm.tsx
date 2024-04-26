'use client'
import { createRecipe } from '@/api'
import { units, type Recipe } from '@/models/Recipe'
import { FileAddTwoTone, SendOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Form, Input, Select, Space, Typography, notification } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface AddEditFormProps extends React.HTMLAttributes<HTMLDivElement> {
  edit?: boolean
  recipe?: Recipe
}

export function AddEditForm({ edit, recipe }: AddEditFormProps) {
  const router = useRouter()
  const formType = edit ? 'Edit' : 'Add'

  const [form] = Form.useForm()

  const [data, setData] = useState<Recipe>(
    recipe || {
      active: true,
      name: '',
      unit: 'kg',
      daysToExpire: undefined
    }
  )

  const [loading, setLoading] = useState(false)
  function onFinish() {
    setLoading(true)
    createRecipe(data)
      .then((response) => {
        if (!response.error) {
          form.resetFields()
          notification.success({
            message: 'Recipe Added',
            description: 'The Recipe was added successfully',
            placement: 'bottomRight',
            icon: <FileAddTwoTone twoToneColor="#52c41a" />,
            btn: <Button onClick={() => router.push('/')}>View All</Button>
          })
        } else {
          throw new Error(response.message)
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: error.message,
          placement: 'bottomRight'
        })
      })
      .finally(() => setLoading(false))
  }

  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="flex justify-center items-center flex-col">
      <Card title="Add a new Recipe" bordered={false} className="max-w-2xl w-full">
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          className="w-full max-w-2xl">
          <Form.Item<Recipe>
            label="Name"
            rules={[{ required: true, message: 'You must enter the name of the Recipe' }]}
            required
            name="name"
            initialValue={recipe?.name ?? ''}>
            <Input onChange={(e) => setData({ ...data, name: e.target.value })} />
          </Form.Item>

          <Form.Item<Recipe> label="Unit" required name="unit" initialValue={recipe?.unit ?? 'kg'}>
            <Select
              onChange={(e) => setData({ ...data, unit: e as Recipe['unit'] })}
              options={units.filter((u) => u !== 'all').map((u) => ({ value: u, label: u.toUpperCase() }))}
            />
          </Form.Item>

          <Form.Item<Recipe>
            label="Days to Expire"
            name="daysToExpire"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value > 0) {
                    return Promise.resolve()
                  }
                  return Promise.reject('Days to expire must be greater than 0')
                }
              }
            ]}
            initialValue={recipe?.daysToExpire}>
            <Input
              prefix={<Typography.Text type="secondary">Days</Typography.Text>}
              allowClear
              type="number"
              onChange={(e) => setData({ ...data, daysToExpire: parseInt(e.target.value) })}
            />
          </Form.Item>

          <Form.Item label="Is Active" name="active" valuePropName="checked" initialValue={recipe?.active ?? true}>
            <Checkbox checked={data.active} onChange={(e) => setData({ ...data, active: e.target.checked })} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button loading={loading} icon={<SendOutlined />} type="primary" htmlType="submit">
                Adds
              </Button>
              <Button htmlType="button" onClick={() => form.resetFields()}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
