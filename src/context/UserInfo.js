import { createContext, useContext, useState } from "react";

const UserInfo = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(sessionStorage.userId);
  return (
    <UserInfo.Provider value={{ user, setUser }}>{children}</UserInfo.Provider>
  );
};

export const UserId = () => {
  return useContext(UserInfo);
};
export default UserProvider;
