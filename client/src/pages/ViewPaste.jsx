import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaste } from "../api";

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");
  const [expired, setExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    getPaste(id)
      .then(data => {
        setPaste(data);

        if (data.expires_at) {
          const expiryTime = new Date(data.expires_at).getTime();

          const interval = setInterval(() => {
            const now = Date.now();
            const diff = expiryTime - now;

            if (diff <= 0) {
              setExpired(true);
              clearInterval(interval);
            } else {
              setTimeLeft(Math.ceil(diff / 1000)); // seconds left
            }
          }, 1000);

          return () => clearInterval(interval);
        }
      })
      .catch(() => setError("Paste not found or expired"));
  }, [id]);

  if (error) return <p className="text-center mt-10">{error}</p>;

  if (expired)
    return (
      <p className="text-center mt-10 text-red-600">
        Paste expired ⏳
      </p>
    );

  if (!paste) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-3">
      {timeLeft !== null && (
        <p className="text-sm text-gray-500">
          Expires in: {timeLeft} seconds
        </p>
      )}

      <pre className="bg-gray-100 p-4 whitespace-pre-wrap">
        {paste.content}
      </pre>
    </div>
  );
}
