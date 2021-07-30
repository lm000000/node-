let mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/7-28xiangmu")

let schema = mongoose.Schema

let userSchema = new schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

let User=mongoose.model("Users",userSchema)

module.exports=User

