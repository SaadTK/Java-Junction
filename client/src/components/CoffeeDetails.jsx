import React from "react";
import { useLoaderData } from "react-router-dom";

const CoffeeDetails = () => {
  const coffee = useLoaderData();

  const { photo, name, supplier, price, taste, details, category } = coffee;

  return (
    <div className="bg-[#F4F3F0] min-h-screen flex items-center justify-center p-6">
      <div className="bg-white flex flex-col md:flex-row items-center gap-10 p-6 rounded shadow-md w-full max-w-4xl">
        {/* Left - Coffee Image */}
        <img
          src={photo}
          alt={name}
          className="w-64 h-64 object-cover rounded"
        />

        {/* Right - Coffee Info */}
        <div className="text-[#403F3F] space-y-2">
          <h2 className="text-3xl font-semibold mb-4 text-[#3C3C3C] shadow-sm">
            Details
          </h2>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Chef:</strong> {supplier}
          </p>

          <p>
            <strong>Taste:</strong> {taste}
          </p>
          <p>
            <strong>Price per Cup:</strong> {price}
          </p>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Details:</strong> {details}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
