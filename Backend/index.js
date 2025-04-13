const express = require("express");
require("./database/config")
const users = require("./database/user")
const app = express();

app.use(express.json());

app.post("/register", async (req, resp)=>{

    let user = new users(req.body);
    let result = await user.save();

    resp.send(result);
})

app.listen(5000);