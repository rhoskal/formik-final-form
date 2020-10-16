import React from "react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { pipe } from "fp-ts/pipeable";
import * as A from "fp-ts/lib/Array";
import * as O from "fp-ts/lib/Option";

import { Button } from "../components/button/Button";
import { FormikInput } from "../components/input/FormikInput";
import { Choice, FormikSelect } from "../components/select/FormikSelect";

/*
 * Types
 */

type FormValues = {
  email: string;
  network: string;
  password: string;
};

/*
 * Components
 */

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  network: Yup.string().required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase",
    )
    .required("Required"),
});

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

export const FormikLogin: React.FC = () => {
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
    <Formik
      initialValues={initialValues}
      onSubmit={(values: FormValues, actions: FormikHelpers<FormValues>): void => {
        console.log(values);

        actions.setSubmitting(false);
      }}
      validationSchema={validationSchema}>
      {(formik: FormikProps<FormValues>): React.ReactNode => (
        <Form className="form">
          <h1>Formik</h1>
          <FormikInput
            id="email-formik"
            label="Email"
            name="email"
            placeholder="Enter your email"
          />
          <FormikInput
            id="password-formik"
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
          />
          <FormikSelect
            id="network-formik"
            label="Network"
            name="network"
            options={selectOptions}
          />
          <Button disabled={formik.isSubmitting} type="submit">
            Sign In
          </Button>
          <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};
