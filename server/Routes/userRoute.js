const express = require("express");
const userModel = require("../models/userModel");

const  UserModel = require("../models/userModel")

const router = express.Router();


router.post("/signin", async (req, res) => {
    try {
const user = await userModel.findOne({userID:req.body.userID, Password: req.body.Password,verified:true })
if(user) { 
res.send(user)
}else{ 
res.status(500).json({message: 'signin Failed'})
}
    } catch (error) {
      res.status(400).json(error);
    }
  });

  router.post("/signup", async (req, res) => {
    try {
   const newUser = new UserModel({...req.body, verified:false})
   await newUser.save()
   res.send('Signup-Sucessfully')
    } catch (error) {
      res.status(400).json(error);
    }
  });

  module.exports = router;