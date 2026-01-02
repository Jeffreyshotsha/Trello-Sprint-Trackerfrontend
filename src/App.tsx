// src/App.tsx
import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import StoryPointsPage from "./pages/StoryPointsPage.tsx";
import BurndownPage from "./pages/BurndownPage.tsx";
import SprintHistoryPage from "./pages/SprintHistoryPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import { Home, BarChart3, History, Info, X } from "lucide-react";

interface ReportData {
  success: boolean;
  totals: { "TO DO": number; "DOING": number; "DONE": number; "NOT DONE": number };
  members: Array<{ id: string; name: string; "TO DO": number; "DOING": number; "DONE": number; "NOT DONE": number }>;
  burndown: Array<{ date: string; remaining: number }>;
}

function NavTab({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all font-semibold ${
        isActive
          ? "bg-indigo-600 text-white shadow-lg"
          : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
      }`}
    >
      <Icon className="w-6 h-6" />
      <span>{label}</span>
    </Link>
  );
}

export default function App() {
  // Load saved Board ID from localStorage on first render
  const savedBoardId = localStorage.getItem("trelloBoardId") || "";
  const [boardId, setBoardId] = useState(savedBoardId);
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-load data when boardId is present (including on refresh)
  useEffect(() => {
    if (!boardId.trim()) {
      setData(null);
      setError(null);
      return;
    }

    // Save to localStorage whenever boardId changes
    localStorage.setItem("trelloBoardId", boardId);

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:4000/api/report/${boardId}`);
        if (!res.ok) throw new Error("Failed to load data");
        const json = await res.json();
        if (!json.success) throw new Error(json.error || "API error");
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [boardId]);

  // Clear saved Board ID
  const clearBoardId = () => {
    localStorage.removeItem("trelloBoardId");
    setBoardId("");
    setData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h1 className="text-3xl font-bold text-indigo-600">Trello Sprint Tracker</h1>

          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={boardId}
              onChange={(e) => setBoardId(e.target.value.trim())}
              placeholder="Enter Board ID (e.g. o4TJRCtx)"
              className="px-6 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 text-lg w-80"
            />
            {boardId && (
              <button
                onClick={clearBoardId}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                title="Clear Board ID"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <nav className="flex gap-4">
            <NavTab to="/" icon={Home} label="Story Points" />
            <NavTab to="/burndown" icon={BarChart3} label="Burndown" />
            <NavTab to="/history" icon={History} label="History" />
            <NavTab to="/about" icon={Info} label="About" />
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
            <p className="mt-4 text-xl">Loading data from Trello...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-300 rounded-xl p-6 text-red-700 text-center">
            Error: {error}
          </div>
        )}

        {/* About is always visible */}
        <Routes>
          <Route path="/about" element={<AboutPage />} />
        </Routes>

        {/* Data-dependent pages */}
        {data && (
          <Routes>
            <Route path="/" element={<StoryPointsPage data={data} />} />
            <Route path="/burndown" element={<BurndownPage data={data} />} />
            <Route path="/history" element={<SprintHistoryPage data={data} />} />
          </Routes>
        )}

        {!loading && !error && !data && boardId && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No data loaded yet. Check Board ID or backend.</p>
          </div>
        )}
      </main>
    </div>
  );
}