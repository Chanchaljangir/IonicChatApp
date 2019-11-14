const User = require('../models/user');
const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
module.exports ={
    addUser : async(req,res)=>{
        try{
            let newUser = new User(req.body);
            console.log("data is is..........", newUser);
            
            const password = newUser.password
            const saltRounds = 10;
          newUser.password = await bcrypt.hash(password,10);
            console.log("hashed passs ...........",newUser.password);
            console.log("resullt is..........", newUser);
            const result= await newUser.save();
            
            const token=jwt.sign(newUser.toJSON(),config.secret,{
                expiresIn: 604800 //1 week 
            });
            result ? res.status(200).send({
               
                success:true,message:'user registered',res:({token:'JWT '+ token,     
                             user:{
                                 id:newUser._id,
                                 username:newUser.username,
                                 email:newUser.email,
                                //  chattype:newUser.chattype
                             }})
            }): 
            res.status(422).send({success:false,
                message:'fail to register',res:result      
    });
}
catch(err){
            console.log(err);
            res.send(err);
        }
},
getUsers: async(req,res)=>{
    try{
        const result =await User.find();
        console.log('result is........',result);
        result ? res.status(200).send({
            success:true,message:"all Users",res:result
        }):
        res.status(422).send({
            success:false,message:'not getting any user'
        });
    }catch(err){
        console.log("catch err is........",err);
        res.send(err);
    }
},

getProfile: async(req, res)=>{
    try{
        const result= await User.find({_id:req.params.id});
        console.log('result is........',result);
        result ? res.status(200).send({
            success:true,message:"Users Profile data is ",res:result
        }):
        res.status(422).send({
            success:false,message:'profile not getting'
        });
    } 
    catch{
        console.log("catch err in get user profile........",err);
        res.send(err);
    }
},

updateProfile: async(req,res)=>{
    try{
        console.log("id is ",req.params.id);
        if(req.body.password != undefined){
            console.log("When body.password not null");

            // hash password
            console.log("password is ccccccccccccccccccc:  ",req.body.password);
            var passcheck=req.body.password;
            await bcrypt.genSalt(10, (err,salt)=>{
               bcrypt.hash(passcheck,salt,(err, hash)=>{
                    if(err) throw err;
                    passcheck=hash; 
            console.log("aaaaaaaaaaaaaaaaa  ",passcheck);
            // hasd passworde end

           const result= User.findOneAndUpdate({_id:req.params.id},
                {
                    $set:{
                        password:passcheck,
                    }
                }
            );
            result ? res.status(200).send({
                success:true,message:"Users Profile data is ",res:result
            }):
            res.status(422).send({
                success:false,message:'profile not getting'
            })
        });
    });
    }
    //if end
    else{
        console.log("When body.password is null");
        const result1= await User.findOneAndUpdate({_id:req.params.id},
            {
                $set:{
                    username:req.body.username,
                    email: req.body.email,
                    phone:req.body.phone, 
                    location:req.body.location,
                    status: req.body.status,
                    // chattype:req.body.chattype
                }
            }
        );
        result1 ? res.status(200).send({
            success:true,message:"Users Profile data is updated successfully ",res:result1
        }):
        res.status(422).send({
            success:false,message:'profile not getting'
        })
    }
}
    catch{
        console.log("catch err in get user profile update........",err);
        res.send(err);
    }
},

imageUpload:async(req,res)=>{
    try{
        console.log("id is ",req.params.id);
            console.log("When user uplaod image");
           const result= await User.findOneAndUpdate({_id:req.params.id},
                {
                    $set:{
                        image:req.body.image
                    }
                }
            );
            result ? res.status(200).send({
                success:true,message:"Users Profile data is ",res:result
            }):
            res.status(422).send({
                success:false,message:'profile not getting'
            })
    }
catch{
    console.log("catch err in get while image uplaod ........");
    res.send(err);
}
},
patchOnlineUsers : async(req,res)=>{
    try{
        const result = await User.findByIdAndUpdate({_id:req.params.id},{
            $set:{
                online:true
            }
        })
        result ? res.status(200).send({
           
            success:true,message:'online users are:',res:result
        }): 
        res.status(422).send({success:false,
            message:'fail to get online users',res:result      
});
}
catch(err){
        console.log(err);
        res.send(err);
    }
},
makeOfflineUser:async(req,res)=>{
try{
    const result= await User.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            online: false
        }
    })
    result ? res.status(200).send({
        success:true,message:"user offline",res:result
    }):
    res.status(422).send({
        success:false,message:'offline user(online user not deleted)'
    });
}catch(err){
    console.log("offline user err");
    res.send(err);
}
},
getOnlineUsers: async(req,res)=>{
try{
    const result=await User.find()
    result? res.status(200).send({
        success:true,message:"online users are get",res:result
    }):
    res.status(422).send({
        success:false,message:'online users are not getting'
    });
}catch(err){
    console.log("online getting user err");
    res.send(err);
}
}
}

//     User.getUserByEmail(email, (err, user)=>{
//         if(err) throw err;
//         if(!user){
//             return res.json({success: false, msg:'User not found, try again'});
//         }
//         User.comparePassword(password, user.password,(err,isMatch)=>{
//             if(err){
//                throw err; 
//             }  
//             console.log("user pass  ",user.password);
//             console.log(password);
//             console.log("dhgfghjfjgkj  ",isMatch);
//             if(isMatch){
                
//                 const token=jwt.sign(user.toJSON(),config.secret,{
//                     expiresIn: 604800 //1 week 
//                 });
//                 res.json({
//                     success:true,
//                     token:'JWT '+ token,     
//                     user:{
//                         id:user._id,
//                         username:user.username,
//                         email:user.email
//                     }
//                 });
                
//             }
//             else{
//                 return res.json({success:false, msg:'Wrong Password'});
//             }
//         });

//     });
// });




module.exports.getUserByEmail=function(email,callback){
    const query={email: email};
    User.findOne(query, callback);
}
module.exports.comparePassword=function(candidatePasword, hash,callback){
    bcrypt.compare(candidatePasword, hash, (err, isMatch)=>{
        if(err)throw err;
        callback(null, isMatch);
    });
} 

