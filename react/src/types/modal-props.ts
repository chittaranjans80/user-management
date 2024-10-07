import { Dispatch, SetStateAction } from "react";

export interface ModalProps {
    showModal: boolean;
    message: string;
    continueBtnTitle: string;
    cancelBtnTitle: string;
    onModalClose: Dispatch<SetStateAction<boolean>>;
}