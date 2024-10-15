import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ColumnType } from "../types/types";
import { Column } from "../components/Column";

export const ItemTypes = {
  CARD: "card",
};

const Dashboard: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType>({
    "To Do": ["Task 1", "Task 2"],
    "In Progress": ["Task 3"],
    Done: ["Task 4"],
  });

  // Handle adding a new task to a specific column
  const handleAddTask = (columnName: string) => {
    const taskName = prompt(`Enter task name to add to ${columnName}:`);
    if (taskName) {
      setColumns((prevColumns) => ({
        ...prevColumns,
        [columnName]: [...prevColumns[columnName], taskName],
      }));
    }
  };

  // Handle removing a task from any column (same as before)
  const handleRemoveTask = () => {
    const taskToRemove = prompt("Enter the task name to remove:");
    if (!taskToRemove) return;

    let taskFound = false;

    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };

      Object.keys(updatedColumns).forEach((column) => {
        const tasksInColumn = updatedColumns[column];
        if (tasksInColumn.includes(taskToRemove)) {
          updatedColumns[column] = tasksInColumn.filter(
            (task) => task !== taskToRemove
          );
          taskFound = true;
        }
      });

      return updatedColumns;
    });

    setTimeout(() => {
      if (!taskFound) {
        alert("Task not found in any column.");
      }
    }, 0);
  };

  // Handle adding a new column
  const handleAddColumn = () => {
    const columnName = prompt("Enter the new list name:");
    if (columnName !== null && columnName?.length && !columns[columnName]) {
      setColumns((prevColumns) => ({
        ...prevColumns,
        [columnName]: [],
      }));
    } else if (columnName !== null && columns[columnName]) {
      alert("This column already exists.");
    }
  };

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
      <div className="dashboard p-4 flex flex-col items-center">
        {/* Task control buttons */}
        <div className="task-controls mb-4 space-x-4">
          <button
            onClick={handleRemoveTask}
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
          >
            Remove Task
          </button>
        </div>

        {/* Responsive grid for columns */}
        <div className="columns-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-screen-lg">
          {Object.keys(columns).map((col) => (
            <Column
              key={col}
              title={col}
              cards={columns[col]}
              onAddCard={() => handleAddTask(col)} // Add Card Button handler
              onDrop={(card) => handleDrop(col, card)} // Drag and drop handler
            />
          ))}

          {/* Add another list (column) */}
          <div className="column bg-gray-300 rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer">
            <button
              onClick={handleAddColumn}
              className="text-blue-500 font-bold"
            >
              + Add another list
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
