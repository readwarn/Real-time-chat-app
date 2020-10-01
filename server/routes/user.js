const router=require('express').Router();
const Authenticator=require('../middleware/authware');
const UserServices=require('../models/user');
router.get('/',Authenticator.isLoggedIn,(req,res)=>{
    res.json({
      user:req.user,
      isLoggedIn:true,
      session:req.session
    });
});

router.post('/',Authenticator.isLoggedIn,(req,res)=>{
   UserServices.User.findByIdAndUpdate(req.user._id,req.body).then((user)=>{
       res.json({
         isLoggedIn:true
       })
   })
})

module.exports=router;