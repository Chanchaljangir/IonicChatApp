const express =require('express');
const router = express();
const config=require('../config/database');
const passport=require('passport');
const jwt=require('jsonwebtoken');
// const User= require('../models/user');
// const Quiz=require('../models/class');
const bcrypt=require('bcryptjs');
// var quiz=require('../controllers/quiz');
const User= require('../controllers/user');
const Group= require('../controllers/group');
const Chat= require('../controllers/chat');
const FriendsTable= require('../controllers/friendsTable');
const Notification= require('../controllers/notification');
const ChatRoom= require('../controllers/chatRoom');
// Register User
router.route('/signup').post(User.addUser);
router.route('/getusers').get(User.getUsers);

//get user profile
router.route('/userprofile/:id').get(User.getProfile);
router.route('/profileupdate/:id').put(User.updateProfile);
router.route('/uploadimage/:id').patch(User.imageUpload);
router.route('/onlineUsers/:id').patch(User.patchOnlineUsers);
router.route('/offlineUser/:id').patch(User.makeOfflineUser);
router.route('/getOnlineUsers').get(User.getOnlineUsers);

//create new group
router.route('/addgroup').post(Group.addGroup);
router.route('/getgroup').get(Group.getGroup);
router.route('/addMembers/:id').patch(Group.addParticipants);
router.route('/getGroupMembers/:id').get(Group.getParticularGroup);
router.route('/leaveGroup/:id').patch(Group.leaveGroup);
router.route('/putlastmsg/:id').patch(Group.lastMsg);
router.route('/privateGroup').post(Group.addPrivateGroup);
// router.route('/getAllExceptOne/:id').get(Group.getGroupsExceptOne);
//chat
// router.route('/chatting').post(Chat.startChat);
router.route('/getchat').get(Chat.getChat);
router.route('/lastmsg').get(Chat.getLastMsg);
router.route('/deletechat/:id').delete(Chat.deleteChat);

// FriendsTable friend Request status
router.route('/sendrequest').post(FriendsTable.friConnectReq);
router.route('/getFrireq/:id').get(FriendsTable.getFrireq);
router.route('/getRequest').get(FriendsTable.getRequest);
router.route('/acceptReq/:id').patch(FriendsTable.confirmReq);

//Notification
router.route('/notification').patch(Notification.newNotification);
router.route('/putnotification/:id').patch(Notification.putNotification);
router.route('/getnotification').get(Notification.getNotification);
router.route('/deletenotification').patch(Notification.deleteNotification);
router.route('/patchGroupNotification/:id').patch(Notification.putGroupNotification);
router.route('/deleteGroupNotification').patch(Notification.deleteGroupNotification);
//chatRoom online users
// router.route('/onlineUsers').post(ChatRoom.putOnlineUsers);
// router.route('/offlineUser/:id').delete(ChatRoom.makeOfflineUser);
// router.route('/getOnlineUsers').get(ChatRoom.getOnlineUsers);
//User Login
// router.route('/authenticate').post(User.Authenticate);

//Autheticate login user
router.post('/authenticate', (req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    console.log("login password is: ",password);
    console.log("passssssss: ",User.password);
    User.getUserByEmail(email, (err, user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg:'User not found, try again'});
        }
        User.comparePassword(password, user.password,(err,isMatch)=>{
            if(err){
               throw err; 
            }  
            console.log("user pass  ",user.password);
            console.log(password);
            console.log("dhgfghjfjgkj  ",isMatch);
            if(isMatch){
                
                const token=jwt.sign(user.toJSON(),config.secret,{
                    expiresIn: 604800 //1 week 
                });
                res.json({
                    success:true,
                    token:'JWT '+ token,     
                    user:{
                        id:user._id,
                        username:user.username,
                        email:user.email,
                        chattype:user.chattype
                    }
                });
                
            }
            else{
                return res.json({success:false, msg:'Wrong Password'});
            }
        });

    });
});


module.exports = router; 