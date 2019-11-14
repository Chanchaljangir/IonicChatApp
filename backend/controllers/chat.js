// const Chat = require('../models/chat');
// const mongoose = require('mongoose');
// const config = require('../config/database');
// var http= require('http');
// const express =require('express');
// const app = express();
// var server= http.createServer(app);
// // var io=require('socket.io')(3000);
// var io=require('socket.io').listen(server);
// const port=3000;

// // router.post('/chat', (req,res,next)=>{
// // mongoose.connect(config.database,{ useNewUrlParser:true },function(err,db){
// //     if(err){
// //         throw err;
// //     }

// //     console.log('Database connected...');

// //     // Connect to Socket.io
// //     io.on('connection', function(socket){
// //         let chat = new Chat(req.body);

// //         // Create function to send status
// //         sendStatus = function(s){
// //             socket.emit('status', s);
// //         }

// //         // Get chats from mongo collection
// //         chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
// //             if(err){
// //                 throw err;
// //             }

// //             // Emit the messages
// //             socket.emit('output', res);
// //         });

// //         // Handle input events
// //         socket.on('input', function(data){
// //             let name = data.name;
// //             let msg = data.msg;

// //             // Check for name and message
// //             if(name == '' || msg == ''){
// //                 // Send error status
// //                 sendStatus('Please enter a name and message');
// //             } else {
// //                 // Insert message
// //                 chat.insert({fromUser: name, msg: msg}, function(){
// //                     io.emit('output', [data]);

// //                     // Send status object
// //                     sendStatus({
// //                         msg: 'Message sent',
// //                         clear: true
// //                     });
// //                 });
// //             }
// //         });

// //         // Handle clear
// //         socket.on('clear', function(data){
// //             // Remove all chats from collection
// //             chat.remove({}, function(){
// //                 // Emit cleared
// //                 socket.emit('cleared');
// //             });
// //         });
// //     });
// // });
// // })

// module.exports ={
//     startChat : async(req,res)=>{
//         console.log("chatting works.........");
//         try{
//             io.on('connection',(socket)=>{
//                 console.log("socket works...........");
//                 // (req,res)=>{
//                     console.log("in req field.........");
//                 let chat = new Chat(req.body);
//                 console.log('Socket opened............................');
//             //get message for join group
//                 socket.on('new_joinee',(data)=>{
//                     console.log("user select gp is ", data);
//                     socket.join(data.group);
//                     //notify everybody-
//                     // socket.broadcast.emit('new user join
            
//                     //notify to paticular group
//                     // socket.in(data.group).broadcast.emit('new user join',{
//                     //     joinmsg: data.name +' successfully join '+ data.group,
//                     //     user:data.name,
//                     //     date: new Date()
//                     // })
//                     socket.broadcast.to(data.group).emit('new user join',{
//                         msg: data.name +' successfully join '+ data.group,
//                         user:data.name,
//                         date: new Date()
//                     })
//                 })
            
//             //leave the group
//                 socket.on('leave group',(data)=>{
//                     console.log("user leave group is ", data);
//                     socket.broadcast.to(data.group).emit('left group',{
//                         msg: data.name +' left the group '+ data.group,
//                         user:data.name,
//                         date: new Date()
//                     })
//                     socket.leave(data.group);
//                 })
            
//             //send msg or start chat
//             socket.on('chatting',(data)=>{
//                 console.log('start messeging ',data);
//                  //listen on typing
//                  socket.on('typing', (data) => {
//                     socket.broadcast.emit('typing', {user : name})
//                 });
//                 chat.insert({user: name, msg: data.msg,Date:new Date()},function(){
//                 io.in(data.group).emit('newMessage',{
//                     msg:data.msg,
//                     user:data.name,
//                     date: new Date()
//                 })
//             });
//                 // socket.in(data.group).broadcast.emit('serverSide_Start Chat',{
//                 //     msg: data.msg,
//                 //     user:data.name,
//                 //     date: new Date()
//                 // })
//             })
//                 // }
//             })
//         }
//         catch{
//             console.log("catch err...", err);
//             res.send(err);
//         }
//     }
// }
const Chat = require('../models/chat');
module.exports ={
getChat: async(req,res)=>{
    try{
        const result =await Chat.find();
        console.log('result',result);
        result ? res.status(200).send({
            success:true,message:"all group chats are",res:result
        }):
        res.status(422).send({
            success:false,message:'not getting any old chat'
        });
    }catch(err){
        console.log(err);
        res.send(err);
    }
},
getLastMsg: async(req,res)=>{
    try{
        // const result = await Chat.findById({_id:req.params.id},
        //     {
        const result= await Chat.aggregate(
                    [
                        // Matching pipeline, similar to find
                        // { 
                        //     $match: { 
                        //         groupId:req.params.id
                        //     }
                        // },
                        // Sorting pipeline
                        { 
                            $sort: { 
                                Date:-1 
                            } 
                        },
                        // Grouping pipeline
                        {
                            $group: {
                                _id: "$groupId",
                                msg: {
                                    $first: "$msg" 
                                },
                                groupId:{
                                    $first: "$groupId"
                                }
                            }
                        },
                        // // Project pipeline, similar to select
                        {
                             $project: { 
                            //    _id:0,
                            // groupId:1,
                                // _id: "$groupId",
                                groupId: 1,
                                msg: 1
                            }
                        }
                    ]
                 
                );
            // })
        // console.log('result of last msg........',result);
        result ? res.status(200).send({
            success:true,message:"last msg is ",res:result
        }):
        res.status(422).send({
            success:false,message:'last msg not getting'
        });
    }
    catch{
        console.log("catch err in getting last msg........");
        res.send(err);
    }
},

deleteChat: async(req,res)=>{
    try{
        const result= await Chat.find({groupId:req.params.id},
            {

            }).remove()
            
            result ? res.status(200).send({
                success:true,message:"group msg deleted ",res:result
            }):
            res.status(422).send({
                success:false,message:'msg not deleted'
            });
            // console.log("resulit._id ", result);
        // const result1= await Group.find({groupId:req.params.id})
    
        }
        catch{
            console.log("catch err in delete chat........");
            res.send(err);
        }
}

}