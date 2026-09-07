const express = require("express");
const router = express.Router();

const pool = require("../config/database");


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    try {
        const [products] = await pool.query(`
            SELECT
                p.id,
                p.name,
                p.model,
                p.product_category,
                p.spec,
                p.warranty,
                p.image,
                p.price,
                p.mrp,
                p.is_featured,
                p.is_active,
                p.sort_order,
                c.id AS category_id,
                c.name AS category_name,
                c.slug AS category_slug,
                c.value AS category_value
            FROM products p
            LEFT JOIN categories c
                ON p.category_id = c.id
            WHERE p.is_active = TRUE
            ORDER BY p.sort_order ASC
        `);

        res.json({
            success: true,
            count: products.length,
            products: products
        });

    } catch (error) {
        console.error("Products API error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
    }
});


// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [products] = await pool.query(`
            SELECT
                p.id,
                p.name,
                p.model,
                p.product_category,
                p.spec,
                p.warranty,
                p.image,
                p.price,
                p.mrp,
                p.is_featured,
                p.is_active,
                c.id AS category_id,
                c.name AS category_name,
                c.slug AS category_slug,
                c.value AS category_value
            FROM products p
            LEFT JOIN categories c
                ON p.category_id = c.id
            WHERE p.id = ?
              AND p.is_active = TRUE
            LIMIT 1
        `, [id]);

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            product: products[0]
        });

    } catch (error) {
        console.error("Single product API error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch product"
        });
    }
});


module.exports = router;