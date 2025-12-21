import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Awlad Hossin",
    role: "Senior Product Designer",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    id: 2,
    name: "Rasel Ahamed",
    role: "CTO",
    text: "This service exceeded my expectations. The delivery was fast, secure, and the support team was extremely helpful.",
  },
  {
    id: 3,
    name: "Nasir Uddin",
    role: "CEO",
    text: "Reliable and professional courier service. I highly recommend them for business deliveries.",
  },
  {
    id: 4,
    name: "Tanvir Hasan",
    role: "Operations Manager",
    text: "Tracking system is excellent. I could monitor my parcel in real-time without any hassle.",
  },
  {
    id: 5,
    name: "Mehedi Hasan",
    role: "E-commerce Seller",
    text: "Safe delivery and affordable pricing made this my first choice for courier services.",
  },
  {
    id: 6,
    name: "Sabbir Rahman",
    role: "Business Owner",
    text: "Customer support is outstanding. They are available anytime and always responsive.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#f3f7f6] py-20">
      <div className="w-[90%] max-w-6xl mx-auto text-center">

        {/* Header */}
        <h2 className="text-3xl font-bold text-[#073b3a]">
          What our customers are saying
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with our
          service. See what our customers think about us.
        </p>

        {/* Carousel */}
        <div className="carousel w-full mt-14 space-x-6">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="carousel-item w-full md:w-1/2 lg:w-1/3"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm text-left relative">

                {/* Quote */}
                <span className="text-6xl text-[#cfe7e5] absolute top-4 left-6">
                  “
                </span>

                <p className="text-gray-600 mt-10 mb-6 leading-relaxed">
                  {item.text}
                </p>

                <div className="border-t border-dashed pt-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#073b3a]"></div>
                  <div>
                    <h4 className="font-semibold text-[#073b3a]">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-10">
          <button className="btn btn-circle btn-outline">
            ❮
          </button>
          <button className="btn btn-circle bg-lime-300 border-0 text-black">
            ❯
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
