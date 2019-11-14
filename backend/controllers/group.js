const Group = require('../models/group');
module.exports ={
    addGroup : async(req,res)=>{
        try{
            let newGroup = new Group(req.body);
            const result = await newGroup.save();
            result ? res.status(200).send({success:true,message:'Group is created sussefully',res:result
            }):
            res.status(422).send({success:false,
                message:'group fail to create',res:result
            });
        }catch(err){
            console.log("catch err is.....",err);
            res.send(err);
        }
    },
    getGroup: async(req,res)=>{
        try{
            const result =await Group.find();
            console.log('result',result);
            result ? res.status(200).send({
                success:true,message:"all Groups",res:result
            }):
            res.status(422).send({
                success:false,message:'not getting any group'
            });
        }catch(err){
            console.log(err);
            res.send(err);
        }
    },


addParticipants: async(req,res)=>{
        try{
            console.log("id is ",req.params.id);
            
            const result= await Group.findOneAndUpdate({_id:req.params.id},
                {
                    $push:{
                        participants:[{
                            member:req.body.participants,
                            date: req.body.date
                        }]
                    }
                }
                );

                result ? res.status(200).send({
                    success:true,message:"group members are  ",res:result
                }):
                res.status(422).send({
                    success:false,message:'group members not inserted'
                })
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@22");
            }
        catch{
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log("catch err is.....");
            res.send(err);
        }
    },

getParticularGroup: async(req,res)=>{
    try{
        console.log("!!!!!!!!!!!!!!!!!!!!!1");
        const result= await Group.find({_id:req.params.id});
        console.log('result is........',result);
        result ? res.status(200).send({
            success:true,message:"Group members are ",res:result
        }):
        res.status(422).send({
            success:false,message:'group members not getting'
        });
    } 
    catch{
        console.log("catch err in getting group members........");
        res.send(err);
    }
},

// leaveGroup: async(req,res)=>{
//     try{
//         const result= await Group.find({_id:req.params.id},{
            
//         //     participants:{
//         //             $elemMatch:{
//         //             _id:req.body.member
//         //                 }
//         //     },
//             // $pull:{
//             //     participants:{
//             //         $in:{
//             //             $elemMatch:{
//             //                         member:req.body.member
//             //                             }
//             //         }
//             //     }
//             // },


//             participants:[{
//                 $elemMatch:{
//                     // $pull:{
//                 _id:req.body.member
//                     // }
//                 }
//         }],
//             })
//             // let result = await Group.findByIdAndDelete({
//             //     _id: req.params.id
//             //   });
//             //   result = await Group.find({
//             //     member: req.params.member
//             //   })
//             result ? res.status(200).send({
//                 success:true,message:"group members leave  ",res:result
//             }):
//             res.status(422).send({
//                 success:false,message:'group members not leave'
//             })
//             // console.log("check result@@@@@@@@@@@ ",result.participants);
//     }
//     catch{
//         console.log("catch err in leave group........");
//         res.send(err);
//     }
// },

leaveGroup: async(req,res)=>{
    try{
        let ab;
        let result= await Group.find({_id:req.params.id},
            {
                // $pull:{
                //     participants:[{
                //         // member:req.body.participants
                //     }]
                // }
            });
            // console.log("r1 is ",result[0].participants);
            for(let i=0;i<result[0].participants.length;i++){
                // console.log("inside for ", result[0].participants[i].member);
                if(result[0].participants[i].member == req.body.participants){
                    console.log("inside if ",result[0].participants[i].member, " i ",i);
                    ab=result[0].participants[i].member;
                    
                }
                else{
                    console.log("inside else ",result[0].participants[i].member," and ",req.body.participants);
                }
            }
            console.log("ab is ",ab);
            // console.log("ab is ",result[0].participants[ab]);
            // result[0].participants[ab].remove();
            // console.log("gp is ",Group.result);
            const result1=await Group.findOneAndUpdate({_id:req.params.id},{
                $pull:{
                    participants:{
                        member:ab
                    }
                }
            })
            result1 ? res.status(200).send({
                success:true,message:"group members leave  ",res:result1
            }):
            res.status(422).send({
                success:false,message:'group members not leave'
            })
            // console.log("check result@@@@@@@@@@@ ",result.participants);
    }
    catch{
        console.log("catch err in leave group........");
        res.send(err);
    }
},

lastMsg: async (req,res)=>{
    try{
        const result = await Group.findByIdAndUpdate({_id:req.params.id},{
            $set:{
                lastmsg:req.body.msg
            }
        })
        result ? res.status(200).send({
            success:true,message:"get last msg  ",res:result
        }):
        res.status(422).send({
            success:false,message:'last msg not get'
        })
    }
        catch{
        console.log("catch err getting last msg........");
        res.send(err);
        }
},

addPrivateGroup: async(req,res)=>{
    try{
        // let newGroup = new Group(req.body);
        console.log("req.body",req.body)
        console.log("req.body.participants",req.body.participants[0].member);
        let newGroup= new Group({
            groupName:req.body.groupName,
            createdBy:req.body.createdBy,
            date:req.body.date,
            participants:[{
                member:req.body.participants[0].member
            }
          ]
        } 
        )
        console.log("req.body.groupName",req.body.groupName)
        const result = await newGroup.save();

            result ? res.status(200).send({
                success:true,message:"group members are  ",res:result
            }):
            res.status(422).send({
                success:false,message:'group members not inserted'
            })
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@22");
        }
    catch{
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("catch err is.....");
        res.send(err);
    }
},

// getGroupsExceptOne: async(req,res)=>{
//     try{
//         const result =await Group.find({_id:req.params.id})
//         console.log('result',result[0].participants[0].member);
//         const r1=result[0].participants;
//         result ? res.status(200).send({
//             success:true,message:"all Groups",res:r1
//         }):
//         res.status(422).send({
//             success:false,message:'not getting any group'
//         });
//     }catch(err){
//         console.log(err);
//         res.send(err);
//     }
// }
}              

