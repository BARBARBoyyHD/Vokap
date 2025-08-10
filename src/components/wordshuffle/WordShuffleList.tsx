import axios from "axios";
import { useEffect, useState } from "react";
import { PROD_URL } from "../../config/baseURL";
import WordShuffleFromButton from "./WordShuffleButton";
import WordShuffleFromButtonEdit from "./WordShuffleButtonEdit";

interface Asset {
  asset_file_name: string;
  asset_id: number;
  asset_name: string;
  created_at: string;
  user_id: number;
}

interface Question {
  id: number;
  level_id: number;
  question: string;
  answer: string;
  question_number: number;
  asset_filet?: Asset;
}

export default function WordShuffleList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllWordShuffle = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${PROD_URL}/api/v2/list/wordshuffle`, {
        withCredentials: true,
      });
      const data = res.data.data;
      setQuestions(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;
    try {
      await axios.delete(`${PROD_URL}/api/v2/delete/wordshuffle/${id}`, {
        withCredentials: true,
      });
      alert("Question deleted successfully!");
      getAllWordShuffle();
    } catch (error) {
      console.error(error);
      alert("Failed to delete question.");
    }
  };

  useEffect(() => {
    getAllWordShuffle();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Wordshuffle List
        </h2>
        <WordShuffleFromButton getAllWordShuffle={getAllWordShuffle} />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : questions.length === 0 ? (
        <p className="text-gray-500">No questions found.</p>
      ) : (
        <div className="border border-gray-200 rounded-lg h-auto overflow-x-auto overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="sticky top-0 bg-blue-600 text-white text-xs uppercase z-10">
              <tr>
                <th className="px-6 py-3">Level ID</th>
                <th className="px-6 py-3">Question #</th>
                <th className="px-6 py-3">Question</th>
                <th className="px-6 py-3">Answer</th>
                <th className="px-6 py-3">User ID</th>
                <th className="px-6 py-3">Asset Preview</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {questions.map((q, index) => (
                <tr
                  key={q.id}
                  className={`hover:bg-blue-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-3">{q.level_id}</td>
                  <td className="px-6 py-3">{q.question_number}</td>
                  <td className="px-6 py-3">{q.question}</td>
                  <td className="px-6 py-3">{q.answer}</td>
                  <td className="px-6 py-3">{q.asset_filet?.user_id}</td>
                  <td className="px-6 py-3">
                    {q.asset_filet?.asset_file_name ? (
                      <a
                        href={q.asset_filet.asset_file_name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={q.asset_filet.asset_file_name}
                          alt={q.asset_filet.asset_name}
                          className="w-16 h-16 object-cover rounded border"
                        />
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs">No image</span>
                    )}
                  </td>
                  <td className="px-6 py-3 flex gap-2">
                    <WordShuffleFromButtonEdit
                      getAllWordShuffle={getAllWordShuffle}
                      id={q.id}
                    />
                    <button
                      onClick={() => handleDelete(q.id)}
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
