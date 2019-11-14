const FriendsTable = require('../models/friendsTable');
module.exports ={
friConnectReq: async(req,res)=>{
    try{
        let newReq = new FriendsTable(req.body);
        const result = await newReq.save();
        result ? res.status(200).send({success:true, message:'friend request send sussefully',res:result
         }):
        res.status(422).send({success:false,
            message:'friend request fail to send',res:result
        });
    } 
    catch(err){
        console.log("catch err is.....",err);
            res.send(err);
    }
},

//get friends request status
getFrireq: async(req,res)=>{
    try{
        const result =await FriendsTable.find({friend_id:req.params.id});
        console.log('result',result);
        result ? res.status(200).send({
            success:true,message:"all requests ",res:result
        }):
        res.status(422).send({
            success:false,message:'not getting any request'
        });
    }catch(err){
        console.log(err);
        res.send(err);
    }
},
//get request status
getRequest: async(req,res)=>{
    try{
        const result =await FriendsTable.find();
        console.log('result',result);
        result ? res.status(200).send({
            success:true,message:"all requests ",res:result
        }):
        res.status(422).send({
            success:false,message:'not getting any request'
        });
    }catch(err){
        console.log(err);
        res.send(err);
    }
},

confirmReq: async(req,res)=>{
    try{
        const result= await FriendsTable.findOneAndUpdate({user_id:req.params.id,
            friend_id:req.body.friend_id},
            {
            $set:{
                status:true
            }
        })
        // const result= await FriendsTable.aggregate(
        //     [
        //         {
        //             $match: { 
        //                 user_id:req.params.id,
        //                 friend_id:req.params.friend_id
        //                     }
                          
        //         },
        //         {
        //         $set:{
        //             status:true
        //         }
        //     } 
        //     ])
        result ? res.status(200).send({
            success:true,message:"accept friend requests ",res:result
        }):
        res.status(422).send({
            success:false,message:'not accepted'
        });
    }catch(err){
        console.log("get error while accept friend request",err);
        res.send(err);

}
}
}