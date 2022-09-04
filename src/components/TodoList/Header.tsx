import React, { useCallback, useContext, useRef } from 'react'
import { TodoContext } from './index'
import { Space , Input ,Button, notification } from 'antd'
import moment from 'moment'

const Header = () => {
  const { addTodo,todoList } = useContext(TodoContext)
  const value = useRef<string>()

  const handleAddTodo = useCallback(()=>{
    if(!value.current){
      return notification.warning({
        message:'请输入代办项...'
      })
    }
    const todo = {
      id:Math.random().toString().slice(2),
      title:value.current,
      createTime:moment().valueOf()
    }
    addTodo(todo)
    
  },[addTodo])

  return (
    <Space>
      <Input allowClear onChange={(e) => {
        value.current = e.target.value
      }}></Input>
      <Button onClick={handleAddTodo}>添加</Button>
    </Space>
  )
}

export default Header