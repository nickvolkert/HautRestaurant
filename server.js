// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });
app.get("/api/tables", function(req, res) {
    
    return res.json(tables);
});
app.get("/api/waitlist", function(req, res) {
    
    return res.json(waitList);
});
  

  app.post("/api/new", function(req,res){
    
    var data = req.body;
    var reservation = new Reservation(data.name,data.number,data.email,data.id);
    var success = addReservation(reservation);
    if(success)
    {
        console.log("Reservation added!");
        
    }
    else{
        console.log("Sorry, on the waitlist");
    }
    
    res.json({"success": success});
  })
// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
    console.log("App listening on port " + port);
  });

  //Arrays and variables used
  //==========================

var tables = [];
var waitList = [];

function Reservation(name, number, email, id) {
    this.name = name;
    this.number = number;
    this.email = email;
    this.id = id;
}

function addReservation(reservation)
{
    
    if (tables.length < 5)
    {
        tables.push(reservation);
        return true;
    }
    else
    {
        waitList.push(reservation);
        return false;
    }

}