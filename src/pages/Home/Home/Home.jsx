import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
            <div className='my-5'>
                <Banner></Banner>
            </div>
            <HowItWorks></HowItWorks>
            <Services></Services>
        </div>
    );
};

export default Home;