import { Component } from "solid-js";

interface AdvQrCodeProps {
  showAdvanced: boolean;
  fillColor: string;
  backgroundColor: string;
  setFillColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  generateAdvancedQRCode: () => void;
}

const AdvQrCode: Component<AdvQrCodeProps> = (props) => {
  return (
    <div class="w-full max-w-md space-y-4">
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div class="flex items-center justify-between mb-4">
          <label for="fill-color" class="text-gray-700 dark:text-gray-300">
            Fill Color:
          </label>
          <input
            type="color"
            id="fill-color"
            value={props.fillColor}
            onChange={(e) => props.setFillColor(e.currentTarget.value)}
            class="w-12 h-8 rounded cursor-pointer"
          />
        </div>

        <div class="flex items-center justify-between">
          <label for="background-color" class="text-gray-700 dark:text-gray-300">
            Background Color:
          </label>
          <input
            type="color"
            id="background-color"
            value={props.backgroundColor}
            onChange={(e) => props.setBackgroundColor(e.currentTarget.value)}
            class="w-12 h-8 rounded cursor-pointer"
          />
        </div>
      </div>

      <button
        onClick={props.generateAdvancedQRCode}
        class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Generate QR Code
      </button>
    </div>
  );
};

export default AdvQrCode;
