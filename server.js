//Initialize express application
const express = require("express")
const methodOverride = require("method-override")
const fruits = require("./models/fruits.js")
const app = express()
const port = 3000;

//mount middleware
app.use(express.urlencoded({extended: false}))

app.use(methodOverride("_method"))

app.use((req, res, next) => {
  console.log("I run for all routes")
  next()
});

app.use(express.urlencoded({ extended: false }))

//mount routes


//I --Index
app.get("/fruits/", (req, res) =>{
  res.render("index.ejs", {
    allFruits: fruits
  })
});

//N
app.get("/fruits/new", (req, res) => {
  res.render("new.ejs")
});

//D
app.delete("/fruits/:indexOfFruitsArray", (req, res) =>{
  fruits.splice(req.params.indexOfFruitsArray, 1)
  res.redirect("/fruits")
})

//U

//C -- Create
app.post("/fruits", (req, res) =>{
  if(req.body.readyToEat === "on"){
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }
  console.log(req.body)
  fruits.push(req.body)
  res.redirect("/fruits")
})

//E

//S --Show
app.get("/fruits/:indexOfFruitsArray", (req, res) => {
  //res.send(fruits[req.params.indexOfFruitsArray])
  res.render("show.ejs", {
    //second param has to be an object
    fruit: fruits[req.params.indexOfFruitsArray]
  })
})


app.get("/fruits/", (req, res) => {
  res.send(fruits)
})


//////// Port  
app.listen(port, () => {
  console.log("listening")
})

