// модель User
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: email => !Joi.validate(email, Joi.string().email()),
    //   message: 'Invalid email format' 
    // }
  },
  password: {
    type: String,
    required: true, 
    minlength: 6
  },
  // profile: {type: String }
  // role: {
  //   type: String,
  //   enum: ['user', 'admin'],
  //   default: 'user'
  // }
});

// хешування пароля перед збереженням 
// UserSchema.pre('save', async function(next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

export const User = mongoose.model('User', UserSchema);

