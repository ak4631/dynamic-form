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
import Draggable from "react-draggable";
import { Rnd } from "react-rnd";



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

  // const addComponent = useCallback((type, x, y) => {
  //   const newCounter = layout.length + 1;
  //   let height = type === "Textarea" ? 4 : type === "Checkbox" ? 1 : 2.5;

  //   const newLayout = [
  //     ...layout,
  //     {
  //       i: `${newCounter}._${type}`,
  //       x,
  //       y,
  //       w: 4,
  //       h: height,
  //       minH: height,
  //       maxH: height,
  //       content: type,
  //       type,
  //       label: `Label ${newCounter}`,
  //       placeholder: `Placeholder ${newCounter}`,
  //       required: false,
  //     },
  //   ];
    
  //   if (!isEqual(newLayout, layout)) {
  //     setLayout(newLayout);
  //     onLayoutChange(newLayout);
  //   }
  // }, [layout, onLayoutChange]);

  const addComponent = useCallback((type, x, y) => {
    const newCounter = layout.length + 1;
    let height = type === "Textarea" ? "100px" : type === "Checkbox" ? "50px" : "30px";
  
    let newItem = {
      i: `${newCounter}._${type}`,
      x,
      y,
      w: "500px",
      h: height,
      minH: height,
      maxH: height,
      content: type,
      type,
      label: `Label ${newCounter}`,
      placeholder: `Placeholder ${newCounter}`,
      required: false,
    };
  
    // Find an available position if the new item overlaps with existing items
    const { x: newX, y: newY } = findAvailablePosition(newItem, layout);
    newItem = { ...newItem, x: newX, y: newY };
  
    const newLayout = [
      ...layout,
      newItem,
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
    // console.log("native",event.nativeEvent);
    const layoutRect = event.target.getBoundingClientRect();
    const x = Math.floor((offsetX - layoutRect.left) / 100);
    const y = Math.floor((offsetY - layoutRect.top) / 30);
    // const x = offsetX + layoutRect.left;
    // const y = offsetY + layoutRect.top;
    console.log(layoutRect,x,y);
    addComponent(type, x, y);
  }, [addComponent]);


  const checkCollision = (item1, item2) => {
    const isHorizontalOverlap = item1.x < item2.x + item2.w && item1.x + item1.w > item2.x;
    const isVerticalOverlap = item1.y < item2.y + item2.h && item1.y + item1.h > item2.y;
    return isHorizontalOverlap && isVerticalOverlap;
  };

  const findAvailablePosition = (newItem, existingItems) => {
    let newX = newItem.x;
    let newY = newItem.y;
    const offset = 10; // adjust as needed
    console.log(existingItems);
    while (existingItems.some(item => checkCollision(newItem, item))) {
      newX += offset;
      if (newX + newItem.w > 1000) { // Assuming 1000 is the maximum width of the container
        newX = 0;
        newY += offset;
        if (newY + newItem.h > 1000) { // Assuming 1000 is the maximum height of the container
          newY = 0;
        }
      }
      newItem = { ...newItem, x: newX, y: newY };
    }
    
    return { x: newX, y: newY };
  };
  

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


  const haveIntersection = (rect1, rect2) => {
    return !(
      rect1.x > rect2.x + rect2.width ||
      rect1.x + rect1.width < rect2.x ||
      rect1.y > rect2.y + rect2.height ||
      rect1.y + rect1.height < rect2.y
    );
  };

  const setPositions = (id, e, direction) => {
    const newPosition = { x: parseInt(direction.x), y: parseInt(direction.y) };
    
    // Get the size of the current item being moved
    const currentItem = layout.find(item => item.i === id);
    const newSize = { width: currentItem.w, height: currentItem.h };
  
    // Check for collisions with other items
    const hasCollision = layout.some(item => {
      if (item.i === id) return false; // Skip itself
      const otherRect = { x: item.x, y: item.y, width: item.w, height: item.h };
      const newRect = { x: newPosition.x, y: newPosition.y, width: newSize.width, height: newSize.height };
      return haveIntersection(newRect, otherRect);
    });
  
    if (!hasCollision) {
      // Update layout only if no collision
      console.log(hasCollision);
      setLayout(prevLayout =>
        prevLayout.map(item =>
          item.i === id
            ? { ...item, x: newPosition.x, y: newPosition.y } // Update the position of the item
            : item // Leave other items unchanged
        )
      );
    }
  };
  
  const setSize = (id, e, direction, ref, delta, position) => {
    const newSize = { width: parseInt(ref.style.width), height: parseInt(ref.style.height) };
    const currentItem = layout.find(item => item.i === id);
    const newPosition = { x: position.x, y: position.y };
  
    // Check for collisions with other items
    const hasCollision = layout.some(item => {
      if (item.i === id) return false; // Skip itself
      const otherRect = { x: item.x, y: item.y, width: item.w, height: item.h };
      const newRect = { x: newPosition.x, y: newPosition.y, width: newSize.width, height: newSize.height };
      return haveIntersection(newRect, otherRect);
    });
  
    if (!hasCollision) {
      // Update layout only if no collision
      setLayout(prevLayout =>
        prevLayout.map(item =>
          item.i === id
            ? { ...item, w: newSize.width, h: newSize.height, x: newPosition.x, y: newPosition.y } // Update size and position
            : item // Leave other items unchanged
        )
      );
    }
  };


//   const setPositions = (id, e, direction) => {
//     const { position, size } = handleDragOrResize(id, { x: direction.x, y: direction.y }, size);

//     setLayout(prevLayout =>
//       prevLayout.map(item =>
//         item.i === id
//           ? { ...item, x: parseInt(direction.x), y: parseInt(direction.y) } // Update the position of the item
//           : item // Leave other items unchanged
//       )
//     );
//   };

// const setSize = (id,e,direction,ref,delta,position) =>{
//   setLayout(prevLayout =>
//     prevLayout.map(item =>
//       item.i === id
//         ? { ...item, w: parseInt(ref.style.width), h: parseInt(ref.style.height),...position } // Update the position of the item
//         : item // Leave other items unchanged
//     )
//   );  
//   // setRnd(
//     //     prevRnd=>({...prevRnd,width:parseInt(ref.style.width,10),height:parseInt(ref.style.height,10),...position})
//     // )
// }

  const layoutItems = useMemo(() => (
    layout.map((item) => {
      const typeVal = item.i.split("_")[1];
      return(
        <Rnd
        style={{backgroundColor:"black",margin:"8px"}}
        size={{width:item.w,height:item.h}}
        position={{x:item.x,y:item.y}}
        onDragStop={(e,direction)=>setPositions(item.i,e,direction)}
        onResizeStop={(e,direction,ref,delta,position)=>setSize(item.i,e,direction,ref,delta,position)}
        minWidth={"100px"}
        minHeight={"100px"}
        bounds={".parent-class"}
        key={item.i}
    >
        <div key={item.i} className="draggable-item relative mb-2">
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
        </Rnd>
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
        className="border-2 border-solid p-4 w-[57%] m-1 h-screen overflow-y-scroll parent-class"
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