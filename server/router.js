const db = require("./db");

// Define routes
const router = app => {
    // GET

    // Returns all assets
    app.get("/assets", async (req, res) => {
        const assets = await db("SELECT * FROM cyber_assets");
        res.json(assets);
    });

    // Returns a single asset
    app.get("/assets/:id", async (req, res) => {
        const { id } = req.params;
        const asset = await db("SELECT * FROM cyber_assets WHERE id = ?", [id]);

        if (asset.length === 0) {
            res.status(404).json({ message: "Asset not found" });
        } else {
            res.json(asset[0]);
        }
    });

    // POST

    // Creates a new asset
    app.post("/assets", async (req, res) => {
        const { name, type, serial_number, operating_system } = req.body;
        const now = new Date().toISOString();

        await db(
            "INSERT INTO cyber_assets (name, type, serial_number, operating_system, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
            [name, type, serial_number, operating_system, now, now]
        );

        res.json({ message: "Asset created" });
    });

    // PUT

    // DELETE

    // Deletes an asset
    app.delete("/assets/:id", async (req, res) => {
        const { id } = req.params;

        await db("DELETE FROM cyber_assets WHERE id = ?", [id]);

        res.json({ message: "Asset deleted" });
    });
};

module.exports = router;
