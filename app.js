const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = []; 
let workItems = [];

app.set('view engine', 'ejs'); //must need when using ejs. 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); // Must Have for static files!!!

app.get("/", function(req,res){

    let today = new Date();

    //var currentDay = today.getDay(); // Gets todays day 
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",

    };

    let day = today.toLocaleDateString("en-US", options);
   
    res.render("list", {listTitle: day, newListItems: items}); //rendering the ejs file under the folder views and telling which variable we need to replace. Basically saying that kindOfDay will be replaced with day.  

    
})

app.post("/", function(req,res){

    let item = req.body.newItem // Acceses the input that user enters. 

        console.log(req.body);
    if(req.body.list === "Work"){ //Check which list the item was made and adds it to the corresponding array. 
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item); //Pushes item into the already defined array.
        res.redirect("/");
    }
    

})

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Listening on Port 3000");
})

////PUSHHH 