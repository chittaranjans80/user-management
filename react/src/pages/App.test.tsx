import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

describe("App page", () => {
  it("App page should render properly", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const headerComponent = screen.getByTestId("header-component");
    expect(headerComponent).toBeInTheDocument();
    const addUserButton = screen.getByTestId("add-user-btn");
    expect(addUserButton).toBeInTheDocument();
  });
});
