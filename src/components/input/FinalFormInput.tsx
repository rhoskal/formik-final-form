import React, { FC, InputHTMLAttributes } from "react";
import { Field, useField } from "react-final-form";

import "./styles.scss";

/*
 * Types
 */

type InputProps = {
  label?: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

/*
 * Component
 */

export const FinalFormInput: FC<InputProps> = (props) => {
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
            <span>{meta.touched && (meta.error || meta.submitError)}</span>
          </div>
        </div>
      )}
    />
  );
};
