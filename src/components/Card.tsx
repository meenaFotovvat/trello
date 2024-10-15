import React from "react";
import { useDrag } from "react-dnd";

// Define the props interface for the Card component
interface CardProps {
  card: string; // Title of the card
}

const Card: React.FC<CardProps> = ({ card }) => {
  // React DnD's useDrag hook for enabling drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: "CARD", // Drag type for this component
    item: { card }, // Data to pass when dragging (in this case, the card title)
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Track drag state
    }),
  });

  return (
    // Render the card with drag-and-drop functionality
    // Apply reduced opacity when the card is being dragged
    <div
      ref={drag}
      className={`p-4 bg-white rounded-md shadow-md mb-2 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {card}
    </div>
  );
};

export default Card;
