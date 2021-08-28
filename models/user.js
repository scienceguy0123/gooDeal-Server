const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const config = require('../config');
const jwt = require('jsonwebtoken');
const User = new Schema({
    email: {
        type: String,
        require:true,
        unique:true
    },

    emailValidation: {
        type: Boolean,
        default:false
    },

    admin: {
        type: Boolean,
        default:false
    }
},{
    timestamps:true
});

User.plugin(passportLocalMongoose);

User.methods.generateVerificationToken = function () {
    const user = this;
    const verificationToken = jwt.sign(
        { ID: user._id },
        config.USER_EMAIL_VERIFICATION_TOKEN_SECRET,
        { expiresIn: "1d" }
    );
    return verificationToken;
};

let Users = mongoose.model('User', User)

module.exports = Users;
