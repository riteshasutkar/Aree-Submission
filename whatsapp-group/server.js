// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var bodyParser = require('body-parser')

// Server port
var HTTP_PORT = 3000

// create application/json parser
var jsonParser = bodyParser.json()

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// API to get all group messages.
app.get("/group_message", (req, res, next) => {
    // TODO : pagination not implemented
    var sql = "select * from group_messages"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


// API to add a group message
app.post("/group_message", jsonParser, (req, res, next) => {
    var errors=[]
    if (!req.body.group_id){
        errors.push("No group_id specified");
    }
    if (!req.body.message_sender){
        errors.push("No message_sender specified");
    }
    if (!req.body.message_text){
        errors.push("No message_text specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        group_id: req.body.group_id,
        message_sender: req.body.message_sender,
        message_text : req.body.message_text
    }
    var sql ='INSERT INTO group_messages (group_id, message_sender, message_text) VALUES (?,?,?)'
    var params =[data.group_id, data.message_sender, data.message_text]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});