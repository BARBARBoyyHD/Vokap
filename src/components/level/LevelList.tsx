import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { PROD_URL } from "../../config/baseURL";
import FromButton from "./FormButton";
import FromButtonEdit from "./FormButtonEdit";

interface Level {
  level_id: number;
  level_name: string;
  created_at: string;
  user_id: number;
}

export default function LevelList() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllLevel = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${PROD_URL}/api/v2/list/level`, {
        withCredentials: true,
      });
      setLevels(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllLevel();
  }, [getAllLevel]);

  const handleDelete = async (level_id: number) => {
    if (!window.confirm("Are you sure you want to delete this level?")) return;
    try {
      await axios.delete(`${PROD_URL}/api/v2/delete/level/${level_id}`, {
        withCredentials: true,
      });
      alert("Level deleted successfully!");
      getAllLevel();
    } catch (error) {
      console.error(error);
      alert("Failed to delete level.");
    }
  };


  return (
    <div className="w-full">
      <div className="flex flex-col mb-2">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Level List</h2>
        <FromButton getAllLevel={getAllLevel}/>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : levels.length === 0 ? (
        <p className="text-gray-500">No levels found.</p>
      ) : (
        <div className="border w-full border-gray-200 rounded-lg shadow-sm h-auto ">
          <table className="w-full text-sm text-left text-gray-700 overflow-x-auto overflow-y-auto">
            <thead className="sticky top-0 bg-blue-600 text-white text-xs uppercase tracking-wider z-10">
              <tr>
                <th className="px-6 py-3 ">ID</th>
                <th className="px-6 py-3 ">Level Name</th>
                <th className="px-6 py-3 ">Created At</th>
                <th className="px-6 py-3 ">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {levels.map((level, index) => (
                <tr
                  key={level.level_id}
                  className={`hover:bg-blue-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {level.level_id}
                  </td>
                  <td className="px-6 py-3">{level.level_name}</td>
                  <td className="px-6 py-3 ">
                    {new Date(level.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 gap-2 flex flex-wrap">
                    <FromButtonEdit getAllLevel={getAllLevel} level_id={level.level_id}/>
                    <button
                      onClick={() => handleDelete(level.level_id)}
                      className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
