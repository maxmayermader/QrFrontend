import { Component } from "solid-js";

interface AdvQrCodeProps {
  showAdvanced: boolean;
  fillColor: string;
  backgroundColor: string;
  setFillColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  generateAdvancedQRCode: () => void;
}

const AdvQrCode: Component<{
  showAdvanced: boolean;
  fillColor: string;
  backgroundColor: string;
  setFillColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  generateAdvancedQRCode: () => void;
  moduleShape: number;
  setModuleShape: (shape: number) => void;
}> = (props) => {
  return (
    <div class="w-full max-w-md flex flex-col gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
      <div class="flex gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Fill Color
          </label>
          <input
            type="color"
            value={props.fillColor}
            onInput={(e) => props.setFillColor(e.currentTarget.value)}
            class="w-full mt-1 h-10 rounded-md cursor-pointer"
          />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Background Color
          </label>
          <input
            type="color"
            value={props.backgroundColor}
            onInput={(e) => props.setBackgroundColor(e.currentTarget.value)}
            class="w-full mt-1 h-10 rounded-md cursor-pointer"
          />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Module Shape
        </label>
        <div class="flex gap-2">
          <button
            onClick={() => props.setModuleShape(0)}
            class={`flex-1 py-2 px-4 rounded-md transition-colors ${
              props.moduleShape === 0
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => props.setModuleShape(1)}
            class={`flex-1 py-2 px-4 rounded-md transition-colors ${
              props.moduleShape === 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
            }`}
          >
            Rounded
          </button>
          <button
            onClick={() => props.setModuleShape(2)}
            class={`flex-1 py-2 px-4 rounded-md transition-colors ${
              props.moduleShape === 2
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
            }`}
          >
            Dots
          </button>
        </div>
      </div>

      <button
        onClick={props.generateAdvancedQRCode}
        class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Generate Advanced QR
      </button>
      
    </div>
  );
};

export default AdvQrCode;
