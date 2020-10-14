import React from "react";
import { Form } from "react-final-form";

import { Button } from "../components/button/Button";
import { FinalFormInput } from "../components/input/FinalFormInput";

/*
 * Types
 */

/*
 * Component
 */

export const FinalFormLogin = (): JSX.Element => {
  return (
    <Form
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values): void => {
        console.log(values);
      }}
      render={({ handleSubmit, pristine, submitting }): React.ReactNode => (
        <form className="form" onSubmit={handleSubmit}>
          <FinalFormInput label="Email" name="email" placeholder="Enter your email" />
          <FinalFormInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
          />
          <Button disabled={pristine || submitting} type="submit">
            Sign In
          </Button>
        </form>
      )}
      validate={(values): Record<string, string> => {
        let errors = {};

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors = {
            ...errors,
            email: "Invalid email address",
          };
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(values.password)) {
          errors = {
            ...errors,
            password: "Must Contain 8 Characters, One Uppercase, One Lowercase",
          };
        }

        return errors;
      }}
    />
  );
};
