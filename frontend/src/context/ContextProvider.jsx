import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("USER") ? JSON.parse(localStorage.getItem("USER")) : {}
  );
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [view, setView] = useState("appointments");

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const _setUser = (user) => {
    setUser(user);
    if (user) {
      localStorage.setItem("USER", JSON.stringify(user));
    } else {
      localStorage.removeIte("USER");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        _setUser,
        setToken,
        view,
        setView,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
