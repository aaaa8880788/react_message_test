import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Modal as AntdModal, ModalProps as AntdModalProps, Spin } from 'antd';

const Modal: ForwardRefRenderFunction<ModalRef, ModalProps> = (
  props = {},
  ref
) => {
  const { children, onOk, onCancel, ...reset } = props;
  const [spinning, setSpinning] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const isStop = useRef(false);

  const stopClose = useCallback(() => {
    isStop.current = true;
  }, []);

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

  const handleOnCancel = useCallback(() => {
    setVisible(false);
    onCancel?.();
  }, [onCancel]);

  useImperativeHandle(ref, () => ({
    async showModal(options = {}) {
      const { afterShowModal } = options;

      
      setVisible(true);
      if (afterShowModal) {
        setSpinning(true);
        await afterShowModal();
        setSpinning(false);
      }
    },
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
    >
      <Spin spinning={spinning}>{children}</Spin>
    </AntdModal>
  );
};

export default forwardRef(Modal);

interface Options {
  afterShowModal?(): void | Promise<void>;
}

export interface ModalRef {
  showModal(options?: Options): Promise<void>;
  closeModal(): void;
}

export interface ModalProps
  extends Omit<
    AntdModalProps,
    'onOk' | 'onCancel'
  > {
  onOk?(
    event: React.MouseEvent<HTMLElement> & { stopClose: () => void }
  ): void | Promise<void>;
  onCancel?(): void | Promise<void>;
}
