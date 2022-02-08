const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requirelogin')
const Post = mongoose.model("Post")


router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res)=>{
    console.log(req.body)
    const {title,body,url} = req.body
    if(!title || !body || !url){
        res.status(422).json({error:"Please add all the params"})
    }
    // console.log(req.user)
    //res.sendStatus("ok")
    req.user.password = undefined
         const post = new Post({
             title,
             body,
             url,
             postedBy:req.user
        })
        post.save().then(result=>{
            res.json({post:result})
        })
        .catch(err =>{
            console.log(err)
        })
})


router.get('/mypost',requireLogin,(req,res)=>{
    console.log(req)
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/like',requireLogin,(req,res)=>{
    console.log(req)
   Post.findByIdAndUpdate(req.body.postId,{
   $push:{likes:req.user._id}
},{
    new:true
}).exec((err,result)=>{
     if(err){
         return res.status(422).json({errror:err})
     }else{
         res.json(result)
     }
})
})

router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
    $pull:{likes:req.user._id}
 },{
     new:true
 }).exec((err,result)=>{
      if(err){
          return res.status(422).json({errror:err})
      }else{
          res.json(result)
      }
 })
 })

 router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }

    Post.findByIdAndUpdate(req.body.postId,{
    $push:{comments:comment}
 },{
     new:true
 })
 .populate("comments.postedBy","_id name")
 .exec((err,result)=>{
      if(err){
          return res.status(422).json({errror:err})
      }else{
          res.json(result)
      }
 })
 })

 

module.exports = router