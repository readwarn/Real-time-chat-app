const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const channelSchema=new Schema({
    name:String,
    description:String,
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }]
})

module.exports=mongoose.model('Channel',channelSchema);
