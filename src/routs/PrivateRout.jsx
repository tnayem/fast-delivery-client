import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRout = ({children}) => {
    const {user,loading} = useAuth()
    const location = useLocation()
    if(loading){
        return <div className='h-screen flex items-center justify-center'><span className="loading loading-bars loading-xl"></span></div>
    }
    if(!user){
       return <Navigate state={location.pathname} to='/login'></Navigate>
    }
    return children;
};

export default PrivateRout;