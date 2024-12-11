const db = require('../config/db');

exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const [result] = await db.execute(
            `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
            [name, address, latitude, longitude]
        );
        res.status(201).json({ message: "School added successfully!", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: "Failed to add school." });
    }
};

exports.listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    try {
        const [schools] = await db.execute(`SELECT * FROM schools`);
        const userLat = parseFloat(latitude);
        const userLng = parseFloat(longitude);

        const sortedSchools = schools
            .map((school) => ({
                ...school,
                distance: Math.hypot(school.latitude - userLat, school.longitude - userLng),
            }))
            .sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve schools." });
    }
};
