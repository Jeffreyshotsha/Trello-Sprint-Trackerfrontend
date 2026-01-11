// src/pages/AboutPage.tsx
import { Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      {/* Main Story - Text Only (No Image) */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 mb-16">
        <h2 className="text-4xl font-bold text-indigo-700 mb-8 flex items-center gap-4">
          Back to the Inception of Trello Sprint Tracker
        </h2>

        <div className="prose prose-lg text-gray-700 max-w-none space-y-6 leading-relaxed">
          <p>Hey, My name is Jeff.</p>

          <p>
            Trello Sprint Tracker started from a simple need: we just wanted to track our work progress properly. At the time, we were using Google Sheets with TypeScript, but it quickly became frustrating, messy, and hard to maintain. There were moments when it felt like too much, and honestly, I even thought about giving up.
          </p>

          <p className="font-medium text-xl border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-50 rounded-r-xl text-indigo-900">
            What kept it alive were the people who stood by me when things got difficult.
          </p>

          <p>
            Sash-lee Enslin and Thabo Leroy Ndamane supported me through that phase — encouraging me to push through and helping me believe that we could actually finish what we started. Because of them, we got it done, even though there were still small issues that bothered me.
          </p>

          <p>
            That’s when a bigger idea hit me:
          </p>

          <p className="font-semibold text-indigo-700 text-lg italic">
            What if I built an app that does exactly what we were trying to achieve — and more?<br />
            Not just tracking the current sprint, but also allowing teams to go back to previous sprints and clearly see how far they had come and how things looked back then.
          </p>

          <p>
            That idea became Trello Sprint Tracker.
          </p>

          <p className="font-semibold text-indigo-700 text-lg">
            This app exists because of persistence, support, and belief during moments when quitting felt easier. Every time a team gains clarity from a burndown chart or reviews past sprint progress, that success carries the support of those who helped me keep going.
          </p>

          <p className="font-semibold text-indigo-700 text-lg">
            Thank you, Sash-lee and Thabo. This project is a reflection of your support and belief.
          </p>

          <p className="text-xl font-medium text-indigo-800 mt-8 border-t border-gray-200 pt-6">
            And here's the special part:  
            This entire app is my Christmas gift to the team for 2025.  
            A little something from me — to all of you — so we can track our progress together, look back with pride, and keep growing as a team.
          </p>
        </div>
      </div>

      {/* Three Equal Cards - Founders & Supporters */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Sash-lee */}
        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">
          <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-indigo-200 mb-6">
            <img
              src="/assets/sash.jpeg"
              alt="Sash-lee Enslin"
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="text-2xl font-bold text-indigo-700 mb-2">Sash-lee Enslin</h4>
          <p className="text-gray-600 font-medium">Department Head – Media (BehindTheTV)</p>
          <p className="text-indigo-600 font-medium mb-4">Founder – Preach Closet</p>
          <p className="text-gray-700 leading-relaxed">
            Her steady encouragement and belief turned my doubts into determination.
          </p>
        </div>

        {/* Thabo */}
        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">
          <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-indigo-200 mb-6">
            <img
              src="/assets/thabo.jpeg"
              alt="Thabo Leroy Ndamane"
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="text-2xl font-bold text-indigo-700 mb-2">Thabo Leroy Ndamane</h4>
          <p className="text-gray-600 font-medium">Scrum Master – Media Department</p>
          <p className="text-indigo-600 font-medium mb-4">Board Member – Preach Closet</p>
          <p className="text-gray-700 leading-relaxed">
            His steady support and practical wisdom were the push I needed most.
          </p>
        </div>

        {/* Jeff */}
        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">
          <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-indigo-200 mb-6">
            <img
              src="/assets/jeff.jpg"
              alt="Jeff - Founder"
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="text-2xl font-bold text-indigo-700 mb-2">Jeff</h4>
          <p className="text-gray-600 font-medium">Founder & Creator</p>
          <p className="text-indigo-600 font-medium mb-4">Trello Sprint Tracker</p>
          <p className="text-gray-700 leading-relaxed">
            I built this as a 2025 Christmas gift for the team — thank you for the journey.
          </p>
        </div>
      </div>

      {/* Closing Message */}
      <div className="text-center mt-16 bg-indigo-50 rounded-2xl p-10 border border-indigo-100">
        <p className="text-2xl font-medium text-indigo-800 mb-6">
          To the whole team:
        </p>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Merry Christmas 2025!  
          This app is my gift to you — so we can celebrate our progress, learn from every sprint,  
          and keep building something great together.
        </p>
        <p className="mt-8 text-lg font-semibold text-indigo-700">
          With gratitude,  
          Jeff
        </p>
      </div>
    </main>
  );
}