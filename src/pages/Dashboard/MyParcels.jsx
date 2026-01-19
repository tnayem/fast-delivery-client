import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const MyParcels = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data:parcels} = useQuery({
        queryKey:['my-parcels',user.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })
    console.log(parcels);
    return (
        <div>
            My Parcels Comming hear
        </div>
    );
};

export default MyParcels;