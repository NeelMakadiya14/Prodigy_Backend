const express = require("express");
const User_Doc = require("../Models/user_doc");
const errors = require("restify-errors");
const router = express.Router();

router.post("/adduser", async (req, res, next) => {
  const data = req.body;
  const check = await User_Doc.find({ GID: data.GID });
  console.log(check);
  if (check.length === 0) {
    User_Doc.create(data).then(() => {
      res.sendStatus(201);
    });
  } else {
    res.sendStatus(200);
  }
});

router.post("/adddoc", async (req, res, next) => {
  const data = req.body;
  const check = await User_Doc.find({
    GID: data.GID,
    doc: { $elemMatch: { name: data.name, id: data.id } },
  });
  if (check.length === 0) {
    User_Doc.updateOne(
      { GID: data.GID },
      { $push: { doc: { name: data.name, id: data.id } } }
    )
      .then((response) => {
        console.log(response);
        res.send("Success");
      })
      .check((err) => {
        console.log(err);
        res.send(err);
      });
  } else {
    res.send("Doc is Already Added");
  }
});

// router.post("/", async (req, res, next) => {
//   if (!req.is("application/json")) {
//     console.log("this");
//     return next(new errors.InvalidContentError("Expects 'application/json'"));
//   }
//   try {
//     const data = req.body;
//     console.log(req.body);

//     const check = await User_Doc.find({ GID: data.GID, doc_id: data.doc_id });
//     console.log(check);
//     if (check.length === 0) {
//       User_Doc.create(data).then(() => {
//         res.send(201);
//       });
//     } else {
//       res.send(200);
//     }
//   } catch (e) {
//     console.error(err);
//     res.render("error/500");
//   }
// });

router.get("/getdoc", async (req, res, next) => {
  const GID = req.query.GID;
  const info = await User_Doc.findOne({ GID });
  res.send(info.doc);
});

module.exports = router;
