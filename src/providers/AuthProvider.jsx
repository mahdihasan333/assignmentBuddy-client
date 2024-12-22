import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import { app } from "../firebase/firebase.config";
import { useEffect } from "react";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user)
  const [loading, setLoading] = useState(true);

//   create new user
  const createNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login with google
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // logout user
  const logoutUser = () => {
    return signOut(auth);
  };



  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createNewUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        console.log('CurrentUser -->', currentUser)
        setUser(currentUser)
        setLoading(false)
    })
    return () => {
        unsubscribe();
    }
  }, [])

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
