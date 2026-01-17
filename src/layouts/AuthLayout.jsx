import React from 'react';
import { Outlet } from 'react-router';
import authImage from "../assets/authImage.png"
import FastDeliveryLogo from '../pages/Home/shared/FastDeliveryLogo';

const AuthLayout = () => {
    return (
        <div className="grid items-center bg-base-200 min-h-screen w-[90%] mx-auto">
            <FastDeliveryLogo></FastDeliveryLogo>
            <div className="flex flex-col lg:flex-row">
                <div className='lg:w-[50%]'>
                    <Outlet></Outlet>
                </div>
                <div className='w-[50%] m-10 my-auto'>
                    <img
                        src={authImage}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;