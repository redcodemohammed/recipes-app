'use client'
import {
  FileAddTwoTone,
  GoldTwoTone,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Button, Image, Layout, Menu, Typography } from 'antd'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

const { Header, Sider, Content } = Layout

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PageHeader({ children }: PageHeaderProps) {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const path = usePathname()
  const { data: session, status } = useSession()

  async function logout() {
    await signOut()
    router.push('/api/auth/signin')
  }

  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="w-full flex flex-col text-white items-center justify-center my-4 gap-2">
          <h3 className=" text-2xl">NextJS</h3>
          {session?.user?.image && (
            <>
              <Image
                src={session.user.image}
                alt={session?.user?.name || 'User profile image'}
                width={50}
                height={50}
                className="rounded-full"
              />
              <p>Hello {session.user.name}</p>
            </>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[path === '/add' ? '2' : '1']}
          items={[
            {
              key: '1',
              icon: <GoldTwoTone />,
              label: <Link href="/">All Recipes</Link>
            },
            {
              key: '2',
              icon: <FileAddTwoTone />,
              label: <Link href="/add">Add Recipe</Link>
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background "
          style={{
            padding: 0
          }}>
          <div className="flex justify-between items-center h-full px-4">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed)
            })}
            <Button
              onClick={() => {
                logout()
              }}
              icon={<LogoutOutlined />}></Button>
          </div>
        </Header>

        <Content
          className=""
          style={{
            margin: '24px 16px',
            padding: 24
          }}>
          {children}
        </Content>
      </Layout>
    </>
  )
}
