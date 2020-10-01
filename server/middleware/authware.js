module.exports={
    isLoggedIn:(req,res,next)=>{
        if(!req.isAuthenticated()) {
            res.json({
                isLoggedIn:false,
                session:req.session
            });
        }
        else{
            return next()
        }
    }
}