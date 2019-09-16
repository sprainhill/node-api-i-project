// implement your API here
const express = require("express");

// import db file

const db = require("./data/db"); // use db to get access to database

// db has a find(), findById(), insert(), update(), and remove() methods
// which we will use to access the database

const server = express();

// tell express to parse JSON
server.use(express.json());
