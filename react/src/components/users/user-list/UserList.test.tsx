import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import UserList from "./UserList";

describe("UserList component", () => {
  it("UserList component should render properly", async () => {
    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );
    const addUserButton = screen.getByTestId("add-user-btn");
    expect(addUserButton).toBeInTheDocument();
  });
});
