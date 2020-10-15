import React from "react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";

import { Button } from "../components/button/Button";
import { FormikInput } from "../components/input/FormikInput";

/*
 * Types
 */

type FormValues = {
  email: string;
  password: string;
};

/*
 * Components
 */

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase",
    )
    .required("Required"),
});

export const FormikLogin = (): JSX.Element => {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>): void => {
        console.log(values);

        setSubmitting(false);
      }}
      validationSchema={validationSchema}>
      {(formik: FormikProps<FormValues>): React.ReactNode => (
        <Form className="form">
          <h1>Formik</h1>
          <FormikInput id="email" label="Email" name="email" placeholder="Enter your email" />
          <FormikInput
            id="password"
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
          />
          <Button disabled={formik.isSubmitting || !formik.isValid} type="submit">
            Sign In
          </Button>
          <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};
