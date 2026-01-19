import { Heart, X } from "lucide-react";

interface MatchButtonPros {
  onLike: () => void;
  onPass: () => void;
}

const MatchButton = ({ onLike, onPass }: MatchButtonPros) => {
  return (
    <div className="flex items-center justify-center gap-8">
      <button
        onClick={onPass}
        className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-500"
        aria-label="Pass"
      >
        <X className="w-8 h-8 text-red-500" />
      </button>
      <button
        onClick={onLike}
        className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-500"
        aria-label="Like"
      >
        <Heart className="w-8 h-8 text-green-500" />
      </button>
    </div>
  );
};

export default MatchButton;
