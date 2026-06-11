const express = require("express");
const router = express.Router();
const { executeQuery } = require("../db");

// GET all blood requests with hospital details
router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT br.request_id, br.blood_group, br.quantity_ml, br.status, br.request_date,
             h.name as hospital_name, h.location, h.hospital_id
      FROM BloodRequest br
      JOIN Hospital h ON br.hospital_id = h.hospital_id
      ORDER BY br.request_date DESC, br.status
    `;

    const requests = await executeQuery(sql);
    res.json(requests);
  } catch (error) {
    console.error("Error fetching blood requests:", error);
    res.status(500).json({ error: "Failed to fetch blood requests" });
  }
});

// GET single blood request by ID
router.get("/:id", async (req, res) => {
  try {
    const sql = `
      SELECT br.request_id, br.blood_group, br.quantity_ml, br.status, br.request_date,
             h.name as hospital_name, h.location, h.hospital_id
      FROM BloodRequest br
      JOIN Hospital h ON br.hospital_id = h.hospital_id
      WHERE br.request_id = ?
    `;

    const requests = await executeQuery(sql, [req.params.id]);
    if (requests.length === 0) {
      return res.status(404).json({ error: "Blood request not found" });
    }
    res.json(requests[0]);
  } catch (error) {
    console.error("Error fetching blood request:", error);
    res.status(500).json({ error: "Failed to fetch blood request" });
  }
});

// POST create new blood request
router.post("/", async (req, res) => {
  try {
    const { hospital_id, blood_group, quantity_ml, request_date } = req.body;

    // Validation
    if (!hospital_id || !blood_group || !quantity_ml) {
      return res
        .status(400)
        .json({ error: "Hospital ID, blood group, and quantity are required" });
    }

    // Check if hospital exists
    const hospital = await executeQuery(
      "SELECT * FROM Hospital WHERE hospital_id = ?",
      [hospital_id]
    );
    if (hospital.length === 0) {
      return res.status(400).json({ error: "Invalid hospital ID" });
    }

    const sql =
      "INSERT INTO BloodRequest (hospital_id, blood_group, quantity_ml, request_date) VALUES (?, ?, ?, ?)";
    const result = await executeQuery(sql, [
      hospital_id,
      blood_group,
      quantity_ml,
      request_date || new Date().toISOString().split("T")[0],
    ]);

    res.status(201).json({
      message: "Blood request created successfully",
      request_id: result.insertId,
    });
  } catch (error) {
    console.error("Error creating blood request:", error);
    res.status(500).json({ error: "Failed to create blood request" });
  }
});

// PUT update blood request (mainly for status updates)
router.put("/:id", async (req, res) => {
  try {
    const { hospital_id, blood_group, quantity_ml, status, request_date } =
      req.body;

    // If hospital_id is provided, check if it exists
    if (hospital_id) {
      const hospital = await executeQuery(
        "SELECT * FROM Hospital WHERE hospital_id = ?",
        [hospital_id]
      );
      if (hospital.length === 0) {
        return res.status(400).json({ error: "Invalid hospital ID" });
      }
    }

    const sql = `
      UPDATE BloodRequest 
      SET hospital_id = COALESCE(?, hospital_id), 
          blood_group = COALESCE(?, blood_group), 
          quantity_ml = COALESCE(?, quantity_ml), 
          status = COALESCE(?, status),
          request_date = COALESCE(?, request_date)
      WHERE request_id = ?
    `;

    const result = await executeQuery(sql, [
      hospital_id,
      blood_group,
      quantity_ml,
      status,
      request_date,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Blood request not found" });
    }

    res.json({ message: "Blood request updated successfully" });
  } catch (error) {
    console.error("Error updating blood request:", error);
    res.status(500).json({ error: "Failed to update blood request" });
  }
});

// PUT update request status only
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["Pending", "Fulfilled"].includes(status)) {
      return res
        .status(400)
        .json({ error: "Valid status (Pending or Fulfilled) is required" });
    }

    const sql = "UPDATE BloodRequest SET status = ? WHERE request_id = ?";
    const result = await executeQuery(sql, [status, req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Blood request not found" });
    }

    res.json({ message: "Request status updated successfully" });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ error: "Failed to update request status" });
  }
});

// DELETE blood request
router.delete("/:id", async (req, res) => {
  try {
    const result = await executeQuery(
      "DELETE FROM BloodRequest WHERE request_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Blood request not found" });
    }

    res.json({ message: "Blood request deleted successfully" });
  } catch (error) {
    console.error("Error deleting blood request:", error);
    res.status(500).json({ error: "Failed to delete blood request" });
  }
});

// GET pending requests
router.get("/status/pending", async (req, res) => {
  try {
    const sql = `
      SELECT br.request_id, br.blood_group, br.quantity_ml, br.request_date,
             h.name as hospital_name, h.location, h.hospital_id
      FROM BloodRequest br
      JOIN Hospital h ON br.hospital_id = h.hospital_id
      WHERE br.status = 'Pending'
      ORDER BY br.request_date ASC
    `;

    const pendingRequests = await executeQuery(sql);
    res.json(pendingRequests);
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    res.status(500).json({ error: "Failed to fetch pending requests" });
  }
});

module.exports = router;
