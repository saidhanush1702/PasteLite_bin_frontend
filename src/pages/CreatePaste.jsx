import { useState } from "react";
import { createPaste } from "../api";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function CreatePaste() {
  // const [content, setContent] = useState("");
  // const [ttl, setTtl] = useState("");
  // const [views, setViews] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [content, setContent] = useState(
  location.state?.content || ""
);
const [ttl, setTtl] = useState(
  location.state?.ttl_seconds || ""
);
const [views, setViews] = useState(
  location.state?.max_views || ""
);


  async function submit() {
  const data = {
    content,
    ttl_seconds: ttl ? Number(ttl) : undefined,
    max_views: views ? Number(views) : undefined
  };

  const res = await createPaste(data);

  // redirect to new paste page
  navigate(`/p/${res.id}`);
}

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Create Paste</h1>

      <textarea
        className="w-full border p-2"
        rows="6"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="TTL seconds (optional)"
        value={ttl}
        onChange={e => setTtl(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Max views (optional)"
        value={views}
        onChange={e => setViews(e.target.value)}
      />

      <button
        className="bg-black text-white px-4 py-2"
        onClick={submit}
      >
        Create
      </button>

      {url && (
        <p className="mt-3">
          Share URL: <a className="text-blue-600" href={url}>{url}</a>
        </p>
      )}
    </div>
  );
}
