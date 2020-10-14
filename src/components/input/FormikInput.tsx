import React, { FC } from "react";
import { ErrorMessage, FieldAttributes, useField } from "formik";

import "./styles.scss";

/*
 * Types
 */

type InputProps = {
  label?: string;
} & FieldAttributes<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

/*
 * Component
 */

export const FormikInput: FC<InputProps> = (props) => {
  const { id, label, name, ...rest } = props;
  const [field, meta] = useField<string>(props);

  return (
    <div className="input-wrapper">
      <label hidden={!label} htmlFor={id || name}>
        {label ?? label}
      </label>
      <input
        className={meta.error && meta.touched ? "field-error" : undefined}
        id={id || name}
        {...field}
        {...rest}
      />
      <div className="field-error">
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
};
