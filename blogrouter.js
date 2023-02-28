const express = require("express");
const Blogrouter = express.Router();

const getAllBlogs = require('./blogcontroller')
const createBlog = require('./blogcontroller')
const updateBlog = require('./blogcontroller')
const getById = require('./blogcontroller')
const deleteBlog = require('./blogcontroller')
const getByUserId = require('./blogcontroller')
Blogrouter.get("/", getAllBlogs)
Blogrouter.post("/blogcreate", createBlog)
Blogrouter.put("/update/:id",updateBlog)
Blogrouter.get("/:id", getById)
Blogrouter.delete("/:id", deleteBlog)
Blogrouter.get("/user/:id",getByUserId)
module.exports = Blogrouter