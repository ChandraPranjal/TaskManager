import React, { useState } from 'react';


const TaskSearch = ({data}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const foundTasks = [];

    data.forEach(column => {
      column.tasksData.forEach(task => {
        const { title, type, description, assignee, tags } = task.content;

        if (
          title.toLowerCase().includes(lowerCaseQuery) ||
          type.toLowerCase().includes(lowerCaseQuery) ||
          description.toLowerCase().includes(lowerCaseQuery) ||
          assignee.toLowerCase().includes(lowerCaseQuery) ||
          tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
        ) {
          foundTasks.push(task);
        }
      });
    });

    setResults(foundTasks);
  };

  return (
    <div>
      <h1>Task Search</h1>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearch}
        className="border rounded p-2 mb-4"
      />
      <div>
        {results.length > 0 ? (
          results.map(task => (
            <div key={task.id} className="border p-2 mb-2">
              <h2>{task.content.title}</h2>
              <p>Type: {task.content.type}</p>
              <p>Description: {task.content.description}</p>
              <p>Assignee: {task.content.assignee}</p>
              <p>Tags: {task.content.tags.join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default TaskSearch;
