import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function Column({ columnData, columnIndex, state, setState }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newColumnName, setNewColumnName] = useState(columnData.columnName);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setNewColumnName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (newColumnName !== columnData.columnName) {
      const updatedColumns = [...state];
      updatedColumns[columnIndex].columnName = newColumnName;
      setState(updatedColumns);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <Droppable key={columnIndex} droppableId={`${columnIndex}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`${
            snapshot.isDraggingOver
              ? "bg-sky-200"
              : "bg-slate-200 overflow-y-auto"
          } md:min-w-[30%] min-w-[80%] mx-2 h-[90%]`}
          {...provided.droppableProps}
        >
          <div className="flex mx-20 justify-between">
            {isEditing ? (
              <input
                type="text"
                value={newColumnName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                className="md:text-2xl text-center bg-transparent border-b-2 focus:outline-none"
              />
            ) : (
              <h2
                className="md:text-2xl text-center cursor-pointer"
                onDoubleClick={handleDoubleClick}
              >
                {columnData.columnName}
              </h2>
            )}
            <IconButton
              aria-label="Delete Task"
              onClick={() => {
                const updatedColumns=  state.filter((_, index) => index !== columnIndex);
                setState(updatedColumns);
              }}
            >
              <DeleteIcon style={{ fontSize: "1.2rem" }} />
            </IconButton>
          </div>
          {columnData.tasksData.map((item, index) => (
            <Task
              item={item}
              rowIndex={index}
              state={state}
              setState={setState}
              columnIndex={columnIndex}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Column;
