import { Dispatch, SetStateAction } from "react";

/**
 * Defines an interface for validating UserType 
 *
 * @export
 * @interface UserType
 * @typedef {UserType}
 */
export interface UserType {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
}

/**
 * Defines an interface for validating UsersListType 
 *
 * @export
 * @interface UsersListType
 * @typedef {UsersListType}
 */
export interface UsersListType {
  users: UserType[];
  setRefreshUserList: Dispatch<SetStateAction<boolean>>;
}
