import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  ReactElement
} from 'react';
import { Modal as AntdModal, Spin } from 'antd';
import type { ModalRef, ModalProps } from './type'

let content: HTMLDivElement
let contentLeft: number = 0
let contentRight: number = 0;

const Modal: ForwardRefRenderFunction<ModalRef, ModalProps> = (
  props,
  ref
) => {
  const { children, onOk, onCancel, ...reset } = props;
  const [spinning, setSpinning] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const isStop = useRef(false);
  const [styleLT, setStyleLT] = useState({
    styleLeft: 0,
    styleTop: 100
  })
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
  const afterClose = () => {
    setStyleLT({
      styleLeft: 0,
      styleTop: 100
    })
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
    // 拖拽方法
    onMouseDown(e: React.MouseEvent<HTMLElement>) {
      e.preventDefault()
      content = document.getElementsByClassName("ant-modal-content")[0] as HTMLDivElement;
      contentLeft = content.getBoundingClientRect().left;
      contentRight = content.getBoundingClientRect().right - content.offsetWidth;
      // 记录初始拖动鼠标位置
      const startX = e.clientX
      const startY = e.clientY
      styleLT
      console.log('startX----', startX);
      console.log('startY----', startY);
      console.log('styleLeft----', styleLT.styleLeft);
      console.log('styleTop----', styleLT.styleTop);
      console.log('e----', e);
      
      // 添加鼠标移动事件
      document.onmousemove = (e) => {
        console.log('styleLeft',styleLT.styleLeft);
        console.log('styleTop',styleLT.styleTop);
        
        let cx = e.clientX - startX + styleLT.styleLeft
        let cy = e.clientY - startY + styleLT.styleTop
        if (cx < -contentLeft) {
          cx = -contentLeft;
        }
        if (cy < 0) {
          cy = 0;
        }
        if (cx > contentRight) {
          cx = contentRight;
        }

        if (window.innerHeight - cy < content.offsetHeight) {
          cy = window.innerHeight - content.offsetHeight;
        }
        setStyleLT({
          styleLeft: cx,
          styleTop: cy
        })
      }
      // 鼠标松开去除移动事件
      document.onmouseup = (e) => {
        document.onmousemove = null
        if (e.clientX > window.innerWidth || e.clientY < 0 || e.clientX < 0 || e.clientY > window.innerHeight) {
          document.onmousemove = null
        }
      }

    }
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
    >
      <Spin spinning={spinning}>{children}</Spin>
    </AntdModal>
  );
};

export default forwardRef(Modal);
