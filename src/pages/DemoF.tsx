import Reacr, { useCallback, useRef, useState } from 'react'
import moment from 'moment'
import Modal from '../components/SuperModal/Modal'
import { Button } from 'antd'
import TodoList from '../components/TodoList'

const mock1 = () =>{
  return new Promise<Mock>((resolve)=>{
    setTimeout(() => {
      resolve({
        code:0,
        data:[{
          id:Math.random().toString().slice(2),
          title:'React好难啊，救救我~🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆',
          createTime:moment().valueOf()
        }]
      })
    }, 2000);
  })
}

const DemoF = () => {
  const [content,setContent] = useState<any[]>([])
  const modalRef = useRef<React.ElementRef<typeof Modal>>(null)

  const handleShowModal = useCallback(()=>{
    setContent([])
    modalRef.current?.showModal({
      afterShowModal(){
        return new Promise(async(resolve) => {
          const res = await mock1()
          if(res.code === 0) {
            setContent([...content,...res.data])
            resolve()
          }
        })
      }
    })
  },[])

  const handleOnOk = useCallback((event:React.MouseEvent<HTMLElement> & { stopClose: () => void }) => {
    return new Promise<void>((resolve) => {
      console.log('确定了~🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆');
      // event?.stopClose()
      // resolve
      setTimeout(()=>{
        resolve()
      },2000)
    })
  },[])

  const handleCancle = useCallback(() => {
    console.log('取消了~🦆🦆');
  },[])

  return (
    <>
      <Modal
        isDrag
        title='弹窗标题'
        ref={modalRef}
        onOk={ handleOnOk }
        onCancel={ handleCancle }
      >
        {
          content.length ? <TodoList data={content}></TodoList> : <div></div>
        }
      </Modal>
      <Button onClick={handleShowModal}>弹窗F</Button>
    </>
  )
}

export default DemoF

interface Mock {
  code:number
  data:any[]
}
