import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import Services from '../Services/Services';
import SalseTeam from '../SalseTeam/SalseTeam';
import Features from '../Features/Features';

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
        </div>
    );
};

export default Home;