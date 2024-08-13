import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import { isEqual } from "lodash";

const EditorArea = ({ layoutProp, onLayoutChange }) => {
  const [layout, setLayout] = useState([]);
  const [sideLayout, setSideLayout] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setLayout(layoutProp);
  }, [layoutProp]);

  useEffect(() => {
    if (selectedItem) {
      setSideLayout(<EditTextBox item={selectedItem} onSave={handleSaveUpdate} />);
    }
  }, [selectedItem]);

  const addComponent = useCallback((type, x, y) => {
    const newCounter = layout.length + 1;
    let height = type === "Textarea" ? 4 : type === "Checkbox" ? 1 : 2.5;

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
        required: false,
      },
    ];
    if (!isEqual(newLayout, layout)) {
      setLayout(newLayout);
      onLayoutChange(newLayout);
    }
  }, [layout, onLayoutChange]);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("text/plain");
    const { offsetX, offsetY } = event.nativeEvent;
    const layoutRect = event.target.getBoundingClientRect();
    const x = Math.floor((offsetX - layoutRect.left) / 100);
    const y = Math.floor((offsetY - layoutRect.top) / 30);
    addComponent(type, x, y);
  }, [addComponent]);

  const handleDelete = useCallback((itemId) => {
    const updatedLayout = layout.filter(item => item.i !== itemId);
    setLayout(updatedLayout);
    onLayoutChange(updatedLayout);
  }, [layout, onLayoutChange]);

  const handleUpdate = useCallback((item) => {
    setSelectedItem(item);
  }, []);

    const handleSaveUpdate = (updatedItem) => {
    // Ensure this only updates the necessary state
      setLayout((prevLayout) => {
        const updatedLayout = prevLayout.map(item =>
          item.i === updatedItem.i ? updatedItem : item
        );
        onLayoutChange(updatedLayout); // Notify parent about the update
        return updatedLayout;
    });
    setSelectedItem(null); // Close the edit panel
    setSideLayout(null); // Close the edit panel
  };

  const renderComponent = useCallback((type, item) => {
    const { i, label, placeholder, required } = item;
    switch (type) {
      case "Textbox":
        return <Textbox id={i} label={label} placeholder={placeholder} required={required} />;
      case "Textarea":
        return <Textarea id={i} placeholder={placeholder} />;
      case "Checkbox":
        return <Checkbox id={i} />;
      case "Phone":
        return <Phone id={i} />;
      case "Email":
        return <Email id={i} />;
      default:
        return null;
    }
  }, []);

  const layoutItems = useMemo(() => (
    layout.map((item) => {
      const typeVal = item.i.split("_")[1];
      return (
        <div key={item.i} className="draggable-item border-2 border-red-500 relative mb-2">
          <button
            onClick={() => handleUpdate(item)}
            className="absolute top-0 right-10 mt-1 mr-1 text-blue-500 p-1 rounded-full hover:text-blue-700"
            title="Update"
          >
            <i className="fas fa-edit">Update</i>
          </button>

          <button
            onClick={() => handleDelete(item.i)}
            className="absolute top-0 right-0 mt-1 mr-2 text-red-500 p-1 rounded-full hover:text-red-700"
            title="Delete"
          >
            <i className="fas fa-times">Delete</i>
          </button>
          
          {renderComponent(typeVal, item)}
        </div>
      );
    })
  ), [layout, handleUpdate, handleDelete, renderComponent]);

  return (
    <div className="flex border-2 border-solid">
      <div className="w-1/4 bg-gray-200 p-4">
        <SideBar />
      </div>
      {/* <GridLayout
          className="layout border-2 bg-slate-300 border-blue-600"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={900}
          onLayoutChange={onLayoutChange}
        > */}
      <div
        className="border-2 border-solid p-4 w-[57%] h-screen overflow-y-scroll"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {layoutItems}
      </div>
      {/* </GridLayout> */}
      <div className="w-1/4 bg-gray-100 p-4">
        {sideLayout}
      </div>
    </div>
  );
};

export default EditorArea;
