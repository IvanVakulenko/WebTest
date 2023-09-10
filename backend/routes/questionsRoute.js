import express from 'express';
import cors from 'cors';

import { Question } from '../models/questionModel.js'

const router = express.Router();

router.use(cors());


const question = new Question({
  text: 'What is the capital of Ukraine?',
  options: ['Kiev', 'London', 'Paris'],
  answer: 'Kiev'
});

await question.save();

router.post('/:testId/questions', async (request, response) => {
  try {
    if (
      !request.body.text ||
      !request.body.options ||
      !request.body.answer
    ) {
      return response.status(400).send({
        message: 'Send all required fields: text, options, answer',
      });
    }
    const newTest = {
      text: request.body.text,
      options: request.body.options,
      answer: request.body.answer,
    };

    const test = await Test.create(newTest);

    return response.status(201).send(test);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



// GET /tests/:testId/questions/:questionId
router.get('/:testId/questions/:questionId', async (req, res) => {

    const question = await Question.findOne({ 
      _id: req.params.questionId,
      test: req.params.testId
    });
  
    if (!question) {
      return res.status(404).json({message: 'Питання не знайдено'});  
    }
  
    res.json(question);
  
});

// PUT /tests/:testId/questions/:questionId
router.put('/:testId/questions/:questionId', async (req, res) => {

    const question = await Question.findOneAndUpdate(
      {_id: req.params.questionId, test: req.params.testId},
      req.body,
      {new: true}
    );
  
    if (!question) {
      return res.status(404).json({message: 'Питання не знайдено'});
    }
  
    res.json(question);  
  
});

// DELETE /tests/:testId/questions/:questionId 
router.delete('/:testId/questions/:questionId', async (req, res) => {

    const question = await Question.findOneAndRemove({
      _id: req.params.questionId,
      test: req.params.testId 
    });
  
    if (!question) {
      return res.status(404).json({message: 'Питання не знайдено'});
    }
  
    res.json({message: 'Питання видалено'});
  
});