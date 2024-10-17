import { Dispatch, SetStateAction } from "react";

/**
 * Defines an Interface for validating types for the Modal Props
 *
 * @export
 * @interface ModalProps
 * @typedef {ModalProps}
 */
export interface ModalProps {
    showModal: boolean;
    message: string;
    continueBtnTitle: string;
    cancelBtnTitle: string;
    onModalClose: Dispatch<SetStateAction<boolean>>;
}