import React from "react";
import Board from "./components/Board/Board.jsx";

const data = [
  {
    columnName: "Col1",
    tasksData: [
      { id: "id0", content: "item 0" },
      { id: "id1", content: "item 1" },
      { id: "id2", content: "item 2" },
    ],
  },
  {
    columnName: "Col2",
    tasksData: [
      { id: "id3", content: "item 3" },
      { id: "id4", content: "item 4" },
      { id: "id5", content: "item 5" },
    ],
  },
];

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-[5vh] bg-indigo-600 flex items-center justify-center text-white">
        <h1 className="text-lg font-semibold">Task Management App</h1>
      </header>
      <main className="flex-grow h-[90vh] bg-gray-100 items-center justify-center">
        <Board data={data} />
      </main>
      <footer className="h-[5vh] bg-gray-800 flex items-center justify-center text-white">
        <p>&copy; 2024 Task Management App</p>
      </footer>
    </div>
  );
}

export default App;
