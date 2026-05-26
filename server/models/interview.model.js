import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
  question: String,
  difficulty: String,
  timeLimit: Number,
  answer: String,
  feedback: String,
  score: { 
    type: Number, 
    default: 0 
  },
  confidence: { 
    type: Number, 
    default: 0 
  },
  communication: { 
    type: Number, 
    default: 0 
  },
  correctness: { 
    type: Number, 
    default: 0 
  }
});

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  role: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    enum: ["HR", "Technical"],
    required: true
  },
  resumeText: {
    type: String,
  },
  questions: [questionsSchema],
  
  finalScore: { 
    type: Number, 
    default: 0},
   status: {
    type: String,
    enum: ["Incomplete", "Completed" ],
    default: "Incomplete"
  },
status: {
    type: String,
    // Add "completed" to this array list right here:
    enum: ['pending', 'active', 'completed', 'Completed', 'finished'], 
    default: 'pending'
  }
}, { timestamps: true });

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview; 