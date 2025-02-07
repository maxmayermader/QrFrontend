import { Component } from 'solid-js';

const LoadingCounter: Component = () => {
    return (
      <div class="animate-pulse">
        <div class="h-4 w-48 bg-gray-200 dark:bg-gray-500 rounded blur-[2px]"></div>
      </div>
    );
  };

export default LoadingCounter;