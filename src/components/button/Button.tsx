import React from "react";

import "./styles.scss";

/*
 * Types
 */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/*
 * Component
 */

export const Button = (props: ButtonProps): JSX.Element => {
  const { children, ...rest } = props;

  return (
    <button className="btn" {...rest}>
      {children}
    </button>
  );
};
