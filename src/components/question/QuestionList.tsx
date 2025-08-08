import axios from "axios";
import { useEffect, useState } from "react";
import { PROD_URL } from "../../config/baseURL";
import QuestionFromButton from "./QuestionFormButton";
import QuestionFromButtonEdit from "./QuestionButtonEdit";

interface Asset {
  asset_file_name: string;
  asset_id: number;
  asset_name: string;
  created_at: string;
  user_id: number;
}

interface Question {
  dt_id: number;
  level_id: number;
  level_name: string;
  level_number: number;
  question: string;
  user_id: number;
  answer: string;
  created_at: string;
  asset: Asset;
}

export default function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch questions
  const getAllQuestion = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${PROD_URL}/api/v2/list/questions`, {
        withCredentials: true,
      });
      const data = res.data.data;
      console.log(data);
      setQuestions(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete question
  const handleDelete = async (dt_id: number) => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;
    try {
      await axios.delete(`${PROD_URL}/api/v2/delete/question/${dt_id}`, {
        withCredentials: true,
      });
      alert("Question deleted successfully!");
      getAllQuestion();
    } catch (error) {
      console.error(error);
      alert("Failed to delete question.");
    }
  };

  useEffect(() => {
    getAllQuestion();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Question List</h2>
        <QuestionFromButton getAllQuestion={getAllQuestion} />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : questions.length === 0 ? (
        <p className="text-gray-500">No questions found.</p>
      ) : (
        <div className="border border-gray-200 rounded-lg  h-auto overflow-x-auto overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="sticky top-0 bg-blue-600 text-white text-xs uppercase z-10">
              <tr>
                <th className="px-6 py-3">Level Name</th>
                <th className="px-6 py-3">Level #</th>
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
                  key={q.dt_id}
                  className={`hover:bg-blue-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-3">{q.level_name}</td>
                  <td className="px-6 py-3">{q.level_number}</td>
                  <td className="px-6 py-3">{q.question}</td>
                  <td className="px-6 py-3">{q.answer}</td>
                  <td className="px-6 py-3">{q.user_id}</td>
                  <td className="px-6 py-3">
                    {q.asset?.asset_file_name ? (
                      <a
                        href={q.asset.asset_file_name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={q.asset.asset_file_name}
                          alt={q.asset.asset_name}
                          className="w-16 h-16 object-cover rounded border"
                        />
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs">No image</span>
                    )}
                  </td>
                  <td className="px-6 py-3 flex gap-2">
                    <QuestionFromButtonEdit
                      getAllQuestion={getAllQuestion}
                      dt_id={q.dt_id}
                    />
                    <button
                      onClick={() => handleDelete(q.dt_id)}
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
