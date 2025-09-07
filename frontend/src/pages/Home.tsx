import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";
import youtubepic from "../assets/youtubepic.jpg"
import tweetpic from "../assets/tweet.jpg"
import imagepic from "../assets/pics.webp"
import linkpic from "../assets/linkpic.jpg"

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const handleLoginClick = () => {
    navigate(token ? "/dashboard" : "/signin");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Toggle Dark Mode */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-purple-600 text-white shadow-md"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Build Your <span className="text-purple-600">Second Brain</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mb-10 text-gray-600 dark:text-gray-300">
          Capture everything you see, hear, or think — YouTube videos, tweets,
          images, links, and more. Organize your digital memory and never lose
          an idea again.
        </p>
        <button
          onClick={handleLoginClick}
          className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:opacity-90 transition text-lg"
        >
          {token ? "Go to Dashboard" : "Get Started"}
        </button>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Save", desc: "Quickly save YouTube videos, tweets, images, or any link in one click." },
            { step: "2", title: "Organize", desc: "Use tags and categories to keep your brain structured." },
            { step: "3", title: "Recall", desc: "Search and rediscover ideas instantly when you need them." },
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
              <div className="text-5xl font-bold text-purple-600 mb-4">{item.step}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Second Brain?</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <img src={youtubepic} className="w-full h-56 object-cover " />
            <div className="p-6">
              <h3 className="font-bold text-2xl mb-2">Save YouTube Videos</h3>
              <p className="text-gray-600 dark:text-gray-300">Never lose that valuable tutorial or talk again.</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <img src={tweetpic} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-2xl mb-2">Save Tweets</h3>
              <p className="text-gray-600 dark:text-gray-300">Keep threads, ideas, and inspiration from Twitter safe.</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <img src={imagepic} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-2xl mb-2">Save Images</h3>
              <p className="text-gray-600 dark:text-gray-300">From memes to diagrams — store them all visually.</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <img src={linkpic} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-2xl mb-2">Save Links</h3>
              <p className="text-gray-600 dark:text-gray-300">Blogs, docs, or any webpage — your knowledge hub.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Motivation */}
      <section className="bg-purple-600 text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Why a Second Brain?</h2>
        <p className="max-w-3xl mx-auto text-lg mb-10">
          Your mind isn’t designed to store everything. Offload your ideas, inspirations, and knowledge into your Second Brain — so you can focus on thinking, creating, and growing.
        </p>
        <button
          onClick={handleLoginClick}
          className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:opacity-90 transition text-lg"
        >
          Start Storing Today
        </button>
      </section>

      {/* Footer CTA */}
      <footer className="py-10 text-center text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Second Brain — Built for curious minds.</p>
      </footer>
    </div>
  );
}
