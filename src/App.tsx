import Alert from "components/Alert/Alert";
import AppNavigation from "navigation/AppNavigation";
import * as React from "react";
import appReducer, { initState } from "store/appStore";

export const AppContext = React.createContext({});

const init = () => {
  const user = localStorage.getItem("user");

  if (user) {
    const userData = JSON.parse(user);
    return {
      user: userData,
    };
  }
};

const initialAlert = {
  open: false,
  type: "success",
  message: "",
};

export default function App(): JSX.Element {
  const [state, dispatch] = React.useReducer(appReducer, initState, init);
  const [showAlert, setShowAlert] = React.useState<any>(initialAlert);

  const resetAlert = () => {
    if (showAlert.open) {
      setShowAlert(initialAlert);
    }
  };

  return (
    <AppContext.Provider
      value={{ state, dispatch, alert: setShowAlert, resetAlert }}
      data-testid="app"
    >
      <AppNavigation />
      <Alert
        type={showAlert.type}
        show={showAlert.open}
        message={showAlert.message}
      />
    </AppContext.Provider>
  );
}
