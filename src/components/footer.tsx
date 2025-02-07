import { Component } from "solid-js";

const Footer: Component = () => {
  return (
    <footer class="bg-gray-100 dark:bg-gray-800 py-6 mt-auto">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-600 dark:text-gray-300 text-sm">
            © {new Date().getFullYear()} Max Mayer-Mader. All rights reserved.
          </div>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://mayer-mader.com"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              About
            </a>
            <a
              href="/privacy"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Privacy
            </a>
            <a
              href="/contact"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
