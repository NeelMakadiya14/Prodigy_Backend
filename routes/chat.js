const express = require("express");
const Chat = require("../Models/chat");
const errors = require("restify-errors");
const router = express.Router();

router.post("/",(req,res,next)=>{
    if (!req.is("application/json")) {
        console.log("this");
        return next(new errors.InvalidContentError("Expects 'application/json'"));
    }
    try{
        const data=req.body;
        console.log(req.body);
        Chat.create(data).then(()=>{
            res.send(201);
        });
    }
    catch(e){
        console.error(err);
        res.render("error/500");
    }
        
});

router.get("/", async (req,res,next)=>{
    const room=req.query.room;
    console.log("yes : ",room);
    const messages=await Chat.find({room:room});
    res.send(messages.splice(0,50));
});

module.exports = router;