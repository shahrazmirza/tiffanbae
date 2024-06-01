import React from "react";

const Banner = () => {
  return (
    <div className="w-screen bg-orange-200 py-1">
      <h2 className="flex flex-col md:flex-row md:text-base text-sm font-semibold justify-center text-center md:animate-marquee">
        Place your order by 12:00 pm for pickup next day{" "}
        <span className="text-red-500 px-2">OR</span>{" "}
        <p>
          Place your order by 12:00 pm this Thursday for delivery on Saturday.
        </p>
      </h2>
    </div>
  );
};

export default Banner;
