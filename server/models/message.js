const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const messageSchema=new Schema({
    owner:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        name:String
    },
    date:Date,
    content:String,
    type:String
})

module.exports=mongoose.model('Message',messageSchema);