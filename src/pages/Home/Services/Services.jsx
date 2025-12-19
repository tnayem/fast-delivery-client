// Services.jsx
import React from "react";
import { FaShippingFast, FaGlobe, FaBoxOpen, FaMoneyBillWave, FaBuilding, FaUndoAlt } from "react-icons/fa";
import Service from "./Service";

const services = [
    {
        id: 1,
        title: "Express & Standard Delivery",
        description:
            "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: <FaShippingFast size={40} className="text-indigo-500" />,
    },
    {
        id: 2,
        title: "Nationwide Delivery",
        description:
            "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: <FaGlobe size={40} className="text-green-500" />,
        highlighted: true,
    },
    {
        id: 3,
        title: "Fulfillment Solution",
        description:
            "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        icon: <FaBoxOpen size={40} className="text-purple-500" />,
    },
    {
        id: 4,
        title: "Cash on Home Delivery",
        description:
            "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: <FaMoneyBillWave size={40} className="text-yellow-500" />,
    },
    {
        id: 5,
        title: "Corporate Service / Contract In Logistics",
        description:
            "Customized corporate services which includes warehouse and inventory management support.",
        icon: <FaBuilding size={40} className="text-blue-500" />,
    },
    {
        id: 6,
        title: "Parcel Return",
        description:
            "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        icon: <FaUndoAlt size={40} className="text-red-500" />,
    },
];

const Services = () => {
    return (
        <section className="py-16 bg-gray-900 text-white w-[90%] mx-auto rounded-2xl mb-5">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
                <p className="text-center text-gray-300 mb-12 w-2/3 mx-auto">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <Service key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;