import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRout = ({children}) => {
    const {user,loading} = useAuth()
    console.log(user);
    if(loading){
        return <div className='h-screen flex items-center justify-center'><span className="loading loading-bars loading-xl"></span></div>
    }
    if(!user){
       return <Navigate to='/login'></Navigate>
    }
    return children;
};

export default PrivateRout;