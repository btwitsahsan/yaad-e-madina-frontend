import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Transactions: React.FC = () => {
  // const [checked, setChecked] = useState(false);

  // const toggleSwitch = () => {
  //   setChecked(!checked);
  // };

  // const items = Array.from(Array(10).keys());

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="w-full bg-primary-gray rounded p-4">
      <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center">
        <div className="flex items-center gap-4">
      <select
      
        id="select"
        name="select"
        className="mt-1 block py-2 px-3 h-11 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none "
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">Filter By Gateway</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </select>

        <div className="relative md:w-72 hidden md:block">
          <span className="relative md:absolute inset-y-0 right-0 flex items-center pr-2 z-10">
            <button className="p-1 focus:outline-none text-white md:text-white">
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            placeholder="Search By Payment ID or Email..."
            className="w-full h-11 px-4 py-1 pr-12 rounded shadow text-white outline-none hidden md:block backdrop-blur-sm bg-white/10"
          />
        </div>

        <div className="relative md:w-64 hidden md:block">
          <span className="relative md:absolute inset-y-0 right-0 flex items-center pr-2 z-10">
            <button className="p-1 focus:outline-none text-white md:text-white">
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            placeholder="mm/dd/yyyy..."
            className="w-full h-11 px-4 py-1 pr-12 rounded shadow text-white outline-none hidden md:block backdrop-blur-sm bg-white/10"
          />
        </div>

        </div>

        <button className="bg-sky-600 text-white rounded p-2 font-semibold">
          Export Transactions
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
                Plan
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Amount
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Payment Gateway
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Payment ID
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Payment Date
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
                Premium plan
              </td>
              <td className="border border-gray-600 p-3 text-white">
                $ 50.00
              </td>
              <td className="border border-gray-600 p-3 text-white">
                Razonpay
              </td>
              <td className="border border-gray-600 p-3 text-white">
                pay_423T234HJVJH
              </td>
              <td className="border border-gray-600 p-3 text-white">
                Apr 8 2024 06:30 PM
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
