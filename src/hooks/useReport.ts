// src/hooks/useReport.ts
import { useState, useEffect } from "react";
import type { ReportData } from "../types";

const BACKEND_URL = "http://localhost:4000/api/report";

export function useReport(boardId: string) {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!boardId.trim()) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${BACKEND_URL}/${boardId}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch (HTTP ${res.status})`);
        }

        const json = await res.json();

        if (!json.success) {
          throw new Error(json.error || "API returned failure");
        }

        setData(json);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [boardId]);

  return { data, loading, error };
}