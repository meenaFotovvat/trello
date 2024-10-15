import { useDrag } from "react-dnd";
import { ItemTypes } from "../pages/Dashboard";

export const Card: React.FC<{
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
      className="task bg-white p-3 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
    >
      {card}
    </div>
  );
};
