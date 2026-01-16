# EduFlash Integration Guide

## 🎉 Completed Features

All missing features have been successfully integrated into the EduFlash application!

---

## 📦 What Was Added

### 1. **AI Services Integration** (`src/services/aiService.js`)
- ✅ Chat with AI assistant based on lecture context
- ✅ Generate quizzes from lecture content  
- ✅ Ask questions with image analysis
- Connects to `sic7aimicroservice` AI backend

### 2. **WebSocket Service** (`src/services/websocketService.js`)
- ✅ Real-time audio transcription streaming
- ✅ Live camera image updates
- ✅ Automatic reconnection on disconnect
- Handles both text and binary WebSocket messages

### 3. **BLE Service** (`src/services/bleService.js`)
- ✅ Connect to ESP32 devices via Web Bluetooth
- ✅ Passkey authentication
- ✅ Device provisioning with room configuration
- Based on working implementation from `nextjstestingfrontend`

### 4. **Updated Pages**

#### **ClassChatbot.vue**
- ✅ Real AI responses from Gemini
- ✅ Loading states
- ✅ Error handling
- ✅ Context-aware answers based on lecture timeline

#### **RoomManager.vue**
- ✅ AI-powered quiz generation
- ✅ Real-time transcript display
- ✅ Live camera feed
- ✅ BLE device control
- ✅ Recording start/stop functionality

#### **ClassData.vue**
- ✅ Live transcript streaming
- ✅ Latest image display
- ✅ Auto-polling for updates
- ✅ WebSocket real-time updates

### 5. **New Components**

#### **DeviceControl.vue**
- ✅ BLE connection wizard
- ✅ Passkey authentication UI
- ✅ WebSocket provisioning
- ✅ Connection status tracking

#### **Timeline.vue**
- ✅ Chronological event display
- ✅ Text and image events
- ✅ Event detail view
- ✅ Real-time updates via WebSocket

---

## 🔧 Configuration

### Environment Setup

The application expects the following services:

1. **eduflash-be** (Go Backend)
   - URL: `http://localhost:3000/api/v1`
   - Handles: Users, Rooms, Quizzes

2. **sic7aimicroservice** (AI Backend)
   - URL: `http://localhost:3000`
   - Handles: AI chat, quiz generation, transcription
   - WebSocket: `ws://localhost:3000/ws`

### Update Service URLs (if needed)

In `src/main.js`:
```javascript
axios.defaults.baseURL = "http://localhost:3000/api/v1"; // eduflash-be
window.AI_SERVICE_URL = "http://localhost:3000"; // sic7aimicroservice
```

In WebSocket service, update host/port as needed.

---

## 🚀 How to Use

### 1. Start Backend Services

```bash
# Terminal 1: Start eduflash-be
cd eduflash-be
go run main.go

# Terminal 2: Start sic7aimicroservice
cd sic7aimicroservice
npm run dev
```

### 2. Start Frontend

```bash
cd EduFlash
npm install
npm run dev
```

### 3. Using the Features

#### **Create a Room and Start Recording**
1. Login as teacher
2. Create a new room
3. Go to "Manage Room"
4. Click "Stop" button (to start recording)
5. Connect ESP32 device via BLE
6. Enter passkey
7. Device will start streaming audio/video

#### **Generate AI Quiz**
1. In Room Manager, click "Buat Latihan Soal"
2. Enter quiz topic or instructions
3. AI will generate questions based on lecture content
4. Quiz is automatically saved to backend

#### **Chat with AI Assistant**
1. Go to "Chat" tab in room
2. Ask questions about lecture content
3. AI responds with context from timeline

#### **View Timeline**
- Real-time events show up as they happen
- Click on events to see details
- Images and transcripts are chronologically organized

---

## 🔌 Device Integration

### ESP32 Audio Device (sic7finproAI)
- Streams audio via WebRTC
- Connects via BLE for provisioning
- Sends audio to AI backend for transcription

