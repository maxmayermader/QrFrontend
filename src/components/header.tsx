import { createSignal, Component, Show } from "solid-js";
import LoadingCounter from "./loading";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Header: Component = () => {
  const [count, setCount] = createSignal<number>(0);
  const [isCountLoading, setIsCountLoading] = createSignal(false);

  const fetchCount = async () => {
    setIsCountLoading(true);
    try {
      const response = await axios.get(API_URL + "/count");
      setCount(response.data);
    } catch (err) {
      console.error("Failed to fetch count:", err);
    } finally {
      setIsCountLoading(false);
    }
  };

  return (
    <header class="sticky top-0 z-50 w-full bg-white shadow-md">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <a href="/" class="text-gray-600 hover:text-gray-1000">
              <span class="text-2xl font-bold text-gray-900">
                QR Code Maker
              </span>
            </a>
          </div>

          <div class="flex items-center space-x-2">
            <p class="text-l font-bold text-gray-700">
              Total QR Codes Generated:
            </p>
            <Show when={!isCountLoading()} fallback={<LoadingCounter />}>
              <p class="text-l font-bold text-gray-700">{count()}</p>
            </Show>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
