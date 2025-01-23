import { Component } from 'solid-js';

const Header: Component = () => {
  return (
    <header class="sticky top-0 z-50 w-full bg-white shadow-md">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          {/* Logo */}
          <div class="flex items-center space-x-2">
            <a href="/" class="text-gray-600 hover:text-gray-900">
                <span class="text-xl font-bold text-gray-800">QR Code Maker</span>
            </a>
          </div>

          <div>
            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
