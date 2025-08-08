import React, { useEffect, useState } from "react";
import { PROD_URL } from "../../config/baseURL";
import axios from "axios";

interface LevelFormProps {
  onClose: () => void;
  getAllLevel: () => void;
  level_id: number;
}

export default function LevelFormEdit({
  onClose,
  getAllLevel,
  level_id,
}: LevelFormProps) {
  const [levelName, setlevelName] = useState("");
  const [loading, setLoading] = useState(false);

  const detailLevel = async () => {
    try {
      const res = await axios.get(
        `${PROD_URL}/api/v2/detail/level/${level_id}`,
        {
          withCredentials: true,
        }
      );
      const data = res.data.data;
      console.log(data);
      setlevelName(data.level_name);
      console.log("detail level : ", data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user_id = Number(localStorage.getItem("user_id") || 0);

    try {
      setLoading(true);
      await axios.post(
        `${PROD_URL}/api/v2/add/level`,
        {
          level_name: levelName,
          user_id: user_id,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Level added successfully!");
      setlevelName(""); // reset input
      getAllLevel(); // refresh list
      onClose(); // close modal
    } catch (err) {
      console.error(err);
      alert("Failed to add level.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    detailLevel();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Edit Level
      </h2>

      {/* Level Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Level Name
        </label>
        <input
          type="text"
          value={levelName}
          onChange={(e) => setlevelName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter level name"
          required
        />
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
          {loading ? "Loading ..." : "Submit"}
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
