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

// IMPORTANT FOR RENDER COOKIES
app.set("trust proxy", 1);

// Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-interview-rouge-zeta-80.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean);

// CORS
app.use(
  cors({
    origin: function (origin, callback) {

      // allow requests with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Firebase popup support
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

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

// Health Route
app.get("/", (req, res) => {
  res.status(200).send("Server is running smoothly.");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  await connectDb();
});
