import React from "react";
import feature1 from "../../../assets/live-tracking.png";
import feature2 from "../../../assets/safe-delivery.png";

const features = [
    {
        id: 1,
        title: "Live Parcel Tracking",
        desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: feature1,
    },
    {
        id: 2,
        title: "100% Safe Delivery",
        desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: feature2,
    },
    {
        id: 3,
        title: "24/7 Call Center Support",
        desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: feature1,
    },
];

const Features = () => {
    return (
        <section className="bg-gray-100 py-16 w-[90%] mx-auto">
            <div className="w-[90%] max-w-6xl mx-auto space-y-8">
                {features.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-2xl p-6 shadow-sm"
                    >
                        {/* Image */}
                        <div className="flex items-center gap-6">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-32 h-32 object-contain"
                            />

                            {/* Vertical dotted line */}
                            <div className="hidden md:block h-28 border-l-2 border-dashed border-gray-300"></div>
                        </div>

                        {/* Text */}
                        <div className="ms-5">
                            <h3 className="text-xl font-semibold text-[#073b3a] mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
