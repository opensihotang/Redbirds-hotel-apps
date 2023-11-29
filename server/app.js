require("dotenv").config();
const express = require("express");
const router = require("./routes");
const app = express()
const cors = require("cors")
const errorHandler = require("./middleware/errorHandler");
const axios = require("axios")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(axios)

app.use(errorHandler)

module.exports = app
