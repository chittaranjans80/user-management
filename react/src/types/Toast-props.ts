export enum ToastType {
    ERROR = 'error',
    SUCCESS = 'success',
    WARNING = 'warning'
  }
  

export interface ToastProps {
    message: string;
    type: ToastType;
  }