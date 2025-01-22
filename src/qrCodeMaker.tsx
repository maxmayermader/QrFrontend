import { createSignal, Component, Show } from "solid-js";
import axios from "axios";

const QRCodeGenerator: Component = () => {
  const [url, setUrl] = createSignal("");
  const [qrImage, setQrImage] = createSignal<string>("");
  const [error, setError] = createSignal("");
  const [showAdvanced, setShowAdvanced] = createSignal(false);
  const [fillColor, setFillColor] = createSignal("#000000");
  const [backgroundColor, setBackgroundColor] = createSignal("#ffffff");
  const [count, setCount] = createSignal<number>(0);

  const generateQRCode = async () => {
    if (!url()) {
      setError("Please enter a URL");
      return;
    }

    try {
      const response = await axios.get(
        `https://qr-backend-virid.vercel.app/qrcode?data=${encodeURIComponent(url())}`,
        {
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setQrImage(imageUrl);
      setError("");
      await fetchCount();
    } catch (err) {
      setError("Failed to generate QR code");
      console.error(err);
    }
  };

  const generateAdvancedQRCode = async () => {
    if (!url()) {
      setError("Please enter a URL");
      return;
    }

    try {
      const response = await axios.get(
        `https://qr-backend-virid.vercel.app/qrcode?data=${encodeURIComponent(
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
      await fetchCount();
    } catch (err) {
      setError("Failed to generate QR code");
      console.error(err);
    }
  };

  const fetchCount = async () => {
    try {
      const response = await axios.get("https://qr-backend-virid.vercel.app/count");
      setCount(response.data);
    } catch (err) {
      console.error("Failed to fetch count:", err);
    }
  };

  return (
    <div class="qr-container">
      <input
        type="text"
        value={url()}
        onInput={(e) => setUrl(e.currentTarget.value)}
        placeholder="Enter URL for QR code"
      />

      <button
        class="advanced-toggle"
        onClick={() => setShowAdvanced(!showAdvanced())}
      >
        {showAdvanced() ? "▼ Advanced Options" : "▶ Advanced Options"}
      </button>

      <Show when={showAdvanced()}>
        <div class="advanced-options">
          <div class="color-option">
            <label for="fill-color">Fill Color:</label>
            <input
              type="color"
              id="fill-color"
              value={fillColor()}
              onChange={(e) => setFillColor(e.currentTarget.value)}
            />
          </div>

          <div class="color-option">
            <label for="background-color">Background Color:</label>
            <input
              type="color"
              id="background-color"
              value={backgroundColor()}
              onChange={(e) => setBackgroundColor(e.currentTarget.value)}
            />
          </div>
        </div>
        <button onClick={generateAdvancedQRCode}>Generate QR Code</button>
      </Show>

      <Show when={!showAdvanced()}>
        <button onClick={generateQRCode}>Generate QR Code</button>
      </Show>
      {error() && <p class="error">{error()}</p>}
      {qrImage() && <img src={qrImage()} alt="QR Code" />}
      <p class="count">Total QR Codes Generated: {count()}</p>
    </div>
  );
};

export default QRCodeGenerator;
