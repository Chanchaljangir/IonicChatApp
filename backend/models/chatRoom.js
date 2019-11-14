const mongoose = require('mongoose');
const User = require('./user');
var Schema =mongoose.Schema;
const ChatRoomSchema =mongoose.Schema({
user_id:{
    type:Schema.Types.ObjectId, 
    ref:'User'
},
friends_id:{
    type:Schema.Types.ObjectId, 
    ref:'User'
},
lastMsg:{
    type:String
}
});
const ChatRoom =module.exports = mongoose.model('ChatRoom',ChatRoomSchema);