AI-Based Job Recommendation Web App
An intelligent platform to register, login, update profiles, and receive personalized job recommendations using AI.

Setup Instructions
1.Clone the repository
git clone https://github.com/asish-2004-ai/job-search-ai.git
cd job-search-ai

2.Install dependencies
Backend: cd backend
         npm install
Frontend: cd frontend
          npm install

3.Configure Environment Variables
PORT=5000
MONGO_URI=mongodb+srv://asishdalabehera375:XhVoPNEkYlyR5QWB@cluster0.ryjmavp.mongodb.net/
JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODJhZmY2Y2QwYTcxNjE3MmVhNGJhMDYiLCJpYXQiOjE3NDc2NTAzNTcsImV4cCI6MTc0NzczNjc1N30.o0kRNGK2MmzV8SAKOJG19ZsNTmqxdgUIDth9T5cbHeU
OPENAI_API_KEY=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

4.Start the servers
Backend: node server.js
Frontend: npm start

5.Access the App
Visit: http://localhost:3000


 AI Usage & Prompt Design:
 I use openrouter.ai API to generate job recommendations based on user profile data:


- Name: User Name
- Skills: skill1, skill2,
- Experience: X years in field
Suggest 3 job roles suitable for them.


API Documentation:
POST /api/auth/register
Register a new user

Body: { name, email, password }

POST /api/auth/login
Login with email & password

Returns: JWT Token

GET /api/profile
Get the authenticated user profile

Headers: Authorization: Bearer <token>

POST /api/profile
Create/update user profile

Body: { skills, experience, education, ... }

POST /api/recommend
Get job recommendations using OpenAI

Body: { skills, experience }

Returns: List of AI-generated job roles


 Code Architecture Overview:

.
├── backend/
│   ├── config/           # MongoDB connection
│   ├── controllers/      # Route logic
│   ├── middleware/       # Auth middleware (JWT)
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Auth, profile, jobs, AI routes
│   └── server.js         # Express app entry
│___ .env
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components (Forms, Cards)
│   │   ├── pages/        # Signup, Login, Profile, Dashboard
│   │   ├── api/axios.js  # Axios base URL config
│   │   └── App.jsx       # React routing
│
├── .env
├── README.md
└── package.json

 
