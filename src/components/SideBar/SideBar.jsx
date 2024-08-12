import React from 'react'

function SideBar() {
    const handleDragStart = (event, type) => {
        event.dataTransfer.setData("text/plain", type);
      };
  return (
    <div className='flex flex-col gap-8'>
    <button
        onDragStart={(e) => handleDragStart(e, "Textbox")}
        draggable
        className="bg-neutral-500 border-2 p-2"
      >
        Add Textbox
      </button>
      <button
        onDragStart={(e) => handleDragStart(e, "Textarea")}
        draggable
        className="bg-neutral-500 border-2 p-2"
      >
        Add Textarea
      </button>
      <button
        onDragStart={(e) => handleDragStart(e, "Checkbox")}
        draggable
        className="bg-neutral-500 border-2 p-2"
      >
        Add Checkbox
      </button>
      <button
        onDragStart={(e) => handleDragStart(e, "Phone")}
        draggable
        className="bg-neutral-500 border-2 p-2"
      >
        Add Phone
      </button>
      <button
        onDragStart={(e) => handleDragStart(e, "Email")}
        draggable
        className="bg-neutral-500 border-2 p-2"
      >
        Add Email
      </button>
      </div>
  )
}

export default SideBar