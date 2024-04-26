'use client'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import { Checkbox, Flex, Select, Table, TableColumnsType } from 'antd'
import { useState } from 'react'
import { SearchForm } from './SearchForm'
import { Fzf } from 'fzf'
import { type Recipe, type Unit, units } from '@/models/Recipe'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '@/api'

interface RecipesProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Recipes({}: RecipesProps) {
  const cols: TableColumnsType<Recipe> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Days to Expire',
      dataIndex: 'daysToExpire',
      key: 'daysToExpire',
      render: (daysToExpire: number) => daysToExpire || 'N/A',
      sorter: (a, b) => (a.daysToExpire || 0) - (b.daysToExpire || Infinity)
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) =>
        active ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#FF0000" />
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      render: (unit: Unit) => unit.toUpperCase()
    }
  ]
  const [q, setQ] = useState('')
  const [unit, setUnit] = useState<Unit | ''>('all')
  const [showActive, setShowActive] = useState(false)

  const { data, isPending, refetch } = useQuery<Recipe[]>({
    queryKey: ['recipes'],
    queryFn: getRecipes,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true
  })

  const fzfData = data || []
  const fzf = new Fzf(
    fzfData.filter(
      (recipe) => (unit !== 'all' && unit !== '' ? recipe.unit === unit : true) && (showActive ? recipe.active : true)
    ),
    {
      selector: (recipe) => recipe.name
    }
  )

  const dataToShow = fzf.find(q).map(({ item }) => item)

  const onSearch = (value: string) => {
    setQ(value)
  }

  return (
    <Flex vertical gap="large">
      <SearchForm onSearch={onSearch} />
      <Flex gap="large" align="center">
        <Checkbox value={showActive} onChange={(e) => setShowActive(e.target.checked)}>
          Show only Active
        </Checkbox>
        <Select
          defaultValue="all"
          className="flex-grow"
          onChange={(v) => setUnit(v as Unit)}
          options={units.map((unit) => ({ value: unit, label: unit.toUpperCase() }))}
        />
      </Flex>
      <Table loading={isPending} columns={cols} dataSource={dataToShow} />
    </Flex>
  )
}
