import { Component } from 'solid-js';

const Footer: Component = () => {
  return (
    <footer class="bg-gray-100 py-6 mt-auto">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div class="text-gray-600 text-sm">
            © {new Date().getFullYear()} Max Mayer-Mader. All rights reserved.
          </div>
          
          {/* Links */}
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="https://mayer-mader.com" class="text-gray-600 hover:text-gray-900">About</a>
            <a href="/privacy" class="text-gray-600 hover:text-gray-900">Privacy</a>
            <a href="/contact" class="text-gray-600 hover:text-gray-900">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
