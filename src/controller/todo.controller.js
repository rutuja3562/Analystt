const express = require("express");
const Todos = require("../models/todo.model");
const router = express.Router();
const path = require("path");

router.get("", async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { status: { $regex: req.query.search, $options: "i" } },
            
          ],
        }
      : {};

    //*****Searching*****//
    const todos = await Todos.find(keyword)
      

    return res.send(todos);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", async (req, res) => {
  try {
    const todos = await Todos.create(req.body);
    return res.send(todos);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todos = await Todos.findById(req.params.id).lean().exec();

    if (Todos) {
      return res.send(todos);
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// met + route => patch /users/${variable} and the name of variable is id
router.patch("/:id", async (req, res) => {

  console.log("KLKL")
  console.log( req.params.id,req.body,)
  
  try {
    const todos = await Todos.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    res.status(201).send(todos);
  } catch (err) {
    console.log(err)
    return res.status(500).send(err.message);
  }
});

// met + route => delete /users/${variable} and the name of variable is id
router.delete("/:id", async (req, res) => {
  try {
    const todos = await Todos.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    res.send(todos);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
