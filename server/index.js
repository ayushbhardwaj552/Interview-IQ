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
"https://interview-iq-3.onrender.com",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, postman, or server-to-server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Print exactly which origin failed to make debugging easier in Render logs
      console.error(`CORS Blocked Origin: ${origin}`);
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

// 5. Root Health Check
app.get("/", (req, res) => {
  res.status(200).send("Server is running smoothly.");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
