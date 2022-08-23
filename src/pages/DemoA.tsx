import React, { useCallback, useState } from 'react'
import {Button,Modal,Spin} from 'antd'

const DemoA = ()=>{
  const [visible,setVisible] = useState<boolean>(false)
  const [content,setContent] = useState<string>('')
  const [spinning,setSpinning] = useState<boolean>(false)
  const [confirmLoading,setConfirmLoading] = useState<boolean>(false)
  const showModal = useCallback(() => {
    setContent('')
    setSpinning(true)
    setVisible(true)
    new Promise<string>((resolve)=>{
      setTimeout(()=>{
        resolve('这是弹窗的内容..........')
      },3000)
    }).then((res)=>{
      setContent(res)
      setSpinning(false)
    })
  },[])
  const handleOk = useCallback(() => {
    setConfirmLoading(true)
    new Promise<void>((resolve)=>{
      setTimeout(()=>{
        resolve()
      },2000)
    }).then(()=>{
      setConfirmLoading(false)
      setVisible(false)
    })
  },[])
  const handleCancel = useCallback(() => {
    setVisible(false)
  },[])

  return (
    <div>
      <Modal
        title='弹窗标题'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <Spin spinning={spinning}>{content}</Spin>
      </Modal>
      <Button
        onClick={showModal}
      >显示弹窗A</Button>
    </div>
  )
}

export default DemoA