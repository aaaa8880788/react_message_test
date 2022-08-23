import React,{ useCallback, useRef, useState} from 'react'
import { Button } from 'antd'
import Modal from '../components/Modal/Modal'

const DemoB = ()=>{
  const [content,setContent] = useState<string>('')
  const modalRef = useRef<React.ElementRef<typeof Modal>>(null)
  const handleShowModal = useCallback(()=>{
    setContent('')
    modalRef.current?.showModal({
      afterShowModal() {
        return new Promise((resolve)=>{
          setTimeout(()=>{
            setContent('这是弹窗的内容..........')
            resolve()
          },3000)
        })
      }
    })
  },[])
  return (
    <div>
      <Modal
        title='弹窗标题'
        ref={modalRef}
        onOk={(event)=>{
          event.stopClose()
          console.log('🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆');
        }}
      >
        {content}
      </Modal>
      <Button onClick={handleShowModal}>显示弹窗B</Button>
    </div>
  )
}

export default DemoB