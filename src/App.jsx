import React, { useState } from "react";
import EditorArea from "./components/EditorArea";
import Preview from "./components/Preview";
import { saveForm, loadForm } from "./api";

const App = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [layout, setLayout] = useState([]);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const onLayoutChange = (layout) => {
    setLayout(layout);
  };

  const handleSave = async () => {
    const result = await saveForm(layout);
    alert(`Form saved with ID: ${result.id}`);
  };

  const handleLoad = async (id) => {
    const loadedLayout = await loadForm(id);
    setLayout(loadedLayout);
  };

  return (
    <div>
      <button onClick={togglePreview}>{isPreview ? "Edit" : "Preview"}</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => handleLoad(prompt("Enter form ID to load:"))}>
        Load
      </button>
      {isPreview ? (
        <Preview layout={layout} />
      ) : (
        <EditorArea onLayoutChange={onLayoutChange} />
      )}
    </div>
  );
};

export default App;
