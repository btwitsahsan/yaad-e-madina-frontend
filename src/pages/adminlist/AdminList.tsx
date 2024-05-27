import React from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AdminList: React.FC = () => {

  const navigate = useNavigate();

const addAdminHandler=()=>{
    navigate('/addadmin');
  }

  return (
    <div className="w-full bg-gray-800 rounded p-4">
      <div className="flex justify-between items-center">
        <div className="relative md:w-64">
          <span className="relative md:absolute inset-y-0 right-0 flex items-center pr-2 z-10">
            <button className="p-1 focus:outline-none text-white md:text-white">
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            placeholder="Search By Title..."
            className="w-full h-11 px-4 py-1 pr-12 rounded shadow text-white outline-none hidden md:block backdrop-blur-sm bg-white/10"
          />
        </div>
        <button className="bg-green-600 text-white rounded p-2 font-semibold"
        onClick={()=>addAdminHandler()}
        >
          + Add Admin
        </button>
      </div>



      <div className="overflow-x-auto mt-3">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border border-gray-600 p-3 text-white text-left">
                Name
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Email
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Phone
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Status
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border border-gray-600 p-3 text-white">
                John Doe
              </td>
              <td className="border border-gray-600 p-3 text-white">
                john@example.com
              </td>
              <td className="border border-gray-600 p-3 text-white">
                0325 8826654
              </td>
              <td className="border border-gray-600 p-3 text-white">
                <span className="bg-green-600 rounded px-1 font-semibold">
                  Active
                </span>
              </td>
              <td className="border border-gray-600 p-3 text-white">
                <div className="flex gap-2">
                  <button className="rounded bg-green-600 text-white p-2">
                    <FaEdit />
                  </button>
                  <button className="rounded bg-red-600 text-white p-2 ml-1">
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
