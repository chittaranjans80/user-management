import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { ModalProps } from "../../types/modal-props";

export function CustomModal({
  showModal,
  onModalClose,
  message,
  continueBtnTitle,
  cancelBtnTitle,
}: ModalProps) {
  const [openModal, setOpenModal] = useState(showModal);

  const handleClose = (isConfirmed: boolean) => {
    setOpenModal(false);
    onModalClose(isConfirmed);
  };

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => handleClose(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleClose(true)}>
                {continueBtnTitle}
              </Button>
              <Button color="gray" onClick={() => handleClose(false)}>
                {cancelBtnTitle}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
