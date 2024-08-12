import React, { useState } from "react";
import EditorArea from "./components/EditorArea";
import Preview from "./components/Preview";
import { saveForm, loadForm } from "./api";
import DragFromOutsideLayout from "./components/TestArea";

const App = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [layout, setLayout] = useState([]);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const onLayoutChange = (layout) => {

    setLayout(layout);
  };

  // const handleSave = async () => {
  //   console.log(JSON.stringify(layout))
  //   const result = await saveForm(layout);
  //   alert(`Form saved with ID: ${result.id}`);
  // };
  const handleSave = () => {
    // Convert layout to JSON and save to localStorage
    localStorage.setItem('savedLayout', JSON.stringify(layout));
    alert('Form saved to localStorage');
  };


  // const handleLoad = async (id) => {
  //   const loadedLayout = await loadForm(id);
  //   setLayout(loadedLayout);
  // };

  const handleLoad = () => {
    // Load layout from localStorage
    const savedLayout = localStorage.getItem('savedLayout');
    if (savedLayout) {
      setLayout(JSON.parse(savedLayout));
    } else {
      alert('No saved layout found');
    }
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
        // <EditorArea onLayoutChange={onLayoutChange} />
        <EditorArea layoutProp={layout} onLayoutChange={onLayoutChange} />
      )}
    </div>
  );
};

export default App;
