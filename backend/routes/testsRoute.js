import express from 'express';
import { Test } from '../models/testModel.js'
import { Question } from '../models/questionModel.js'
import cors from 'cors';


const router = express.Router();

router.use(cors());

// Route for Save a new Test
router.post('/test', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.owner ||
      !request.body.questions
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, owner, description, questions',
      });
    }
    const newTest = {
      title: request.body.title,
      description: request.body.description,
      owner: request.body.owner,
      questions: request.body.questions
    };

    const test = await Test.create(newTest);

    return response.status(201).send(test);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Tests from database
router.get('/', async (request, response) => {
  try {
    const tests = await Test.find({});

    return response.status(200).json({
      count: tests.length,
      data: tests,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const test = await Test.findById(id);

    return response.status(200).json(test);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Test
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.owner
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, owner, description',
      });
    }

    const { id } = request.params;

    const result = await Test.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Test not found' });
    }

    return response.status(200).send({ message: 'Test updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a test
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Test.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Test not found' });
    }

    return response.status(200).send({ message: 'Test deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


export default router;