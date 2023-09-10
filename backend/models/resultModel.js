import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({

  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },

  score: {
    type: Number,
    required: true
  },

  answers: {
    type: Map, 
    of: String 
  }

});

export const Result = mongoose.model('Result', ResultSchema);


const result = new Result({
    test: testId,
    userId: userId, 
    score: 5,
    answers: {
      "q1": "answer1",
      "q2": "answer2"
    }
  });
  
await result.save();