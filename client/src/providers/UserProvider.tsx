import { isEmpty } from "lodash";
import Router from "next/router";
import React from "react";
import { USERNAME } from "../consts/storage";
import { IUser } from "../interfaces/IUser";
import { SocketContext } from "../socket";
import { userStorage } from "../storage/user";

export const UserContext = React.createContext<IContextValues>({});

export interface IContextValues {
  user?: IUser;
  clearUser?: VoidFunction;
  loginUser?: (user: IUser) => void;
  updateUsername?: (newName: string) => void;
}

const UserProvider: React.FC = ({ children }) => {
  const socket = React.useContext(SocketContext);
  const [user, setUser] = React.useState<IUser>();

  React.useEffect(() => {
    // const user = userStorage.getItem(USERNAME);
    // if (!isEmpty(user)) {
    //   setUser(user);
    //   socket?.emit("login", { user, quizId: user.quizId });
    //   // Router.push({ pathname: "/quiz", query: { language: user.quizId } });
    // }
  }, [socket]);

  const clearUser = React.useCallback(() => {
    userStorage.clear();
    setUser(undefined);
  }, []);

  const loginUser = React.useCallback((user: IUser) => {
    userStorage.setItem(USERNAME, user);
    setUser(user);
  }, []);

  const updateUsername = React.useCallback(
    (newName: string) => {
      const updatedUser = { ...user!!, username: newName };
      userStorage.setItem(USERNAME, updatedUser);
      setUser(updatedUser);
    },
    [user]
  );

  const memoizedValue: IContextValues = React.useMemo(() => {
    return { user, clearUser, loginUser, updateUsername };
  }, [clearUser, loginUser, user, updateUsername]);

  return (
    <UserContext.Provider value={memoizedValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): IContextValues => {
  const values = React.useContext(UserContext);
  if (!values) {
    throw new Error("userUserContext must be used within a UserProvider");
  }
  return values;
};

export default UserProvider;
