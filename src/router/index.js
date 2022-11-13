const express = require('express')
const router = express.Router();
const productsRouter = require('./products/products.router')

router.get("/health", async (_req, res) =>{
    res.status(200).json({
        success: true,
        health: "Up",
        environment: process.env.ENVIRONMENT || 'undifined'
    })
})
.use('/products', productsRouter)

module.exports = router