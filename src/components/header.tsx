import { createSignal, onMount } from "solid-js";

const Header = () => {
  const [isDark, setIsDark] = createSignal(true);  // Default to dark

  const toggleTheme = () => {
    setIsDark(!isDark());
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark() ? 'dark' : 'light');
  };

  onMount(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  });

  return (
    <header class="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-md">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <a href="/" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <span class="text-2xl font-bold text-gray-900 dark:text-white">
                QR Code Maker
              </span>
            </a>
          </div>

          <button
            onClick={toggleTheme}
            class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {isDark() ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;