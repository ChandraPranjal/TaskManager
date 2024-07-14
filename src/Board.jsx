import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// // fake data generator
// const getItems = (count, offset = 0) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `item-${k + offset}-${new Date().getTime()}`,
//     content: `item ${k + offset}`,
//   }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
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

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "#e3e1e1",
  ...draggableStyle,
});

const data = [
  {
    columnName: "Col1",
    tasksData: [
      {
        id: "id0",
        content: "item 0",
      },
      {
        id: "id1",
        content: "item 1",
      },
      {
        id: "id2",
        content: "item 2",
      },
    ],
  },
  {
    columnName: "Col2",
    tasksData: [
      {
        id: "id3",
        content: "item 3",
      },
      {
        id: "id4",
        content: "item 4",
      },
      {
        id: "id5",
        content: "item 5",
      },
    ],
  },
];

export default function QuoteApp() {
  const [state, setState] = useState(data);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
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
    <div>
      <button
        type="button"
        onClick={() => {
          setState([
            ...state,
            { columnName: new Date().getTime().toString(), tasksData: [] },
          ]);
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        onClick={() => {
          const newState = [...state];
          newState[0].tasksData.push({
            id: `item-${new Date().getTime()}`,
            content: `item ${new Date().getTime()}`,
          });
          setState(newState);
        }}
      >
        Add new item
      </button>

      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={`${
                    snapshot.isDraggingOver ? "bg-sky-200" : "bg-slate-200"
                  }  w-[30%] m-2`}
                  //   style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.tasksData.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
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
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
