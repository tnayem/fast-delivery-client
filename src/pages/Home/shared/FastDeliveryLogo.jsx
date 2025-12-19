import React from 'react';
import logo from "../../../assets/logo.png"

const FastDeliveryLogo = () => {
    return (
        <div>
            <div className='flex items-end'>
                <img className='mb-1' src={logo} alt="" />
                <p className='text-3xl -ml-4'>Delivery</p>
            </div>
        </div>
    );
};

export default FastDeliveryLogo;