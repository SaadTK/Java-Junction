import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
  const { name, quantity, supplier, taste, price, details, photo, _id } =
    useLoaderData();

  const handleUpdateCoffee = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const updateCoffee = Object.fromEntries(formData.entries());
    console.log(updateCoffee);

    fetch(`http://localhost:3000/all-coffees/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Coffee has been Updated",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };

  return (
    <div className="bg-[#f5f2ee] min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-10">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#3b2e2e] mb-4">
          Add New Coffee
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Add a new coffee blend to Java Junction's collection. Fill in the
          details, including its origin, roast level, and unique flavor notes,
          to ensure customers get the best experience. Your additions help shape
          a marketplace where coffee lovers find their perfect brew!
        </p>

        {/* Form */}
        <form onSubmit={handleUpdateCoffee} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-[#3b2e2e] mb-1">
                Name
              </label>
              <input
                type="text"
                defaultValue={name}
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Coffee Name"
              />
            </div>
            <div>
              <label className="block font-medium text-[#3b2e2e] mb-1">
                Quantity
              </label>
              <input
                type="text"
                defaultValue={quantity}
                name="quantity"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Available Quantity"
              />
            </div>
            <div>
              <label className="block font-medium text-[#3b2e2e] mb-1">
                Supplier
              </label>
              <input
                defaultValue={supplier}
                type="text"
                name="supplier"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Supplier Name"
              />
            </div>
            <div>
              <label className="block font-medium text-[#3b2e2e] mb-1">
                Taste
              </label>
              <input
                defaultValue={taste}
                type="text"
                name="taste"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Flavor/Taste"
              />
            </div>
            <div>
              <label className="block font-medium text-[#3b2e2e] mb-1">
                Price
              </label>
              <input
                defaultValue={price}
                type="text"
                name="price"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Price per Cup"
              />
            </div>
            <div>
              <label className="block font-medium text-[#3b2e2e] mb-1">
                Details
              </label>
              <input
                defaultValue={details}
                type="text"
                name="details"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Short Description"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-[#3b2e2e] mb-1">
              Photo
            </label>
            <input
              type="text"
              defaultValue={photo}
              name="photo"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Photo URL"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-[#d6b98c] text-[#3b2e2e] font-semibold rounded hover:bg-[#c7a676] transition-all"
            >
              Update Coffee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoffee;
