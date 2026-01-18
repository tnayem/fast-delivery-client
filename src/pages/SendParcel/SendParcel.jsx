import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import areaData from '../../../public/werehouse.json';
import useAuth from '../../hooks/useAuth';

const generateTrackingId = () => {
    const datePart = new Date().getTime().toString(36).toUpperCase(); // timestamp
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return `TRK-${datePart}-${randomPart}`;
};

const SendParcel = () => {
    const { user } = useAuth()
    const { register, handleSubmit, watch, reset } = useForm();

    const selectedType = watch("parcelType");
    const watchedWeight = watch("weight");
    const watchedSenderRegion = watch("senderRegion");
    const watchedSenderCity = watch("senderCity");
    const watchedReceiverRegion = watch("receiverRegion");
    const watchedReceiverCity = watch("receiverCity");

    const regions = useMemo(() => [...new Set(areaData.map(item => item.region))], []);

    const senderCities = useMemo(() =>
        watchedSenderRegion ? areaData.filter(item => item.region === watchedSenderRegion) : []
        , [watchedSenderRegion]);

    const senderWarehouses = useMemo(() => {
        const cityData = senderCities.find(item => item.city === watchedSenderCity);
        return cityData ? cityData.covered_area : [];
    }, [watchedSenderCity, senderCities]);

    const receiverCities = useMemo(() =>
        watchedReceiverRegion ? areaData.filter(item => item.region === watchedReceiverRegion) : []
        , [watchedReceiverRegion]);

    const receiverWarehouses = useMemo(() => {
        const cityData = receiverCities.find(item => item.city === watchedReceiverCity);
        return cityData ? cityData.covered_area : [];
    }, [watchedReceiverCity, receiverCities]);

    const totalPrice = useMemo(() => {
        const isSameCity = watchedSenderCity && watchedReceiverCity && watchedSenderCity === watchedReceiverCity;
        const weight = parseFloat(watchedWeight) || 0;

        if (selectedType === "Document") {
            return isSameCity ? 60 : 80;
        } else {
            if (weight <= 3) return isSameCity ? 110 : 150;
            const extraWeight = Math.ceil(weight - 3);
            return isSameCity ? 110 + (extraWeight * 40) : 150 + (extraWeight * 40) + 40;
        }
    }, [selectedType, watchedWeight, watchedSenderCity, watchedReceiverCity]);

    const onFormSubmit = (data) => {
        Swal.fire({
            title: 'Booking Summary',
            html: `
                <div style="font-size:14px; color:#00302E; text-align:left;">
                    <strong>Parcel Details</strong><br/>
                    Type: ${data.parcelType}<br/>
                    Weight: ${data.weight || 0} KG<br/><br/>

                    <strong>Sender</strong><br/>
                    ${data.senderName || ''}, ${data.senderCity || ''}<br/>
                    ${data.senderAddress || ''}<br/><br/>

                    <strong>Receiver</strong><br/>
                    ${data.receiverName || ''}, ${data.receiverCity || ''}<br/>
                    ${data.receiverAddress || ''}<br/><br/>

                    <strong>Total Delivery Charge:</strong> ৳${totalPrice}
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Confirm & Pay',
            cancelButtonText: 'Edit Details',
            confirmButtonColor: '#C5E76C',
            cancelButtonColor: '#999999',
            customClass: {
                popup: 'rounded-2xl p-6'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Final Booking Data:", {
                    ...data,
                    totalPrice,
                    created_by: user?.email,
                    pement_status: 'unpaid',
                    delivery_status: 'not_collected',
                    creation_date: new Date().toLocaleString('en-BD'),
                    tracking_Id: generateTrackingId()

                });
                reset();
            }
        });
    };

    return (
        <div className="min-h-screen bg-white p-8 md:p-12 font-sans text-[#00302E]">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-10">Send Parcel</h1>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    {/* Parcel Type Selection */}
                    <section className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Enter your parcel details</h2>
                        <div className="flex gap-8 mb-6">
                            <label className="flex items-center cursor-pointer gap-2">
                                <input type="radio" value="Document" {...register("parcelType")} className="radio radio-success radio-sm" />
                                <span className={`text-sm font-semibold ${selectedType === 'Document' ? 'text-[#00302E]' : 'text-gray-400'}`}>Document</span>
                            </label>
                            <label className="flex items-center cursor-pointer gap-2">
                                <input type="radio" value="Not-Document" {...register("parcelType")} className="radio radio-success radio-sm" />
                                <span className={`text-sm font-semibold ${selectedType === 'Not-Document' ? 'text-[#00302E]' : 'text-gray-400'}`}>Not-Document</span>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label py-1"><span className="label-text font-bold">Parcel Name</span></label>
                                <input type="text" placeholder="Parcel Name" className="input input-bordered w-full bg-white border-gray-300" {...register("parcelName", { required: true })} />
                            </div>
                            {selectedType !== "Document" && (
                                <div className="form-control">
                                    <label className="label py-1"><span className="label-text font-bold">Parcel Weight (KG)</span></label>
                                    <input type="number" placeholder="Parcel Weight (KG)" className="input input-bordered w-full bg-white border-gray-300" {...register("weight")} />
                                </div>
                            )}
                        </div>
                    </section>

                    <hr className="my-8 border-gray-100" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Sender Details Section */}
                        <section>
                            <h2 className="text-xl font-bold mb-6">Sender Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control col-span-1">
                                    <label className="label py-1 font-bold text-[13px]">Sender Name</label>
                                    <input type="text" placeholder="Sender Name" className="input input-bordered w-full text-sm" {...register("senderName")} />
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1 font-bold text-[13px]">Address</label>
                                    <input type="text" placeholder="Address" className="input input-bordered w-full text-sm" {...register("senderAddress")} />
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1 font-bold text-[13px]">Sender Contact No</label>
                                    <input type="text" placeholder="Sender Contact No" className="input input-bordered w-full text-sm" {...register("senderPhone")} />
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1 font-bold text-[13px]">Your Region</label>
                                    <select className="select select-bordered w-full font-normal text-gray-400 text-sm" {...register("senderRegion")}>
                                        <option value="">Select your region</option>
                                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1 font-bold text-[13px]">Sender City</label>
                                    <select className="select select-bordered w-full font-normal text-gray-400 text-sm" {...register("senderCity")} disabled={!watchedSenderRegion}>
                                        <option value="">Select City</option>
                                        {senderCities.map(item => <option key={item.city} value={item.city}>{item.city}</option>)}
                                    </select>
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1 font-bold text-[13px]">Sender Pickup Wire house</label>
                                    <select className="select select-bordered w-full font-normal text-gray-400 text-sm" {...register("senderWarehouse")} disabled={!watchedSenderCity}>
                                        <option value="">Select Wire house</option>
                                        {senderWarehouses.map(area => <option key={area} value={area}>{area}</option>)}
                                    </select>
                                </div>
                                <div className="form-control col-span-2">
                                    <label className="label py-1 font-bold text-[13px]">Pickup Instruction</label>
                                    <textarea className="textarea textarea-bordered h-24 text-sm w-full" placeholder="Pickup Instruction" {...register("pickupInstruction")}></textarea>
                                </div>
                            </div>
                        </section>

                        {/* Receiver Details Section */}
                        <section>
                            <h2 className="text-xl font-bold mb-6">Receiver Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control col-span-1">
                                    <label className="label py-1 font-bold text-[13px]">Receiver Name</label>
                                    <input type="text" placeholder="Receiver Name" className="input input-bordered w-full text-sm" {...register("receiverName")} />
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1 font-bold text-[13px]">Address</label>
                                    <input type="text" placeholder="Address" className="input input-bordered w-full text-sm" {...register("receiverAddress")} />
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1 font-bold text-[13px]">Receiver Contact No</label>
                                    <input type="text" placeholder="Receiver Contact No" className="input input-bordered w-full text-sm" {...register("receiverPhone")} />
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1 font-bold text-[13px]">Receiver Region</label>
                                    <select className="select select-bordered w-full font-normal text-gray-400 text-sm" {...register("receiverRegion")}>
                                        <option value="">Select your region</option>
                                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1 font-bold text-[13px]">Receiver City</label>
                                    <select className="select select-bordered w-full font-normal text-gray-400 text-sm" {...register("receiverCity")} disabled={!watchedReceiverRegion}>
                                        <option value="">Select City</option>
                                        {receiverCities.map(item => <option key={item.city} value={item.city}>{item.city}</option>)}
                                    </select>
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1 font-bold text-[13px]">Receiver Delivery Wire house</label>
                                    <select className="select select-bordered w-full font-normal text-gray-400 text-sm" {...register("receiverWarehouse")} disabled={!watchedReceiverCity}>
                                        <option value="">Select Wire house</option>
                                        {receiverWarehouses.map(area => <option key={area} value={area}>{area}</option>)}
                                    </select>
                                </div>
                                <div className="form-control col-span-2">
                                    <label className="label py-1 font-bold text-[13px]">Delivery Instruction</label>
                                    <textarea className="textarea textarea-bordered h-24 text-sm w-full" placeholder="Delivery Instruction" {...register("deliveryInstruction")}></textarea>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="mt-10">
                        <p className="text-sm font-medium mb-6">* PickUp Time 4pm-7pm Approx.</p>
                        <button type="submit" className="btn border-none bg-[#C5E76C] hover:bg-[#b3d65a] text-[#00302E] capitalize px-10 font-bold h-14">
                            Proceed to Confirm Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendParcel;
