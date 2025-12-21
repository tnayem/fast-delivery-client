import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import Services from '../Services/Services';
import SalseTeam from '../SalseTeam/SalseTeam';
import Features from '../Features/Features';
import BeAMarchent from '../BeAMarchent/BeAMarchent';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <div className='my-5'>
                <Banner></Banner>
            </div>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <SalseTeam></SalseTeam>
            <Features></Features>
            <div className='my-5'>
                <BeAMarchent></BeAMarchent>
            </div>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;