import React, { FC, useCallback, useRef, useState } from 'react'
import { Button } from 'antd'
import Modal from '../components/SuperModal/Modal'
import TestComponent from '@/components/TestComponent'

const DemoB:FC = () => {
  const [content, setContent] = useState<string>('')
  const modalRef = useRef<React.ElementRef<typeof Modal>>(null)

  const mock1 = () =>{
    return new Promise<Mock>((resolve)=>{
      setTimeout(() => {
        resolve({
          code:0,
          message:'React好难啊，救救我~🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆'
        })
      }, 2000);
    })
  }
  const mock2 = () =>{
    return new Promise<Mock>((resolve)=>{
      setTimeout(() => {
        resolve({
          code:0,
          message:'摆烂🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆'
        })
      }, 2000);
    })
  }

  const handleShowModal = useCallback(() => {
    setContent('')
    modalRef.current?.showModal({
      afterShowModal() {
        return new Promise(async(resolve) => {
          const res = await mock1()
          if(res.code === 0) {
            setContent(res.message)
            resolve()
          }
        })
      }
    })
  }, [])
  const handleOnOk = (event: React.MouseEvent<HTMLElement> & { stopClose: () => void }) => {
    return new Promise<void>(async(resolve) => {
      const res = await mock2()
      if(res.code === 0) {
        console.log('🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆');
        // event?.stopClose()
        resolve()
      }
    })
  }
  const handleOnCancle = () => {
    console.log('🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆');
  }
  return (
    <div>
      <Modal
        destroyOnClose
        isDrag
        ref={modalRef}
        onOk={handleOnOk}
        onCancel={handleOnCancle}
        bodyStyle={{
          height:'300px',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          fontSize:'18px'
        }}
        okButtonProps = {{
          style:{
            display: content ? "" : "none"
          }
        }}
        title={
          <span>弹窗标题</span>
        }
      >
        <TestComponent message={content}></TestComponent>
      </Modal>
      <Button onClick={handleShowModal}>显示弹窗C</Button>

    </div>
  )
}

export default DemoB

interface Mock {
  code:number
  message:string
}
