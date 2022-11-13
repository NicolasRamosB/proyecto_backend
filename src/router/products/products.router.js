const express = require("express");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");

const router = express.Router();

router.post("/", async(req, res, next) => {
  try {
    const { body } = req;
    if(_.isNil(body))(res.status(400).json({ success: false, message: "REQ ERROR (Body missing)" }))
    Object.assign(body, {
      uuid: uuidv4()
    });
    res.status(200).json(body);
  } catch (err) {
    next(err);
  }
});

router.get("/", async(_req, res, next) => {
  try {
    res.status(200).json([])
  } catch (err) {
    next(err);
  }
})

router.put("/:productUuid ", async(req, res, next) => {
  try {
    const { productUuid } = req.params;
    if(_.isNil(productUuid))(res.status(400).json({ success: false, message: "REQ ERROR" }))
    res.status(200).send(productUuid)

  } catch (err) {
    next(err);
  }
})

// router.get("/:productUuid ", async (req, res, next) => {
//   try {
//     const { productUuid } = req;
//     if(_.isNil(productUuid)){
//       res.status(400).json({ success: false, message: "REQ ERROR (Body missing)" })
//     };
//     res.status(200).send(productUuid)
//   } catch (err) {
//     next(err);
//   }
// })

module.exports = router;
