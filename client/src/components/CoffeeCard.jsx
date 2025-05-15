import React from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  const { photo, name, price, supplier, _id } = coffee;

  const handleDelete = (_id) => {
    console.log(_id);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // // // // start deleting the coffee
          fetch(`http://localhost:3000/all-coffees/${_id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount) {
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });

                // remove the deleted cofffee card from the state
                const remainingCoffees = coffees.filter(
                  (cof) => cof._id !== _id
                );
                setCoffees(remainingCoffees);
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="bg-[#f6f4f0] p-4 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center gap-5">
        {/* Coffee Image */}
        <img
          src={photo}
          alt={name}
          className="w-40 h-40 object-cover rounded-md"
        />

        {/* Info */}
        <div className="flex-1 space-y-1 text-[#403F3F]">
          <p>
            <span className="font-bold">Name:</span> {name}
          </p>
          <p>
            <span className="font-bold">Chef:</span> {supplier}
          </p>
          <p>
            <span className="font-bold">Price:</span> {price} Taka
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Link to={`/coffee-details/${_id}`}>
            <button className="bg-[#D2B48C] p-2 rounded text-white hover:scale-110 transition-all">
              <FaEye />
            </button>
          </Link>
          <Link to={`/update-coffee/${_id}`}>
            <button className="bg-[#3C3C3C] p-2 rounded text-white hover:scale-110 transition-all">
              <FaPen />
            </button>
          </Link>

          <button
            onClick={() => {
              handleDelete(_id);
            }}
            className="bg-[#EA4744] p-2 rounded text-white hover:scale-110 transition-all"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
