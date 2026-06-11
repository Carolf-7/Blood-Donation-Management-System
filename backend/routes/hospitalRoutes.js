const express = require("express");
const router = express.Router();
const { executeQuery } = require("../db");

// GET all hospitals
router.get("/", async (req, res) => {
  try {
    const hospitals = await executeQuery(
      "SELECT * FROM Hospital ORDER BY name"
    );
    res.json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
});

// GET single hospital by ID
router.get("/:id", async (req, res) => {
  try {
    const hospitals = await executeQuery(
      "SELECT * FROM Hospital WHERE hospital_id = ?",
      [req.params.id]
    );
    if (hospitals.length === 0) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    res.json(hospitals[0]);
  } catch (error) {
    console.error("Error fetching hospital:", error);
    res.status(500).json({ error: "Failed to fetch hospital" });
  }
});

// POST create new hospital
router.post("/", async (req, res) => {
  try {
    const { name, location, contact_number } = req.body;

    // Validation
    if (!name || !location || !contact_number) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sql =
      "INSERT INTO Hospital (name, location, contact_number) VALUES (?, ?, ?)";
    const result = await executeQuery(sql, [name, location, contact_number]);

    res.status(201).json({
      message: "Hospital created successfully",
      hospital_id: result.insertId,
    });
  } catch (error) {
    console.error("Error creating hospital:", error);
    res.status(500).json({ error: "Failed to create hospital" });
  }
});

// PUT update hospital
router.put("/:id", async (req, res) => {
  try {
    const { name, location, contact_number } = req.body;

    const sql =
      "UPDATE Hospital SET name = ?, location = ?, contact_number = ? WHERE hospital_id = ?";
    const result = await executeQuery(sql, [
      name,
      location,
      contact_number,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.json({ message: "Hospital updated successfully" });
  } catch (error) {
    console.error("Error updating hospital:", error);
    res.status(500).json({ error: "Failed to update hospital" });
  }
});

// DELETE hospital
router.delete("/:id", async (req, res) => {
  try {
    const result = await executeQuery(
      "DELETE FROM Hospital WHERE hospital_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.json({ message: "Hospital deleted successfully" });
  } catch (error) {
    console.error("Error deleting hospital:", error);
    res.status(500).json({ error: "Failed to delete hospital" });
  }
});

module.exports = router;
