import React from 'react';
import logo from "../../../assets/logo.png"
import { Link } from 'react-router';

const FastDeliveryLogo = () => {
    return (
        <div>
            <Link to="/" className='flex items-end'>
                <img className='mb-1' src={logo} alt="" />
                <p className='text-3xl -ml-4 font-extrabold'>Delivery</p>
            </Link>
        </div>
    );
};

export default FastDeliveryLogo;