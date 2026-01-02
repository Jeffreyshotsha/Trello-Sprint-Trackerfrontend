// src/pages/BurndownPage.tsx
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

export default function BurndownPage({ data }: Props) {
  // Guard clause
  if (!data.burndown?.length) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          No Burndown Data Available
        </h2>
        <p className="text-gray-500 text-lg">
          There is no burndown data for the current sprint yet.
        </p>
      </div>
    );
  }

  // Filter to last 7 days (current 7-day sprint)
  const sprintStartDate = dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const currentBurndown = data.burndown.filter(p => p.date >= sprintStartDate);

  const sortedBurndown = [...currentBurndown].sort((a, b) => a.date.localeCompare(b.date));

  const totalPoints =
    data.totals["TO DO"] + data.totals["DOING"] + data.totals["DONE"] + data.totals["NOT DONE"];

  // Ideal line for 7-day sprint
  const idealPoints: number[] = [];
  const pointCount = sortedBurndown.length;
  for (let i = 0; i < pointCount; i++) {
    const progress = i / (pointCount - 1);
    const remainingIdeal = totalPoints * (1 - progress);
    idealPoints.push(Math.max(0, Math.round(remainingIdeal)));
  }

  // Today marker
  const today = dayjs().format("YYYY-MM-DD");
  const todayIndex = sortedBurndown.findIndex((p) => p.date === today);

  const chartData = {
    labels: sortedBurndown.map((p) => dayjs(p.date).format("MMM DD")),
    datasets: [
      {
        label: "Actual Remaining",
        data: sortedBurndown.map((p) => p.remaining),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.18)",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
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
      ...(todayIndex >= 0
        ? [
            {
              label: "Today",
              data: sortedBurndown.map((point, i) =>
                i === todayIndex ? point.remaining : null
              ),
              borderColor: "#6366f1",
              borderWidth: 3,
              pointRadius: 8,
              pointBackgroundColor: "#6366f1",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointHoverRadius: 10,
              showLine: false,
            },
          ]
        : []),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: { font: { size: 14 } },
      },
      title: {
        display: true,
        text: "Current 7-Day Sprint Burndown",
        font: { size: 24, weight: 700 },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Remaining Story Points",
          font: { size: 14 },
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
          font: { size: 14 },
        },
      },
    },
  };

  // Sprint end: Next Sunday at 11:59 PM
  const nextSunday = dayjs().endOf("week").set("hour", 23).set("minute", 59).set("second", 59);
  const daysLeft = nextSunday.diff(dayjs(), "day");
  const hoursLeft = nextSunday.diff(dayjs(), "hour") % 24;
  const minutesLeft = nextSunday.diff(dayjs(), "minute") % 60;

  // Progress based on ACTUAL DONE points (not time)
  const donePoints = data.totals["DONE"] || 0;
  const progress = totalPoints > 0 ? (donePoints / totalPoints) * 100 : 0;
  const isSprintDone = progress >= 100 || daysLeft < 0;

  return (
    <div className="space-y-12 py-8">
      <h2 className="text-4xl font-bold text-gray-800 text-center">
        Current 7-Day Sprint Burndown
      </h2>

      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 h-[400px] md:h-[480px]">
        <Line data={chartData} options={options} />
      </div>

      {/* Progress Bar Section - Now based on DONE points */}
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Sprint Progress (Based on Completed Points)
        </h3>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <p className="text-center text-gray-600 text-lg mb-2">
            Sprint ends on <strong>{nextSunday.format("dddd, MMMM D, YYYY")}</strong> at 11:59 PM
          </p>

          <p className="text-center text-gray-600 text-lg mb-4">
            Time remaining: <strong>{daysLeft} days, {hoursLeft} hours, {minutesLeft} minutes</strong>
          </p>

          <p className="text-center text-gray-700 text-xl mb-6 font-medium">
            {isSprintDone ? "Sprint Complete! 🎉" : "In Progress"}
          </p>

          <div className="w-full bg-gray-200 rounded-full h-8 mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-8 rounded-full text-white text-center font-bold flex items-center justify-center transition-all duration-500"
              style={{ width: `${progress}%` }}
            >
              {Math.round(progress)}%
            </div>
          </div>

          <p className="text-center text-gray-700 text-lg">
            <strong>{donePoints}</strong> of <strong>{totalPoints}</strong> story points completed
          </p>

          <p className="text-center text-sm text-gray-500 mt-4">
            Progress is calculated from actual DONE points (not time elapsed).
          </p>
        </div>
      </div>

      {/* Daily Summary Table - Only current 7-day sprint */}
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Daily Progress Summary (Current Sprint)
        </h3>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-base font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-base font-semibold">Day</th>
                  <th className="px-6 py-4 text-center text-base font-semibold">Ideal</th>
                  <th className="px-6 py-4 text-center text-base font-semibold">Actual</th>
                  <th className="px-6 py-4 text-center text-base font-semibold">Diff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedBurndown.map((point, i) => {
                  const ideal = idealPoints[i];
                  const diff = point.remaining - ideal;
                  const isToday = point.date === today;

                  return (
                    <tr
                      key={point.date}
                      className={`hover:bg-gray-50 ${isToday ? "bg-indigo-50 font-medium" : ""}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {dayjs(point.date).format("YYYY-MM-DD")}
                        {isToday && (
                          <span className="ml-2 text-xs font-bold text-indigo-600">(Today)</span>
                        )}
                      </td>
                      <td className="px-6 py-4">{dayjs(point.date).format("dddd")}</td>
                      <td className="px-6 py-4 text-center font-medium">{ideal}</td>
                      <td className="px-6 py-4 text-center font-medium text-red-600">
                        {point.remaining}
                      </td>
                      <td
                        className={`px-6 py-4 text-center font-bold ${
                          diff > 0
                            ? "text-red-600"
                            : diff < 0
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {diff > 0 ? "+" : ""}
                        {diff}
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