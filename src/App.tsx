import React from "react";

import { FormikLogin } from "./forms/FormikLogin";
import { FinalFormLogin } from "./forms/FinalFormLogin";

const App = (): JSX.Element => {
  return (
    <div className="app">
      <div className="split">
        <FormikLogin />
        <div className="divider" />
        <FinalFormLogin />
      </div>
    </div>
  );
};

export default App;
