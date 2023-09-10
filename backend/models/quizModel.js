import mongoose from 'mongoose';

const QuizSchema = new Schema({
    title: String,
    questions: [{ 
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }],
    creator: {
      type: Schema.Types.ObjectId, 
      ref: 'User'
    }
  });