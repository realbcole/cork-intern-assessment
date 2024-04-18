const db = require("./db");

// Define routes
const router = app => {
    // GET

    // Returns all assets
    app.get("/assets", async (req, res) => {
        try {
            const { type, page = 1, limit = 10 } = req.query;

            let offset = (page - 1) * limit; // Calculate offset for pagination

            let query = "SELECT * FROM cyber_assets";
            let params = [];

            if (type) { // If type filter is provided, add it to the query and params
                query += " WHERE type = $1";
                params.push(type);
            }

            query += " LIMIT $2 OFFSET $3"; // Add limit and offset to the query
            params.push(limit, offset);

            const assets = await db(query, params);

            res.status(200).json({
                data: assets,
                page,
                limit,
            });
        } catch (err) {
            res.status(500).json({ message: "Database error" });
            return;
        }
    });

    // Returns a single asset
    app.get("/assets/:id", async (req, res) => {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Missing asset ID" });
            return;
        }

        try {
            const asset = await db("SELECT * FROM cyber_assets WHERE id = ?", [id]);

            // Check if asset exists
            if (asset.length === 0) {
                res.status(404).json({ message: "Asset not found" });
            } else {
                res.status(200).json(asset[0]);
            }
        } catch (err) {
            res.status(500).json({ message: "Database error" });
            return;
        }
    });

    // POST

    // Creates a new asset
    app.post("/assets", async (req, res) => {
        const { name, type, serial_number, operating_system } = req.body;
        const now = new Date().toISOString();

        if (!name || !type || !serial_number || !operating_system) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        try {
            await db(
                "INSERT INTO cyber_assets (name, type, serial_number, operating_system, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
                [name, type, serial_number, operating_system, now, now]
            );

            res.status(201).json({ message: "Asset created" });
        } catch (err) {
            res.status(500).json({ message: "Database error" });
            return;
        }
    });

    // PUT

    // Updates an asset
    app.put("/assets/:id", async (req, res) => {
        const { id } = req.params;
        const { name, type, serial_number, operating_system } = req.body;
        const now = new Date().toISOString();

        if (!id) {
            res.status(400).json({ message: "Missing asset ID" });
            return;
        }

        if (!name && !type && !serial_number && !operating_system) {
            res.status(400).json({ message: "Missing fields to update" });
            return;
        }

        try {
            // Check if asset exists
            const asset = await db("SELECT * FROM cyber_assets WHERE id = ?", [id]);

            if (asset.length === 0) {
                res.status(404).json({ message: "Asset not found" });
                return;
            }

            // Set update fields
            const updatedFields = {
                name: name || asset[0].name,
                type: type || asset[0].type,
                serial_number: serial_number || asset[0].serial_number,
                operating_system: operating_system || asset[0].operating_system,
                updated_at: now
            };

            // Update asset
            await db("UPDATE cyber_assets SET name = ?, type = ?, serial_number = ?, operating_system = ?, updated_at = ? WHERE id = ?", [
                updatedFields.name,
                updatedFields.type,
                updatedFields.serial_number,
                updatedFields.operating_system,
                updatedFields.updated_at,
                id
            ]);

            res.status(200).json({ message: "Asset updated" });
        } catch (err) {
            res.status(500).json({ message: "Database error" });
            return;
        }
    });

    // DELETE

    // Deletes an asset
    app.delete("/assets/:id", async (req, res) => {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Missing asset ID" });
            return;
        }

        try {
            await db("DELETE FROM cyber_assets WHERE id = ?", [id]);
            res.status(200).json({ message: "Asset deleted" });
        } catch (err) {
            res.status(500).json({ message: "Database error" });
            return;
        }
    });
};

module.exports = router;
