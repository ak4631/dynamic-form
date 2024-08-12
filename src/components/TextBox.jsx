import React from "react";

const Textbox = ({ id, label, placeholder, required }) => {
  return (
    <div className="p-2 w-auto">
      <label
        htmlFor={`name-${id}`}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="text"
        id={`name-${id}`}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-auto"
        placeholder={placeholder}
        required={required}  // Dynamically set required attribute
      />
    </div>
  );
};

export default Textbox;
