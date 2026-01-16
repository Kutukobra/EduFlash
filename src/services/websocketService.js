/**
 * WebSocket service for real-time communication with AI microservice
 */

const WS_BASE_URL = "ws://localhost:3000";

class WebSocketService {
  constructor() {
    this.ws = null;
    this.roomId = null;
    this.listeners = {
      transcript: [],
      image: [],
      error: [],
      connected: [],
      disconnected: [],
    };
  }

  /**
   * Connect to a room's WebSocket
   * @param {string} roomId - The room ID to join
   */
  connect(roomId) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log("Already connected");
      return;
    }

    this.roomId = roomId;
    this.ws = new WebSocket(`${WS_BASE_URL}/ws`);

    this.ws.onopen = () => {
      console.log("WebSocket connected");
      // Send join-room message
      this.ws.send(
        JSON.stringify({
          type: "join-room",
          roomId: roomId,
        })
      );
      this.emit("connected", { roomId });
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        // Binary data (image)
        this.handleBinaryData(event.data);
      }
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.emit("error", error);
    };

    this.ws.onclose = () => {
      console.log("WebSocket disconnected");
      this.emit("disconnected", { roomId: this.roomId });
      this.ws = null;
    };
  }

  /**
   * Handle incoming messages
   * @param {Object} data - Parsed message data
   */
  handleMessage(data) {
    if (data.type === "transcript") {
      this.emit("transcript", data);
    } else if (data.type === "image") {
      this.emit("image", data);
    }
  }

  /**
   * Handle binary data (images)
   * @param {Blob} data - Binary image data
   */
  handleBinaryData(data) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      this.emit("image", {
        type: "image",
        content: base64,
        timestamp: Date.now(),
      });
    };
    reader.readAsDataURL(data);
  }

  /**
   * Subscribe to events
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  /**
   * Unsubscribe from events
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (cb) => cb !== callback
      );
    }
  }

  /**
   * Emit an event to all listeners
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.roomId = null;
    }
  }

  /**
   * Check if connected
   * @returns {boolean}
   */
  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }
}

// Export singleton instance
const wsService = new WebSocketService();
export default wsService;

/**
 * Helper function to connect to WebSocket and handle messages
 * @param {string} roomId - Room ID to join
 * @param {Function} onMessage - Callback for handling messages
 * @returns {Object} Connection object with close method
 */
export function connectWebSocket(roomId, onMessage) {
  wsService.connect(roomId);

  const handleMessage = (data) => {
    if (onMessage) {
      onMessage(data);
    }
  };

  // Subscribe to all events
  wsService.on("transcript", handleMessage);
  wsService.on("image", handleMessage);

  // Return connection object
  return {
    close: () => {
      wsService.off("transcript", handleMessage);
      wsService.off("image", handleMessage);
      wsService.disconnect();
    },
    isConnected: () => wsService.isConnected(),
  };
}
