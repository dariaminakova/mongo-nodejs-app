const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require("express-handlebars");
const todoRoutes = require("./routes/todos");

const PORT = process.env.PORT || 3004;
const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

//create engine for pages rendering
app.engine("hbs", hbs.engine); // hbs.engine method
app.set("view engine", "hbs"); // default use hbs
app.set("views", "views"); //folder views

app.use(express.urlencoded({ extended: true })); // parse body from post-request
app.use(express.static(path.join(__dirname, "public"))); // path to static folders and files
app.use(todoRoutes); // use router

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://daria:q1w2e3r4t5@cluster0-o8vxu.mongodb.net/todos", // this path will be copied from your project in mongoDB
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
    app.listen(PORT, () => {
      console.log(`Server has been started at port ${PORT}...`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
