const express = require("express");
const router = express.Router();
const { executeQuery } = require("../db");

// GET all donation records with donor and hospital details
router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT dr.record_id, dr.date, dr.quantity_ml,
             d.name as donor_name, d.blood_group, d.donor_id,
             h.name as hospital_name, h.hospital_id
      FROM DonationRecord dr
      JOIN Donor d ON dr.donor_id = d.donor_id
      JOIN Hospital h ON dr.hospital_id = h.hospital_id
      ORDER BY dr.date DESC
    `;

    const donations = await executeQuery(sql);
    res.json(donations);
  } catch (error) {
    console.error("Error fetching donation records:", error);
    res.status(500).json({ error: "Failed to fetch donation records" });
  }
});

// GET single donation record by ID
router.get("/:id", async (req, res) => {
  try {
    const sql = `
      SELECT dr.record_id, dr.date, dr.quantity_ml,
             d.name as donor_name, d.blood_group, d.donor_id,
             h.name as hospital_name, h.hospital_id
      FROM DonationRecord dr
      JOIN Donor d ON dr.donor_id = d.donor_id
      JOIN Hospital h ON dr.hospital_id = h.hospital_id
      WHERE dr.record_id = ?
    `;

    const donations = await executeQuery(sql, [req.params.id]);
    if (donations.length === 0) {
      return res.status(404).json({ error: "Donation record not found" });
    }
    res.json(donations[0]);
  } catch (error) {
    console.error("Error fetching donation record:", error);
    res.status(500).json({ error: "Failed to fetch donation record" });
  }
});

// POST create new donation record
router.post("/", async (req, res) => {
  try {
    const { donor_id, hospital_id, date, quantity_ml } = req.body;

    // Validation
    if (!donor_id || !hospital_id || !date || !quantity_ml) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if donor and hospital exist
    const donor = await executeQuery("SELECT * FROM Donor WHERE donor_id = ?", [
      donor_id,
    ]);
    const hospital = await executeQuery(
      "SELECT * FROM Hospital WHERE hospital_id = ?",
      [hospital_id]
    );

    if (donor.length === 0) {
      return res.status(400).json({ error: "Invalid donor ID" });
    }
    if (hospital.length === 0) {
      return res.status(400).json({ error: "Invalid hospital ID" });
    }

    const sql =
      "INSERT INTO DonationRecord (donor_id, hospital_id, date, quantity_ml) VALUES (?, ?, ?, ?)";
    const result = await executeQuery(sql, [
      donor_id,
      hospital_id,
      date,
      quantity_ml,
    ]);

    // Update donor's last donation date
    await executeQuery(
      "UPDATE Donor SET last_donation_date = ? WHERE donor_id = ?",
      [date, donor_id]
    );

    res.status(201).json({
      message: "Donation record created successfully",
      record_id: result.insertId,
    });
  } catch (error) {
    console.error("Error creating donation record:", error);
    res.status(500).json({ error: "Failed to create donation record" });
  }
});

// PUT update donation record
router.put("/:id", async (req, res) => {
  try {
    const { donor_id, hospital_id, date, quantity_ml } = req.body;

    // Check if donor and hospital exist
    const donor = await executeQuery("SELECT * FROM Donor WHERE donor_id = ?", [
      donor_id,
    ]);
    const hospital = await executeQuery(
      "SELECT * FROM Hospital WHERE hospital_id = ?",
      [hospital_id]
    );

    if (donor.length === 0) {
      return res.status(400).json({ error: "Invalid donor ID" });
    }
    if (hospital.length === 0) {
      return res.status(400).json({ error: "Invalid hospital ID" });
    }

    const sql =
      "UPDATE DonationRecord SET donor_id = ?, hospital_id = ?, date = ?, quantity_ml = ? WHERE record_id = ?";
    const result = await executeQuery(sql, [
      donor_id,
      hospital_id,
      date,
      quantity_ml,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Donation record not found" });
    }

    res.json({ message: "Donation record updated successfully" });
  } catch (error) {
    console.error("Error updating donation record:", error);
    res.status(500).json({ error: "Failed to update donation record" });
  }
});

// DELETE donation record
router.delete("/:id", async (req, res) => {
  try {
    const result = await executeQuery(
      "DELETE FROM DonationRecord WHERE record_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Donation record not found" });
    }

    res.json({ message: "Donation record deleted successfully" });
  } catch (error) {
    console.error("Error deleting donation record:", error);
    res.status(500).json({ error: "Failed to delete donation record" });
  }
});

// GET blood collection statistics by blood group
router.get("/stats/bloodgroup", async (req, res) => {
  try {
    const sql = `
      SELECT d.blood_group, COUNT(dr.record_id) as donation_count, SUM(dr.quantity_ml) as total_quantity_ml
      FROM DonationRecord dr
      JOIN Donor d ON dr.donor_id = d.donor_id
      GROUP BY d.blood_group
      ORDER BY total_quantity_ml DESC
    `;

    const stats = await executeQuery(sql);
    res.json(stats);
  } catch (error) {
    console.error("Error fetching blood group statistics:", error);
    res.status(500).json({ error: "Failed to fetch blood group statistics" });
  }
});

module.exports = router;
