import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom/client';
import TodoList from './Todo';
import Modal, { ModalRef, ModalProps } from '../Modal/Modal';

const useTodoData = () => {
  const [todoList, setTodoList] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const emptyArr = new Array(10).fill('');
      setTodoList(
        emptyArr.map((x) => ({
          id: Math.random().toString().slice(2),
          title: `Money $${Math.random().toString().slice(2)}`,
          done: false,
        }))
      );
    }, 2000);
  }, []);

  return todoList;
};

const TodoModal = forwardRef<ModalRef, TodoModalProps>((props, ref) => {
  const data = useTodoData();

  return (
    <Modal title="待办项" ref={ref} {...props}>
      <TodoList data={data} />
    </Modal>
  );
});

export const useTodoModal = () => {
  const container = useRef(document.createElement('div'));
  console.log(container.current);
  
  const modalRef = useRef<React.ElementRef<typeof TodoModal>>(null);

  useEffect(() => {
    document.body.appendChild(container.current);
    ReactDOM.createRoot(container.current).render(<TodoModal ref={modalRef} />)

    return () => {
      document.body.removeChild(container.current);
    };
  }, []);

  const show: ModalRef['showModal'] = useCallback(async (options) => {
    await modalRef.current?.showModal(options);
  }, []);

  return { show };
};

interface TodoModalProps extends Omit<ModalProps, 'title'> {}

export default TodoModal;
