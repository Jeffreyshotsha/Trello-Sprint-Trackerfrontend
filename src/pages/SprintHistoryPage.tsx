// src/pages/SprintHistoryPage.tsx
import { useState } from "react";
import type { ReportData } from "../types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  data: ReportData;
}

export default function SprintHistoryPage({ data }: Props) {
  // Note: Your current ReportData doesn't have past sprints yet.
  // For now we'll use an empty array - you'll need to add completedSprints to types later
  const pastSprints = (data as any).completedSprints || []; // type cast to avoid error for now

  const [selectedSprintId, setSelectedSprintId] = useState<string | null>(
    pastSprints.length > 0 ? pastSprints[pastSprints.length - 1]?.sprintId : null
  );

  const selected = pastSprints.find((s: any) => s.sprintId === selectedSprintId);

  if (!pastSprints.length) {
    return (
      <div className="text-center py-16 px-4">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          No Completed Sprints Yet
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Once a sprint is finished, its burndown chart and summary will appear here.
          <br />
          Current sprint data can be viewed on the Burndown page.
        </p>
      </div>
    );
  }

  if (!selected) {
    return <div className="text-center py-10">Select a sprint above</div>;
  }

  const totalPoints = selected.totalPoints || 0;
  const sortedBurndown = [...selected.burndown].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  const idealPoints = sortedBurndown.map((_, i) => {
    const progress = i / (sortedBurndown.length - 1);
    return Math.max(0, Math.round(totalPoints * (1 - progress)));
  });

  const chartData = {
    labels: sortedBurndown.map((p) => dayjs(p.date).format("MMM DD")),
    datasets: [
      {
        label: "Actual Remaining",
        data: sortedBurndown.map((p) => p.remaining),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.15)",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: "#ef4444",
      },
      {
        label: "Ideal Burndown",
        data: idealPoints,
        borderColor: "#10b981",
        borderDash: [6, 4],
        borderWidth: 2,
        fill: false,
        tension: 0,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: `Sprint History - ${selected.sprintName || selected.sprintId || "Completed Sprint"}`,
        font: { size: 24, weight: 700 },
        padding: { top: 10, bottom: 30 },
      },
      tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Remaining Story Points" } },
      x: { title: { display: true, text: "Date" } },
    },
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-gray-800 text-center">Sprint History</h2>

      <div className="max-w-md mx-auto">
        <label className="block text-lg font-medium mb-2 text-center">
          Select Completed Sprint
        </label>
        <select
          value={selectedSprintId || ""}
          onChange={(e) => setSelectedSprintId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-indigo-500 focus:border-indigo-500"
        >
          {pastSprints.map((s: any) => (
            <option key={s.sprintId} value={s.sprintId}>
              {s.sprintName || s.sprintId} ({dayjs(s.startDate).format("MMM D")} –{" "}
              {dayjs(s.endDate).format("MMM D")})
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 h-[400px] md:h-[480px]">
        <Line data={chartData} options={options} />
      </div>

      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Daily Summary - {selected.sprintName || selected.sprintId}
        </h3>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Day</th>
                  <th className="px-6 py-4 text-center">Ideal</th>
                  <th className="px-6 py-4 text-center">Actual</th>
                  <th className="px-6 py-4 text-center">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedBurndown.map((point, i) => {
                  const ideal = idealPoints[i];
                  const diff = point.remaining - ideal;
                  return (
                    <tr key={point.date} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{dayjs(point.date).format("YYYY-MM-DD")}</td>
                      <td className="px-6 py-4">{dayjs(point.date).format("dddd")}</td>
                      <td className="px-6 py-4 text-center">{ideal}</td>
                      <td className="px-6 py-4 text-center text-red-600">{point.remaining}</td>
                      <td className="px-6 py-4 text-center font-bold">
                        <span className={diff > 0 ? "text-red-600" : diff < 0 ? "text-green-600" : "text-gray-600"}>
                          {diff > 0 ? "+" : ""}{diff}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}