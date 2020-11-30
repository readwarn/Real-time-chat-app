var express=require('express');
const Authenticator=require('../middleware/authware');
const channel = require('../models/channel');
var router=express.Router();
var Channel=require('../models/channel');
var Message=require('../models/message');

router.get('/',(req,res)=>{
    Channel.find({},function(err,channels){
        if(err){
            res.send('error finding channels')
        }else{
            res.json(channels)
        }
    })
})

router.get('/name/:name',(req,res)=>{
    Channel.findOne({name:req.params.name},function(err,foundchannel){
        if(err){
           res.send('oops')
        }
        else{
            res.json(foundchannel);
        }
    })
})

router.get('/:id',(req,res)=>{
     Channel.findById(req.params.id)
     .populate('members')
     .populate('messages')
     .exec(function (err, channel) {
        if(err){
            res.json({
                notFound:true
            })
        }else{
            res.json(channel);
        }
   });
});

router.post('/welcome',(req,res)=>{
    Channel.create({},function(err,channel){
        if(err){
            res.send('error bitch');
        }else{
            
        }
        res.json(channel);
    });
});

router.put('/welcome/edit',(req,res)=>{
    Channel.findById('5fc52db79aa9fb091c81c332',function(err,channel){
        channel.name='Welcome';
        channel.description='This is the chat-app welcome channel. New users are automatically added here. Introduce yourself and have fun';
        channel.save();
        res.json(channel);
    })
})

router.post('/',Authenticator.isLoggedIn,(req,res)=>{
    Channel.findOne({name:req.body.name}).then(fc=>{
        if(fc){
           res.json({nameTaken:true})
        }
        else{
            Channel.create(req.body)
            .populate('members')
            .populate('messages')
            .exec(function(err,channel){
                if(err){
                    res.send('error creating new channel')
                }else{
                    channel.members.push(req.user);
                    channel.save();
                    req.user.channels.push(channel);
                    req.user.save();
                    res.json(channel);
                }
            })
        }
    })
})
router.delete('/:id',Authenticator.isLoggedIn,(req,res)=>{
    Channel.findById(req.params.id).then(foundChannel=>{
        req.user.channels.forEach((channel,index) => {
            if(channel._id.equals(foundChannel._id)){
                req.user.channels.splice(index,1);
                req.user.save();
            }
        });
        foundChannel.members.forEach((member,index)=>{
            if(member._id.equals(req.user._id)){
                foundChannel.members.splice(index,1);
                foundChannel.save();
            }
        });
        res.send('user removed from channel');
    })
 })

 router.post('/:id',Authenticator.isLoggedIn,(req,res)=>{
    Channel.findById(req.params.id)
    .populate('members')
    .populate('messages')
    .exec(function(err,foundChannel){
        if(err){
            res.send('error finding channel')
        }else{
            let found=false;
            foundChannel.members.forEach(member => {
              if(member.equals(req.user._id)){
                 found=true;
                 return res.json({
                    isHere:true,
                 })
              }
            });
            if(!found){
                foundChannel.members.push(req.user);
                foundChannel.save();
                req.user.channels.push(foundChannel);
                req.user.save();
                res.json({
                    isHere:false,
                    foundChannel:foundChannel
                })
             } 
        }
    })
 })

router.post('/:id/messages',Authenticator.isLoggedIn,(req,res)=>{
    Message.create(req.body,function(err,message){
        if(err){
            res.send('error sending message')
        }else{
            message.owner.id=req.user._id;
            message.save();
            Channel.findById(req.params.id,function(err,channel){
                if(err){
                    res.send('error finding channel');
                }else{
                    channel.messages.push(message);
                    channel.save();
                    res.send(message);
                }
            })
        }
    })
})

module.exports=router;
