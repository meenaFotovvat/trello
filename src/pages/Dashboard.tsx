import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  CARD: "card",
};

// Define the type for columns
type ColumnType = {
  [key: string]: string[];
};

// Card component: Represents a draggable card
const Card: React.FC<{
  card: string;
  column: string;
  onDrop: (card: string, column: string) => void;
}> = ({ card, column, onDrop }) => {
  const [, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { card, column },
  });

  return (
    <div
      ref={drag}
      className="task bg-white p-3 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
    >
      {card}
    </div>
  );
};

// Column component: Represents a droppable column
const Column: React.FC<{
  title: string;
  cards: string[];
  onDrop: (card: string) => void;
}> = ({ title, cards, onDrop }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: { card: string; column: string }) => {
      onDrop(item.card);
    },
  });

  return (
    <div
      ref={drop}
      className="column bg-gray-200 rounded-lg shadow-lg p-4 w-60"
    >
      <h2 className="font-bold text-lg text-center mb-4">{title}</h2>
      <div className="tasks space-y-2">
        {cards.map((card) => (
          <Card key={card} card={card} column={title} onDrop={onDrop} />
        ))}
      </div>
    </div>
  );
};

// Dashboard component
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
      setColumns((prevColumns) => ({
        ...prevColumns,
        "To Do": [...prevColumns["To Do"], taskName], // Append the new task to "To Do"
      }));
    }
  };

  // Remove a task from any column
  const handleRemoveTask = () => {
    const taskToRemove = prompt("Enter the task name to remove:");
    if (!taskToRemove) return; // Return if no task name is provided

    let taskFound = false;

    setColumns((prevColumns) => {
      // Create a new copy of the columns
      const updatedColumns = { ...prevColumns };

      // Iterate over each column to check and remove the task
      Object.keys(updatedColumns).forEach((column) => {
        const tasksInColumn = updatedColumns[column];

        // Check if the task exists in the current column
        if (tasksInColumn.includes(taskToRemove)) {
          // Remove the task and update the column
          updatedColumns[column] = tasksInColumn.filter(
            (task) => task !== taskToRemove
          );
          taskFound = true; // Set taskFound to true when task is found
        }
      });

      return updatedColumns; // Return the updated column state
    });

    // Move the alert outside of the setColumns function to ensure it runs after the state update
    setTimeout(() => {
      if (!taskFound) {
        alert("Task not found in any column.");
      }
    }, 0); // Ensure the alert is fired after the state is updated
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
      <div className="dashboard p-4 flex gap-4 justify-center">
        {/* Add and Remove Task Buttons */}
        <div className="task-controls mb-4">
          <button
            onClick={handleAddTask}
            className="bg-green-500 text-white py-2 px-4 rounded mb-4"
          >
            Add
          </button>

          {/* Example to remove "Task 1" from any column */}
          <button
            onClick={() => handleRemoveTask()}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Remove
          </button>
        </div>

        {/* Responsive grid for columns */}
        <div className="columns-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-screen-lg">
          {Object.keys(columns).map((col) => (
            <Column
              key={col}
              title={col}
              cards={columns[col]}
              onDrop={(card) => handleDrop(col, card)}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
