import React from 'react';

const Service = ({ service }) => {
    const { title, description, icon} = service
    return (
        <div
            className={`rounded-2xl p-6 text-center shadow-lg transition hover:-translate-y-1
  bg-white hover:bg-[#bbf451]`}
        >
            {/* Icon */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl text-primary">
                {icon}
            </div>

            {/* Title */}
            <h3 className="mb-2 text-lg font-bold text-gray-900">
                {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600">
                {description}
            </p>
        </div>
    );
};

export default Service;