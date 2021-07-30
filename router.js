let express=require("express")
let router=express.Router()
let User=require("./userDataBase")
let Commit=require("./commitDatabase")
let index=0
let id=""
let pages={
  index:1,
  mun:1,
  flag:2
}
let testUser=false

let path=require("path")
let formidable=require("formidable")

router.post("/file",(req,res)=>{
  let formidable1=new formidable.IncomingForm()
  formidable1.uploadDir=path.join(__dirname,"/public/img")
  formidable1.keepExtensions=true
  formidable1.parse(req,function(error,fields,files){
    res.send(files.name.path.split("node")[1])
  })
})


router.get("/",(req,res)=>{
  res.render("denlu.html")
})

router.get("/denlu",(req,res)=>{
    User.find(function (error,data) {
        if(error){
          console.log("查询失败")
        }else {
          if(data.length===0){
            res.send("验证失败")
          }else{
            console.log(data)
            for(let i=0;i<data.length;i++){
            if(req.query.username===data[i].username){
              testUser=true
            }
          }
          if(testUser){
            req.session.username=req.query.username
            res.send("验证成功")
            testUser=false
          }else{
            res.send("验证失败")
        }
          }
        }
      })
    })

    /* 注意在此我没有验证注册用户的唯一性    */
router.get("/zhuce",(req,res)=>{
 let admin=new User({
    username:req.query.username,
    password:req.query.password
   })
admin.save(function (error,data) {    
    if(error){
      console.log("增加失败")
    }else {
      console.log("增加成功")
    }
  })
User.find(function (error,data) {
    if(error){
      console.log("查询失败")
    }else {
      console.log("查询成功")
    }
  }) 
  res.send("注册成功")
}) 

router.get("/shouye",(req,res)=>{   
  Commit.find(function (error,data) {
    if(error){
      console.log("查询失败")
    }else {
      console.log("查询成功")
      pages.num=Math.ceil(data.length/pages.flag)
      if(pages.index===1){
         fenYeData= data.slice(0,pages.flag*pages.index)  
      }else{
       fenYeData=data.slice(pages.flag*pages.index-pages.flag,pages.flag*pages.index)          
      }
      res.render("shouye.html",{
        commit:fenYeData,
        username:req.session.username,
        index:index,
        pages:pages,
      })
    }
  })     
})

router.get("/pagesIncrease",(req,res)=>{
  pages.index++
  if(pages.index<=0||pages.index>pages.num){
    pages.index=pages.num
    res.send("失败")
  }
  res.send("成功")
})

router.get("/pagesInduce",(req,res)=>{
  pages.index--
  if(pages.index<=0||pages.index>pages.num){
    pages.index=1
    res.send("失败")
  }
  res.send("成功")
})

router.get("/publish",(req,res)=>{
  res.render("publish.html",{
    username:req.session.username
  })
})

/* 发表评论有一个小bug   就是第一次发表的时候跳转不了 之后发表就可以跳转 */
router.get("/publishData",(req,res)=>{   
  let admin2=new Commit({
    username:req.session.username,
    time:req.query.date,
    content:req.query.content
   })
admin2.save(function (error,data) {    
    if(error){
      console.log("增加失败")
    }else {
      console.log("增加成功")
      res.send("成功")
    }
  })
})

router.get("/update",(req,res)=>{
     id=req.query.id,
     res.render("genxin.html",{
       username:req.session.username
     })
})

router.get("/updateData",(req,res)=>{
   Commit.findByIdAndUpdate(
     id.replace(/"/g,""),req.query,(error,data)=>{
     if(error){
       console.log(error)
     }else{
       console.log("更新成功")
     }
  })
  res.send("成功")
})


router.get("/remove",(req,res)=>{
  Commit.remove({
  "_id":req.query.id.replace(/"/g,"")
  },(error,data)=>{
    if(error){
      console.log("删除失败")
    }else{
      console.log("删除成功",data)
    }
  })
  res.redirect("/shouye")
})


module.exports=router
