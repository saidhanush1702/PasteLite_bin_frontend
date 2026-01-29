import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreatePaste from "./pages/CreatePaste";
import ViewPaste from "./pages/ViewPaste";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-black text-white p-3">
        <div className="max-w-4xl mx-auto flex gap-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/create">Create Paste</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreatePaste />} />
        <Route path="/p/:id" element={<ViewPaste />} />
      </Routes>
    </BrowserRouter>
  );
}
