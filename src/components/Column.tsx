import React from "react";
import Card from "./Card";
import { useDrop } from "react-dnd";

// Define the props interface for the Column component
interface ColumnProps {
  title: string;
  cards: string[]; // Array of card titles within this column
  onDrop: (card: string) => void; // Callback function to handle dropping a card
}

const Column: React.FC<ColumnProps> = ({ title, cards, onDrop }) => {
  // React DnD's useDrop hook for handling dropping of cards
  const [, drop] = useDrop({
    accept: "CARD", // Only accept drag items of type 'CARD'
    drop: (item: { card: string }) => onDrop(item.card), // Call onDrop when a card is dropped
  });

  return (
    // Container for the column with drag-and-drop capabilities
    <div ref={drop} className="w-64 p-4 bg-gray-200 rounded-md shadow-md">
      <h2 className="font-bold mb-4">{title}</h2>

      {/* Render each card inside the column */}
      {cards.map((card, idx) => (
        <Card key={idx} card={card} />
      ))}
    </div>
  );
};

export default Column;
