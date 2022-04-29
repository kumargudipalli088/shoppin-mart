const express = require('express')
const ItemModel = require("../models/itemsModel")
const router = express.Router()

router.get("/all-items", async (req, res) => {
    try {
      const items = await ItemModel.find();
      res.send(items);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  router.post("/add-items", async (req, res) => {
    try {
   const newitem = new ItemModel(req.body)
   await newitem.save()
   res.send(newitem)
    } catch (error) {
      res.status(400).json(error);
    }
  });

  router.post("/edit-items", async (req, res) => {
    try {
    await ItemModel.findOneAndUpdate({_id:req.body.itemId},req.body)
    res.send('sucessfully Edited')
   
    } catch (error) {
      res.status(400).json(error);
    }
  });
  
  router.post("/delete-items", async (req, res) => {
    try {
    await ItemModel.findOneAndDelete({_id:req.body.itemId})
    res.send('sucessfully deleted')
   
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports = router