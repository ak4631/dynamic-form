import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Textbox from "./TextBox";
import Textarea from "./TextArea";
import Checkbox from "./CheckBox";
import Phone from "./Phone";
import Email from "./Email";

const EditorArea = () => {
  const [layout, setLayout] = useState([]);
  const [counter, setCounter] = useState(0);

  const onLayoutChange = (layout) => {
    setLayout(layout);
  };

  const addComponent = (type) => {
    const newCounter = counter + 1;
    const newLayout = [
      ...layout,
      {
        i: `${newCounter}._${type}`,
        x: 0,
        y: Infinity,
        w: 4,
        h: 2,
        content: type,
        type,
      },
    ];
    console.log(newLayout);
    setLayout(newLayout);
    setCounter(newCounter);
    console.log(setLayout);
  };

  const renderComponent = (type, name) => {
    switch (type) {
      case "Textbox":
        return <Textbox name={name} />;
      case "Textarea":
        return <Textarea name={name} />;
      case "Checkbox":
        return <Checkbox name={name} />;
      case "Phone":
        return <Phone name={name} />;
      case "Email":
        return <Email name={name} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <button
        onClick={() => addComponent("Textbox")}
        className="bg-neutral-500 border-2 p-2"
      >
        Add Textbox
      </button>
      <button
        onClick={() => addComponent("Textarea")}
        className="bg-neutral-500 border-2 p-2"
      >
        Add Textarea
      </button>
      <button
        onClick={() => addComponent("Checkbox")}
        className="bg-neutral-500 border-2 p-2"
      >
        Add Checkbox
      </button>
      <button
        onClick={() => addComponent("Phone")}
        className="bg-neutral-500 border-2 p-2"
      >
        Add Phone
      </button>
      <button
        onClick={() => addComponent("Email")}
        className="bg-neutral-500 border-2 p-2"
      >
        Add Email
      </button>
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
            <div key={item.i} className="draggable-item">
              {renderComponent(typeVal, `Field ${item.i.split("_")[0]}`)}
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default EditorArea;
