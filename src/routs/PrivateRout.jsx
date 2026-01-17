import React from 'react';
import useAuth from '../hooks/useAuth';

const PrivateRout = ({children}) => {
    const {user,loading} = useAuth()
    if(loading){
        return <div className='h-screen flex items-center justify-center'><span className="loading loading-bars loading-xl"></span></div>
    }
    if(!user){
        <Navigate to='/login'></Navigate>
    }
    return children;
};

export default PrivateRout;