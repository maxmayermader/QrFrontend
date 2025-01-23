import { createSignal, Component, Show } from "solid-js";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Header: Component = () => {
  const [theme, setTheme] = createSignal("light");

  function toggleTheme() {
    const newTheme = theme() === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  

  return (
    <header class="sticky top-0 z-50 w-full bg-white shadow-md">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <a href="/" class="text-gray-600 hover:text-gray-1000">
              <span class="text-2xl font-bold text-gray-900">
                QR Code Maker
              </span>
            </a>
          </div>

          <div class="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              class="px-4 py-2 rounded-lg bg-primary"
            >
              {theme() === "light" ? "🌙" : "☀️"}
            </button>

            
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
