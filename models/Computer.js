const mongoose = require("mongoose")

const computerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Загаловок не заполнен"],
        trim: true
    },

        title:{
        type: String,
        required: [true, "Загаловок не заполнен"],
        trim: true
},

    description:{
        type: String,
        required:[true , "Описание не заполнено"],
        trim: true,
    },
    
    price:{
        type: Number,
        required: [true, "Цена не указана"],
        min: 0
    }

})

module.exports = mongoose.model("Computer" , computerSchema )