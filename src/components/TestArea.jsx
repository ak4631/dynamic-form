import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DragFromOutsideLayout = (props) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [compactType, setCompactType] = useState("vertical");
  const [mounted, setMounted] = useState(false);
  const [layouts, setLayouts] = useState({ lg: generateLayout() });

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateDOM = () => {
    return _.map(layouts.lg, (l, i) => (
      <div key={i} className={l.static ? "static" : ""}>
        {l.static ? (
          <span
            className="text"
            title="This item is static and cannot be removed or resized."
          >
            Static - {i}
          </span>
        ) : (
          <span className="text">{i}</span>
        )}
      </div>
    ));
  };

  const onBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint);
  };

  const onCompactTypeChange = () => {
    setCompactType((prevCompactType) =>
      prevCompactType === "horizontal"
        ? "vertical"
        : prevCompactType === "vertical"
        ? null
        : "horizontal"
    );
  };

  const onLayoutChange = (layout, layouts) => {
    props.onLayoutChange(layout, layouts);
  };

  const onNewLayout = () => {
    setLayouts({ lg: generateLayout() });
  };

  const onDrop = (layout, layoutItem, _event) => {
    alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`);
  };

  return (
    <div>
      <div>
        Current Breakpoint: {currentBreakpoint} (
        {props.cols[currentBreakpoint]} columns)
      </div>
      <div>
        Compaction type: {_.capitalize(compactType) || "No Compaction"}
      </div>
      <button onClick={onNewLayout}>Generate New Layout</button>
      <button onClick={onCompactTypeChange}>Change Compaction Type</button>
      <div
        className="droppable-element"
        draggable={true}
        unselectable="on"
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
      >
        Droppable Element (Drag me!)
      </div>
      <ResponsiveReactGridLayout
        {...props}
        layouts={layouts}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        onDrop={onDrop}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        isDroppable={true}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </div>
  );
};

function generateLayout() {
  return _.map(_.range(0, 25), (item, i) => {
    const y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}

// if (process.env.STATIC_EXAMPLES === true) {
//   import("../test-hook.jsx").then(fn => fn.default(DragFromOutsideLayout));
// }

export default DragFromOutsideLayout;
