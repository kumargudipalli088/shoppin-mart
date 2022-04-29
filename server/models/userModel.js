const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type: String, required:true},
    Password:{type: String, required:true},
    userID:{type:String, required:true},
     verified: {type:Boolean, required:true}
}, {
    timestamps:true
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel