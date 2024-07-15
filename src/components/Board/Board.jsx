import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../Column/Column";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddTaskIcon from "@mui/icons-material/AddTask";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TaskSearch from "../Search/Search";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default function Board({ data }) {
  const [state, setState] = useState(data);
  const [searchToggle, setSearchToggle] = useState(false);

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(
        state[sInd].tasksData,
        source.index,
        destination.index
      );
      const newState = [...state];
      newState[sInd].tasksData = items;
      setState(newState);
    } else {
      const result = move(
        state[sInd].tasksData,
        state[dInd].tasksData,
        source,
        destination
      );
      const newState = [...state];
      newState[sInd].tasksData = result[sInd];
      newState[dInd].tasksData = result[dInd];
      setState(newState);
    }
  }

  return (
    <div className="h-full w-full bg-gray-100 flex justify-between">
      <TaskSearch data={data} searchToggle={searchToggle} />
      {!searchToggle && (
        <div className="flex h-full w-[95vw] bg-white shadow-md items-center overflow-x-auto mx-5">
          <DragDropContext onDragEnd={onDragEnd}>
            {state.map((columnData, columnIndex) => (
              <Column
                key={columnIndex}
                columnData={columnData}
                columnIndex={columnIndex}
                state={state}
                setState={setState}
              />
            ))}
          </DragDropContext>
        </div>
      )}
      <div className="bg-blue-500  flex flex-col items-center justify-center">
        <IconButton
          aria-label="Add Column"
          title="Add Column"
          onClick={() => {
            setState([
              ...state,
              { columnName: new Date().getTime().toString(), tasksData: [] },
            ]);
          }}
        >
          <PlaylistAddIcon
            className="text-white"
            style={{ fontSize: "1rem" }}
          />
        </IconButton>
        <IconButton
          aria-label="Add Task"
          title="Add Task"
          onClick={() => {
            const newState = [...state];
            newState[0].tasksData.push({
              id: `item-${new Date().getTime()}`,
              content: `item ${new Date().getTime()}`,
            });
            setState(newState);
          }}
        >
          <AddTaskIcon className="text-white" style={{ fontSize: "1rem" }} />
        </IconButton>
        <IconButton
          aria-label="Search Task"
          title="Search Task"
          onClick={() => {
            setSearchToggle((prev) => !prev);
          }}
        >
          <SearchIcon className="text-white" style={{ fontSize: "1rem" }} />
        </IconButton>
      </div>
    </div>
  );
}
