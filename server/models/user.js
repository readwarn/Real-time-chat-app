const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
  username:String,
  oauthID:String,
  password:String,
  bio:String,
  phone:String,
  email:String
});

const UserServices={
  User:mongoose.model('user',userSchema),
  
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
          done(null,newUser);
        })
      }
    })
  }
}

module.exports=UserServices;