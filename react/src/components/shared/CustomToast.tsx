import { Toast } from "flowbite-react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

import { ToastProps } from "../../types/Toast-props";

export default function CustomToast({ message }: ToastProps) {
  return (
    <Toast className="absolute right-10">
      <ExclamationCircleIcon className="inline-block size-6 text-red-500" />
      <div className="ml-3 text-md font-semibold text-red-800">{message}</div>
      <Toast.Toggle />
    </Toast>
  );
}
