// src/pages/StoryPointsPage.tsx
import type{ ReportData } from "../types";

interface Props {
  data: ReportData;                                                                                                                                                                                                                                                                                                                                                                                                                                           
}

export default function StoryPointsPage({ data }: Props) {
  const totalSprintPoints =
    data.totals["TO DO"] + data.totals["DOING"] + data.totals["DONE"] + data.totals["NOT DONE"];

  return (
    <div className="space-y-12">
      {/* Total Sprint Points */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl shadow-2xl p-10 text-center">
        <h3 className="text-3xl font-light mb-4">Total Sprint Points</h3>
        <p className="text-8xl font-bold">{totalSprintPoints}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 text-lg">
          <div>
            <p className="opacity-80">TO DO</p>
            <p className="text-4xl font-bold">{data.totals["TO DO"]}</p>
          </div>
          <div>
            <p className="opacity-80">DOING</p>
            <p className="text-4xl font-bold">{data.totals["DOING"]}</p>
          </div>
          <div>
            <p className="opacity-80">DONE</p>
            <p className="text-4xl font-bold text-green-300">{data.totals["DONE"]}</p>
          </div>
          <div>
            <p className="opacity-80">NOT DONE</p>
            <p className="text-4xl font-bold text-orange-300">{data.totals["NOT DONE"]}</p>
          </div>
        </div>
      </div>

      {/* Member Cards */}
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-8">Team Members</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.members.map((member) => {
            const total = member["TO DO"] + member["DOING"] + member["DONE"] + member["NOT DONE"];
            return (
              <div key={member.id} className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition">
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">{member.name}</h4>
                <p className="text-6xl font-bold text-indigo-600">{total}</p>
                <p className="text-gray-600 mt-2 text-lg">points</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Member Breakdown Table */}
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-8">Member Breakdown</h3>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-8 py-5 text-left text-lg font-semibold">Member</th>
                  <th className="px-8 py-5 text-center text-lg font-semibold">TO DO</th>
                  <th className="px-8 py-5 text-center text-lg font-semibold">DOING</th>
                  <th className="px-8 py-5 text-center text-lg font-semibold">DONE</th>
                  <th className="px-8 py-5 text-center text-lg font-semibold">NOT DONE</th>
                  <th className="px-8 py-5 text-center text-lg font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.members.map((member) => {
                  const total = member["TO DO"] + member["DOING"] + member["DONE"] + member["NOT DONE"];
                  return (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-8 py-6 font-medium text-gray-900 text-lg">{member.name}</td>
                      <td className="px-8 py-6 text-center text-gray-700 text-xl">{member["TO DO"]}</td>
                      <td className="px-8 py-6 text-center text-blue-600 font-semibold text-xl">{member["DOING"]}</td>
                      <td className="px-8 py-6 text-center text-green-600 font-bold text-xl">{member["DONE"]}</td>
                      <td className="px-8 py-6 text-center text-red-600 font-semibold text-xl">{member["NOT DONE"]}</td>
                      <td className="px-8 py-6 text-center text-indigo-600 font-bold text-2xl">{total}</td>
                    </tr>
                  );
                })}
                <tr className="bg-indigo-50 font-bold">
                  <td className="px-8 py-6 text-right text-lg">Column Totals →</td>
                  <td className="px-8 py-6 text-center text-xl">{data.totals["TO DO"]}</td>
                  <td className="px-8 py-6 text-center text-xl">{data.totals["DOING"]}</td>
                  <td className="px-8 py-6 text-center text-xl">{data.totals["DONE"]}</td>
                  <td className="px-8 py-6 text-center text-xl">{data.totals["NOT DONE"]}</td>
                  <td className="px-8 py-6 text-center text-2xl text-indigo-700">{totalSprintPoints}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}