import React from "react";
import { ErrorMessage, FieldAttributes, useField } from "formik";
import { pipe } from "fp-ts/pipeable";
import * as A from "fp-ts/lib/Array";
import * as O from "fp-ts/lib/Option";

import "./styles.scss";

/*
 * Types
 */

export type Choice = {
  id: string;
  value: string;
};

type SelectProps = {
  label?: string;
  options?: Array<Choice>;
} & FieldAttributes<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

/*
 * Components
 */

export const FormikSelect: React.FC<SelectProps> = (props) => {
  const { id, label, name, options, ...rest } = props;
  const [field, meta] = useField<string>(props);

  return (
    <div className="selector-wrapper">
      <label hidden={!label} htmlFor={id || name}>
        {label ?? label}
      </label>
      <select
        className={meta.error && meta.touched ? "field-error" : undefined}
        id={id || name}
        {...field}
        {...rest}>
        {pipe(
          options,
          O.fromNullable,
          O.fold(
            () => null,
            (opts) => {
              return A.map<Choice, React.ReactNode>((o) => (
                <option key={o.id} value={o.id}>
                  {o.value}
                </option>
              ))(opts);
            },
          ),
        )}
      </select>
      <div className="field-error">
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
};
