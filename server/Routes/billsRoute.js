const express = require('express');

const billModel = require('../models/BillModel');

const router = express.Router();

router.post('/printbill', async(req,res) => {
    try{
        const newbill = new billModel(req.body)
        await newbill.save()
        res.send('Bill charged successfully')
    } catch(error)  {
        res.status(400).json(error)
    }

})


router.get('/allbills', async(req,res) => {
    try{
      const bills = await billModel.find()
      res.send(bills)
    } catch(error)  {
        res.status(400).json(error)
    }

})

module.exports = router;