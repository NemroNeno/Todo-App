const express=require("express");
const bodyParser=require("body-parser")
const app=express()
const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://hello:1234@nemro.kwv2zor.mongodb.net/todoDB",{useNewUrlParser:true})

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.set("view engine","ejs");
const struct={

name:String

}

const list_schema={
name:String,
items:[struct]

}

const List=mongoose.model("list",list_schema)


const item=mongoose.model("item",struct)

const item1=new item({
  name:"Welcome to your Todo-List"
})

const item2=new item({
  name:"Hit the + button to add more tasks."
})


const item3=new item({
  name:"<-- Hit this to delete the item."
})

array_initial=[item1,item2,item3]



app.get("/",function(req,res){
var today= new Date();
var options={
  weekday: "long",
  day:"numeric",
  month:"long"
}


date_name=today.toLocaleDateString("en-US",options)


item.find({}).then(function(foundItems){
  res.render("list", {   dat:"Today",
    page_item: foundItems });
})
.catch(function(err){
  console.log(err);
});
})

app.post("/add",function(req,res){

  var data=req.body.adder;
  var list_name=req.body.list;

  atom=new item({
    name:data
  })
  if(list_name==="Today"){

    atom.save()
  res.redirect("/")


   }
   else{

     List.findOne({name:list_name})
     .then((docs)=>{



           docs.items.push(atom)
           docs.save()
           res.redirect("/"+list_name)

     })
  }


})

app.post("/delete",function(req,res){

    // idea=req.body.checkbox;
    // item.findByIdAndRemove(idea)
    // res.redirect("/")


    const checkedItemId = req.body.checkbox;
    const listed=req.body.list_name
    if(listed==="Today"){

      if(checkedItemId != undefined){
       item.findByIdAndRemove(checkedItemId)
      .then(()=>console.log(`Deleted ${checkedItemId} Successfully`))
      //.catch((err) => console.log("Deletion Error: " + err));
      res.redirect("/");
      }

    }

    else{

        List.findOne({name:listed})
        .then(function(found){

                found.items.pull({_id:checkedItemId})
                found.save();
                res.redirect("/"+listed)


        })

    }


})


app.get("/:hello",function(req,res){
    got_name=req.params.hello
    List.find({name:got_name})
    .then((docs)=>{

                 if(docs.length===0){

                      lista=new List({
                        name:got_name,
                        items:array_initial
                      })
                      lista.save()
                      res.render("list",{

                   dat:got_name,
                   page_item:lista.items

                      })



                 }
                 else{

                          res.render("list",{

                            dat:docs[0].name,
                            page_item:docs[0].items
                          })
                          console.log("Working as expected");

                     }

    })


})

app.listen(3000,function(){

  console.log("Server is up and ready !")
})
