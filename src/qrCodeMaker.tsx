import { createSignal, Component, Show, onMount } from "solid-js";
import axios from "axios";
import Spinner from "./components/spinner";
import LoadingCounter from "./components/loading";

const API_URL = import.meta.env.VITE_API_URL;

const QRCodeGenerator: Component = () => {
  const [url, setUrl] = createSignal("");
  const [qrImage, setQrImage] = createSignal<string>("");

  const [error, setError] = createSignal("");
  const [showAdvanced, setShowAdvanced] = createSignal(false);
  const [fillColor, setFillColor] = createSignal("#000000");
  const [backgroundColor, setBackgroundColor] = createSignal("#ffffff");
  const [isLoading, setIsLoading] = createSignal(false);
  const [count, setCount] = createSignal<number>(0);
  const [isCountLoading, setIsCountLoading] = createSignal(false);

  const generateQRCode = async () => {
    if (!url()) {
      setError("Please enter a URL");
      return;
    }

    setIsLoading(true);
    try {
      console.log("this is api" + API_URL);
      const response = await axios.get(
        `${API_URL}/qrcode?data=${encodeURIComponent(url())}`,
        {
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setQrImage(imageUrl);
      setError("");
      // await fetchCount();
    } catch (err) {
      setError("Failed to generate QR code");
    } finally {
      setIsLoading(false);
    }
  };

  const generateAdvancedQRCode = async () => {
    if (!url()) {
      setError("Please enter a URL");
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/qrcode?data=${encodeURIComponent(
          url()
        )}&fill_color=${encodeURIComponent(
          fillColor()
        )}&background_color=${encodeURIComponent(backgroundColor())}`,
        {
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setQrImage(imageUrl);
      setError("");
      // await fetchCount();
    } catch (err) {
      setError("Failed to generate QR code");
      console.error(err);
    }
  };

  const fetchCount = async () => {
    setIsCountLoading(true);
    try {
      const response = await axios.get(`${API_URL}/count`);
      setCount(response.data);
    } catch (err) {
      console.error("Failed to fetch count:", err);
    } finally {
      setIsCountLoading(false);
    }
  };
  onMount(() => {
    fetchCount();
  });

  const handleUrlChange = async (e: InputEvent) => {
    const input = e.currentTarget as HTMLInputElement;
    setUrl(input.value);
    
    if (input.value) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/qrcode?data=${encodeURIComponent(input.value)}`,
          {
            responseType: "blob",
          }
        );
        const imageUrl = URL.createObjectURL(response.data);
        setQrImage(imageUrl);
        setError("");
      } catch (err) {
        setError("Failed to generate QR code");
      } finally {
        setIsLoading(false);
      }
    } else {
      setQrImage("");
    }
  };

  fetchCount;

  return (
    <div class="w-full flex flex-col items-center gap-4 p-8 bg-gray-100 dark:bg-gray-800">
      <input
        type="text"
        value={url()}
        onInput={handleUrlChange}
        placeholder="Enter URL for QR code"
        class="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
      />


      <button
        class="w-full max-w-md text-left text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        onClick={() => setShowAdvanced(!showAdvanced())}
      >
        {showAdvanced() ? "▼ Advanced Options" : "▶ Advanced Options"}
      </button>

      <Show when={showAdvanced()}>
      <div class="w-full max-w-md p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="flex items-center justify-between mb-4">
            <label for="fill-color" class="text-gray-700 dark:text-gray-300">
              Fill Color:
            </label>
            <input
              type="color"
              id="fill-color"
              value={fillColor()}
              onChange={(e) => setFillColor(e.currentTarget.value)}
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
              value={backgroundColor()}
              onChange={(e) => setBackgroundColor(e.currentTarget.value)}
              class="w-12 h-8 rounded cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={generateAdvancedQRCode}
          class="w-full max-w-md px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Generate QR Code
        </button>
      </Show>

      <Show when={!showAdvanced()}>
        <button
          onClick={generateQRCode}
          class="w-full max-w-md px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Generate QR Code
        </button>
      </Show>

      {error() && <p class="text-red-500">{error()}</p>}

      <Show
        when={isLoading()}
        fallback={
          qrImage() && (
            <div class="w-full max-w-md aspect-square flex items-center justify-center bg-white dark:bg-gray-700 rounded-lg p-4">
              <img
                src={qrImage()}
                alt="QR Code"
                class="w-full h-full object-contain rounded-lg shadow-md"
              />
            </div>
          )
        }
      >
        <Spinner />
      </Show>

      <div class="flex items-center space-x-2">
        <p class="text-l font-bold text-gray-700 dark:text-gray-300">
          Total QR Codes Generated:
        </p>
        <Show 
          when={!isCountLoading()} 
          fallback={<LoadingCounter />}
        >
          <p class="text-l font-bold text-gray-700 dark:text-gray-300">
            {count()}
          </p>
        </Show>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
