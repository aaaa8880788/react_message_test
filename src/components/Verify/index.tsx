import { Button } from 'antd'
import React, { FC, useMemo } from 'react'

const Verify:FC<PropsType> = (props) => {
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