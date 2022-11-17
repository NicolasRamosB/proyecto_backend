
const express = require("express");
const router = express.Router();
const admin = require("../../middlewares/admin");
const existProduct = require("../../middlewares/existProduct");
const Container = require("../../../class/Container");

const products = new Container("products");

router.get("/:id?", existProduct(products), async (req, res, next) => {
  try {
    if (req.products) {
      res.status(200).json({
        success: true,
        data: req.products,
      });
    } else {
      res.status(200).json({
        success: true,
        data: await products.getAll(),
      });
    }
  } catch (err) {
    next(err);
  }
});


router.post("/", admin, (req, res, next) => {
  try {
    products.saveProduct(req.body);
    res.status(200).json({
      success: true,
      data: req.body,
    });
  } catch (err) {
    next(err);
  }
});


router.put("/:id", [admin, existProduct(products)], async (req, res, next) => {
    try {
      if (req.products) {
        const { id } = req.params;
        const data = await products.update(id, req.body);
        res.status(200).json({
          success: true,
          data: data,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);


router.delete("/:id", [admin, existProduct(products)], async (req, res, next) => {
    try {
      if (req.products) {
        const { id } = req.params;
        await products.deleteById(Number(id));
        res.status(200).json({
          success: true,
          message: "Deleted product.",
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;