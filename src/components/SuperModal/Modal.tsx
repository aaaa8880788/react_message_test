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
import type {ModalRef,ModalProps} from './type'

const Modal: ForwardRefRenderFunction<ModalRef, ModalProps> = (
  props,
  ref
) => {
  const { children, onOk, onCancel, ...reset } = props;
  const [spinning, setSpinning] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const isStop = useRef(false);
  const [isDrag,setIsDrag] = useState(false)
  const [styleLT,setStyleLT] = useState({
    styleLeft:0,
    styleTop:100
  })
  const style = {
    left:styleLT.styleLeft,
    top:styleLT.styleTop
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
    onMouseDown (e:React.MouseEvent<HTMLElement>){
      e.preventDefault()
      let content = document.getElementsByClassName("ant-modal-content")[0] as HTMLDivElement;
      let contentInfo = content.getBoundingClientRect()
      console.log('content',content);
      console.log('e---',e);
      console.log('getBoundingClientRect---',contentInfo  );
      // 记录初始拖动鼠标位置
      const startX = e.clientX
      const startY = e.clientY
      // 添加鼠标移动事件
      document.onmousemove = (e) => {
        const cx = e.clientX - startX
        const cy = e.clientY - startY

        setStyleLT({
          styleLeft:cx,
          styleTop:cy
        })
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
    >
      <Spin spinning={spinning}>{children}</Spin>
    </AntdModal>
  );
};

export default forwardRef(Modal);
