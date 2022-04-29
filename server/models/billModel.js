const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
    Customername: { type: String, required: true },
    customerPhoneNumber: { type: Number, required: true },
    PaymentMode: {type:String, required:true},
    total: { type: Number, required: true },
    tax: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    cartItems: {type:Array, required: true}
},

    {
        timestamps:true
    })

const billModel = mongoose.model('bills', billSchema);

module.exports = billModel