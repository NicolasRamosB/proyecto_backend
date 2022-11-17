const express = require("express");
const router = express.Router();
const existCart = require("../../middlewares/existCart");
const Container = require("../../../class/Container");

const cart = new Container("cart");
const products = new Container("products");


router.post("/", async (req, res, next) => {
  try {
    const data = await cart.saveProduct({ products: [] });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
});


router.delete("/:id", existCart(cart), async (req, res, next) => {
  try {
    if (req.cart) {
      const { id } = req.params;
      await cart.deleteById(Number(id));
      res.status(200).json({
        success: true,
        message: "Deleted.",
      });
    }
  } catch (err) {
    next(err);
  }
});


router.get("/:id/products", existCart(cart), async (req, res, next) => {

  try {
    if (req.cart) {
      console.log("current cart", req.cart);
      res.status(200).json({
        success: true,
        data: req.cart.products,
      });
    }
  } catch (err) {
    next(err);
  }
});


router.post("/:id/products", existCart(cart), async (req, res, next) => {
  try {
    const current = req.cart;
    const productId = req.body.product;
    if (!productId) {
      return res.status(200).json({
        success: false,
        message: "There no id to search.",
      });
    }

    const selectedProduct = await products.getbyId(Number(productId));

    if (!selectedProduct) {
      return res.status(200).json({
        success: false,
        message: "Product does not exist.",
      });
    }
    current.products.push(selectedProduct);
    await cart.update(current.id, current);
    res.status(200).json({
      success: true,
      current,
    });
  } catch (err) {
    next(err);
  }
});


router.delete("/:id/products/:id_prod", existCart(cart), async (req, res, next) => {
    try {
      let current = req.cart;
      const { id_prod } = req.params;

      const selectedProduct = await products.getbyId(Number(id_prod));

      if (!selectedProduct) {
        return res.status(400).json({
          success: false,
          message: "Product does not exist.",
        });
      }
      current.products = current.products.filter(
        (p) => p.id !== Number(id_prod)
      );

      current = await cart.update(current.id, current);
      res.status(200).json({
        success: true,
        current,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;