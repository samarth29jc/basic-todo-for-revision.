const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
const Usermodel=require("./model/Users")
dotenv.config();

const app=express();
const port=3001;
app.use(cors());
app.use(express.json());
// console.log("Mongo URI:", process.env.URI); // This should not be undefined



mongoose.connect(process.env.URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
  
  
  app.get('/',(req,res)=>{
    Usermodel.find({})
    .then(users=>res.json(users))
    .catch(err=>res.json(err));
  })

  app.get('/getUsers/:id',(req,res)=>{
    const id=req.params.id;
   Usermodel.findById({_id:id})
   .then(users=>res.json(users))
   .catch(err=>res.json(err))
  }
  )

  app.post('/create',(req,res)=>{
    Usermodel.create(req.body)
    .then(users=> res.json(users))
    .catch(err=>res.json(err))
  })
    
 app.put('/updateUser/:id',(req,res)=>{
  const id=req.params.id;
  Usermodel.findByIdAndUpdate(id,{name:req.body.name,email:req.body.email,age:req.body.age})
  .then(users=>res.json(users))
  .catch(err=>res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
const id =req.params.id;
Usermodel.findByIdAndDelete(id)
.then(users=>res.json(users))
.catch(err=>res.json(err))

})
 

app.listen(port,()=>{console.log("Chaal rha tera server")})