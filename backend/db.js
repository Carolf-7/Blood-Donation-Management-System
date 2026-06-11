const mysql = require("mysql2/promise");

// Database configuration
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "GAGANHEGDE14", // Replace with your actual MySQL password
  database: "blood_donation_db",
  port: 3306,
};

// Create connection pool
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Initialize database and tables
async function initializeDatabase() {
  try {
    // Create database if it doesn't exist
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port,
    });

    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`
    );
    await connection.end();

    // Create tables
    await createTables();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

// Create all required tables
async function createTables() {
  const connection = await pool.getConnection();

  try {
    // Create Donor table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Donor (
        donor_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL,
        gender ENUM('Male', 'Female', 'Other') NOT NULL,
        blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        address VARCHAR(255) NOT NULL,
        last_donation_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Hospital table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Hospital (
        hospital_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        contact_number VARCHAR(15) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create DonationRecord table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS DonationRecord (
        record_id INT PRIMARY KEY AUTO_INCREMENT,
        donor_id INT NOT NULL,
        hospital_id INT NOT NULL,
        date DATE NOT NULL,
        quantity_ml INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (donor_id) REFERENCES Donor(donor_id) ON DELETE CASCADE,
        FOREIGN KEY (hospital_id) REFERENCES Hospital(hospital_id) ON DELETE CASCADE
      )
    `);

    // Create BloodRequest table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS BloodRequest (
        request_id INT PRIMARY KEY AUTO_INCREMENT,
        hospital_id INT NOT NULL,
        blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
        quantity_ml INT NOT NULL,
        status ENUM('Pending', 'Fulfilled') DEFAULT 'Pending',
        request_date DATE DEFAULT (CURRENT_DATE),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (hospital_id) REFERENCES Hospital(hospital_id) ON DELETE CASCADE
      )
    `);

    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  } finally {
    connection.release();
  }
}

// Execute query helper function
async function executeQuery(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

module.exports = {
  pool,
  initializeDatabase,
  executeQuery,
};
