const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ChatSchema =mongoose.Schema({
    Date: { 
        type: Date,
        required: true
      },
      fromUser: {
        type:Schema.Types.ObjectId, 
        ref:'User',
        required: true
      },
      toUser:{
        type:Schema.Types.ObjectId, 
        ref:'User'
      },
      msg: {
        type: String,
        required: true
      },
      groupId: {
        type:Schema.Types.ObjectId,
        ref:'Group'
      },
      msgType:{
        type:String
      }
      // inChatRoom: {
      //   type: Boolean,
      //   required: false
      // },
}); 
const Chat =module.exports = mongoose.model('Chat',ChatSchema);