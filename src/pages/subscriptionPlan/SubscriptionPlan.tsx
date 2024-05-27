import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SubscriptionPlan: React.FC = () => {
  const navigate = useNavigate();
//   const [checked, setChecked] = useState(false);

//   const toggleSwitch = () => {
//     setChecked(!checked);
//   };

//   const items = Array.from(Array(10).keys());
  const addSubscriptionPlanHandler=()=>{
    navigate('/addsubscriptionplan');
  }
  return (
    <div className="w-full bg-gray-800 rounded p-4">
      <div className="flex justify-start items-center">
        <button className="bg-green-600 text-white rounded p-2 font-semibold"
        onClick={()=> addSubscriptionPlanHandler()}>
          + Add Plan
        </button>
      </div>



      <div className="overflow-x-auto mt-3">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border border-gray-600 p-3 text-white text-left">
                Plan Name
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Duration
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Price
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Device Limit
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Ads
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Download
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
                7 Day(s)
              </td>
              <td className="border border-gray-600 p-3 text-white">
                $5.00
              </td>
              <td className="border border-gray-600 p-3 text-white">
                  1
                
              </td>
              <td className="border border-gray-600 p-3 text-white">
                <span className="bg-green-600 rounded px-1 font-semibold">
                  ON
                </span>
              </td>
              <td className="border border-gray-600 p-3 text-white">
                <span className="bg-red-600 rounded px-1 font-semibold">
                  OFF
                </span>
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

export default SubscriptionPlan;
