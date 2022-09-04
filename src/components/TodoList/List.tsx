import { List } from 'antd'
import React, { useContext } from 'react'
import { TodoContext } from './index'

const ShowList = () => {
  const { todoList } = useContext(TodoContext)
  return (
    <List
      bordered
      dataSource={ todoList }  
      renderItem={ (item) => (
        <List.Item key={item.id}>
          <span>{item.title}</span>
        </List.Item>
      ) }
    >

    </List>
  )
}

export default ShowList