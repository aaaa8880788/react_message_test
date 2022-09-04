import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Button } from 'antd'
import Modal from '../components/SuperModal/Modal'
import Verify from '../components/Verify'

const DemoD = () => {
  const [content, setContent] = useState<string>('')
  const [step, setstep] = useState('init')
  const [iptvalue, setiptvalue] = useState<string>('xxxx')
  const modalRef = useRef<React.ElementRef<typeof Modal>>(null)
  const handleShowModal = useCallback(() => {
    setContent('')
    modalRef.current?.showModal({
      afterShowModal() {
        return new Promise((resolve) => {
          setTimeout(() => {
            setContent('这是弹窗的内容..........')
            resolve()
          }, 2000)
        })
      }
    })
  }, [])
  const handleOnOk = (event: React.MouseEvent<HTMLElement> & { stopClose: () => void }) => {
    return new Promise<void>((resolve) => {
      console.log('🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆');
      // event?.stopClose()
      // resolve()
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }
  const handleOnCancle = () => {
    console.log('🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆');
  }
  let initContent = useMemo(() => {
    return (
      <>
        initContent
      <input value={iptvalue} onChange={(e)=>{
          setiptvalue(e.target.value)
      }}></input>
        <Button onClick={() => {
          setstep('verfiy')
        }}>next</Button>
      </>
    )
  }, [iptvalue])
let renderModalContent = useCallback(() => {
    switch (step) {
      case 'init':
        return initContent
      case 'verfiy':
        return <Verify  setstep={setstep} step={step}/>
      default:
        break;
    }
}, [step,,iptvalue])
  return (
    <div>
      <Modal
        title='弹窗标题'
        isDrag
        ref={modalRef}
        onOk={handleOnOk}
        onCancel={handleOnCancle}
      >
        {renderModalContent()}
      </Modal>
      <Button onClick={handleShowModal}>显示弹窗D</Button>

    </div>
  )
}

export default DemoD