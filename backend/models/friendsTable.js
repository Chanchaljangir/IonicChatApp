const mongoose = require('mongoose');
const FriendsSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Types.ObjectId, 
        ref:'User',
        required:[true, 'userid is required']
    },
    friend_id:{ 
        type:mongoose.Types.ObjectId, 
        ref:'User',
    },  
    status:{
        type: Boolean,
        default: false
    },
    // friends_id:[{
    //     friendReq:[],
    //     status:[],
    //     required:[true, 'friends_id is required']
    // }]
});
const FriendsTable= module.exports= mongoose.model('Friendstable',FriendsSchema);