import React from 'react';
import bgImage from "../../../assets/be-a-merchant-bg.png"
import sideImage from "../../../assets/location-merchant.png"

const BeAMarchent = () => {
    return (
        <div className="grid bg-[#03373d] w-[90%] mx-auto rounded-2xl] bg-no-repeat p-[5%] rounded-2xl" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="flex justify-between items-center flex-col lg:flex-row">
                
                <div className='md:w-[40%]'>
                    <h2 className="text-3xl font-bold">Merchant and Customer Satisfaction <br /> is Our First Priority</h2>
                    <p className="py-6">
                        We offer the lowest delivery charge with the highest value along with <br /> 100% safety of your product. Pathao courier delivers your parcels in <br /> every corner of Bangladesh right on time.</p>
                    <div className='md:flex'>
                        <button className="btn bg-[#caeb66] rounded-3xl mx-2 border-0">Become a Merchant</button>
                        <button className="btn btn-outline hover:bg-[#caeb66] rounded-3xl mx-2 text-white hover:text-black hover:border-0">Earn with Profast Courier</button>
                    </div>
                </div>
                <div className='md:w-[35%] my-5'>
                    <img
                        src={sideImage}
                        className="max-w-sm rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default BeAMarchent;