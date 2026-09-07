require("dotenv").config();



const express = require("express");
const cors = require("cors");

const pool = require("./config/database");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Maxwell API is running"
    });
});

app.get("/api/test-db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 AS test");

        res.json({
            success: true,
            database: "connected",
            result: rows
        });
    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Maxwell API running on http://localhost:${PORT}`);
});