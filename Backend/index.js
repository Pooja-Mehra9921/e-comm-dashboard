const express = require("express");
const cors = require("cors");
const Jwt = require("jsonwebtoken");
const JwtKey = "e-comm"
require("./database/config");
const users = require("./database/user");
const product = require("./database/product");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new users(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({result}, JwtKey, {expiresIn:"2h"},(error, token)=>{
    if(error){
        resp.send("something went wrong. please try again after some time");
    }else{

        resp.send({result , auth:token});
    }
  })
});


app.post("/login", async (req, resp) => {
    if(req.body.email && req.body.password){
        let data = await users.findOne(req.body).select("-password");

        if(data){
            Jwt.sign({data},JwtKey,{expiresIn:"2h"},(error, token)=>{
            if(error){
            resp.send("Something went wrong, please retry after some time");

            }else{
                resp.send({data, auth:token});

            }
            })
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
});


app.get("/product/:id", async(req, resp)=>{
    const result = await product.findOne({_id:req.params.id})
    if(result){
        resp.send(result);
    }else{
        req.send({result:"no record found"})
    }
})

app.put("/update/:id", async(req, resp)=>{
    const updateProduct =await product.updateOne(
        {_id: req.params.id},
        { $set:req.body}
    )

    resp.send(updateProduct);
})


app.get("/search/:key", async(req, resp)=>{
    const result =await product.find({
        "$or":[
{name : {$regex: req.params.key}},
{category:{$regex: req.params.key}},
{company:{$regex: req.params.key}},
{price:{$regex: req.params.key}}
        ]
    });
    resp.send(result);
})


app.listen(5000);
