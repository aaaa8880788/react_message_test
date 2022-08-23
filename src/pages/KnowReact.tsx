import React, {  FC, useCallback, useState } from 'react'
import { Button } from 'antd'
const KnowReact = ()=>{
  const [count1,setCount1] = useState<number>(0)
  const [count2,setCount2] = useState<number>(0)
  const [count3,setCount3] = useState<number>(0)
  const HandleClickButton1 = ()=>{
    setCount1(count1+1)
    console.log('点击了button1');
  }
  const HandleClickButton2 = useCallback(()=>{
    setCount2(count2+1)
    console.log('点击了button2');
  },[count2])

  return (
    <div>
      <Child 
        onClickButton ={HandleClickButton1}
      >
        button1---count1:{count1}
      </Child>
      <br />
      <Child 
        onClickButton ={HandleClickButton2}
      >
        button2---count2:{count2}
      </Child>
      <br />
      <Child 
        onClickButton ={()=>{
          setCount3(count3+1)
          console.log('点击了button3');
        }}
      >
        button3---count3:{count3}
      </Child>
    </div>
  )
}

const Child:FC<ChildType> = React.memo((props={})=>{
  const {onClickButton,children} = props
  return (
    <>
      <Button onClick={onClickButton}>{children}</Button>
      <span>{Math.random()}</span>
    </>
  )
})
export default KnowReact

interface ChildType {
  onClickButton?: ()=> void
  children?: any
}
