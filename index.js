const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Connexction to the database
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to the database");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error("Could not connect to the database", err);
        process.exit(1); // Exit with an error code
    });

// User schema
const BlogSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    confirmPassword: String
});

const Blog = mongoose.model("Blog", BlogSchema);

app.listen(port)