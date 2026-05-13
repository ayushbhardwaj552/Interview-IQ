import User from "../models/user.models.js";

export const getCurrentUser = async(req, res) =>{
    try{
        const userId = req.userId;
        const user = await User.findById(userId);
    if(!user){
        return res.status(404).json({message:"User not found", success:false});
    }
    return res.status(200).json({message:"User found", user, success:true});

    }
    catch(err){
        return res.status(500).json({message: `Get current user error ${err}`, success:false});
        
    }
}