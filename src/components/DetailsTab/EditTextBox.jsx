import React, { useState } from "react";

const EditTextBox = ({ item, onSave }) => {
  const [label, setLabel] = useState(item.label || "Label");
  const [placeholder, setPlaceholder] = useState(item.placeholder || "Placeholder");
  const [required, setRequired] = useState(item.required || false);

  console.log(item);

  const handleSave = () => {
    onSave({
      ...item,
      label,
      placeholder,
      required,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Textbox</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Label
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Placeholder
        </label>
        <input
          type="text"
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
            Required
          </span>
        </label>
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default EditTextBox;
