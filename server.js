require("dotenv").config();
const path=require('path');
const express = require("express");
const http = require("http");
const app = express();
var cors = require('cors')
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const dotnev = require("dotenv");
const connectDB = require("./db.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");

dotnev.config();

//Logging
if (process.env.NODE_ENV === "Development") {
  app.use(morgan("dev"));
}

connectDB();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const port=process.env.PORT || 5000;

server.listen(port, () => console.log(`server is running on port ${port}`));

const chat_users={};
const chat_sockTOroom={};

io.on('connection', socket => {

    //For Chat
        socket.on('join chat room',userDetail=>{
            console.log("Joined Chat room");
            roomNo=userDetail.room;
            const info={
                name:userDetail.name,
                socketID:socket.id,
                GID:userDetail.GID,
                imgURI:userDetail.imgURI
            }
            
           
                console.log("chat_user",chat_users[roomNo]);
                if(chat_users[roomNo]){
                    chat_users[roomNo].push(info);
                    console.log("if");
                }
                else{
                    console.log("else");
                    chat_users[roomNo]=[info];
                }
                chat_sockTOroom[socket.id]=roomNo;
                console.log(info);
    
            console.log(roomNo,chat_users[roomNo]);
        });

        socket.on('send msg',(data)=>{
            console.log("Sent data : ",data);
            chat_users[chat_sockTOroom[socket.id]].forEach(element => {
                io.to(element.socketID).emit('recevied msg',data);
            });
          //  io.emit('recevied msg',data);
        })

    socket.on('disconnect', () => {
        console.log("Disconnect.....",socket.id);

        chat_roomID=chat_sockTOroom[socket.id];
        let chat_room = chat_users[chat_roomID];
        if (chat_room) {
            chat_room = chat_room.filter((row) => row.socketID !== socket.id);
            chat_users[chat_roomID] = chat_room;
        }
        
    });


});

//Allow CORS
app.use(cors())

app.get("/",(req,res,next)=>{
    res.send(<h1>Hello</h1>);
});

//Routes
app.use("/chat", require("./routes/chat"));

