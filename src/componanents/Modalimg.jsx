import React, { useState, useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import 'tailwindcss/tailwind.css';

export default function Modalimg() {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    onOpenModal();
  }, []);

  return (
    <div>
      
      <Modal classNames="" open={open} onClose={onCloseModal} center>
        <img
          src="./popup.png"
          alt="Popup"
          classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
          }}
          onClick={onCloseModal}
        />
      </Modal>
    </div>
  );
}
