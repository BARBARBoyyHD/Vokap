import axios from "axios";
import { PROD_URL } from "../../config/baseURL";
import { useCallback, useEffect, useState } from "react";
import AssetButton from "./AssetButton";
import AssetEditButton from "./AssetEditButton";
import type { Assets } from "../../types/Assets";

export const AssetList = () => {
  const [assets, setAssets] = useState<Assets[]>([]);

  const getAssets = useCallback(async () => {
    try {
      const res = await axios.get(`${PROD_URL}/api/v2/list/assets`, {
        withCredentials: true,
      });
      setAssets(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    try {
      await axios.delete(`${PROD_URL}/api/v2/delete/assets/${id}`, {
        withCredentials: true,
      });
      setAssets((prev) => prev.filter((asset: any) => asset.asset_id !== id));
      getAssets();
    } catch (error) {
      console.error(error);
      alert("Failed to delete asset");
    }
  };

  useEffect(() => {
    getAssets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between ">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Asset List</h1>
        <AssetButton getAllAsset={getAssets} />
      </div>

      {/* Card Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset: any) => (
          <div
            key={asset.asset_id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition"
          >
            {/* Image Preview */}
            <img
              src={asset.asset_file_name}
              alt={asset.asset_name}
              className="w-full h-48 object-cover"
            />

            {/* Card Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {asset.asset_name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Uploaded by User ID: {asset.user_id}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(asset.created_at).toLocaleString()}
              </p>

              {/* Buttons */}
              <div className="mt-4 flex gap-2">
                <AssetEditButton
                  getAllAsset={getAssets}
                  asset_id={asset.asset_id}
                />
                <button
                  onClick={() => handleDelete(asset.asset_id)}
                  className=" bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {assets.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No assets found.
          </p>
        )}
      </div>
    </div>
  );
};
