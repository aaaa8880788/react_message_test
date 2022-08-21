import { Button } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import Modal from './components/Modal/Modal';
import { useTodoModal } from './components/TodoModal';

function App() {
  const [content, setContent] = useState<string>();
  const modalRef = useRef<React.ElementRef<typeof Modal>>(null);
  const { show } = useTodoModal();

  const handleShowModal = useCallback(() => {
    modalRef.current?.showModal({
      afterShowModal() {
        return new Promise((resolve) => {
          setTimeout(() => {
            setContent('这是弹窗的内容.........');
            resolve();
          }, 3000);
        });
      },
    });
  }, []);

  return (
    <div className="App">
      <Modal
        title="弹窗标题"
        ref={modalRef}
        onOk={(event) => {
          // event.stopClose();
          console.log(
            '🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆'
          );
        }}
      >
        {content}
      </Modal>
      <Button onClick={handleShowModal}>显示弹窗</Button>
      <Button
        onClick={() =>
          show({
            afterShowModal() {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                }, 3000);
              });
            },
          })
        }
      >
        显示待办项弹窗
      </Button>
    </div>
  );
}

export default App;
