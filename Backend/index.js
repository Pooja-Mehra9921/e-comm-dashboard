const express = require("express");
const cors = require("cors");
const Jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JwtKey = "cravekart";

require("./database/config");
const users = require("./database/user");
const product = require("./database/items");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Register User
app.post("/register", async (req, res) => {
  try {
    let user = new users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;

    Jwt.sign({ result }, JwtKey, { expiresIn: "2h" }, (error, token) => {
      if (error) {
        res.status(500).send("Something went wrong. Please try again later.");
      } else {
        res.send({ result, auth: token });
      }
    });
  } catch (err) {
    res.status(500).send("Registration failed.");
  }
});

// ✅ User Login
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    const data = await users.findOne(req.body).select("-password");
    if (data) {
      Jwt.sign({ data }, JwtKey, { expiresIn: "2h" }, (error, token) => {
        if (error) {
          res.status(500).send("Login failed, please try again.");
        } else {
          res.send({ data, auth: token });
        }
      });
    } else {
      res.status(404).send("User not found.");
    }
  } else {
    res.status(400).send("Missing email or password.");
  }
});

// ✅ Add New Product
app.post("/add-product", async (req, res) => {
  try {
    let data = new product(req.body);
    let result = await data.save();
    res.send(result);
  } catch (error) {
    res.status(500).send("Failed to add product.");
  }
});

// ✅ Get All Products
app.get("/products", async (req, res) => {
  const data = await product.find();
  if (data.length > 0) {
    res.send(data);
  } else {
    res.send({ result: "No product found" });
  }
});

// ✅ Delete Product
app.delete("/product/:id", async (req, res) => {
  const result = await product.deleteOne({ _id: req.params.id });
  res.send(result);
});

// ✅ Get Product By ID
app.get("/product/:id", async (req, res) => {
  const result = await product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record found" });
  }
});

// ✅ Update Product
app.put("/update/:id", async (req, res) => {
  const result = await product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

// ✅ Search Product
app.get("/search/:key", async (req, res) => {
  const result = await product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { CategoryName: { $regex: req.params.key, $options: "i" } },
      { description: { $regex: req.params.key, $options: "i" } },
    ],
  });
  res.send(result);
});

// ✅ Start Server
app.listen(6000, () => {
  console.log("Server is running on port 6000");
});
