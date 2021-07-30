
let express=require("express")
let app=express()
let router=require("./router")
let session=require("express-session")

app.engine("html",require("express-art-template"))
app.set("views","./public/")

app.use(session({      
    secret: '7-28xiangmu',
    resave: false,
    saveUninitialized: true
  }))

app.use("/public/",express.static("./public/"))
app.use(router)


app.listen(3000,()=>{
    console.log("runing")
})
