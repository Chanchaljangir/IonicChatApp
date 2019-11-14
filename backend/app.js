const express =require('express');
const app = express();
const mongoose = require('mongoose');
const router = express();
const route = require('./routes/route');
const config = require('./config/database');
// const bodyparser = require('body-parser');
const passport=require('passport');
const bcrypt=require('bcryptjs');
const path=require('path');
const cors=require('cors');

var http= require('http');
var server= http.createServer(app);
const Chat = require('./models/chat');
const Group= require('./models/group');
// var io=require('socket.io')(3000);
var io=require('socket.io').listen(server);
const port=3000;
const hostname = '172.21.177.138';

server.listen(port,()=>{
    console.log('server start at port ', port);
})
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
//   });

mongoose.connect(config.database,{ useNewUrlParser:true });
app.use(cors());
app.use(express.json());


// on error
mongoose.connection.on('error',(err)=>{
    console.log('database error',err);
});



// on connection
mongoose.connection.on('connected',()=>{
    console.log('database connected: ' +config.database);
});
// when database is disconnected
mongoose.connection.on('disconnected',()=>{
    console.log('database disconnected');
});

// app.use(bodyparser.json());

// for implementing routes
app.use('/api',route);

// for implementing routes for checking routes is working of not
app.get('/',(req,res)=>{
    res.send('hello');
});

//passport Middelware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);



    // Connect to Socket.io
io.on('connection',(socket)=>{
        // let chats= new Chat();
    // let chat = db.Chat;

//get message for join group
    socket.on('new_joinee',(data)=>{
        console.log("user select gp is ", data);
        console.log("selected gp name is ", data.group_name);
        socket.join(data.group_id);
        //notify everybody-
        // socket.broadcast.emit('new user join

        //add participants in group
        // router('/api/addMembers/:id').put(Group.addParticipants);

        //notify to paticular group
        socket.broadcast.to(data.group_id).emit('new user join',{
            msg: data.name +' successfully join '+ data.group_name,
            user:data.name,
            group_id:data.group_id,
            date: new Date()
        })
    })

//leave the group
    socket.on('leave group',(data)=>{
        console.log("user leave group is ", data);
        socket.broadcast.to(data.group_id).emit('left group',{
            msg: data.name +' left the group '+ data.group_name,
            user:data.name,
            date: new Date()
        })
        socket.leave(data.group_id);
    })

//send msg or start chat
socket.on('chatting',(data)=>{
    console.log('start messeging ',data);

     //listen on typing
    //  socket.to('typing', (data) => {
        // io.to(data.group_id).emit('typing', {
        //     msg: data.user_id + 'typing...',
        //     // user : data.user_id
        //     })
    // });
    io.in(data.group_id).emit('newMessage',{
        msg:data.msg,
        user:data.user_id,
        group_id:data.group_id,
        msgType:data.msgType, 
        date: new Date()
    })

    //msg store in database
    let chat=new Chat({
        fromUser:data.user_id, 
        msg: data.msg,
        groupId: data.group_id,
        Date: new Date(),
        msgType:data.msgType
    });
    let res=chat.save();
    // Group.findByIdAndUpdate({_id:data.group_id},{
    //     $push:{
    //         lastmsg:data.msg
    //     }});
        
    // Group.save();
    console.log("res is############");
    // socket.in(data.group).broadcast.emit('serverSide_Start Chat',{
    //     msg: data.msg,
    //     user:data.name,
    //     date: new Date()
    // })
})
//typing user show
socket.on('typing',(data)=>{
    console.log('user type',data);
    socket.broadcast.to(data.group_id).emit('type',{
        msg:data.user_username+' typing...',
        user_id:data.user_id,
        group_id:data.group_id,
        check:data.check
    })
})
})
// })

//private Chat socket
io.on('connection',(socket)=>{
    console.log("ïnside private chat");

//get message for selected friends
// socket.on('selected_fri',(data)=>{
//     console.log("user select friend is ", data);
//     console.log("selected friend name is ", data.fri_id);
//     socket.join(data.fri_id);
//     socket.broadcast.to(data.fri_id).emit('friend',{
//         msg: data.name +' successfully join '+ data.fri_name,
//         user:data.name,
//         fri_id:data.fri_id,
//         date: new Date()
//     })
// })
    socket.on('privateChatting',(data)=>{
        console.log('start private messeging ',data);
            //private chat messeging start
            io.emit('privateChatMsg',{
                user_id:data.user_id,
                msg:data.msg,
                toUser:data.toUser,
                msgType:data.msgType,
                date:new Date
                });
            console.log("private chat.......");

            //msg store in database
            let chat=new Chat({
                fromUser:data.user_id, 
                msg: data.msg,
                toUser: data.toUser,
                Date: new Date(),
                msgType:data.msgType
            });
            let res=chat.save();
        
    })
//typing private user show
socket.on('privatetyping',(data)=>{
    console.log('user type',data);
    socket.broadcast.emit('privatetype',{
        msg:data.user_username+' typing...',
        user_id:data.user_id,
        fri_id:data.group_id,
        check:data.check
    })
})
})

