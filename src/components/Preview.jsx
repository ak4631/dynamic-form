import React from "react";
import Textbox from "./TextBox";
import Textarea from "./TextArea";
import Checkbox from "./CheckBox";
import Phone from "./Phone";
import Email from "./Email";

const Preview = ({ layout }) => {
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
    <div className="preview">
      {layout.map((item) => (
        <div key={item.i} style={{ width: item.w * 100, height: item.h * 30 }}>
          {renderComponent(item.type, `Field ${item.i}`)}
        </div>
      ))}
    </div>
  );
};

export default Preview;
