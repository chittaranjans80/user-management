import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserForm from "./UserForm";

describe("UserForm component", () => {
  it("should render first name elements", async () => {
    render(
      <BrowserRouter>
        <UserForm />
      </BrowserRouter>
    );
    const firstNameElem = screen.getByTestId("firstName");
    expect(firstNameElem).toBeInTheDocument();
    fireEvent.change(firstNameElem, { target: { value: "first" } });
    expect(firstNameElem).toHaveValue("first");

  });

  it("should render middle name elements", async () => {
    render(
      <BrowserRouter>
        <UserForm />
      </BrowserRouter>
    );
    const middleNameElem = screen.getByTestId("middleName");
    expect(middleNameElem).toBeInTheDocument();
    fireEvent.change(middleNameElem, { target: { value: "middle" } });
    expect(middleNameElem).toHaveValue("middle");
  });

  it("should render last name elements", async () => {
    render(
      <BrowserRouter>
        <UserForm />
      </BrowserRouter>
    );

    const lastNameElem = screen.getByTestId("lastName");
    expect(lastNameElem).toBeInTheDocument();
    fireEvent.change(lastNameElem, { target: { value: "last" } });
    expect(lastNameElem).toHaveValue("last");
  });

  it("should render email elements", async () => {
    render(
      <BrowserRouter>
        <UserForm />
      </BrowserRouter>
    );
    const emailElem = screen.getByTestId("email");
    expect(emailElem).toBeInTheDocument();
    fireEvent.change(emailElem, { target: { value: "test@email.com" } });
    expect(emailElem).toHaveValue("test@email.com");
  });

});
