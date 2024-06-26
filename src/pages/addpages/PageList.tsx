import React from "react";
import { FaEdit, FaLink } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PageList: React.FC = () => {
  const navigate = useNavigate();
  // const [checked, setChecked] = useState(false);

  // const toggleSwitch = () => {
  //   setChecked(!checked);
  // };

  // const items = Array.from(Array(10).keys());

  const addPlaylistHandler=()=>{
    navigate('/addpage');
  }
  return (
    <div className="w-full bg-primary-gray rounded p-4">
      <div className="flex justify-start items-center">
     
        <button className="bg-green-600 text-white rounded p-2 font-semibold"
        onClick={()=> addPlaylistHandler()}>
          + Add Page
        </button>
      </div>



      <div className="overflow-x-auto mt-3">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border border-gray-600 p-3 text-white text-left">
                Title
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
                Privacy Policy
              </td>
              <td className="border border-gray-600 p-3 text-white">
                <span className="bg-green-600 rounded px-1 font-semibold">
                  Active
                </span>
              </td>
              <td className="border border-gray-600 p-3 text-white">
                <div className="flex gap-2">
                  <button className="rounded bg-sky-600 text-white p-2">
                  <FaLink />
                  </button>
                  <button className="rounded bg-green-600 text-white p-2">
                    <FaEdit />
                  </button>
                  <button className="rounded bg-red-600 text-white p-2">
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

export default PageList;
