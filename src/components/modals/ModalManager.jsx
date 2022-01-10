import React from 'react';
import { useSelector } from 'react-redux';
import AddContainerForm from '../containerForm/form'
import LoginForm from '../loginForm'


export default function ModalManager() {
  const modalLookup = {
    AddContainerForm,LoginForm
  };
  const currentModal = useSelector((state) => state.modals);
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <>{renderedModal}</>;
}
