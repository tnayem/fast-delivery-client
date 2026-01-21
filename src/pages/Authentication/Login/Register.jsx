import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const Register = () => {
    const { createUser,updateUser} = useAuth()
    const location = useLocation()
    const from = location?.state || '/'
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const imageKey = import.meta.env.VITE_image_api_key
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageKey}`;
    const onSubmit = async(data) => {
        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append('image',imageFile)
        const imageRes = await axios.post(imageUploadUrl,formData)
        const photoUrl = (imageRes.data.data.display_url);
        // Create user
        createUser(data.email, data.password)
            .then(result => {
                // Update Mongodb 
                // Update profile in firebase 
                updateUser({
                    displayName:data.name,
                    photoURL:photoUrl
                })
                .then(result=>{
                    console.log(result);
                })
                .catch(err=>{
                    console.log(err);
                })
                console.log(result.user);
                navigate(from)
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className='card bg-base-100 m-10 shrink-0 shadow-2xl p-2'>
            <h1 className='text-4xl font-bold ms-10'>Create an Account</h1>
            <p className='ms-10 font-bold pt-2'>Register with Profast</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    {/* Name Input */}
                    <label className="label">Name</label>
                    <input {...register("name", { required: true })} type="text" className="input w-full" placeholder="Your Name" />
                    {errors.name && <p className='text-red-700'>Name is Required</p>}
                    {/* Image upload */}
                    <label className="label">Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        {...register("image", {
                            required: "Profile image is required",
                        })}
                    />
                    {errors.image && (
                        <p className="text-red-700">{errors.image.message}</p>
                    )}
                    {/* Email Input */}
                    <label className='label'>Email</label>
                    <input {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                        }
                    })} type='email' placeholder='Your Email' className='input w-full' />
                    {errors.email && <p className='text-red-700'>{errors.email.message}</p>}
                    {/* Password Input */}
                    <label className="label">Password</label>
                    <input {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                            message:
                                "Password must contain at least one uppercase letter and one number",
                        }
                    })} type="password" className="input w-full" placeholder="Password" />
                    {errors.password && (
                        <p className='text-red-700'>{errors.password.message}</p>
                    )}

                    <button type='submit' className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p className='text-center py-2 text-sm'>Already have an account? <Link className='text-blue-600 text-blue-700' to='/login'>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;