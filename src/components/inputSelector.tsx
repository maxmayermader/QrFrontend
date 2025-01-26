import { Component } from 'solid-js';

interface InputSelectorProps {
  onSelect: (type: string) => void;
}

const InputSelector: Component<InputSelectorProps> = (props) => {
  return (
    <div class="flex gap-2 w-full max-w-md mb-4">
      <button
        onClick={() => props.onSelect('url')}
        class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        URL
      </button>
      <button
        onClick={() => props.onSelect('text')}
        class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Text
      </button>
      <button
        onClick={() => props.onSelect('wifi')}
        class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        WiFi
      </button>
    </div>
  );
};

export default InputSelector;
