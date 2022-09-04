import { Space } from 'antd'
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from './Header'
import ShowList from './List'
import {TodoContextProps,TodoItem,TodoProps} from './type'

export const TodoContext = React.createContext<TodoContextProps>({
  todoList:[],
  addTodo(todo) {},
})

const index:FC<TodoProps> = (props) => {
  const { data } = props
  
  const [todoList,setTodoList] = useState<TodoItem[]>([])
  const todoListRef = useRef(todoList)

  const addTodo = useCallback((todo:TodoItem)=>{
    todoListRef.current.push(todo)
    
    setTodoList(todoListRef.current.slice())
  },[])

  useEffect(()=>{ 
    todoListRef.current = data
    setTodoList([...todoListRef.current])
  },[data])

  const store = useMemo(() => ({
    todoList,
    addTodo
  }),[todoList,addTodo])
  
  return (
    <TodoContext.Provider value={store}>
      <Space direction='vertical'>
        <Header></Header>
        <ShowList></ShowList>
      </Space>
     </TodoContext.Provider>
  )
}

export default index
