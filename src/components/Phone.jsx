import React from "react";

const Phone = ({ name }) => (
  <div className="border-2 border-black p-2">
    <label
      for="phone"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Phone number
    </label>
    <input
      type="tel"
      id="phone"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="123-45-678"
      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
      required
    />
  </div>
);

export default Phone;
