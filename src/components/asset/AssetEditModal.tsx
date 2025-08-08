import React, { useEffect, useState } from "react";
import { PROD_URL } from "../../config/baseURL";
import axios from "axios";

interface AssetFormProps {
  onClose: () => void;
  asset_id: number;
}

export default function EditAssetForm({ onClose, asset_id }: AssetFormProps) {
  const [assetName, setAssetName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const detailAssets = async () => {
    try {
      const res = await axios.get(
        `${PROD_URL}/api/v2/detail/assets/${asset_id}`,
        {
          withCredentials: true,
        }
      );
      const data = res.data.data;
      setAssetName(data.asset_name);
      setImage(data.asset_file_name);
      console.log("detail asset : ", data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user_id");
    if (!assetName) {
      alert("Please enter an asset name.");
      return;
    }

    const formData = new FormData();
    formData.append("asset_name", assetName);
    formData.append("user_id", user_id || "");
    if (image) {
      formData.append("Image", image); // only if new image selected
    }

    try {
      setLoading(true);
      await axios.post(`${PROD_URL}/api/v2/assets/edit/`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Asset updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update asset.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    detailAssets();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Edit Asset
      </h2>

      {/* Asset Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Asset Name
        </label>
        <input
          type="text"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter asset name"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Asset Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
          className="w-full"
        />

        {preview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">
              {image ? "New Image Preview:" : "Current Image:"}
            </p>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border border-gray-300"
            />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
