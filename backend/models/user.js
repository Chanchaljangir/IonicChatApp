const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt=require('bcryptjs');
var Schema =mongoose.Schema;
const UserSchema =mongoose.Schema({
    username: {
      type: String,
      required: [true,'username is required']
    //   unique: true
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique: true
    },
    password: {
      type: String,
      required: [true,'Password is required']
    },
    chattype:{
        type:String,
        // required:[true, 'chat category is required']
    },
    phone:{
        type: Number
    },
    location:{
        type: String
    },
    status:{
        type: String
    },
    image:{
        type: String
    },
    online:{
        type: Boolean,
        default: false
    }
});
const User =module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById= function(id,callback){
    User.findById(id,callback); 
}

module.exports.getUserByEmail=function(email,callback){
    const query={email: email};
    User.findOne(query, callback);
}

// module.exports.addUser=function(newUser,callback){
//     console.log("###########################################");
//     bcrypt.genSalt(10, (err,salt)=>{
//         bcrypt.hash(newUser.password,salt,(err, hash)=>{
//             console.log("password..........", newUser.password);
//             if(err){
//                 console.log("add user err##########");
//                 throw err;
//             } 
//             newUser.password=hash; 
//             newUser.save(callback);
//         });
//     });
// }
module.exports.comparePassword=function(candidatePasword, hash,callback){
    bcrypt.compare(candidatePasword, hash, (err, isMatch)=>{
        if(err)throw err;
        callback(null, isMatch);
    });
} 

// module.exports.updateUserProfile=function(adddata, callback){
//     console.log("export profile");
//     adddata.save(callback);
// }
