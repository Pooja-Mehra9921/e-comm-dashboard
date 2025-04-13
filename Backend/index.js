const express = require("express");
const app = express();

app.get("/", (req, resp)=>{
    resp.send("backend connected");

})

app.listen(4500);