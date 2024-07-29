const API_URL = "http://localhost:3000";

export const saveForm = async (layout) => {
  const response = await fetch(`${API_URL}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ layout }),
  });
  return response.json();
};

export const loadForm = async (id) => {
  const response = await fetch(`${API_URL}/form/${id}`);
  return response.json();
};