### ESP32 Camera Device (sic7finproAICamera)
- Captures images periodically
- Sends via WebSocket
- AI can analyze images for quiz generation

### BLE Connection Flow
1. User clicks "Connect Device"
2. Browser shows BLE device picker
3. Select ESP32 device
4. Enter 6-digit passkey displayed on device
5. Device receives room ID and WebSocket config
6. Device disconnects BLE and connects to WebSocket
7. Recording begins

---

## 📊 Data Flow

```
ESP32 Devices → WebSocket → sic7aimicroservice → Timeline Service
                                ↓
                         Gemini AI Processing
                                ↓
                     Quiz/Chat/Transcript APIs
                                ↓
                           EduFlash Frontend
                                ↓
                            eduflash-be
                                ↓
                           PostgreSQL
```

---

## 🧪 Testing Checklist

- [ ] Login/Register works
- [ ] Create room works
- [ ] Join room as student works
- [ ] BLE device connection works
- [ ] Passkey authentication works
- [ ] Device provisioning works
- [ ] Real-time transcript appears
- [ ] Live images appear
- [ ] AI chatbot responds
- [ ] Quiz generation works
- [ ] Generated quiz saves to backend
- [ ] Timeline shows events
- [ ] WebSocket reconnects on disconnect

---

## 🛠️ Troubleshooting

### BLE Not Working
- Ensure using HTTPS or localhost
- Check browser supports Web Bluetooth (Chrome/Edge)
- Enable Bluetooth on computer

### WebSocket Not Connecting
- Check `sic7aimicroservice` is running
- Verify WebSocket URL in service
- Check browser console for errors

### AI Not Responding
- Ensure Gemini API key is set in `sic7aimicroservice`
- Check AI service logs
- Verify room has timeline events

### Quiz Generation Fails
- Check eduflash-be is running
- Verify quiz content format matches backend model
- Check browser console for errors

---

## 📝 API Endpoints Used

### AI Microservice (port 3000)
- `POST /quiz/:roomId` - Generate quiz
- `POST /question/:roomId` - Ask question
- `GET /transcript/:roomId` - Get transcript
- `WS /ws` - WebSocket for real-time updates

### EduFlash Backend (port 3000/api/v1)
- `POST /quiz/create` - Create quiz
- `POST /room/:roomId/quiz` - Add quiz to room
- `GET /room/:roomId` - Get room data
- `GET /room/:roomId/students` - Get students

---

## 🎯 Next Steps

For production deployment:

1. **Security**
   - Add JWT authentication to AI endpoints
   - Implement rate limiting
   - Validate all user inputs

2. **Performance**
   - Add caching for AI responses
   - Implement pagination for timeline
   - Optimize image compression

3. **Features**
   - Export timeline as PDF
   - Download quiz as document
   - Student analytics dashboard
   - Multi-language support

4. **DevOps**
   - Docker compose for all services
   - Environment variable management
   - CI/CD pipeline
   - Monitoring and logging

---

## 📚 Component Reference

### Services
- `aiService.js` - AI integration (quiz, chat, images)
- `websocketService.js` - Real-time communication
- `bleService.js` - ESP32 device connection

### Components
- `DeviceControl.vue` - BLE device management
- `Timeline.vue` - Event timeline display
- `CreateQuiz.vue` - Quiz creation form
- `Header.vue` - Navigation header
- `Popup.vue` - Modal wrapper

### Pages
- `RoomManager.vue` - Teacher room control
- `ClassData.vue` - Student view
- `ClassChatbot.vue` - AI chat interface
- `Quiz.vue` - Take quiz
- `QuizManager.vue` - Manage quiz session

---

## 🙏 Credits

Integration based on:
- `nextjstestingfrontend` - BLE and WebRTC patterns
- `sic7aimicroservice` - AI backend architecture
- EduFlash original codebase - UI/UX design

---

**All features are now integrated and ready for testing!** 🚀
