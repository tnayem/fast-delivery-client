import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const AuthProvider = ({children}) => {
    const [user,setUser]= useState(null)
    const [loading,setLoading]= useState(true);

    // Google provider 
    const googleProvider = new GoogleAuthProvider();
    // Register
    const createUser =(email,password)=>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
    }
    // Log In 
    const logIn =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    // SignOut 
    const logOut =()=>{
        setLoading(true)
        return signOut(auth)
    }
    // Sign in With Google 
    const googleSignUp =()=>{
        setLoading(true)
       return signInWithPopup(auth,googleProvider)
    }
    // Update User 
    const updateUser=(updateData)=>{
        return updateProfile(auth.currentUser,updateData)
    }
    // Observer 
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unSubscribe()
        }
    },[])
  const authInfo = {
    createUser,
    logIn,
    user,
    loading,
    logOut,
    googleSignUp,
    updateUser


    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;