import React from "react";
import { Form } from "react-final-form";
import { pipe } from "fp-ts/pipeable";
import * as A from "fp-ts/Array";
import * as O from "fp-ts/Option";

import { Button } from "../components/button/Button";
import { FinalFormInput } from "../components/input/FinalFormInput";
import { Choice } from "../components/select/FormikSelect";
import { FinalFormSelect } from "../components/select/FinalFormSelect";

/*
 * Types
 */

type FormValues = {
  email: string;
  network: string;
  password: string;
};

type FormErrors = Partial<FormValues>;

/*
 * Components
 */

const selectOptions: Array<Choice> = [
  {
    id: "corporate",
    value: "Corporate",
  },
  {
    id: "internal",
    value: "Internal",
  },
];

export const FinalFormLogin: React.FC = () => {
  const initialValues: FormValues = {
    email: "",
    network: pipe(
      selectOptions,
      A.head,
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
      render={(finalForm): React.ReactNode => (
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
          <Button disabled={finalForm.submitting} type="submit">
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
