import { Input, Flex, Button } from 'antd'
import { useState } from 'react'

interface SearchFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearch: (value: string) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [q, setQ] = useState('')
  return (
    <Flex gap={'1rem'}>
      <Input
        placeholder="Search"
        size="large"
        allowClear
        value={q}
        onChange={(e) => {
          if (e.target.value === '') {
            onSearch('')
          }
          setQ(e.target.value)
        }}
      />
      <Button size="large" type="primary" onClick={() => onSearch(q)}>
        Search
      </Button>
    </Flex>
  )
}
