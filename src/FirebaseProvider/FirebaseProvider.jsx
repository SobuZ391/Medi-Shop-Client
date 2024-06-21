import { createContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase.config"; // Ensure you have db (Firestore) configured in firebase.config
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import useAxiosPublic from './../Hooks/useAxiosPublic';

// Social auth providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthContext = createContext(null);

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosPublic =useAxiosPublic()

  // Create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // GitHub login
  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // Update user profile
  const updateUserProfile = async ({ displayName, photoURL }) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName, photoURL });
    }
  };

  // Update user email
  const updateUserEmail = async (email) => {
    if (auth.currentUser && email !== auth.currentUser.email) {
      await updateEmail(auth.currentUser, email);
    }
  };

  // Update user password
  const updateUserPassword = async (newPassword) => {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, newPassword);
    }
  };

  // Fetch user payment history
  const getUserPaymentHistory = async (userId) => {
    const paymentsRef = collection(db, "payments");
    const q = query(paymentsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const payments = [];
    querySnapshot.forEach((doc) => {
      payments.push(doc.data());
    });
    return payments;
  };

  // Logout
  const logout = () => {
    setUser(null);
    signOut(auth);
  };

  // Observer
// Observer
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (user) {
      const userInfo = { email: user.email };
      axiosPublic.post('/jwt', userInfo)
        .then(res => {
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
          }
        })
        .catch(err => console.error('Error fetching token:', err));
    } else {
      localStorage.removeItem('access-token');
    }
    setLoading(false)
  });
  return () => unsubscribe();
}, []);



  const allValues = {
    createUser,
    signInUser,
    googleLogin,
    githubLogin,
    logout,
    user,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    getUserPaymentHistory,
  };

  return (
    <AuthContext.Provider value={allValues}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default FirebaseProvider;
