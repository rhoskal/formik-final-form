import React from "react";
import { Field, useField } from "react-final-form";

import "./styles.scss";

/*
 * Types
 */

type InputProps = {
  label?: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

/*
 * Components
 */

export const FinalFormInput: React.FC<InputProps> = (props) => {
  const { id, label, name, ...rest } = props;
  const { input, meta } = useField(name);

  return (
    <Field
      name={name}
      render={(): React.ReactNode => (
        <div className="input-wrapper">
          <label hidden={!label} htmlFor={id || name}>
            {label ?? label}
          </label>
          <input
            className={meta.error && meta.touched ? "field-error" : undefined}
            id={id || name}
            {...input}
            {...rest}
          />
          <div className="field-error">
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        </div>
      )}
    />
  );
};
