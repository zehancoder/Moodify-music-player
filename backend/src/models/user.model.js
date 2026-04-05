const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: [true, 'Username must be unique'],
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        unique: [true, 'Email must be unique'],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    }
});
userSchema.pre('save', (next) => {});// this run before saveing data in the mongodb;
userSchema.pre('save', (next) => {}); // this run after saving data in mongodb;
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;