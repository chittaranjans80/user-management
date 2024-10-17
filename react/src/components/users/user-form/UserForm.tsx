import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Spinner } from "flowbite-react";

import CustomToast from "../../shared/CustomToast";
import { ToastType } from "../../../types/Toast-props";
import { MethodsType } from "../../../types/methods-type";
import { UserType } from "../../../types/User-type";
import { UserLabels } from "../../../constants/UserLabels";

/**
 * Default value for User information, Used for initializing and resetting the value
 *
 * @type {{ _id: string; firstName: string; middleName: string; lastName: string; email: string; }}
 */
const defaultUserInfo = {
  _id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
};

// Added class name as a constant for re-usability purpose
const inputFieldClasses =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
const labelClasses = "block text-gray-700 text-sm font-bold mb-2";

export default function UserForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = process.env.REACT_APP_BASE_URL || "";
  const [userId, setUserId] = useState<string>(location?.state?.id || "");
  const [userData, setUserData] = useState<UserType>(defaultUserInfo);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<ToastType>(ToastType.SUCCESS);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      const fetchUsers = async () => {
        try {
          const response = await fetch(baseUrl + userId);
          const responseJson = await response.json();
          setUserData(responseJson.data);
        } catch {
          setUserData(defaultUserInfo);
        }
      };
      fetchUsers();
    }
  }, [userId, baseUrl]);

  /**
   * Handler for submit button click,
   * @param e, The event object
   * Based on the presence of current userId, the method either invokes add/ Edit API call.
   **/
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const requestUrl = userId ? baseUrl + userId : baseUrl;
    fetch(requestUrl, {
      method: userId ? MethodsType.PATCH : MethodsType.POST,
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.data) {
          setToastMessage(response.message);
          setToastType(ToastType.SUCCESS);
          navigate("/");
        } else if (response?.errors?.length > 0) {
          setToastMessage(response.errors[0]?.msg);
          setToastType(ToastType.ERROR);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err?.message);
      });
  };

  /**
   * Change handler for user input
   * @param e, The event object
   * Based on event object, it updates the corresponding value in the userData map.
   **/
  const updateUserInfo = (e: any) => {
    const updatedInfo = {
      ...userData,
      [e.target.name]: e.target.value,
    } as UserType;
    setUserData(updatedInfo);
  };

  /**
   *Handler for back button click
   * Navigates the user to the home route path
   **/
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="p-4 m8 w-8/12">
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
      <h2 className="font-bold pb-4">
        {userId && UserLabels.updateUserHeader}
        {!userId && UserLabels.addNewUserHeader}
      </h2>
      <form
        method="post"
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className={labelClasses} htmlFor="firstName">
            {UserLabels.firstName}
          </label>
          <input
            className={inputFieldClasses}
            id="firstName"
            name="firstName"
            data-testid="firstName"
            type="text"
            value={userData.firstName}
            onChange={updateUserInfo}
            required
            maxLength={100}
            placeholder={UserLabels.firstNamePlaceHolder}
          ></input>
        </div>

        <div className="mb-4">
          <label className={labelClasses} htmlFor="middleName">
            {UserLabels.middleName}
          </label>
          <input
            className={inputFieldClasses}
            id="middleName"
            data-testid="middleName"
            name="middleName"
            type="text"
            value={userData.middleName}
            onChange={updateUserInfo}
            maxLength={100}
            placeholder={UserLabels.middleNamePlaceHolder}
          ></input>
        </div>

        <div className="mb-4">
          <label className={labelClasses} htmlFor="lastName">
            {UserLabels.lastName}
          </label>
          <input
            className={inputFieldClasses}
            name="lastName"
            data-testid="lastName"
            id="lastName"
            type="text"
            value={userData.lastName}
            onChange={updateUserInfo}
            required
            maxLength={100}
            placeholder={UserLabels.lastNamePlaceHolder}
          ></input>
        </div>

        <div className="mb-4">
          <label className={labelClasses} htmlFor="email">
            {UserLabels.email}
          </label>
          <input
            className={inputFieldClasses}
            id="email"
            data-testid="email"
            name="email"
            type="email"
            required
            disabled={!!userId}
            value={userData.email}
            onChange={updateUserInfo}
            placeholder={UserLabels.emailPlaceHolder}
          ></input>
        </div>

        <div className="pb-4 my-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded float-right"
          >
            {userId && UserLabels.updateUserBtn}
            {!userId && UserLabels.addUserBtn}
          </button>

          <button
            type="reset"
            onClick={handleBackClick}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded float-right mx-4"
          >
            {UserLabels.backBtn}
          </button>
        </div>
      </form>
    </div>
  );
}
