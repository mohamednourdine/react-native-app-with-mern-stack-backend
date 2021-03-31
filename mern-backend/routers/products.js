const {Product}  = require('../models/product')
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    console.log(req)
    const products = await Product.find();
    res.send(products)
});

router.post(`/`, (req, res) => {
    
    const products = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    });
    
    products.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
    
});

module.exports = router;