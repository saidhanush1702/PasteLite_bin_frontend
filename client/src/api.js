const API = import.meta.env.VITE_API_URL + "/api";

console.log("API BASE URL =", import.meta.env.VITE_API_URL);

export async function createPaste(data) {
  const res = await fetch(`${API}/pastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getPaste(id) {
  const res = await fetch(`${API}/pastes/${id}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}


export async function listPastes() {
  const res = await fetch(`${API}/pastes`);
  return res.json();
}