import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import Modal from '../components/Modal/Modal'
import TestComponent from '@/components/TestComponent'

const DemoB = () => {
  const [content, setContent] = useState<string>('')
  const modalRef = useRef<React.ElementRef<typeof Modal>>(null)
  // 模拟网络请求
  const mock1 = () =>{
    return new Promise<Mock>((resolve)=>{
      setTimeout(() => {
        resolve({
          code:0,
          message:'React好难啊，救救我~🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆'
        })
      }, 3000);
    })
  }
  // 模拟网络请求
  const mock2 = () =>{
    return new Promise<Mock>((resolve)=>{
      setTimeout(() => {
        resolve({
          code:0,
          message:'摆烂🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆'
        })
      }, 3000);
    })
  }
  // 打开对话框
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
  // 确定
  const handleOnOk = (event: React.MouseEvent<HTMLElement> & { stopClose: () => void }) => {
    return new Promise<void>(async(resolve) => {
      // 1.是否需要做校验
      // event?.stopClose()
      // resolve()
      // console.log('校验不通过');
      // 2.校验通过
      const res = await mock2()
      if(res.code === 0) {
        console.log(res.message);      
        resolve()
      }
    })
  }
  // 取消
  const handleOnCancle = () => {
    console.log('🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆');
  }
  return (
    <div>
      <Modal
        destroyOnClose
        title='弹窗标题'
        ref={modalRef}
        onOk={handleOnOk}
        onCancel={handleOnCancle}
        okButtonProps = {{
          style:{
            display: content ? "" : "none"
          }
        }}
        bodyStyle={{
          height:'300px',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          fontSize:'18px'
        }}
      >
        <TestComponent message={content}></TestComponent>
      </Modal>
      <Button onClick={handleShowModal}>显示弹窗B</Button>
    </div>
  )
}

export default DemoB

interface Mock {
  code:number
  message:string
}
