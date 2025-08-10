import { useState } from "react";
import WordShuffleFormEdit from "./WordShuffleFormEdit";
interface WordShuffleFromButtonProps {
  getAllWordShuffle: () => void;
  id: number
}

export default function WordShuffleFromButtonEdit({ getAllWordShuffle,id }: WordShuffleFromButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition"
      >
        Edit
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Container */}
          <div className="bg-white rounded-xl shadow-xl p-6 relative max-w-lg w-full">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>

            {/* Asset Form */}
            <WordShuffleFormEdit
              onClose={() => setIsOpen(false)}
              getAllWordShuffle={getAllWordShuffle}
              id={id}
            />
          </div>
        </div>
      )}
    </div>
  );
}
