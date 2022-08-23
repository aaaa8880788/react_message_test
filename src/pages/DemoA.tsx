import React, { useCallback, useState } from 'react'
import {Button,Modal,Skin} from 'antd'

const DemoA = ()=>{
  const [visible,setVisible] = useState<boolean>(false)
  const [content,setContent] = useState<string>('')
  const [spinning,setSpinning] = useState<boolean>(false)
  const showModal = useCallback(() => {
    setContent('')
    setSpinning(true)
    const isShowContent = new Promise((resolve:any)=>{
      setTimeout(()=>{
        setContent('这是弹窗的内容..........')
        resolve()
      },3000)
    })
    setVisible(true)
  },[])
  const handleOk = useCallback(() => {
    setVisible(false)
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
      >
        <Skin spinning=''>{content}</Skin>
      </Modal>
      <Button
        onClick={showModal}
      >显示弹窗A</Button>
    </div>
  )
}

export default DemoA