import React from "react";
import { Form } from "react-final-form";
import { pipe } from "fp-ts/pipeable";
import * as O from "fp-ts/Option";
import * as RA from "fp-ts/ReadonlyArray";

import { Button } from "../components/button/Button";
import { FinalFormInput } from "../components/input/FinalFormInput";
import { Choice } from "../components/select/FormikSelect";
import { FinalFormSelect } from "../components/select/FinalFormSelect";

/*
 * Types
 */

interface FormValues {
  email: string;
  network: string;
  password: string;
}

type FormErrors = Partial<FormValues>;

/*
 * Helpers
 */

const selectOptions: ReadonlyArray<Choice> = [
  {
    id: "corporate",
    value: "Corporate",
  },
  {
    id: "internal",
    value: "Internal",
  },
];

/*
 * Main
 */

export const FinalFormLogin = (): JSX.Element => {
  const initialValues: FormValues = {
    email: "",
    network: pipe(
      selectOptions,
      RA.head,
      O.fold(
        () => "",
        (c: Choice) => c.id,
      ),
    ),
    password: "",
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={(values): void => {
        console.log(values);
      }}
      render={(finalForm): JSX.Element => (
        <form className="form" onSubmit={finalForm.handleSubmit}>
          <h1>Final Form</h1>
          <FinalFormInput
            id="email-final-form"
            label="Email"
            name="email"
            placeholder="Enter your email"
          />
          <FinalFormInput
            id="password-final-form"
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
          />
          <FinalFormSelect
            id="network-final-form"
            label="Network"
            name="network"
            options={selectOptions}
          />
          <Button disabled={finalForm.submitting || !finalForm.valid} type="submit">
            Sign In
          </Button>
          <pre>{JSON.stringify(finalForm.values, null, 2)}</pre>
        </form>
      )}
      validate={(values): FormErrors => {
        let errors: FormErrors = {};

        if (!values.email) {
          errors = {
            ...errors,
            email: "Required",
          };
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors = {
            ...errors,
            email: "Invalid email address",
          };
        }

        if (!values.password) {
          errors = {
            ...errors,
            password: "Required",
          };
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(values.password)) {
          errors = {
            ...errors,
            password: "Must Contain 8 Characters, One Uppercase, One Lowercase",
          };
        }

        if (!values.network) {
          errors = {
            ...errors,
            network: "Required",
          };
        } else if (values.network === "") {
          errors = {
            ...errors,
            network: "Please select a network",
          };
        }

        return errors;
      }}
    />
  );
};
