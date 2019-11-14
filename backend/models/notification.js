const mongoose = require('mongoose');
const User = require('./user');
var Schema =mongoose.Schema;
const NotificationSchema =mongoose.Schema({
    fromUser: {
        type:Schema.Types.ObjectId, 
        ref:'User'
    },
    toUser:{
        type:Schema.Types.ObjectId, 
        ref:'User'
    },
    group_id:{
        type:Schema.Types.ObjectId,
        ref:'Group'
    },
    notification:{
      type:Number
    }
});
const Notification =module.exports = mongoose.model('Notification',NotificationSchema);


