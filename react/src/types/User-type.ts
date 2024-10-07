import { Dispatch, SetStateAction } from "react";

export interface UserType {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
}

export interface UsersListType {
  users: UserType[];
  setRefreshUserList: Dispatch<SetStateAction<boolean>>;
}
