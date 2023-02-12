import { fireEvent, getByText, render, screen, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "./App";

describe("App container", () => {
  test("renders the app", () => {
    render(<App />);
    screen.getByText("Welcome to the bank");
  });

  test("create account", async () => {
    render(<App />);

    const user = userEvent.setup()

    const button = screen.getByText("Create Account");
    await userEvent.click(button);

    await user.type(screen.getByLabelText(/name/i), 'John')
    await user.type(screen.getByLabelText(/email/i), 'john.dee@someemail.com')
    await user.type(screen.getByLabelText(/password/i),'secret')

    expect(screen.getByLabelText("Name")).toHaveValue("John");
    expect(screen.getByLabelText("Email")).toHaveValue("john.dee@someemail.com");
    expect(screen.getByLabelText("Password")).toHaveValue("secret");

    await user.click(screen.getByRole('button', {name: /create account/i}))

    await screen.findAllByText(/success/i);
  });
});
