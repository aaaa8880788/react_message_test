import { Button } from 'antd'
import React, { FC, useEffect, useMemo, useState } from 'react'

const Verify:FC<PropsType> = (props) => {
  console.log('step变了重新渲染');
  const {step,setstep} = props
  let verfiyContent = useMemo<JSX.Element>(() => {
    return (
      <>
        <span>verfiyContent</span>
        <div>{step}</div>
        <Button 
          onClick={() => {setstep('init')}}>
            pre
        </Button>
      </>
    )
  }, [step])
 
return verfiyContent
}
export default Verify

interface PropsType {
  step:string
  setstep: React.Dispatch<React.SetStateAction<string>>
}