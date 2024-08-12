import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Textbox from "./TextBox";
import Textarea from "./TextArea";
import Checkbox from "./CheckBox";
import Phone from "./Phone";
import Email from "./Email";
import SideBar from "./SideBar/SideBar";
import EditTextBox from "./DetailsTab/EditTextBox";

const EditorArea = ({ layoutProp, onLayoutChange }) => {
  const [layout, setLayout] = useState([]);
  const [sideLayout, setSideLayout] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setLayout(layoutProp);
  }, [layoutProp]);

  const addComponent = (type, x, y) => {
    const newCounter = layout.length + 1;
    let height = 2;
    if (type === "Textarea") {
      height = 4;
    } else if (type === "Checkbox") {
      height = 1;
    } else {
      height = 2.5;
    }
    const newLayout = [
      ...layout,
      {
        i: `${newCounter}._${type}`,
        x,
        y,
        w: 4,
        h: height,
        minH: height,
        maxH: height,
        content: type,
        type,
        label: `Label ${newCounter}`,
        placeholder: `Placeholder ${newCounter}`,
        required: false,  // Default value for required
      },
    ];
    setLayout(newLayout);
    onLayoutChange(newLayout);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("text/plain");
    const { offsetX, offsetY } = event.nativeEvent;
    const layoutRect = event.target.getBoundingClientRect();
    const x = Math.floor((offsetX - layoutRect.left) / 100); // Adjust for grid column width
    const y = Math.floor((offsetY - layoutRect.top) / 30); // Adjust for grid row height
    addComponent(type, x, y);
  };

  const handleDelete = (itemId) => {
    const updatedLayout = layout.filter(item => item.i !== itemId);
    setLayout(updatedLayout);
    onLayoutChange(updatedLayout);
  };

  const handleUpdate = (item) => {
    setSelectedItem(item);
    setSideLayout(<EditTextBox item={item} onSave={handleSaveUpdate} />);
  };

  const handleSaveUpdate = (updatedItem) => {
    const updatedLayout = layout.map(item => 
      item.i === updatedItem.i ? updatedItem : item
    );
    console.log(updatedLayout)
    setLayout(updatedLayout);
    onLayoutChange(updatedLayout);

    setSelectedItem(null); // Close the edit panel
  };

  const renderComponent = (type, item) => {
    const { i, label, placeholder, required } = item;
    switch (type) {
      case "Textbox":
        return <Textbox id={i} label={label} placeholder={placeholder} required={required} />;
      case "Textarea":
        return <Textarea name={item.name} />;
      case "Checkbox":
        return <Checkbox name={item.name} />;
      case "Phone":
        return <Phone name={item.name} />;
      case "Email":
        return <Email name={item.name} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex border-2 border-solid">
      <div className="w-1/4 bg-gray-200 p-4">
        <SideBar />
      </div>
      <div className="border-2 border-solid p-4 w-[57%] h-screen overflow-y-scroll" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <GridLayout
          className="layout border-2 bg-slate-300 border-blue-600"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
          onLayoutChange={onLayoutChange}
        >
          {layout.map((item) => {
            const typeVal = item.i.split("_")[1];
            return (
              <div key={item.i} className="draggable-item border-2 border-red-500 relative mb-2">
                <button
                  onClick={() => handleUpdate(item)}
                  className="absolute top-0 right-10 mt-1 mr-1 text-blue-500 p-1 rounded-full hover:text-blue-700"
                  title="Update"
                >
                  <i className="fas fa-edit"></i>
                </button>

                <button
                  onClick={() => handleDelete(item.i)}
                  className="absolute top-0 right-0 mt-1 mr-2 text-red-500 p-1 rounded-full hover:text-red-700"
                  title="Delete"
                >
                  <i className="fas fa-times"></i>
                </button>

                {renderComponent(typeVal, item)}
              </div>
            );
          })}
        </GridLayout>
      </div>
      <div className="w-1/4 bg-gray-100 p-4">
        {sideLayout}
      </div>
    </div>
  );
};

export default EditorArea;
