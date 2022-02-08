const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requirelogin')
const Post = mongoose.model("Post")
const User = mongoose.model("User")


router.get('/user/:id',(req,res)=>{
    User.findOne({id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    }).catch(err=>{
        return res.status(404).json({error: "User not found"})
    })
})


router.put('/follow',(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(eq.user._id,{
            $push:{following:req.body.followId}
        },{
            new:true
        }).then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })})
})

router.put('/unfollow',(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(eq.user._id,{
            $pull:{following:req.body.unfollowId}
        },{
            new:true
        }).then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })})
})

module.exports = router