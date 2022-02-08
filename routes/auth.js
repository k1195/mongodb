const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')

const bcrypt = require('bcryptjs')
const requireLogin = require('../middleware/requirelogin')

// router.get('/',(req,res)=>{
//     res.send("helo")
// })


router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello user")
})

router.post('/signup',(req,res)=>{
   const {name,email,password} = req.body
   console.log(req)
   if(!email || !password || !name){
       return res.status(422).json({error:"please input all the fields"})
   }
   // res.json({message:"succesfully posted"})
   User.findOne({email:email})
   .then((savedUser)=>{
       if(savedUser){
        return res.status(422).json({error:"user alredy exist"})
       }
       bcrypt.hash(password,12)
       .then(hashedpasword=>{
        const user = new User({
            email,
            password:hashedpasword,
            name
        })
        user.save()
        .then(user=>{
            res.json({message:"saved successfully"})
        })
        .catch(err=>{
            console.log(err)
        })
       })
   })
   .catch(err=>{
       console.log(err)
   })
})
router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(422).json({error:"please provide email / password"})
    } 
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"success login"})
            const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
            const {_id,name,email} = savedUser
            res.json({token,user:{_id,name,email}})
                    
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })                                                                                                                                         
        .catch(err=>{
            console.log(err)
        })
    })
})
module.exports = router