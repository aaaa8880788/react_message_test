import { Space } from 'antd';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import TodoHeader from './Header';
import TodoList from './List';

export const TodoContext = React.createContext<ITodoContext>({
  todoList: [],
  addTodo(todo) {},
});

export default ((props) => {
  const { data } = props;
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const todoListRef = useRef(todoList);

  const addTodo = useCallback((todo: TodoItem) => {
    todoListRef.current.push(todo);
    setTodoList(todoListRef.current.slice());
  }, []);

  useEffect(() => {
    setTodoList(todoListRef.current.concat(data));
  }, [data]);

  const store = useMemo(
    () => ({
      todoList,
      addTodo,
    }),
    [todoList, addTodo]
  );

  return (
    <TodoContext.Provider value={store}>
      <Space direction="vertical">
        <TodoHeader />
        <TodoList />
      </Space>
    </TodoContext.Provider>
  );
}) as FC<TodoProps>;

interface TodoProps {
  data: TodoItem[];
}

interface ITodoContext {
  todoList: TodoItem[];
  addTodo(todo: TodoItem): void;
}

interface TodoItem {
  id: string;
  title: string;
  done: boolean;
  createTime: number;
  doneTime?: number;
}
