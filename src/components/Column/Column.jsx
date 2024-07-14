import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Item from '../Item/Item';



function Column({el,ind,state,setState}) {
  return (
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
            <Item item={item} index = {index} state = {state} setState={setState} ind = {ind}/>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
  )
}

export default Column
