const express = require("express");
const fs = require("fs");
const app = express();

//middleware
app.use(express.json());

const port = process.env.PORT;
//Handlers
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});