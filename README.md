# 🎤 AI-Powered Video Interviewer

A full-stack MERN application that conducts AI-powered mock interviews with voice interaction, real-time speech recognition, animated avatar, and comprehensive AI-based evaluation.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.2.0-blue)

---

## 🌟 Features

### Core Functionality
- 🤖 **Animated Interviewer Avatar** - Interactive 2D avatar with speaking/listening animations
- 🎙️ **Voice Questions** - Text-to-speech technology reads questions aloud
- 🗣️ **Voice Answers** - Real-time speech-to-text captures candidate responses
- 📹 **Audio Recording** - Records and stores audio responses
- 🧠 **AI Evaluation** - Automatic keyword-based scoring and analysis
- 📊 **Detailed Reports** - Comprehensive feedback with scores and insights

### Admin Features
- ➕ **Question Management** - Add, edit, delete interview questions
- 🏷️ **Categorization** - Organize by HR, Technical, Behavioral
- 📈 **Difficulty Levels** - Easy, Medium, Hard classification
- ⚙️ **Settings Panel** - Configure interview parameters

### User Experience
- 🎨 **Modern UI** - Clean, responsive design
- 📱 **Mobile Friendly** - Works on all devices
- 🔄 **Progress Tracking** - Visual progress indicators
- ✨ **Smooth Animations** - Engaging user experience

---

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Web Speech API** - Speech synthesis & recognition
- **MediaRecorder API** - Audio recording
- **Axios** - HTTP client
- **CSS3** - Styling with animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File uploads
- **JWT** - Authentication

---

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Modern browser (Chrome/Edge recommended for speech features)

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd ai-video-interviewer
```

### 2. Setup Backend
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-interviewer
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
EOF

# Start backend server
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install

# Start frontend server
npm start
```

### 4. Access Application
Open browser and navigate to: `http://localhost:3000`

---

## 📁 Project Structure

```
ai-video-interviewer/
├── backend/
│   ├── config/
│   │   └── db.js                    # Database configuration
│   ├── models/
│   │   ├── Question.js              # Question schema
│   │   ├── Interview.js             # Interview schema
│   │   └── User.js                  # User schema
│   ├── routes/
│   │   ├── questions.js             # Question routes
│   │   ├── interviews.js            # Interview routes
│   │   └── auth.js                  # Authentication routes
│   ├── utils/
│   │   └── evaluationEngine.js      # AI evaluation logic
│   ├── uploads/                     # Audio storage
│   ├── .env                         # Environment variables
│   ├── server.js                    # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Avatar/              # Avatar component
│       │   ├── Interview/           # Interview components
│       │   ├── Admin/               # Admin panel
│       │   ├── Report/              # Evaluation report
│       │   └── Common/              # Shared components
│       ├── pages/                   # Page components
│       ├── services/                # API & Browser services
│       ├── utils/                   # Constants & helpers
│       ├── App.js
│       ├── App.css
│       └── index.js
│
├── README.md
└── .gitignore
```

---

## 🎯 Usage Guide

### For Candidates

1. **Start Interview**
   - Click "Start Interview" on home page
   - Enter your name and email
   - Click "Start Interview"

2. **Grant Permissions**
   - Allow microphone access when prompted
   - Ensure you're in a quiet environment

3. **Interview Process**
   - Avatar will greet and ask questions
   - Click "Start Recording" to answer
   - Speak clearly and naturally
   - Click "Stop & Submit" when done

4. **View Results**
   - Get instant evaluation report
   - Review scores and feedback
   - Identify improvement areas

### For Admins

1. **Access Admin Panel**
   - Click "Admin Panel" from navigation
   - Or go to `/admin`

2. **Manage Questions**
   - Add new questions with keywords
   - Categorize as HR, Technical, or Behavioral
   - Set difficulty levels
   - Edit or delete existing questions

3. **Configure Settings**
   - Set default question count
   - Configure time limits
   - Enable/disable features

