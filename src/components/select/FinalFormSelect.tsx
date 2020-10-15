import React from "react";
import { Field, useField } from "react-final-form";
import { pipe } from "fp-ts/pipeable";
import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";

import "./styles.scss";
import { Choice } from "./FormikSelect";

/*
 * Types
 */

type SelectProps = {
  label?: string;
  name: string;
  options?: Array<Choice>;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

/*
 * Components
 */

export const FinalFormSelect: React.FC<SelectProps> = (props) => {
  const { id, label, name, options, ...rest } = props;
  const { input, meta } = useField(name);

  return (
    <Field
      name={name}
      render={(): React.ReactNode => (
        <div className="selector-wrapper">
          <label hidden={!label} htmlFor={id || name}>
            {label ?? label}
          </label>
          <select
            className={meta.error && meta.touched ? "field-error" : undefined}
            id={id || name}
            {...input}
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
            <span>{meta.touched && (meta.error || meta.submitError)}</span>
          </div>
        </div>
      )}
    />
  );
};
