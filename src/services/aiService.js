import axios from "axios";

// AI Microservice base URL
const AI_BASE_URL = "http://localhost:3000";

/**
 * Ask a question to the AI chatbot with room context
 * @param {string} roomId - The room ID for context
 * @param {string} question - The user's question
 * @returns {Promise<string>} AI response
 */
export async function askQuestion(roomId, question) {
  try {
    const response = await axios.post(`${AI_BASE_URL}/question/${roomId}`, {
      payload: question,
    });
    return response.data.payload;
  } catch (error) {
    console.error("Error asking question:", error);
    throw new Error("Gagal mendapatkan respons dari AI");
  }
}

/**
 * Generate a quiz based on lecture content
 * @param {string} roomId - The room ID
 * @param {string} prompt - Quiz generation prompt
 * @returns {Promise<Object>} Generated quiz data
 */
export async function generateQuiz(roomId, prompt) {
  try {
    const response = await axios.post(`${AI_BASE_URL}/quiz/${roomId}`, {
      prompt: prompt,
    });
    return response.data;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Gagal membuat kuis");
  }
}

/**
 * Get transcript for a room
 * @param {string} roomId - The room ID
 * @returns {Promise<Object>} Transcript data
 */
export async function getTranscript(roomId) {
  try {
    const response = await axios.get(`${AI_BASE_URL}/transcript/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting transcript:", error);
    throw new Error("Gagal mendapatkan transkrip");
  }
}

/**
 * Get media (images) for a room
 * @param {string} roomId - The room ID
 * @returns {Promise<Object>} Media data
 */
export async function getMedia(roomId) {
  try {
    const response = await axios.get(`${AI_BASE_URL}/media/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting media:", error);
    throw new Error("Gagal mendapatkan media");
  }
}

/**
 * Ask a question about an image
 * @param {string} question - The question about the image
 * @param {string} imageBase64 - Base64 encoded image
 * @returns {Promise<string>} AI response
 */
export async function askImageQuestion(question, imageBase64) {
  try {
    const response = await axios.post(`${AI_BASE_URL}/image-question`, {
      payload: question,
      image: imageBase64,
    });
    return response.data.payload;
  } catch (error) {
    console.error("Error asking image question:", error);
    throw new Error("Gagal menganalisis gambar");
  }
}
