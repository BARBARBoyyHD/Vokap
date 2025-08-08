import { useState } from "react";
import AssetEditModal from "./AssetEditModal";
interface AssetFormProps {
    asset_id: number
}

export default function AssetEditButton({asset_id}:AssetFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition"
      >
        Edit
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
            <AssetEditModal onClose={() => setIsOpen(false)} asset_id={asset_id}  />
          </div>
        </div>
      )}
    </div>
  );
}
