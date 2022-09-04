// Header

export interface TodoProps {
  data:TodoItem[]
}

export interface TodoContextProps{
  todoList: TodoItem[]
  addTodo(todo:TodoItem): void
}

export interface TodoItem{
  id: string
  title: string
  createTime: number
}

// Header