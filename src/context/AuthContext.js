import { createContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const { user, isFetching, error } = state;

  return (
    <AuthContext.Provider
      value={{ user: user, isFetching: isFetching, error: error, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};
