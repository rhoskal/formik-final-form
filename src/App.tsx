import React, { FC } from "react";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

import { Button } from "./components/button/button";
import { Input } from "./components/input/input";

/*
 * Types
 */

type FormFields = "password" | "username";

/*
 * Component
 */

const validationSchema = Yup.object().shape({
  username: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase",
    )
    .required("Required"),
});

const FormikLogin = (): JSX.Element => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }): void => {
        console.log(values);

        setSubmitting(false);
      }}
      validationSchema={validationSchema}>
      {(formik: FormikProps<FormFields>): React.ReactNode => (
        <Form className="form">
          <Input id="username" label="Username" name="username" placeholder="Enter your email" />
          <Input
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

const App: FC = () => {
  return (
    <div className="app">
      <FormikLogin />
    </div>
  );
};

export default App;
