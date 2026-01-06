
const express =require("express");
const app=express();
const cors = require('cors')


const corsOptions = {
  origin: 'http://localhost:5173',
  methods:"POST,PUT,GET,DELETE,PATCH,",
  Credential:true,

};

require("dotenv").config();
const Port=process.env.PORT ||3000

//  middleware
app.use(express.json());
app.use(cors(corsOptions))







//db connect
const {connectWithDatabase}=require("./Config/database");
connectWithDatabase()


const mount=require("./Routes/userRoutes")
//mounting 
app.use("/api/v1/",mount)

app.listen(Port,()=>{
    console.log(`server start at ${Port}`)
});



// home route
app.get("/",(req,res)=>{
    res.send(`<h2>home page</h2>`)
})




