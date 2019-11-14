const ChatRoom = require('../models/chatRoom');
module.exports ={
    putOnlineUsers : async(req,res)=>{
        try{
            let online = new ChatRoom(req.body);
            
            console.log("resullt is..........", online);
            const result= await online.save();
            
            result ? res.status(200).send({
               
                success:true,message:'online users are:',res:result
            }): 
            res.status(422).send({success:false,
                message:'fail to get online users',res:result      
    });
}
catch(err){
            console.log(err);
            res.send(err);
        }
},
makeOfflineUser:async(req,res)=>{
    try{
        const result= await ChatRoom.findOneAndRemove({user_id:req.params.id}).remove()
        result ? res.status(200).send({
            success:true,message:"user offline",res:result
        }):
        res.status(422).send({
            success:false,message:'offline user(online user not deleted)'
        });
    }catch(err){
        console.log("offline user err");
        res.send(err);
    }
},
getOnlineUsers: async(req,res)=>{
    try{
        const result=await ChatRoom.find()
        result? res.status(200).send({
            success:true,message:"online users are get",res:result
        }):
        res.status(422).send({
            success:false,message:'online users are not getting'
        });
    }catch(err){
        console.log("online getting user err");
        res.send(err);
    }
}
}