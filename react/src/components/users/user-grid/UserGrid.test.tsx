import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserGrid from "./UserGrid";
import { UserType } from "../../../types/User-type";

const mockUserList: UserType[] = [
  {
    _id: "1",
    firstName: "firstName 1",
    lastName: "lastName 1",
    email: "test@email.com1",
  },
  {
    _id: "2",
    firstName: "firstName 2",
    lastName: "lastName 2",
    email: "test@email.com2",
  },
  {
    _id: "3",
    firstName: "firstName 3",
    lastName: "lastName 3",
    email: "test@email.com3",
  },
];
describe("UserGrid component", () => {
  it("UserList component should render properly", async () => {
    render(
      <BrowserRouter>
        <UserGrid users={mockUserList} setRefreshUserList={jest.fn()}/>
      </BrowserRouter>
    );
    const userGrid = screen.getByTestId("user-grid");
    expect(userGrid).toBeInTheDocument();
  });
});
