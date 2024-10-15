import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define the type for columns
type ColumnType = {
  [key: string]: string[];
};

const Dashboard: React.FC = () => {
  // Define the initial columns
  const [columns, setColumns] = useState<ColumnType>({
    "To Do": ["Task 1", "Task 2"],
    "In Progress": ["Task 3"],
    Done: ["Task 4"],
  });

  // Add a new task to the "To Do" column
  const handleAddTask = () => {
    const taskName = prompt("Enter task name:");
    if (taskName) {
      // Update the state by adding the new task to the "To Do" column
      setColumns((prevColumns) => ({
        ...prevColumns,
        "To Do": [...prevColumns["To Do"], taskName], // Append the new task to "To Do"
      }));
    }
  };

  // Remove a task from the "To Do" column
  const handleRemoveTask = (task: string) => {
    const columnToRemoveFrom = prompt(
      "Enter the column name (To Do, In Progress, Done):"
    );
    if (columnToRemoveFrom && columns[columnToRemoveFrom]) {
      // Update the state by removing the specified task from the chosen column
      setColumns((prevColumns) => ({
        ...prevColumns,
        [columnToRemoveFrom]: prevColumns[columnToRemoveFrom].filter(
          (t) => t !== task
        ),
      }));
    } else {
      alert("Invalid column name.");
    }
  };

  // Handle dropping a card into a new column
  const handleDrop = (newColumn: string, card: string) => {
    const newColumns = { ...columns };

    // Remove the card from its original column
    Object.keys(newColumns).forEach((col) => {
      newColumns[col] = newColumns[col].filter((c: string) => c !== card);
    });

    // Add the card to the new column
    newColumns[newColumn].push(card);

    // Update the state with the modified columns
    setColumns(newColumns);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dashboard">
        {/* Add and Remove Task Buttons */}
        <div className="task-controls">
          <button
            onClick={handleAddTask}
            className="bg-green-500 text-white py-2 px-4 rounded mb-4"
          >
            Add Task
          </button>

          {/* Example to remove "Task 1" from any column */}
          <button
            onClick={() => handleRemoveTask("Task 1")}
            className="bg-red-500 text-white py-2 px-4 rounded mb-4"
          >
            Remove Task 1
          </button>
        </div>

        {/* Render columns */}
        {Object.keys(columns).map((col) => (
          <div key={col} className="column">
            <h2>{col}</h2>
            <div className="tasks">
              {columns[col].map((card) => (
                <div key={card} className="task">
                  {card}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DndProvider>
  );
};

export default Dashboard;
