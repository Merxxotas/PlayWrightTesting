import { useState } from "react";
const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div>
      <button onClick={openModal}>Abrir Modal</button>
      {isOpen && (
        <div className="modal">
          <p>Has abierto el modal</p>
          <button onClick={closeModal}>Cerrar el modal</button>
        </div>
      )}
    </div>
  );
};

export default Modal;
