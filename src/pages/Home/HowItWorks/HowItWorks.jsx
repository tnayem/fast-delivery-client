import React from "react";
import { Truck, MapPin, Wallet, Building2 } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            title: "Booking Pick & Drop",
            desc: "From personal packages to business shipments — we deliver on time, every time.",
            icon: <MapPin className="w-7 h-7 text-primary" />,
        },
        {
            title: "Cash On Delivery",
            desc: "From personal packages to business shipments — we deliver on time, every time.",
            icon: <Wallet className="w-7 h-7 text-primary" />,
        },
        {
            title: "Delivery Hub",
            desc: "From personal packages to business shipments — we deliver on time, every time.",
            icon: <Truck className="w-7 h-7 text-primary" />,
        },
        {
            title: "Booking SME & Corporate",
            desc: "From personal packages to business shipments — we deliver on time, every time.",
            icon: <Building2 className="w-7 h-7 text-primary" />,
        },
    ];

    return (
        <section className="bg-base-200 py-16">
            <div className="w-[90%] mx-auto">
                <h2 className="text-3xl font-bold text-base-content mb-10">
                    How it Works
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((item, index) => (
                        <div
                            key={index}
                            className="card bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <div className="mb-4">{item.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
