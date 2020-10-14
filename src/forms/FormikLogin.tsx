import React from "react";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

import { Button } from "../components/button/Button";
import { FormikInput } from "../components/input/FormikInput";

/*
 * Types
 */

type FormFields = "email" | "password";

/*
 * Component
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
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }): void => {
        console.log(values);

        setSubmitting(false);
      }}
      validationSchema={validationSchema}>
      {(formik: FormikProps<FormFields>): React.ReactNode => (
        <Form className="form">
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
        </Form>
      )}
    </Formik>
  );
};
