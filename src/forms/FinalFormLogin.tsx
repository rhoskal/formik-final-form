import React from "react";
import { Form } from "react-final-form";

import { Button } from "../components/button/Button";
import { FinalFormInput } from "../components/input/FinalFormInput";

/*
 * Types
 */

type FormValues = {
  email: string;
  password: string;
};

type FormErrors = Partial<FormValues>;

/*
 * Components
 */

export const FinalFormLogin = (): JSX.Element => {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={(values): void => {
        console.log(values);
      }}
      render={({ handleSubmit, pristine, submitting, values }): React.ReactNode => (
        <form className="form" onSubmit={handleSubmit}>
          <h1>React Final Form</h1>
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
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </form>
      )}
      validate={(values): FormErrors => {
        let errors: FormErrors = {};

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
