const express=require("express");
const bodyParser=require("body-parser")
const app=express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.set("view engine","ejs");
items=["Take a bath","Breakfast","Study"]

app.get("/",function(req,res){
var today= new Date();
var options={
  weekday: "long",
  day:"numeric",
  month:"long"
}

date_name=today.toLocaleDateString("en-US",options)


res.render("list",{

  dat:date_name,
  page_item:items,
})

})

app.post("/add",function(req,res){

  var item=req.body.adder;
  items.push(item)
  res.redirect("/")

})

app.listen(3000,function(){

  console.log("Server is up and ready !")
})
