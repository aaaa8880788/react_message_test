import React,{FC} from 'react'
import {Empty} from 'antd'
import style from './test.module.css'
const TestComponent:FC<TestComponentProps> = React.memo((props) => {
  const {message} = props
  return (
    <>
      {
      message ? <div className={style.test_wrapper}><span>{message}</span></div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </>
  )
})

export default TestComponent

interface TestComponentProps {
  message:string
}