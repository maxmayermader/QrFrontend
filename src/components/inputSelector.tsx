import { Component, Show, createSignal } from "solid-js";

interface InputSelectorProps {
  onSelect: (type: string) => void;
  onInputChange: (data: any) => void;
  inputType: string;
}

const InputSelector: Component<InputSelectorProps> = (props) => {
  const [securityType, setSecurityType] = createSignal<string>("");
  const [smsData, setSmsData] = createSignal<{
    type: string;
    phone?: string;
    message?: string;
  }>({
    type: "sms",
  });

  const handleWifiInput = (field: string, value: string) => {
    props.onInputChange({
      type: "wifi",
      [field]: value,
    });
  };

  const handleSmsInput = (field: string, value: string) => {
    setSmsData((prev) => ({
      ...prev,
      [field]: value,
    }));
    props.onInputChange({
      ...smsData(),
      [field]: value,
    });
  };

  const inputClasses =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 dark:border-gray-600";
  const textareaClasses =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 dark:border-gray-600 resize-none";

  return (
    <div class="w-full max-w-md space-y-4">
      <div class="flex gap-2 mb-4">
        <button
          onClick={() => props.onSelect("url")}
          class={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            props.inputType === "url"
              ? "bg-blue-600 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          URL
        </button>
        <button
          onClick={() => props.onSelect("text")}
          class={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            props.inputType === "text"
              ? "bg-blue-600 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Plain Text
        </button>
        <button
          onClick={() => props.onSelect("wifi")}
          class={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            props.inputType === "wifi"
              ? "bg-blue-600 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          WiFi
        </button>
        <button
          onClick={() => props.onSelect("sms")}
          class={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            props.inputType === "sms"
              ? "bg-blue-600 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          SMS
        </button>
      </div>

      <div class="space-y-4">
        {props.inputType === "url" && (
          <input
            type="url"
            onInput={(e) =>
              props.onInputChange({ type: "url", url: e.currentTarget.value })
            }
            placeholder="Enter URL"
            class={inputClasses}
          />
        )}

        {props.inputType === "text" && (
          <input
            type="text"
            onInput={(e) =>
              props.onInputChange({ type: "text", text: e.currentTarget.value })
            }
            placeholder="Enter text"
            class={inputClasses}
          />
        )}

        {props.inputType === "wifi" && (
          <div class="space-y-2">
            <input
              type="text"
              onInput={(e) => handleWifiInput("ssid", e.currentTarget.value)}
              placeholder="Network name (SSID)"
              class={inputClasses}
            />
            <select
              onChange={(e) => {
                handleWifiInput("security", e.currentTarget.value);
                setSecurityType(e.currentTarget.value);
              }}
              class={inputClasses}
            >
              <option value="">Select security type</option>
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
            <Show when={securityType() !== "nopass"}>
              <input
                type="password"
                onInput={(e) =>
                  handleWifiInput("password", e.currentTarget.value)
                }
                placeholder="Password"
                class={inputClasses}
              />
            </Show>
          </div>
        )}

        {props.inputType === "sms" && (
          <div class="space-y-2">
            <input
              type="tel"
              onInput={(e) => handleSmsInput("phone", e.currentTarget.value)}
              value={smsData().phone || ""}
              placeholder="Phone number"
              class={inputClasses}
            />
            <textarea
              onInput={(e) => handleSmsInput("message", e.currentTarget.value)}
              value={smsData().message || ""}
              placeholder="Message"
              class={textareaClasses}
              rows="3"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSelector;
