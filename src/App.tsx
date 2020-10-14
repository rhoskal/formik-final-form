import React, { FC } from "react";

import { FormikLogin } from "./forms/FormikLogin";
import { FinalFormLogin } from "./forms/FinalFormLogin";

const App: FC = () => {
  return (
    <div className="app">
      {/*<FormikLogin />*/}
      <FinalFormLogin />
    </div>
  );
};

export default App;
