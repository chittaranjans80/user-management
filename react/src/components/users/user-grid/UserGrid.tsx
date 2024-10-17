import { FC, useState } from "react";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import CustomToast from "../../shared/CustomToast";
import { ToastType } from "../../../types/Toast-props";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import { CustomModal } from "../../shared/CustomModal";
import { UsersListType, UserType } from "../../../types/User-type";
import { MethodsType } from "../../../types/methods-type";
import { UserLabels } from "../../../constants/UserLabels";

// Added class name as a constant for re-usability purpose
const tdClasses = "border border-slate-300 p-2";

/**
 * UserGrid component
 *
 * @param {{ users: any; setRefreshUserList: any; }} param0
 * @param {*} param0.users
 * @param {*} param0.setRefreshUserList
 * @returns {*}
 */
const UserGrid: FC<UsersListType> = ({ users, setRefreshUserList }) => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL || "";

  const [loading, setLoading] = useState<boolean>(false);
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [userId, setuserId] = useState<string>("");

  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<ToastType>(ToastType.SUCCESS);

  const handleDelete = (currentuserId: string) => {
    setDisplayModal(true);
    setuserId(currentuserId);
  };

  /**
   * Handler from the button click from the modal popup,
   * @param isConfirmed, whether the user has confirmed the action on modal popup
   * If isConfirmed is false, No action is performed, since user has not confirmed the delete functionality
   * If isConfirmed is true, the corresponding userId is passed for the Delete API invocation.
   **/

  const handleContinue = (isConfirmed: any) => {
    setDisplayModal(false);
    if (!isConfirmed) {
      return;
    }
    setLoading(true);
    fetch(`${baseUrl}${userId}`, {
      method: MethodsType.DELETE,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response && response.data) {
          setToastMessage(response.message);
          setToastType(ToastType.SUCCESS);
          setRefreshUserList(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  /**
   * Handler for edit button functionality,
   * @param {UserType} user,
   * Navigates the user to the user page along with the user data
   **/

  const handleEdit = (user: UserType) => {
    navigate(`/user`, { state: { id: user._id } });
  };

  return (
    <>
      {toastMessage && (
        <CustomToast message={toastMessage} type={toastType}></CustomToast>
      )}
      {loading && (
        <div className="text-center">
          <Spinner
            className="align-middle w-8/12"
            aria-label="Fetching data from server"
            size="xl"
          />
        </div>
      )}
      {displayModal && (
        <CustomModal
          showModal={displayModal}
          message={UserLabels.ModalTitle}
          continueBtnTitle={UserLabels.continueBtnTitle}
          cancelBtnTitle={UserLabels.cancelBtnTitle}
          onModalClose={($event) => handleContinue($event)}
        ></CustomModal>
      )}
      <table
        className="w-full p-4 table-auto border-collapse border border-slate-400"
        data-testid="user-grid"
      >
        <thead>
          <tr>
            <th className={tdClasses}>{UserLabels.firstName}</th>
            <th className={tdClasses}>{UserLabels.middleName}</th>
            <th className={tdClasses}>{UserLabels.lastName}</th>
            <th className={tdClasses}>{UserLabels.email}</th>
            <th className={tdClasses}>{UserLabels.actionHeader}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className={tdClasses}>{user.firstName}</td>
              <td className={tdClasses}>{user.middleName}</td>
              <td className={tdClasses}>{user.lastName}</td>
              <td className={tdClasses}>{user.email}</td>
              <td className={tdClasses}>
                <span
                  title={UserLabels.editIconTitle}
                  onClick={() => handleEdit(user)}
                  className="cursor-pointer pl-4 pr-4"
                >
                  <PencilIcon className="inline-block size-6 text-blue-500" />
                </span>
                <span
                  title={UserLabels.deleteIconTitle}
                  onClick={() => handleDelete(user["_id"])}
                  className="cursor-pointer pl-4"
                >
                  <TrashIcon className="inline-block size-6 text-red-500" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserGrid;
