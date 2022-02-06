import React, { useEffect } from "react";

function Modal({ modalContent, closeModal, modalColor }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, 3000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="modal">
      <p className={`basic__color ${modalColor}`}>{modalContent}</p>
    </div>
  );
}

export default Modal;
