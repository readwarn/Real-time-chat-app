module.exports={
    isLoggedIn:(req,res,next)=>{
        if(!req.isAuthenticated()) {
            res.json({
                isLoggedIn:false,
            });
        }
        else{
            return next()
        }
    }
}