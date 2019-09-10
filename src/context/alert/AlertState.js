import AlertContext from "./alertContext";
import React, { useReducer } from "react";
import AlertReducer from "./alertReducer";
import { SET_ALERT } from "./../types";
const AlertState = props => {
  const initialState = null;
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const showAlert = (msg, type) => {
      console.log("msg" , msg);
    dispatch({
      type: SET_ALERT,
      payload: { msg, type }
    });
    setTimeout(() => dispatch({ type: SET_ALERT }), 5000);
  };
  return (
    <AlertContext.Provider
      value={{
        alert: state,
        showAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
