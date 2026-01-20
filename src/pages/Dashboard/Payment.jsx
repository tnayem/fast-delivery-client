import React from 'react';
import { useLoaderData } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Payment = () => {
    const axiosSecure = useAxiosSecure()
    const parcel = useLoaderData();
    const handlePay = ()=>{
        const orderData={
            ...parcel,
            parcelId:parcel._id
        }
        axiosSecure.post(`/order`,orderData)
        .then(result=>{
            console.log(result.data);
            window.location.replace(result.data.url)
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

            {/* Parcel Info */}
            <div className="grid md:grid-cols-2 gap-6 bg-white shadow rounded-lg p-6">
                <div>
                    <p><span className="font-semibold">Tracking ID:</span> {parcel.tracking_Id}</p>
                    <p><span className="font-semibold">Parcel Name:</span> {parcel.parcelName}</p>
                    <p><span className="font-semibold">Parcel Type:</span> {parcel.parcelType}</p>
                    <p><span className="font-semibold">Weight:</span> {parcel.weight || "N/A"}</p>
                    <p><span className="font-semibold">Delivery Status:</span> {parcel.delivery_status}</p>
                    <p><span className="font-semibold">Payment Status:</span> {parcel.pement_status}</p>
                </div>

                <div>
                    <p><span className="font-semibold">Sender Name:</span> {parcel.senderName}</p>
                    <p><span className="font-semibold">Sender Phone:</span> {parcel.senderPhone}</p>
                    <p><span className="font-semibold">Sender Region:</span> {parcel.senderRegion}</p>

                    <p className="mt-3"><span className="font-semibold">Receiver Name:</span> {parcel.receiverName}</p>
                    <p><span className="font-semibold">Receiver Phone:</span> {parcel.receiverPhone}</p>
                    <p><span className="font-semibold">Receiver Region:</span> {parcel.receiverRegion}</p>
                </div>
            </div>

            {/* Price Section */}
            <div className="mt-6 bg-gray-100 p-6 rounded-lg flex justify-between items-center">
                <div>
                    <p className="text-lg font-semibold">Total Price</p>
                    <p className="text-2xl font-bold text-green-600">৳ {parcel.totalPrice}</p>
                </div>

                <button
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition btn"
                    onClick={() => handlePay()}
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default Payment;