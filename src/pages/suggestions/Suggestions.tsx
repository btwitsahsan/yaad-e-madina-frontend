import React, { useState, useEffect } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Suggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Sample JSON data
    const jsonData = [
      {
        id: 1,
        name: "John Doe",
        title: "Title 1",
        image: "imageurl1",
        message: "Message 1",
        date: "01/01/2022",
      },
      {
        id: 2,
        name: "Jane Smith",
        title: "Title 2",
        image: "imageurl2",
        message: "Message 2",
        date: "02/02/2022",
      },
      {
        id: 3,
        name: "Alice Johnson",
        title: "Title 3",
        image: "imageurl3",
        message: "Message 3",
        date: "03/03/2022",
      },
    ];

    setSuggestions(jsonData);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id: number) => {
    const updatedSuggestions = suggestions.filter((suggestion) => suggestion.id !== id);
    setSuggestions(updatedSuggestions);
    // Here you can also make a call to your backend API to delete the suggestion
  };

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-primary-gray rounded p-4">
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
            value={searchTerm}
            onChange={handleSearchChange}
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
            {filteredSuggestions.map((suggestion) => (
              <tr key={suggestion.id}>
                <td className="border border-gray-600 p-3 text-white">
                  {suggestion.name}
                </td>
                <td className="border border-gray-600 p-3 text-white">
                  {suggestion.title}
                </td>
                <td className="border border-gray-600 p-3 text-white">
                  {suggestion.image}
                </td>
                <td className="border border-gray-600 p-3 text-white">
                  {suggestion.message}
                </td>
                <td className="border border-gray-600 p-3 text-white">
                  {suggestion.date}
                </td>
                <td className="border border-gray-600 p-3 text-white">
                  <div className="flex gap-2">
                    <button className="rounded bg-green-600 text-white p-2">
                      <FaEdit />
                    </button>
                    <button
                      className="rounded bg-red-600 text-white p-2 ml-1"
                      onClick={() => handleDelete(suggestion.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Suggestions;
