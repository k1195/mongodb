const express = require("express")
const app = express()
const mongoose = require('mongoose')
const PORT = 5000.
const {MONGOURI} = require('./keys')
var cors = require('cors')



mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log("connecte to db")
})
mongoose.connection.on('err',(err)=>{
    console.log("err connected to db",err)
})


require('./models/user')

require('./models/post')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({credentials:true,origin:true}))
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


app.listen(PORT,()=>{
    console.log("server is running on" , PORT)
})


// const customMiddle = (req,res,next)=>{
//     console.log("middleware exec")
//     next()
// }
// app.use(customMiddle)

// app.get('/home',(req,res)=>{
//     res.send("hello world")
// })