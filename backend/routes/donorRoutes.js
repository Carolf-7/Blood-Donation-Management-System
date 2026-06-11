const express = require("express");
const router = express.Router();
const { executeQuery } = require("../db");

// GET all donors
router.get("/", async (req, res) => {
  try {
    const donors = await executeQuery("SELECT * FROM Donor ORDER BY name");
    res.json(donors);
  } catch (error) {
    console.error("Error fetching donors:", error);
    res.status(500).json({ error: "Failed to fetch donors" });
  }
});

// GET single donor by ID
router.get("/:id", async (req, res) => {
  try {
    const donors = await executeQuery(
      "SELECT * FROM Donor WHERE donor_id = ?",
      [req.params.id]
    );
    if (donors.length === 0) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.json(donors[0]);
  } catch (error) {
    console.error("Error fetching donor:", error);
    res.status(500).json({ error: "Failed to fetch donor" });
  }
});

// POST create new donor
router.post("/", async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      blood_group,
      phone,
      email,
      address,
      last_donation_date,
    } = req.body;

    // Validation
    if (
      !name ||
      !age ||
      !gender ||
      !blood_group ||
      !phone ||
      !email ||
      !address
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const sql = `
      INSERT INTO Donor (name, age, gender, blood_group, phone, email, address, last_donation_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await executeQuery(sql, [
      name,
      age,
      gender,
      blood_group,
      phone,
      email,
      address,
      last_donation_date || null,
    ]);

    res.status(201).json({
      message: "Donor created successfully",
      donor_id: result.insertId,
    });
  } catch (error) {
    console.error("Error creating donor:", error);
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Failed to create donor" });
    }
  }
});

// PUT update donor
router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      blood_group,
      phone,
      email,
      address,
      last_donation_date,
    } = req.body;

    const sql = `
      UPDATE Donor 
      SET name = ?, age = ?, gender = ?, blood_group = ?, phone = ?, email = ?, address = ?, last_donation_date = ?
      WHERE donor_id = ?
    `;

    const result = await executeQuery(sql, [
      name,
      age,
      gender,
      blood_group,
      phone,
      email,
      address,
      last_donation_date || null,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Donor not found" });
    }

    res.json({ message: "Donor updated successfully" });
  } catch (error) {
    console.error("Error updating donor:", error);
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Failed to update donor" });
    }
  }
});

// DELETE donor
router.delete("/:id", async (req, res) => {
  try {
    const result = await executeQuery("DELETE FROM Donor WHERE donor_id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Donor not found" });
    }

    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    console.error("Error deleting donor:", error);
    res.status(500).json({ error: "Failed to delete donor" });
  }
});

// GET donor statistics (number of donations per donor)
router.get("/stats/donations", async (req, res) => {
  try {
    const sql = `
      SELECT d.donor_id, d.name, d.blood_group, COUNT(dr.record_id) as donation_count,
             SUM(dr.quantity_ml) as total_quantity_ml
      FROM Donor d
      LEFT JOIN DonationRecord dr ON d.donor_id = dr.donor_id
      GROUP BY d.donor_id, d.name, d.blood_group
      ORDER BY donation_count DESC
    `;

    const stats = await executeQuery(sql);
    res.json(stats);
  } catch (error) {
    console.error("Error fetching donor statistics:", error);
    res.status(500).json({ error: "Failed to fetch donor statistics" });
  }
});

module.exports = router;