---

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-interviewer
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**Frontend (.env) - Optional**
```env
REACT_APP_API_URL=http://localhost:5000/api
PORT=3000
```

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Start MongoDB
mongod --dbpath /path/to/data
```

**Option 2: MongoDB Atlas**
1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in .env

---

## 🧪 API Endpoints

### Questions
```
GET    /api/questions              # Get all questions
GET    /api/questions/category/:cat # Get by category
POST   /api/questions              # Create question
PUT    /api/questions/:id          # Update question
DELETE /api/questions/:id          # Delete question
```

### Interviews
```
POST   /api/interviews             # Create interview
GET    /api/interviews/:id         # Get interview
POST   /api/interviews/:id/response # Submit response
POST   /api/interviews/:id/complete # Complete interview
```

### Authentication
```
POST   /api/auth/register          # Register user
POST   /api/auth/login             # Login user
```

---

## 🎨 Customization

### Change Avatar Design
Edit `frontend/src/components/Avatar/Avatar.jsx` and `Avatar.css`:
```css
/* Modify colors */
.avatar-head {
  background: linear-gradient(135deg, #your-color-1, #your-color-2);
}
```

### Modify Evaluation Algorithm
Edit `backend/utils/evaluationEngine.js`:
```javascript
// Customize scoring weights
const lengthScore = Math.min(wordCount / 50, 1) * 40; // 40% for length
const keywordScore = (keywordsFound.length / keywords.length) * 60; // 60% for keywords
```

### Add New Question Categories
Update `frontend/src/utils/constants.js`:
```javascript
export const QUESTION_CATEGORIES = {
  HR: 'HR',
  TECHNICAL: 'Technical',
  BEHAVIORAL: 'Behavioral',
  LEADERSHIP: 'Leadership', // New category
};
```

---

## 🐛 Troubleshooting

### Microphone Not Working
- ✅ Check browser permissions
- ✅ Use HTTPS or localhost
- ✅ Try Chrome or Edge
- ✅ Check system microphone settings

### Speech Recognition Errors
- ✅ Requires internet connection
- ✅ Only works in Chrome, Edge, Safari
- ✅ Check browser console for errors
- ✅ Speak clearly and in English

### MongoDB Connection Failed
```bash
# Check MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod --dbpath /path/to/data

# Test connection
mongo mongodb://localhost:27017/ai-interviewer
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

---

## 🚀 Deployment

### Backend (Railway/Render)

1. Create account on Railway.app or Render.com
2. Connect GitHub repository
3. Set environment variables
4. Deploy with start command: `node server.js`

### Frontend (Vercel/Netlify)

1. Create account on Vercel.com or Netlify.com
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variable: `REACT_APP_API_URL`

### MongoDB (Atlas)

1. Use MongoDB Atlas for production
2. Create cluster
3. Whitelist deployment IPs
4. Update connection string

---

## 📊 Evaluation Algorithm

The AI evaluation engine uses a multi-factor approach:

1. **Keyword Matching (60%)**
   - Identifies key concepts in responses
   - Matches against predefined keywords
   - Rewards comprehensive answers

2. **Response Length (40%)**
   - Evaluates response completeness
   - Optimal length: 50+ words
   - Penalizes too short answers

3. **Overall Scoring**
   - Excellent: 80-100%
   - Good: 60-79%
   - Average: 40-59%
   - Needs Improvement: 0-39%

4. **Feedback Generation**
   - Identifies strengths
   - Highlights improvement areas
   - Provides missing concepts
   - Generates summary

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

---

## 📝 Future Enhancements

- [ ] Video recording with webcam
- [ ] Emotion detection during interview
- [ ] Real-time transcription display
- [ ] Multi-language support
- [ ] Advanced NLP for better evaluation
- [ ] Question difficulty adaptation
- [ ] Interview analytics dashboard
- [ ] Email report delivery
- [ ] Calendar integration
- [ ] Social media sharing

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

Ujjwal Kumar

---

## 🙏 Acknowledgments

- Web Speech API for voice features
- React community for excellent documentation
- MongoDB for reliable database
- All contributors and users

---

## 📞 Support

For support, email support@example.com or open an issue on GitHub.

---

## 🎓 Educational Purpose

This project is created for educational purposes to demonstrate:
- MERN stack development
- Real-time browser APIs
- AI-powered applications
- Modern web development practices

---

## ⚠️ Browser Compatibility

| Feature | Chrome | Edge | Safari | Firefox |
|---------|--------|------|--------|---------|
| Speech Recognition | ✅ | ✅ | ✅ | ❌ |
| Speech Synthesis | ✅ | ✅ | ✅ | ✅ |
| Audio Recording | ✅ | ✅ | ✅ | ✅ |
| General UI | ✅ | ✅ | ✅ | ✅ |

**Recommended:** Chrome or Edge for full functionality

---

## 📚 Documentation



---



**Made with ❤️ using MERN Stack**