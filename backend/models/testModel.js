import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000
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

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200
  },
  description: {
    type: String
  },
  owner: {
    type: String,
    required: true
  },
  questions: {
    type: [questionSchema],
    required: true
  }
},
{
  timestamps: true,
});

export const Test = mongoose.model('Test', testSchema);
