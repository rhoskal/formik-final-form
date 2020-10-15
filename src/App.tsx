import React, { FC } from "react";

import { FormikLogin } from "./forms/FormikLogin";
import { FinalFormLogin } from "./forms/FinalFormLogin";

const LoginForms = (): React.ReactNode => {
  return (
    <div className="split">
      <FormikLogin />
      <div className="divider" />
      <FinalFormLogin />
    </div>
  );
};

const App: FC = () => {
  return <div className="app">{LoginForms()}</div>;
};

export default App;
