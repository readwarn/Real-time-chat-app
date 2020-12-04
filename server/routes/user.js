const router=require('express').Router();
const Authenticator=require('../middleware/authware');
const UserServices=require('../models/user');
const Channel=require('../models/channel');
router.get('/',(req,res)=>{
    UserServices.User.find({},function(err,users){
      if(err){
        res.send('error finding users')
      }else{
        res.send(users);
      }
    })
});

router.get('/currentUser',Authenticator.isLoggedIn,(req,res)=>{
  res.json(req.user);
})

router.put('/currentUser',Authenticator.isLoggedIn,(req,res)=>{
   UserServices.User.findByIdAndUpdate(req.user._id,req.body).then((user)=>{
       res.json(user);
   })
})

router.get('/currentUser/channels',Authenticator.isLoggedIn,(req,res)=>{
     UserServices.User.findById(req.user._id)
     .populate({
       path:'channels',
       populate:[{
         path:'members',
         model:'User'
       },{
         path:'messages',
         populate:{
           path:'owner.id',
           model:'User'
         }
       }]
     })
     .exec(function(err,user){
         res.json(user.channels);
     })
});

router.delete('/',(req,res)=>{
  UserServices.User.deleteMany({},function(err){
    if(err){
      res.send('ooops')
    }
    else{
      res.send('all users are gone viola');
    }
  })
})
module.exports=router;