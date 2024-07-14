import React from "react";
import Board from "./components/Board/Board.jsx";

const data = [
  {
    columnName: "Col1",
    tasksData: [
      {
        id: "id0",
        content: {
          title: "Fix login bug",
          type: "BUG",
          effortEstimation: "3 hours",
          priority: "P0",
          description: "Resolve the issue with user login.",
          attachments: [],
          assignee: "John Doe",
          tags: ["bug", "login"]
        }
      },
      {
        id: "id1",
        content: {
          title: "Add user profile feature",
          type: "FEATURE",
          effortEstimation: "5 days",
          priority: "P1",
          description: "Implement user profile functionality.",
          attachments: [],
          assignee: "Jane Smith",
          tags: ["feature", "user"]
        }
      },
      {
        id: "id2",
        content: {
          title: "Refactor codebase",
          type: "MAINTENANCE",
          effortEstimation: "2 weeks",
          priority: "P2",
          description: "Improve code structure and performance.",
          attachments: [],
          assignee: "Emily Johnson",
          tags: ["maintenance", "refactor"]
        }
      },
    ],
  },
  {
    columnName: "Col2",
    tasksData: [
      {
        id: "id3",
        content: {
          title: "Update documentation",
          type: "TASK",
          effortEstimation: "1 day",
          priority: "P1",
          description: "Revise and update project documentation.",
          attachments: [],
          assignee: "Michael Brown",
          tags: ["documentation", "update"]
        }
      },
      {
        id: "id4",
        content: {
          title: "Design new homepage",
          type: "FEATURE",
          effortEstimation: "1 week",
          priority: "P0",
          description: "Create a new design for the homepage.",
          attachments: [],
          assignee: "Sophia Lee",
          tags: ["design", "homepage"]
        }
      },
      {
        id: "id5",
        content: {
          title: "Setup CI/CD pipeline",
          type: "TASK",
          effortEstimation: "4 days",
          priority: "P2",
          description: "Automate the build and deployment process.",
          attachments: [],
          assignee: "David Wilson",
          tags: ["ci/cd", "automation"]
        }
      },
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
