import { createSignal, Component, Show, onMount } from "solid-js";
import axios from "axios";
import Spinner from "./components/spinner";
import LoadingCounter from "./components/loading";
import InputSelector from "./components/inputSelector";
import AdvQrCode from "./components/advQrCode";
import { Url, PlainText, Wifi, Sms, QRData, QRCodeType } from "./types/types";
import { qrCodeAPI } from './api/api';

const API_URL = import.meta.env.VITE_API_URL;

const QRCodeGenerator: Component = () => {
  const [qrData, setQrData] = createSignal({});
  const [qrImage, setQrImage] = createSignal<string>("");
  const [error, setError] = createSignal("");
  const [showAdvanced, setShowAdvanced] = createSignal(false);
  const [fillColor, setFillColor] = createSignal("#000000");
  const [backgroundColor, setBackgroundColor] = createSignal("#ffffff");
  const [isLoading, setIsLoading] = createSignal(false);
  const [count, setCount] = createSignal<number>(0);
  const [isCountLoading, setIsCountLoading] = createSignal(false);
  const [inputType, setInputType] = createSignal("url");

  const formatQRData = (inputData: any) => {
    console.log("input data", inputData);
    switch (inputData.type) {
      case 'url':
        return {
          type: QRCodeType.TXT,  
          data: {
            name: "url",
            text: inputData.url
        }} as QRData;
      case 'text':
        return {
          type: QRCodeType.TXT,
          data: {
            name: "text",
            text: inputData.text
          }
        } as QRData;
      case 'wifi':
        return {
          type: QRCodeType.WIFI,  
          data: {
            name: "wifi",
          security: inputData.security,
          ssid: inputData.ssid,
          password: inputData.password
        }} as QRData;
      case 'sms':
        return {
          type: QRCodeType.SMS,  
          data: {
            name: "sms",
          phone: inputData.phone,
          message: inputData.message
        }} as QRData;
      default:
        return null;
    }
  };

  const handleInputChange = (data: any) => {
    setQrData(data);
  };

  const generateQRCode = async () => {
    const formattedData = formatQRData(qrData());
    if (!formattedData) {
      setError("Please enter required information");
      return;
    }

    setIsLoading(true);
    try {
      const resp = await qrCodeAPI.generateQRCode(formattedData, inputType());
      const imageUrl = URL.createObjectURL(resp);
      console.log("image url", imageUrl);
      setQrImage(imageUrl);
      setError("");
    } catch (err) {
      setError("Failed to generate QR code");
    } finally {
      setIsLoading(false);
    }
  };

  const generateAdvancedQRCode = async () => {
    const formattedData = formatQRData(qrData());
    if (!formattedData) {
      setError("Please enter required information");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/qrcode/?qr_type=${formattedData.type}`, 
        { data : formattedData.data },
        {
          params: { type: inputType() },
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setQrImage(imageUrl);
      setError("");
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

  return (
    <div class="w-full flex flex-col items-center gap-4 p-8 bg-gray-100 dark:bg-gray-800">
      <InputSelector 
        onSelect={setInputType} 
        onInputChange={handleInputChange}
        inputType={inputType()}
      />

      <button
        class="w-full max-w-md text-left text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        onClick={() => setShowAdvanced(!showAdvanced())}
      >
        {showAdvanced() ? "▼ Advanced Options" : "▶ Advanced Options"}
      </button>

      <Show when={showAdvanced()}>
        <AdvQrCode
          showAdvanced={showAdvanced()}
          fillColor={fillColor()}
          backgroundColor={backgroundColor()}
          setFillColor={setFillColor}
          setBackgroundColor={setBackgroundColor}
          generateAdvancedQRCode={generateAdvancedQRCode}
        />
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
        <Show when={!isCountLoading()} fallback={<LoadingCounter />}>
          <p class="text-l font-bold text-gray-700 dark:text-gray-300">
            {count()}
          </p>
        </Show>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
