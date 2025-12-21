import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div className="card bg-base-100 m-10 shrink-0 shadow-2xl">
            <h1 className='text-4xl font-bold ms-10'>Welcome Back</h1>
            <p className='ms-10 font-bold pt-2'>Login with Profast</p>
            <div className="card-body">
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" className="input w-full" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" className="input w-full" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    <p>Don’t have any account? <Link to="/register" className='text-blue-400'>Register</Link></p>
                </fieldset>
            </div>
        </div>
    );
};

export default Login;