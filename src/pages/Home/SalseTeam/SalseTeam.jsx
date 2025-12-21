import Marquee from "react-fast-marquee";

import casio from "../../../assets/brands/casio.png";
import amazon from "../../../assets/brands/amazon.png";
import moonstar from "../../../assets/brands/moonstar.png";
import starplus from "../../../assets/brands/start.png";
import startpeople from "../../../assets/brands/start-people 1.png";
import randstad from "../../../assets/brands/randstad.png";

const logos = [
  casio,
  amazon,
  moonstar,
  starplus,
  startpeople,
  randstad,
];

const SalseTeam = () => {
  return (
    <section className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
          We’ve helped thousands of sales teams
        </h2>

        <Marquee
          direction="left"
          speed={40}
          gradient={false}
          pauseOnHover={true}
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="mx-12 flex items-center justify-center"
            >
              <img
                src={logo}
                alt="client logo"
                className="h-8 md:h-10 object-contain opacity-80 hover:opacity-100 transition"
              />
            </div>
          ))}
        </Marquee>

        {/* dotted line */}
        <div className="mt-12 border-t border-dashed border-gray-300 border-2"></div>
      </div>
    </section>
  );
};

export default SalseTeam;
