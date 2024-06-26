export const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#374151", // Tailwind class bg-gray-700
      borderColor: "#4A5568", // Tailwind class bg-gray-700
      height: "auto",
      color: "white",
      "&:hover": {
        // borderColor: "#2D3748", // Tailwind class hover:bg-gray-800
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#4A5568", // Tailwind class bg-gray-700
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#2D3748"
        : state.isFocused
        ? "#2D3748"
        : "#4A5568", // Tailwind class bg-gray-800 for selected and focused
      color: "white",
      "&:hover": {
        backgroundColor: "#B91C1C", // Tailwind class hover:bg-red-600
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#B91C1C", // Tailwind class bg-red-600
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "white",
      "&:hover": {
        backgroundColor: "#b70b0b", // Tailwind class hover:bg-red-900
        color: "white",
      },
    }),
  };




  export const customStyles2 = {
    control: (provided: any) => ({
    ...provided,
    backgroundColor: "#374151", // Tailwind class bg-gray-700
    borderColor: "#4A5568", // Tailwind class bg-gray-700
    height: "auto",
    color: "white",
    "&:hover": {
      // borderColor: "#2D3748", // Tailwind class hover:bg-gray-800
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#4A5568", // Tailwind class bg-gray-700
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#2D3748"
      : state.isFocused
      ? "#2D3748"
      : "#4A5568", // Tailwind class bg-gray-800 for selected and focused
    color: "white",
    "&:hover": {
      backgroundColor: "#B91C1C", // Tailwind class hover:bg-red-600
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#fff", // Change this to your desired color
  }),
  };
  

  