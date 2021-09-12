const express = require('express')
const router = express.Router()

// routes
module.exports = router
app.get("/", (req, res) => {
   
    res.render("pages/index");