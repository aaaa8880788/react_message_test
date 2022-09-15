import React, { FC, useCallback,useState } from 'react'
import {Button} from 'antd'
const KnowHooks:FC = () => {
  const [count1 ,setCount1] = useState<number>(0)
  const [count2 ,setCount2] = useState<number>(0)
  const [count3 ,setCount3] = useState<number>(0)
  const btn1ClickHandle = ()=> {
    setCount1(count1 + 1)
  }
  const btn2ClickHandle = useCallback(()=> {
    setCount2(count2 + 1)
  },[count2])
  return (
    <div>
      <Child btnClickHandle={btn1ClickHandle}>
        {count1}
      </Child>
      <br />
      <Child btnClickHandle={btn2ClickHandle}>
        {count2}
      </Child>
      <br />
      <Child btnClickHandle={()=>{
        setCount3(count3+1)    
      }}>
        {count3}
      </Child>
      <br />
    </div>
  )
}

const Child:FC<ChildProps<any>> = React.memo((props = {}) => {
  const {children,btnClickHandle} = props
  return (
    <>
      <Button onClick={btnClickHandle}>{children}</Button>
      <span>{Math.random()}</span>
    </>
  )
})

interface ChildProps<T=any> {
  btnClickHandle?():void
  children?:T
}

export default KnowHooks