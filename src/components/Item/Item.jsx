import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: 2 * 2,
    margin: `0 0 2px 0`,
    background: isDragging ? "lightgreen" : "#e3e1e1",
    ...draggableStyle,
  });

function Item({ item, index, state, setState , ind }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          //    className={`p-4 select-none mb-${grid} ${snapshot.isDragging ? 'bg-lightgreen' : 'bg-gray-500'} border-gray-300`}
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
                newState[ind].tasksData.splice(index, 1);
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

export default Item;
