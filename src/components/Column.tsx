import { useDrop } from "react-dnd";
import { ItemTypes } from "../pages/Dashboard";
import { Card } from "./Card";

export const Column: React.FC<{
  title: string;
  cards: string[];
  onAddCard: () => void;
  onDrop: (card: string) => void;
}> = ({ title, cards, onAddCard, onDrop }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: { card: string; column: string }) => {
      onDrop(item.card);
    },
  });

  return (
    <div
      ref={drop}
      className="column bg-gray-200 rounded-lg shadow-lg p-4 flex-1 min-w-[250px]"
    >
      <h2 className="font-bold text-lg text-center mb-4">{title}</h2>
      <div className="tasks space-y-2">
        {cards.map((card) => (
          <Card key={card} card={card} column={title} onDrop={onDrop} />
        ))}

        {/* Add Card Button */}
        <button
          onClick={onAddCard}
          className="w-full mt-2 py-2 text-blue-500 border border-dashed border-blue-500 rounded-lg"
        >
          + Add Card
        </button>
      </div>
    </div>
  );
};
