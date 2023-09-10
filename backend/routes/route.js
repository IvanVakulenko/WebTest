import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailgen.js'
import Auth, { localVariables } from '../middleware/auth.js';



/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app

/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password

// Test methods
// Create a test
router.route('/testCreate').post(controller.testCreate);
// router.post('/test/create', async (request, response) => {
//     try {
//       if (
//         !request.body.title ||
//         !request.body.description ||
//         !request.body.owner ||
//         !request.body.questions
//       ) {
//         return response.status(400).send({
//           message: 'Send all required fields: title, owner, description, questions',
//         });
//       }
//       const newTest = {
//         title: request.body.title,
//         description: request.body.description,
//         owner: request.body.owner,
//         questions: request.body.questions
//       };
  
//       const test = await Test.create(newTest);
  
//       return response.status(201).send(test);
//     } catch (error) {
//       console.log(error.message);
//       response.status(500).send({ message: error.message });
//     }
//   });
  
  // Route for Get All Tests from database
  router.get('/test/all', async (request, response) => {
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
//   Get test by id
  router.get('test/:id', async (request, response) => {
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
  router.put('test/:id', async (request, response) => {
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
  router.delete('test/:id', async (request, response) => {
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