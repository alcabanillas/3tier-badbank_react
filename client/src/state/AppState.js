import React, {useState, createContext, useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//Context and Provider
export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  const auth = getAuth()
  useEffect( () => {
    onAuthStateChanged( auth, (user) => {
      setCurrentUser(user)
    }) 
  }, [auth])

  return (
    <AuthContext.Provider value={currentUser}>
      {props.children}
    </AuthContext.Provider>
  );
};