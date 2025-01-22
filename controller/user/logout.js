function userLogout (req,res,next){
    res.clearCookie('access_token').json({message:"Logout successfuly"});
}

module.exports=userLogout