import React, { useState } from "react";
import Column from "../components/Column";

const Dashboard: React.FC = () => {
  type ColumnType = {
    [key: string]: string[]; // This allows dynamic keys with string[]
  };
  // State to track columns and their respective cards
  const [columns, setColumns] = useState<ColumnType>({
    "To Do": ["Task 1", "Task 2"], // Cards in "To Do" column
    "In Progress": ["Task 3"], // Cards in "In Progress" column
    Done: ["Task 4"], // Cards in "Done" column
  });

  // Function to handle moving a card from one column to another
  const handleDrop = (column: string, card: string) => {
    const newColumns = { ...columns };

    // Remove the card from its original column
    Object.keys(newColumns).forEach((col) => {
      newColumns[col] = newColumns[col].filter((c: string) => c !== card);
    });

    // Add the card to the new column
    newColumns[column].push(card);

    // Update the state with the new columns
    setColumns(newColumns);
  };

  return (
    // Render each column and pass necessary props (cards and drop handler)
    <div className="flex space-x-4 p-8">
      {Object.keys(columns).map((col) => (
        <Column
          key={col}
          title={col}
          cards={columns[col]}
          onDrop={(card) => handleDrop(col, card)} // Handle dropping a card in the column
        />
      ))}
    </div>
  );
};

export default Dashboard;
