import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit,formState: { errors }, } = useForm()
    const location = useLocation()
    const from = location?.state || "/"
    const navigate = useNavigate()
    const {logIn} = useAuth()
    const onSubmit = data => {
        logIn(data?.email,data?.password)
        .then(result=>{
            console.log(result.user);
            navigate(from)
        })
        .catch(error=>{
            console.log(error);
        })
        
    }
    return (
        <div className="card bg-base-100 m-10 shrink-0 shadow-2xl">
            <h1 className='text-4xl font-bold ms-10'>Welcome Back</h1>
            <p className='ms-10 font-bold pt-2'>Login with Profast</p>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input {...register('email')} type="email" className="input w-full" placeholder="Email" />
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
                        <p style={{ color: "red" }}>{errors.password.message}</p>
                    )}
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    <p>Don’t have any account? <Link state={from} to="/register" className='text-blue-400'>Register</Link></p>
                </fieldset>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;