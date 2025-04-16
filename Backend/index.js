const express = require("express");
require("./database/config");
const users = require("./database/user");
const cors = require("cors");
const product = require("./database/product");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new users(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result);
});


app.post("/login", async (req, resp) => {
    if(req.body.email && req.body.password){
        let data = await users.findOne(req.body).select("-password");

        if(data){
            resp.send(data);
        }else{
            resp.send("user not found");
        }
    }else{
        resp.send("user not found");
    }
    
});


app.post("/add-product", async(req, resp)=>{
    let data = new product(req.body);
    let result = await data.save();
    resp.send(result);
})


app.get("/products", async(req, resp)=>{
    let data = await product.find();
    if(data.length>0){
        resp.send(data);
    }else{
        resp.send({result:"no product found"});
    }
})


app.delete("/product/:id", async(req, resp)=>{
    const data = await product.deleteOne({_id:req.params.id});
    resp.send(data);
})



app.listen(5000);
