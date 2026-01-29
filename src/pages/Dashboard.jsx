import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listPastes } from "../api";

export default function Dashboard() {
  const [pastes, setPastes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPastes() {
      const data = await listPastes();
      setPastes(data);
      setLoading(false);
    }

    fetchPastes();

    // Auto-refresh every second to update countdown timers
    const interval = setInterval(fetchPastes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">📋 Paste Dashboard</h1>

        <Link
          to="/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Create New Paste
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : pastes.length === 0 ? (
        <p>No pastes created yet.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Preview</th>
              <th className="border p-2 text-center">Time Left (sec)</th>
              <th className="border p-2 text-center">Views Left</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pastes.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border p-2">
                  {p.contentPreview || "(empty)"}
                </td>

                <td className="border p-2 text-center">
                  {p.remainingSeconds === null
                    ? "∞"
                    : p.remainingSeconds <= 0
                    ? "Expired"
                    : p.remainingSeconds}
                </td>

                <td className="border p-2 text-center">
                  {p.remainingViews === null
                    ? "∞"
                    : p.remainingViews <= 0
                    ? "Used"
                    : p.remainingViews}
                </td>

                <td className="border p-2 text-center space-x-3">
                  {/* View Paste */}
                  <Link
                    to={`/p/${p.id}`}
                    className="text-blue-600 underline"
                  >
                    View
                  </Link>

                  {/* Use Again */}
                  <Link
                    to="/create"
                    state={{
                      content: p.fullContent,
                      ttl_seconds: p.remainingSeconds,
                      max_views: p.originalMaxViews
                    }}
                    className="text-green-600 underline"
                  >
                    Use Again
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
