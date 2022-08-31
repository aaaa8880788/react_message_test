import React from 'react'
import {Button} from 'antd'
import { useTodoModal } from '../components/TodoModal'

const DemoC = ()=>{
  const {show} = useTodoModal()
  return (
    <div>
      <Button onClick={()=>{
        show({
          afterShowModal(){
            return new Promise((resolve)=>{
              setTimeout(()=>{
                resolve()
              },3000)
            })
          }
        })
      }}>
         显示待办项弹窗C
      </Button>
    </div>
  )
}

export default DemoC