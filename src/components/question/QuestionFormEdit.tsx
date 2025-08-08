import React, { useState, useEffect } from "react";
import { PROD_URL } from "../../config/baseURL";
import axios from "axios";

interface QuestionFormEditProps {
  onClose: () => void;
  getAllQuestion: () => void;
  dt_id: number;
}

export default function QuestionFormEdit({
  onClose,
  getAllQuestion,
  dt_id,
}: QuestionFormEditProps) {
  const [levels, setLevels] = useState<
    { level_id: number; level_name: string }[]
  >([]);
  const [assets, setAssets] = useState<
    { asset_id: number; asset_name: string }[]
  >([]);

  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [levelNumber, setLevelNumber] = useState<number>(1);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch level list

  const AllLevel = () => {
    axios
      .get(`${PROD_URL}/api/v2/list/level`, { withCredentials: true })
      .then((res) => {
        setLevels(res.data.data || []);
      })
      .catch((err) => console.error(err));
  };
  const AllAsset = () => {
    axios
      .get(`${PROD_URL}/api/v2/list/assets`, { withCredentials: true })
      .then((res) => {
        setAssets(res.data.data || []);
      })
      .catch((err) => console.error(err));
  };

  const detailQuestion = async () => {
    try {
      const res = await axios.get(
        `${PROD_URL}/api/v2/detail/question/${dt_id}`,
        {
          withCredentials: true,
        }
      );
      console.log(dt_id)
      const data = res.data.data;
      setSelectedLevelId(data.level_id);
      setLevelNumber(data.level_number);
      setQuestion(data.question);
      setAnswer(data.answer);
      setSelectedAssetId(data.asset_file);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    AllLevel();
    AllAsset();
    detailQuestion();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user_id = Number(localStorage.getItem("user_id") || 0);

    if (!selectedLevelId || !selectedAssetId) {
      alert("Please select both level and asset.");
      return;
    }

    // Get the level_name from the selected level_id
    const selectedLevel = levels.find(
      (lvl) => lvl.level_id === selectedLevelId
    );
    const level_name = selectedLevel ? selectedLevel.level_name : "";

    try {
      setLoading(true);
      await axios.post(
        `${PROD_URL}/api/v2/add/question`,
        {
          level_id: selectedLevelId,
          level_name, // added this
          level_number: levelNumber,
          user_id,
          question,
          answer,
          asset_file: selectedAssetId,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Question added successfully!");
      getAllQuestion();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Edit Question
      </h2>

      {/* Level dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Level</label>
        <select
          value={selectedLevelId || ""}
          onChange={(e) => setSelectedLevelId(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">-- Select Level --</option>
          {levels.map((lvl) => (
            <option key={lvl.level_id} value={lvl.level_id}>
              {lvl.level_name}
            </option>
          ))}
        </select>
      </div>

      {/* Level number */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Level Number
        </label>
        <input
          type="number"
          value={levelNumber}
          onChange={(e) => setLevelNumber(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      {/* Question */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Question
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Enter question"
          required
        />
      </div>

      {/* Answer */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Answer</label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Enter answer"
          required
        />
      </div>

      {/* Asset dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Asset File
        </label>
        <select
          value={selectedAssetId || ""}
          onChange={(e) => setSelectedAssetId(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">-- Select Asset --</option>
          {assets.map((asset) => (
            <option key={asset.asset_id} value={asset.asset_id}>
              {asset.asset_name}
            </option>
          ))}
        </select>
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
