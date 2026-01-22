import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BeARider = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    // react-hook-form 
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    // load warehouse data 
    const werehouseData = useLoaderData();

    // unique regions
    const regions = [...new Set(werehouseData?.map(w => w.region))];

    // watch selected region
    const selectedRegion = useWatch({
        control,
        name: "region",
        defaultValue: ""
    });

    // derived filtered warehouses (NO state, NO effect)
    const filteredDistricts =
        selectedRegion && werehouseData
            ? werehouseData.filter(item => item.region === selectedRegion)
            : [];
    // submit handler
    const onSubmit = (data) => {
        const riderData = {
            ...data,
            name:user?.displayName,
            email:user?.email,
            status:"pending",
            created_at: new Date().toISOString()
        }
        axiosSecure.post('/riders',riderData)
        .then(res=>{
            console.log(res.data);
        })
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-sm w-full max-w-6xl p-8 md:p-12 border border-gray-100">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-[#003d3d] mb-4">Be a Rider</h1>
                    <p className="text-gray-500 max-w-2xl leading-relaxed"></p>
                    <div className="border-b border-gray-100 mt-8"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    <div className="w-full lg:w-3/5">
                        <h2 className="text-2xl font-bold text-[#003d3d] mb-6">
                            Tell us about yourself
                        </h2>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {/* Name */}
                            <div className="form-control">
                                <label className="label font-semibold text-sm">Your Name</label>
                                <input
                                    {...register("name", { required: "নাম দেওয়া আবশ্যক" })}
                                    type="text"
                                    placeholder="Your Name"
                                    className={`input input-bordered w-full bg-white ${errors.name ? "border-red-500" : ""
                                        }`}
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-xs mt-1">
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>

                            {/* Age */}
                            <div className="form-control">
                                <label className="label font-semibold text-sm">Your age</label>
                                <input
                                    {...register("age", { required: "বয়স দিন" })}
                                    type="number"
                                    placeholder="Your age"
                                    className="input input-bordered w-full bg-white"
                                />
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label font-semibold text-sm">Your Email</label>
                                <input
                                    {...register("email", {
                                        required: "ইমেইল আবশ্যক",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "সঠিক ইমেইল দিন",
                                        },
                                    })}
                                    type="email"
                                    placeholder="Your Email"
                                    className="input input-bordered w-full bg-white"
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-xs mt-1">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            {/* Region */}
                            <div className="form-control">
                                <label className="label font-semibold text-sm">Your Region</label>
                                <select
                                    {...register("region", { required: true })}
                                    className="select select-bordered w-full bg-white"
                                >
                                    <option value="">Select your region</option>
                                    {regions.map(region => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* NID */}
                            <div className="form-control">
                                <label className="label font-semibold text-sm">NID No</label>
                                <input
                                    {...register("nid", { required: true })}
                                    type="text"
                                    placeholder="NID"
                                    className="input input-bordered w-full bg-white"
                                />
                            </div>

                            {/* Contact */}
                            <div className="form-control">
                                <label className="label font-semibold text-sm">Contact</label>
                                <input
                                    {...register("contact", { required: true })}
                                    type="text"
                                    placeholder="Contact"
                                    className="input input-bordered w-full bg-white"
                                />
                            </div>

                            {/* Warehouse */}
                            <div className="form-control md:col-span-2">
                                <label className="label font-semibold text-sm">
                                    Which wire-house you want to work?
                                </label>
                                <select
                                    {...register("warehouse", { required: true })}
                                    className="select select-bordered w-full bg-white text-gray-800 focus:outline-none"
                                >
                                    <option value="">Select wire-house</option>
                                    {filteredDistricts.map(w => (
                                        <option key={w._id} value={w.district} className="text-gray-800 bg-white">
                                            {w.district}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            {/* Submit */}
                            <div className="md:col-span-2 mt-4">
                                <button
                                    type="submit"
                                    className="btn border-none w-full bg-[#CCE866] hover:bg-[#b8d455] text-gray-800 font-bold text-lg shadow-md"
                                >
                                    Be a rider
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Image */}
                    <div className="w-full lg:w-2/5 flex justify-center items-center">
                        <img
                            src="https://img.freepik.com/free-vector/delivery-man-riding-scooter-with-mask_23-2148498595.jpg"
                            alt="Rider Illustration"
                            className="w-full max-w-sm rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeARider;
