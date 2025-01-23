// src/components/Spinner.tsx
import { Component } from 'solid-js';

const Spinner: Component = () => {
  return (
    <div class="flex justify-center items-center">
      <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span class="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;