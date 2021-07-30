let mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/7-28xiangmu")

let schema = mongoose.Schema

let userSchema = new schema({
    username:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }, 
   content:{
       type:String,
       required:true
   }
})

let Commit=mongoose.model("Commit",userSchema)

module.exports=Commit

