import { Toast } from "flowbite-react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

import { ToastProps, ToastType } from "../../types/Toast-props";

export default function CustomToast({ message, type }: ToastProps) {
  return (
    <Toast className="absolute right-10">
      <ExclamationCircleIcon
        className={`inline-block size-6 ${
          type === ToastType.ERROR ? "text-red-500" : "text-green-500"
        }`}
      ></ExclamationCircleIcon>
      <div className="ml-3 text-md font-semibold text-red-800">{message}</div>
      <Toast.Toggle />
    </Toast>
  );
}
