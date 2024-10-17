import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

import { UserType } from "../../../types/User-type";
import UserGrid from "../user-grid/UserGrid";
import { UserLabels } from "../../../constants/UserLabels";

function UserList() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshUserList, setRefreshUserList] = useState<boolean>(false);
  const baseUrl = process.env.API_BASE_URL || "";

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(baseUrl);
        const responseJson = await response.json();
        setUserList(responseJson.data);
        setLoading(false);
      } catch {
        setLoading(false);
        setUserList([]);
      }
    };
    fetchUsers();
  }, [refreshUserList, baseUrl]);

  const addNewUser = () => {
    navigate("/user");
  };

  return (
    <>
      {loading && (
        <div className="text-center">
          <Spinner
            className="align-middle w-8/12"
            aria-label="Fetching data from server"
            size="xl"
          />
        </div>
      )}

      <div className="p-4 m8 w-8/12 bg-white shadow-md rounded px-8 pt-6 pb-8 m-8">
        <h2 className="font-bold pb-4">{UserLabels.userListHeader}</h2>
        {!loading && userList && userList.length > 0 && (
          <UserGrid
            users={userList}
            setRefreshUserList={setRefreshUserList}
          ></UserGrid>
        )}
        {!loading && userList.length === 0 && <h2>{UserLabels.noUserRecords}</h2>}
        <div className="pb-4 my-4">
          <button
            type="button"
            data-testid="add-user-btn"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded float-right"
            onClick={addNewUser}
          >
            {UserLabels.addUserBtn}
          </button>
        </div>
      </div>
    </>
  );
}

export default UserList;
