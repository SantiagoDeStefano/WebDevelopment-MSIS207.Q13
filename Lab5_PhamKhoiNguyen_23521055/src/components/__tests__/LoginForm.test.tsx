import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as authApi from "../../api/auth";
import { LoginForm } from "../LoginForm";
import {describe, expect, jest, test} from '@jest/globals'

jest.mock("../../api/auth");

describe("<LoginForm />", () => {
  test("submits credentials and shows success message", async () => {
    const user = userEvent.setup();

    const mockedLogin = authApi.login as jest.MockedFunction<typeof authApi.login>;
    mockedLogin.mockResolvedValueOnce({ user: { email: "a@b.com" } });

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "a@b.com");
    await user.type(screen.getByLabelText(/password/i), "supersecret");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockedLogin).toHaveBeenCalledWith("a@b.com", "supersecret");
    expect(await screen.findByText(/welcome back/i)).toBeTruthy();
  });
});
