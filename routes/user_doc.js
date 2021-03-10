const express = require("express");
const User_Doc = require("../Models/user_doc");
const errors = require("restify-errors");
const router = express.Router();

router.post("/",async (req,res,next)=>{
    if (!req.is("application/json")) {
        console.log("this");
        return next(new errors.InvalidContentError("Expects 'application/json'"));
    }
    try{
        const data=req.body;
        console.log(req.body);
        
        const check= await User_Doc.find({GID:data.GID,doc_id:data.doc_id});
        console.log(check);
        if(check.length===0){
            User_Doc.create(data).then(()=>{
                res.send(201);
            });
        }
        else{
            res.send(200);
        }
        
    }
    catch(e){
        console.error(err);
        res.render("error/500");
    }
        
});

router.get("/byUser", async (req,res,next)=>{
    const GID=req.query.GID;
    console.log("yes : ",GID);
    const info=await User_Doc.find({GID:GID});
    res.send(info.splice(0,50));
});

router.get("/byDoc", async (req,res,next)=>{
    const doc_id=req.query.doc_id;
    console.log("yes : ",doc_id);
    const info=await User_Doc.find({doc_id:doc_id});
    res.send(info.splice(0,50));
});

module.exports = router;