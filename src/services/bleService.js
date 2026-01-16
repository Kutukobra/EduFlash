// BLE Service for connecting to ESP32 devices
// Based on the implementation from nextjstestingfrontend

const SERVICE_UUID = "12345678-1234-5678-1234-56789abcdef0";
const PASSKEY_CHAR_UUID = "12345678-1234-5678-1234-56789abcdef1";
const PROVISION_CHAR_UUID = "12345678-1234-5678-1234-56789abcdef2";

let bluetoothDevice = null;
let passkeyCharacteristic = null;
let provisionCharacteristic = null;

export async function connectBLE() {
  try {
    if (!navigator.bluetooth) {
      throw new Error("Web Bluetooth API is not available in this browser");
    }

    bluetoothDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }],
      optionalServices: [SERVICE_UUID],
    });

    const server = await bluetoothDevice.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);

    passkeyCharacteristic = await service.getCharacteristic(PASSKEY_CHAR_UUID);
    provisionCharacteristic = await service.getCharacteristic(PROVISION_CHAR_UUID);

    return {
      device: bluetoothDevice,
      name: bluetoothDevice.name || "Unknown Device",
    };
  } catch (error) {
    console.error("BLE Connection Error:", error);
    throw error;
  }
}

export async function sendPasskey(passkey) {
  if (!passkeyCharacteristic) {
    throw new Error("Not connected to BLE device");
  }

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(passkey);
    await passkeyCharacteristic.writeValue(data);
    return true;
  } catch (error) {
    console.error("Error sending passkey:", error);
    throw error;
  }
}

export async function provisionDevice(roomId, wsHost = "localhost", wsPort = 3000) {
  if (!provisionCharacteristic) {
    throw new Error("Not connected to BLE device");
  }

  try {
    const config = {
      roomId: roomId.toString(),
      wsHost,
      wsPort,
    };

    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(config));
    await provisionCharacteristic.writeValue(data);
    return true;
  } catch (error) {
    console.error("Error provisioning device:", error);
    throw error;
  }
}

export async function disconnectBLE() {
  if (bluetoothDevice && bluetoothDevice.gatt.connected) {
    bluetoothDevice.gatt.disconnect();
  }
  bluetoothDevice = null;
  passkeyCharacteristic = null;
  provisionCharacteristic = null;
}

export function isConnected() {
  return bluetoothDevice && bluetoothDevice.gatt.connected;
}

export function getDeviceName() {
  return bluetoothDevice ? bluetoothDevice.name : null;
}

export function setupDisconnectListener(callback) {
  if (bluetoothDevice) {
    bluetoothDevice.addEventListener("gattserverdisconnected", callback);
  }
}
