import React from "react";
import { Droppable} from "react-beautiful-dnd";
import Task from "../Task/Task";

function Column({ columnData, columnIndex, state, setState }) {
  return (
    <Droppable key={columnIndex} droppableId={`${columnIndex}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`${
            snapshot.isDraggingOver ? "bg-sky-200" : "bg-slate-200"
          }  min-w-[30%] mx-2 h-[90%] overflow-x-auto`}
          {...provided.droppableProps}
        >
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
