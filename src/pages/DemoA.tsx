import { FC, useCallback, useState } from 'react'
import {Button,Modal,Spin} from 'antd'
import TestComponent from '@/components/TestComponent'
const DemoA:FC = ()=>{
  const [visible,setVisible] = useState<boolean>(false)
  const [content,setContent] = useState<string>('')
  const [spinning,setSpinning] = useState<boolean>(false)
  const [confirmLoading,setConfirmLoading] = useState<boolean>(false)

  // 模拟网络请求
  const mock1 = useCallback(()=>{
    return new Promise<Mock>((resolve)=>{
      setTimeout(()=>{
        resolve({
          code:0,
          message:'React好难啊，救救我~🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆'
        })
      },4000)
    })
  },[])
  // 模拟网络请求
  const mock2 = useCallback(()=>{
    return new Promise<Mock>((resolve)=>{
      setTimeout(() => {
        resolve({
          code:0,
          message:'摆烂🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆'
        })
      }, 4000);
    })
  },[])
  // 打开对话框
  const showModal = useCallback(async () => {
    setContent('')
    setSpinning(true)
    setVisible(true)
    const res = await mock1()
    if(res.code === 0){
      setContent(res.message)
      setSpinning(false)
    }
  },[content])
  // 确定
  const handleOk = useCallback(async() => {
    setConfirmLoading(true)
    const res = await mock2()
    if(res.code === 0) {
      setConfirmLoading(false)
      setVisible(false)
      console.log(res.message);  
    }
  },[])
  // 取消
  const handleCancel = useCallback(() => {
    setVisible(false)
  },[])

  return (
    <div>
      <Modal
        destroyOnClose
        title='弹窗标题'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
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
      >
        <Spin spinning={spinning}>
          <TestComponent message={content}></TestComponent>
        </Spin>
      </Modal>
      <Button
        onClick={showModal}
      >显示弹窗A</Button>
    </div>
  )
}

export default DemoA

interface Mock {
  code:number
  message:string
}
