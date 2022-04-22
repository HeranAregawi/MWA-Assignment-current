const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
    name: String,
    username: {
        required: true,
        type: String,
        unique: true
    },
    password:{
        type:String,
        required:true,
        min:3
    }
});
mongoose.model(process.env.USERS_MODEL, usersSchema, process.env.USERS_COLLECTON)