const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    email: {
        type: String,
        require:true,
        unique:true
    },

    // emailValidation: {
    //     type: Boolean,
    //     default:false
    // },

    admin: {
        type: Boolean,
        default:false
    }
},{
    timestamps:true
});

User.plugin(passportLocalMongoose);

let Users = mongoose.model('User', User)

module.exports = Users;
