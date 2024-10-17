/**
 * Define enum for ToastType
 * @export
 * @enum {number}
 */
export enum ToastType {
    ERROR = 'error',
    SUCCESS = 'success',
    WARNING = 'warning'
  }
  

/**
 * Define an interface for validating types for the input props 
 *
 * @export
 * @interface ToastProps
 * @typedef {ToastProps}
 */
export interface ToastProps {
    message: string;
    type: ToastType;
  }