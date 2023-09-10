import mongoose from 'mongoose';

// модель Question

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,    
    required: true,
    minlength: 10,
    maxlength: 200
  },
  options: {
    type: [String],
    required: true,
    validate: [options => options.length >= 2, 'Must have at least 2 options']
  },
  answer: {
    type: String,
    required: true,
    validate: {
      validator: function(answer) {
        return this.options.includes(answer);
      },
      message: 'Answer must be in options'
    }
  }  
});

export const Question = mongoose.model('Question', QuestionSchema);

