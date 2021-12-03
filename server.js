//Imports
const express = require("express");

const app = express();

const server = app.listen(1337);
const io = require("socket.io")(server);

//Config
app.use(express.static(__dirname +"/static"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//Setting counter
let counter = 0;

//Sockets
io.on("connection", function(socket){

    console.log("Connected and count initialized!");
    socket.emit("new_count", {
        newCount : `This button has been pushed ${counter} times(s)!`
    });
    socket.broadcast.emit("new_count", {
        newCount : `This button has been pushed ${counter} times(s)!`
    });
    socket.on("epic_push", function(){
        counter += 1;
        socket.emit("new_count", {
            newCount : `This button has been pushed ${counter} times(s)!`
        });
        socket.broadcast.emit("new_count", {
            newCount : `This button has been pushed ${counter} times(s)!`
        });
    })
    socket.on("reset_push", function(){
        counter = 0;
        socket.emit("reset_count", {
            newCount : `This button has been pushed ${counter} times(s)!`
        });
        socket.broadcast.emit("reset_count", {
            newCount : `This button has been pushed ${counter} times(s)!`
        });
    })
})

//Routes
app.get("/", function(req, res){
    res.render("index");
})


