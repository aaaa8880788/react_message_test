import { List } from 'antd';
import React, { FC, useContext } from 'react';
import { TodoContext } from '.';

export default ((props) => {
  const { todoList } = useContext(TodoContext);
  return (
    <List
      bordered
      dataSource={todoList}
      renderItem={(item) => <List.Item key={item.id}>{item.title}</List.Item>}
    />
  );
}) as FC;
