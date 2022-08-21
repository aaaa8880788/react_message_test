import { Button, Input, notification, Space } from 'antd';
import React, { FC, useCallback, useContext, useRef } from 'react';
import { TodoContext } from '.';
import moment from 'moment';

export default (() => {
  const { addTodo } = useContext(TodoContext);
  const value = useRef<string>();

  const handleAddTodo = useCallback(() => {
    if (!value.current)
      return notification.warning({ message: '请先输入待办项...' });

    const todo = {
      id: Math.random().toString().slice(2),
      title: value.current!,
      done: false,
      createTime: moment().valueOf(),
    };
    addTodo(todo);
  }, [addTodo]);

  return (
    <Space>
      <Input onChange={(e) => (value.current = e.target.value)} />
      <Button onClick={handleAddTodo}>添加</Button>
    </Space>
  );
}) as FC;
