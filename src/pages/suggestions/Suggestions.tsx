import React from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Suggestions: React.FC = () => {
  // const [checked, setChecked] = useState(false);

  // const toggleSwitch = () => {
  //   setChecked(!checked);
  // };

  // const items = Array.from(Array(10).keys());

  return (
    <div className="w-full bg-gray-800 rounded p-4">
      <div className="flex justify-start items-center">
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
      </div>



      <div className="overflow-x-auto mt-3">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border border-gray-600 p-3 text-white text-left">
                Name
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Title
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Image
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Message
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Date
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
                title
              </td>
              <td className="border border-gray-600 p-3 text-white">
                imageurl
              </td>
              <td className="border border-gray-600 p-3 text-white">
                message here
              </td>
              <td className="border border-gray-600 p-3 text-white">
                mm/dd/yyyy
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

export default Suggestions;
