const Notification = require('../models/notification');
module.exports ={

newNotification:async(req,res)=>{
    try{
        let newNotification = new Notification(req.body);
        const result= await newNotification.save();
        result ? res.status(200).send({
            success:true,message:"new messages(notification) ",res:result
        }):
        res.status(422).send({
            success:false,message:'notification not inserted'
        });
    }
    catch{
        console.log("catch err in notification........");
        res.send(err);
    }
},
putNotification:async(req,res)=>{
    try{
            const result= await Notification.findOneAndUpdate({fromUser:req.params.id,
            toUser:req.body.toUser},
            {
            $inc:{
                notification:1
            }
        }) 
        result ? res.status(200).send({
            success:true,message:"put number of new messages(notification) ",res:result
        }):
        res.status(422).send({
            success:false,message:'notification not putting'
        });
    }
    catch{
        console.log("catch err in notification........");
        res.send(err);
    }
},
getNotification:async(req,res)=>{
    try{
    const result =await Notification.find();
    console.log('result',result);
    result ? res.status(200).send({
        success:true,message:"all Notification getting",res:result
    }):
    res.status(422).send({
        success:false,message:'not getting any Notification'
    });
}catch(err){
    console.log("get Notification err");
    res.send(err);
}
},
deleteNotification:async(req,res)=>{
    try{
        const result=await Notification.findOneAndRemove({fromUser:req.body.fromUser,
            toUser:req.body.toUser
        }).remove()
        result ? res.status(200).send({
            success:true,message:"Notification deleted",res:result
        }):
        res.status(422).send({
            success:false,message:'Notification not delete'
        });
    }catch(err){
        console.log("delete Notification err");
        res.send(err);
    }
},

putGroupNotification:async(req,res)=>{
    try{
            const result= await Notification.findOneAndUpdate({fromUser:req.params.id,
            group_id:req.body.group_id},
            {
            $inc:{
                notification:1
            }
        }) 
        result ? res.status(200).send({
            success:true,message:"put number of new group messages(notification) ",res:result
        }):
        res.status(422).send({
            success:false,message:'group notification not putting'
        });
    }
    catch{
        console.log("catch err in notification........");
        res.send(err);
    }
},
deleteGroupNotification:async(req,res)=>{
    try{
        const result=await Notification.findOneAndRemove({fromUser:req.body.fromUser,
            group_id:req.body.toUser
        }).remove()
        result ? res.status(200).send({
            success:true,message:"group Notification deleted",res:result
        }):
        res.status(422).send({
            success:false,message:'group Notification not delete'
        });
    }catch(err){
        console.log("delete Notification err");
        res.send(err);
    }
}
}