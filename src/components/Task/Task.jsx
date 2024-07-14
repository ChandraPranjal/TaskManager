import React from "react";
import { Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: 2 * 2,
    margin: `0 0 2px 0`,
    background: isDragging ? "lightgreen" : "#e3e1e1",
    ...draggableStyle,
  });

function Task({ item, rowIndex, state, setState , columnIndex }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index ={rowIndex}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {item.content}
            <button
              type="button"
              onClick={() => {
                const newState = [...state];
                newState[columnIndex].tasksData.splice(rowIndex, 1);
                setState(newState);
              }}
            >
              delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
