import express from 'express';
import dotenv from "dotenv";
import connectDb from './config/connectDb.js';
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import interviewRouter from './routes/interview.route.js';
import paymentRouter from './routes/payment.route.js';

dotenv.config();

const app = express(); 

// 1. Dynamic CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-interview-rouge-zeta-80.vercel.app",
  process.env.FRONTEND_URL // This allows you to easily add your Render frontend URL later via env vars
].filter(Boolean); // Filters out undefined if FRONTEND_URL isn't set yet

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests, or server-to-server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// 2. Standard Middlewares
app.use(express.json());
app.use(cookieParser());

// 3. Security Headers for Firebase Popup Auth / Cross-Origin Isolation
app.use((req, res, next) => {
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    "same-origin-allow-popups"
  );
  res.setHeader(
    "Cross-Origin-Embedder-Policy",
    "unsafe-none"
  );
  next();
});

// 4. API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

// 5. Root Health Check (Highly recommended for Render)
// Render uses this to check if your service is alive during deployment
app.get("/", (req, res) => {
  res.status(200).send("Server is running smoothly.");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});