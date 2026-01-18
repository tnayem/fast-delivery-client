import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import areaData from '../../../public/werehouse.json';

const SendParcel = () => {
    const { register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            parcelType: "Document"
        }
    });

    // Fields watch kora hocche state update trigger korar jonno
    const selectedType = watch("parcelType");
    
    // Sender fields watch
    const watchedSenderRegion = watch("senderRegion");
    const watchedSenderCity = watch("senderCity");

    // Receiver fields watch
    const watchedReceiverRegion = watch("receiverRegion");
    const watchedReceiverCity = watch("receiverCity");

    // JSON theke unique regions gulo ber kora
    const regions = useMemo(() => {
        return [...new Set(areaData.map(item => item.region))];
    }, []);

    // Sender city filter logic
    const senderCities = useMemo(() => {
        if (!watchedSenderRegion) return [];
        return areaData.filter(item => item.region === watchedSenderRegion);
    }, [watchedSenderRegion]);

    // Sender covered_area (warehouse) logic
    const senderWarehouses = useMemo(() => {
        const cityData = senderCities.find(item => item.city === watchedSenderCity);
        return cityData ? cityData.covered_area : [];
    }, [watchedSenderCity, senderCities]);

    // Receiver city filter logic
    const receiverCities = useMemo(() => {
        if (!watchedReceiverRegion) return [];
        return areaData.filter(item => item.region === watchedReceiverRegion);
    }, [watchedReceiverRegion]);

    // Receiver covered_area logic
    const receiverWarehouses = useMemo(() => {
        const cityData = receiverCities.find(item => item.city === watchedReceiverCity);
        return cityData ? cityData.covered_area : [];
    }, [watchedReceiverCity, receiverCities]);

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        reset();
    };

    return (
        <div className="min-h-screen bg-white p-8 md:p-12 font-sans text-[#00302E]">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-10">Send Parcel</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                                <input type="text" placeholder="Parcel Name" className="input input-bordered w-full bg-white border-gray-300 focus:outline-none" {...register("parcelName", { required: true })} />
                            </div>

                            {selectedType !== "Document" && (
                                <div className="form-control animate-fade-in">
                                    <label className="label py-1"><span className="label-text font-bold">Parcel Weight (KG)</span></label>
                                    <input type="number" placeholder="Parcel Weight (KG)" className="input input-bordered w-full bg-white border-gray-300 focus:outline-none" {...register("weight", { required: selectedType !== "Document" })} />
                                </div>
                            )}
                        </div>
                    </section>

                    <hr className="my-8 border-gray-100" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Sender Details */}
                        <section>
                            <h2 className="text-xl font-bold mb-6">Sender Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control col-span-1">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Sender Name</span></label>
                                    <input type="text" placeholder="Sender Name" className="input input-bordered w-full text-sm" {...register("senderName")} />
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Address</span></label>
                                    <input type="text" placeholder="Address" className="input input-bordered w-full text-sm" {...register("senderAddress")} />
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Sender Contact No</span></label>
                                    <input type="text" placeholder="Sender Contact No" className="input input-bordered w-full text-sm" {...register("senderPhone")} />
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Your Region</span></label>
                                    <select className="select select-bordered w-full font-normal text-sm" {...register("senderRegion")}>
                                        <option value="">Select your region</option>
                                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Sender City</span></label>
                                    <select className="select select-bordered w-full font-normal text-sm" {...register("senderCity")} disabled={!watchedSenderRegion}>
                                        <option value="">Select City</option>
                                        {senderCities.map(item => <option key={item.city} value={item.city}>{item.city}</option>)}
                                    </select>
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Sender Pickup Wire house</span></label>
                                    <select className="select select-bordered w-full font-normal text-sm" {...register("senderWarehouse")} disabled={!watchedSenderCity}>
                                        <option value="">Select Wire house</option>
                                        {senderWarehouses.map(area => <option key={area} value={area}>{area}</option>)}
                                    </select>
                                </div>
                                <div className="form-control col-span-2">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Pickup Instruction</span></label>
                                    <textarea className="textarea textarea-bordered h-24 text-sm w-full" placeholder="Pickup Instruction" {...register("pickupInstruction")}></textarea>
                                </div>
                            </div>
                        </section>

                        {/* Receiver Details */}
                        <section>
                            <h2 className="text-xl font-bold mb-6">Receiver Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control col-span-1">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Receiver Name</span></label>
                                    <input type="text" placeholder="Receiver Name" className="input input-bordered w-full text-sm" {...register("receiverName")} />
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Address</span></label>
                                    <input type="text" placeholder="Address" className="input input-bordered w-full text-sm" {...register("receiverAddress")} />
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Receiver Contact No</span></label>
                                    <input type="text" placeholder="Receiver Contact No" className="input input-bordered w-full text-sm" {...register("receiverPhone")} />
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Receiver Region</span></label>
                                    <select className="select select-bordered w-full font-normal text-sm" {...register("receiverRegion")}>
                                        <option value="">Select your region</option>
                                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Receiver City</span></label>
                                    <select className="select select-bordered w-full font-normal text-sm" {...register("receiverCity")} disabled={!watchedReceiverRegion}>
                                        <option value="">Select City</option>
                                        {receiverCities.map(item => <option key={item.city} value={item.city}>{item.city}</option>)}
                                    </select>
                                </div>
                                <div className="form-control col-span-1">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Receiver Delivery Wire house</span></label>
                                    <select className="select select-bordered w-full font-normal text-sm" {...register("receiverWarehouse")} disabled={!watchedReceiverCity}>
                                        <option value="">Select Wire house</option>
                                        {receiverWarehouses.map(area => <option key={area} value={area}>{area}</option>)}
                                    </select>
                                </div>
                                <div className="form-control col-span-2">
                                    <label className="label py-1"><span className="label-text font-bold text-[13px]">Delivery Instruction</span></label>
                                    <textarea className="textarea textarea-bordered h-24 text-sm w-full" placeholder="Delivery Instruction" {...register("deliveryInstruction")}></textarea>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="mt-10">
                        <p className="text-sm font-medium mb-6">* PickUp Time 4pm-7pm Approx.</p>
                        <button type="submit" className="btn border-none bg-[#C5E76C] hover:bg-[#b3d65a] text-[#00302E] capitalize px-10 font-bold">
                            Proceed to Confirm Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendParcel;