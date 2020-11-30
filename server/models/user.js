const mongoose=require('mongoose');
const Channel=require('../models/channel');
const Schema=mongoose.Schema;
const userSchema=new Schema({
  username:String,
  oauthID:String,
  password:String,
  bio:String,
  phone:String,
  email:String,
  avi:String,
  channels:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Channel"
  }]
});

const UserServices={
  User:mongoose.model('User',userSchema),
  
  findOrCreate:(User,done,profile)=>{
    User.findOne({oauthID:profile.id}).then((currentUser)=>{
      if(currentUser){
          done(null,currentUser)
      }else{
        new User({
          username:profile.displayName,
          oauthID:profile.id,
          email:profile.email
        }).save().then((newUser)=>{
          Channel.findById('5fc52db79aa9fb091c81c332',function(err,channel){
            if(err){
              res.send('error finding welcome channel')
            }else{
              newUser.channels.push(channel);
              newUser.save();
              channel.members.push(newUser);
              channel.save();
            }
          })
          done(null,newUser);
        })
      }
    })
  }
}

module.exports=UserServices;