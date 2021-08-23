const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    ItemName: {
        type: String,
        require:true,
    },

    ItemType1: {
        type:String,
        require:true,
    },

    ItemType2: {
        type: String,
        require:true
    },

    ItemDescription: {
        type:String,
        require:true
    },

    SellerEmail: {
        type:String,
        require:true
    },

    Images: {
        type: Array,
        require: true
    }

    // SellerId: {
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Users'
    // }
}, {
    timestamps:true
})

let Items = mongoose.model('Item', Item)

module.exports = Items;