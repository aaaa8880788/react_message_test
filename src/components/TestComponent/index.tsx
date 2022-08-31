import React,{FC} from 'react'
import {Empty} from 'antd'
const TestComponent:FC<TestComponentProps> = React.memo((props) => {
  const {message} = props
  return (
    <>
      {
      message ? <div>{message}</div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </>
  )
})

export default TestComponent

interface TestComponentProps {
  message:string
}