import React, { ButtonHTMLAttributes, FC } from "react";

import "./styles.scss";

/*
 * Types
 */

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/*
 * Component
 */

export const Button: FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <button className="btn" {...rest}>
      {children}
    </button>
  );
};
