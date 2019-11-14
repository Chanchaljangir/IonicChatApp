const mongoose = require('mongoose');
const User = require('./user');
var Schema = mongoose.Schema;
const GroupSchema =mongoose.Schema({
    participants: [{
      member:{type:Schema.Types.ObjectId, 
      ref:'User'},
      date:Date
      }],
      groupName: {  
        type: String,
        // required: [true,'Group Name is required'],
      },
      createdBy:{
        type:String,
      },
      isPrivate:{
        type: Boolean, 
        // required:true
      },
      date: { 
        type: Date
      },
      lastmsg:{
        type:String
      },
      private:{
        type:Boolean,
        default:false
      }
}); 
const Group =module.exports = mongoose.model('Group',GroupSchema);


