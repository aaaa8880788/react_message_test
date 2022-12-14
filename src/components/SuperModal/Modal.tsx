import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Modal as AntdModal, Spin } from 'antd';
import type { ModalRef, ModalProps } from './type'
import './Modal.css'

const Modal: ForwardRefRenderFunction<ModalRef, ModalProps> = (
  props,
  ref
) => {
  const { children,isDrag, onOk, onCancel,title, ...reset } = props;
  const [spinning, setSpinning] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const isStop = useRef(false);
  
  const [styleLT, setStyleLT] = useState({
    styleLeft: window.innerWidth/2 - 400,
    styleTop: window.innerHeight/2 - 250
  })
  // console.log('111',styleLT);
  
  
  const style = {
    left: styleLT.styleLeft,
    top: styleLT.styleTop
  }
  // 阻止弹窗关闭
  const stopClose = useCallback(() => {
    isStop.current = true;
  }, []);
  // 确定触发
  const handleOnOK = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      setConfirmLoading(true);
      onOk && (await onOk({ ...event, stopClose }));
      setConfirmLoading(false);
      if (isStop.current) isStop.current = false;
      else setVisible(false);
    },
    [onOk, stopClose]
  );
  // 取消触发
  const handleOnCancel = useCallback(() => {
    onCancel && onCancel();
    setVisible(false);
  }, [onCancel]);
  // 弹窗关闭后触发
  const afterClose = useCallback(() => {
    if(isDrag){
      setStyleLT({
        styleLeft: window.innerWidth/2 - 400,
        styleTop: window.innerHeight/2 - 250
      })
    }
  },[]) 
  // 拖拽方法
  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => { 
    e.preventDefault()
    const content = document.getElementsByClassName("ant-modal-content")[0] as HTMLDivElement;
    const contentHeight = content.getBoundingClientRect().height
    const contentWidth = content.getBoundingClientRect().width
    // 记录初始拖动鼠标位置
    const startX = e.clientX
    const startY = e.clientY
    
    const { styleLeft, styleTop } = styleLT
    // console.log('222',styleLT);
    
    // 添加鼠标移动事件
    document.onmousemove = (e) => {      
      let cx = e.clientX - startX + styleLeft
      let cy = e.clientY - startY + styleTop
      if (cx < 0) {
        cx = 0;
      }
      if (cy < 0) {
        cy = 0;
      }
      if (cx + contentWidth > window.innerWidth){
        cx = window.innerWidth - contentWidth
      }
      if(cy + contentHeight > window.innerHeight){
        cy = window.innerHeight - contentHeight
      }
      setStyleLT({
        styleLeft: cx,
        styleTop: cy
      })
      
    }
    // 鼠标松开去除移动事件
    document.onmouseup = (e) => {
      document.onmousemove = null
    }
  }
  // 向外暴露方法
  useImperativeHandle(ref, () => ({
    // 打开弹窗
    async showModal(options = {}) {
      const { afterShowModal } = options;
      setVisible(true);
      if (afterShowModal) {
        setSpinning(true);
        await afterShowModal();
        setSpinning(false);
      }
    },
    // 关闭弹窗
    closeModal() {
      setVisible(false);
    },
  }));


  return (
    <AntdModal
      {...reset}
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={handleOnOK}
      onCancel={handleOnCancel}
      style={style}
      afterClose={afterClose}
      // title={title}
      title= {
        <div
          className= {isDrag ? 'dragBoxBar' : ''}
          onMouseDown={ isDrag ? onMouseDown : ()=> {}}
        >
          {title}
        </div>
      }
    >
      <Spin spinning={spinning}>{children}</Spin>
    </AntdModal>
  );
};

export default forwardRef(Modal);
