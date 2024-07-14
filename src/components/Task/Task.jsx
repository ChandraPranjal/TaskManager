import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@material-ui/core/Chip";
import SaveIcon from "@mui/icons-material/Save";

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "lightgreen" : "#e3e1e1",
  ...draggableStyle,
});

function Task({ item, rowIndex, state, setState, columnIndex }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userInput, setUserInput] = useState({
    effortEstimation: item.content.effortEstimation,
    priority: item.content.priority,
    assignee: item.content.assignee,
    attachments: item.content.attachments,
    dependsOn: item.content.depends_on,
    blocks: item.content.blocks,
  });

  function toggleEdit() {
    setIsEditing((prev) => !prev);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    const updatedTask = {
      ...item,
      content: {
        ...item.content,
        effortEstimation: userInput.effortEstimation,
        priority: userInput.priority,
        assignee: userInput.assignee,
        attachments: userInput.attachments,
        depends_on: userInput.dependsOn,
        blocks: userInput.blocks,
      },
    };

    const newState = [...state];
    newState[columnIndex].tasksData[rowIndex] = updatedTask;
    setState(newState);
    setIsEditing(false);
  }

  return (
    <Draggable key={item.id} draggableId={item.id} index={rowIndex}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          className="m-2 p-2 h-[50%]"
        >
          <article className="p-4 mb-4 h-full bg-white rounded shadow-sm overflow-y-auto">
            <header className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{item.content.title}</h2>
              <div className="flex items-center">
                <Chip label={item.content.type} color="primary" size="small" />
                <IconButton
                  onClick={() => {
                    const newState = [...state];
                    newState[columnIndex].tasksData.splice(rowIndex, 1);
                    setState(newState);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                {isEditing ? (
                  <IconButton onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={toggleEdit}>
                    <EditIcon />
                  </IconButton>
                )}
              </div>
            </header>
            <section className="mb-2">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="effortEstimation"
                    value={userInput.effortEstimation}
                    onChange={handleChange}
                    placeholder="Effort Estimation"
                  />
                  <input
                    type="text"
                    name="priority"
                    value={userInput.priority}
                    onChange={handleChange}
                    placeholder="Priority"
                  />
                  <input
                    type="text"
                    name="assignee"
                    value={userInput.assignee}
                    onChange={handleChange}
                    placeholder="Assignee"
                  />
                  <input
                    type="text"
                    name="attachments"
                    value={userInput.attachments}
                    onChange={handleChange}
                    placeholder="Attachments"
                  />
                  <input
                    type="text"
                    name="dependsOn"
                    value={userInput.dependsOn}
                    onChange={handleChange}
                    placeholder="Depends On"
                  />
                  <input
                    type="text"
                    name="blocks"
                    value={userInput.blocks}
                    onChange={handleChange}
                    placeholder="Blocks"
                  />
                </>
              ) : (
                <>
                  <p className="text-sm">
                    <strong>Effort Estimation:</strong>{" "}
                    {item.content.effortEstimation}
                  </p>
                  <p className="text-sm">
                    <strong>Priority:</strong> {item.content.priority}
                  </p>
                  <p className="text-sm">
                    <strong>Attachments:</strong> {item.content.attachments}
                  </p>
                  <p className="text-sm">
                    <strong>Assignee:</strong> {item.content.assignee}
                  </p>
                  <p className="text-sm">
                    <strong>Depends On:</strong> {item.content.depends_on}
                  </p>
                  <p className="text-sm">
                    <strong>Blocks:</strong> {item.content.blocks}
                  </p>
                </>
              )}
            </section>
            <footer>
              <strong>Tags:</strong>
              <div className="flex flex-wrap mt-2">
                {item.content.tags &&
                  item.content.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      color="secondary"
                      size="small"
                      className="mr-2 mb-2 text-xs"
                    />
                  ))}
              </div>
            </footer>
          </article>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
