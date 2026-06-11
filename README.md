# 🩸 Blood Donation Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-14%2B-green)](https://nodejs.org/)
[![MySQL Version](https://img.shields.io/badge/MySQL-5.7%2B-blue)](https://www.mysql.com/)

A comprehensive, full-stack web-based Blood Donation Management System designed for hospitals, blood banks, and healthcare facilities. This system provides complete CRUD (Create, Read, Update, Delete) operations for managing blood donors, hospital registrations, donation records, and blood requests with real-time statistics and analytics.

## 📋 Table of Contents

- [🌟 Features Overview](#-features-overview)
- [🏗️ System Architecture](#️-system-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [📋 Prerequisites & System Requirements](#-prerequisites--system-requirements)
- [🚀 Installation Guide](#-installation-guide)
- [⚙️ Configuration](#️-configuration)
- [🎯 Running the Application](#-running-the-application)
- [📖 User Guide](#-user-guide)
- [🗄️ Database Schema](#️-database-schema)
- [🌐 API Documentation](#-api-documentation)
- [🎨 Frontend Features](#-frontend-features)
- [🔧 Development Guide](#-development-guide)
- [🚨 Troubleshooting](#-troubleshooting)
- [🔒 Security Considerations](#-security-considerations)
- [📊 Performance Optimization](#-performance-optimization)
- [🧪 Testing](#-testing)
- [📝 Contributing](#-contributing)
- [📞 Support](#-support)

## 🌟 Features Overview

### 👥 **Comprehensive Donor Management**

- ✅ **Complete CRUD Operations**: Add, view, edit, and delete donor profiles
- ✅ **Detailed Donor Profiles**:
  - Personal Information: Full name, age, gender
  - Medical Information: Blood group (A+, A-, B+, B-, AB+, AB-, O+, O-)
  - Contact Details: Phone number, email address, physical address
  - Donation History: Last donation date tracking
- ✅ **Advanced Search & Filtering**:
  - Real-time search by name, email, blood group
  - Filter by blood type, age range, gender
  - Sort by registration date, last donation date
- ✅ **Data Validation**:
  - Email format validation
  - Phone number format checking
  - Age restrictions (18-65 years)
  - Duplicate email prevention
- ✅ **Donation Tracking**:
  - Automatic last donation date updates
  - Donation frequency monitoring
  - Eligibility checking (90-day interval between donations)

### 🏥 **Hospital Management System**

- ✅ **Hospital Registration**: Complete hospital profile management
- ✅ **Location Tracking**: Detailed address and contact information
- ✅ **Contact Management**: Multiple contact numbers and communication channels
- ✅ **Hospital Statistics**: Track requests and donations per hospital
- ✅ **Hospital Verification**: Admin approval system for new hospitals

### 🩸 **Blood Donation Recording**

- ✅ **Donation Entry System**:
  - Link donors to specific hospitals
  - Record exact donation dates and times
  - Track blood quantity (250ml - 500ml range)
  - Standard donation amount: 450ml
- ✅ **Blood Collection Analytics**:
  - Total collection by blood group
  - Monthly/yearly collection reports
  - Hospital-wise donation statistics
  - Donor frequency analysis
- ✅ **Quality Assurance**:
  - Data validation for all entries
  - Duplicate prevention systems
  - Automatic inventory updates

### 📋 **Blood Request Management**

- ✅ **Request Submission System**:
  - Hospitals can submit urgent blood requests
  - Specify required blood group and quantity
  - Set priority levels and urgency markers
  - Track request dates and deadlines
- ✅ **Request Processing**:
  - Admin panel for request approval/fulfillment
  - Status tracking (Pending/Fulfilled/Cancelled)
  - Automatic notifications for urgent requests
  - Request history and audit trails
- ✅ **Inventory Matching**:
  - Check available blood inventory
  - Suggest alternative blood types when needed
  - Automatic allocation based on compatibility

### 📊 **Advanced Dashboard & Analytics**

- ✅ **Real-time Statistics**:
  - Total registered donors
  - Total registered hospitals
  - Total donations collected
  - Pending blood requests
- ✅ **Visual Analytics**:
  - Blood group distribution charts
  - Collection trends over time
  - Hospital performance metrics
  - Donor activity patterns
- ✅ **Recent Activity Feed**:
  - Latest donations
  - New donor registrations
  - Recent blood requests
  - System notifications

### 🔍 **Search & Reporting Features**

- ✅ **Multi-criteria Search**: Search across all data types
- ✅ **Export Capabilities**: Download reports in various formats
- ✅ **Custom Reports**: Generate specific analytical reports
- ✅ **Data Filtering**: Advanced filtering options for all modules

## 🏗️ System Architecture

### **Frontend Architecture**

```
Frontend (Client-Side)
├── HTML5 Structure
│   ├── Semantic markup
│   ├── Responsive design
│   └── Accessibility features
├── CSS3 Styling
│   ├── Modern gradient designs
│   ├── Responsive grid layouts
│   ├── Animation and transitions
│   └── Mobile-first approach
└── JavaScript (ES6+)
    ├── Fetch API for HTTP requests
    ├── DOM manipulation
    ├── Form validation
    ├── Real-time updates
    └── Error handling
```

### **Backend Architecture**

```
Backend (Server-Side)
├── Node.js Runtime
├── Express.js Framework
│   ├── RESTful API design
│   ├── Middleware integration
│   ├── Route handling
│   └── Static file serving
├── MySQL Database
│   ├── Relational data structure
│   ├── Foreign key constraints
│   ├── Data validation
│   └── Transaction support
└── Additional Modules
    ├── CORS handling
    ├── JSON parsing
    ├── Error handling
    └── Database connection pooling
```

### **Database Architecture**

```
MySQL Database (blood_donation_db)
├── Donor Table
│   ├── Primary Key: donor_id
│   ├── Personal Information
│   ├── Contact Details
│   └── Medical Information
├── Hospital Table
│   ├── Primary Key: hospital_id
│   ├── Hospital Details
│   └── Contact Information
├── DonationRecord Table
│   ├── Primary Key: record_id
│   ├── Foreign Keys: donor_id, hospital_id
│   └── Donation Details
└── BloodRequest Table
    ├── Primary Key: request_id
    ├── Foreign Key: hospital_id
    └── Request Information
```

## 🛠️ Technology Stack

### **Frontend Technologies**

- **HTML5**: Semantic markup, modern web standards
- **CSS3**:
  - Flexbox and Grid layouts
  - CSS Variables for theming
  - Media queries for responsiveness
  - Animations and transitions
- **JavaScript (ES6+)**:
  - Async/await for API calls
  - Arrow functions and modern syntax
  - Destructuring and spread operators
  - Template literals for dynamic content

### **Backend Technologies**

- **Node.js (v14+)**: JavaScript runtime environment
- **Express.js (v4.18+)**:
  - Fast, minimalist web framework
  - Middleware support
  - RESTful API development
  - Static file serving
- **MySQL2 (v3.6+)**:
  - Promise-based MySQL driver
  - Connection pooling
  - Prepared statements
  - Transaction support

### **Additional Dependencies**

- **CORS (v2.8+)**: Cross-Origin Resource Sharing
- **dotenv (v16.3+)**: Environment variable management
- **nodemon (v3.0+)**: Development auto-restart (dev dependency)

### **Development Tools**

- **npm**: Package management
- **Git**: Version control
- **VS Code**: Recommended IDE
- **MySQL Workbench**: Database management GUI

## 📋 Prerequisites & System Requirements

### **Software Requirements**

#### **1. Node.js (Required)**

- **Minimum Version**: 14.0.0
- **Recommended Version**: 18.0.0 or higher
- **Download**: [https://nodejs.org/](https://nodejs.org/)
- **Verification**:
  ```bash
  node --version
  npm --version
  ```

#### **2. MySQL Server (Required)**

- **Minimum Version**: 5.7.0
- **Recommended Version**: 8.0.0 or higher
- **Download**: [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
- **Alternative**: XAMPP, WAMP, or MAMP for easier setup

#### **3. MySQL Client Tools (Recommended)**

- **MySQL Workbench**: GUI for database management
- **phpMyAdmin**: Web-based database administration
- **Command Line Client**: Included with MySQL server

### **System Requirements**

#### **Minimum Requirements**

- **OS**: Windows 10/11, macOS 10.14+, Ubuntu 18.04+
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Network**: Internet connection for npm packages

#### **Recommended Requirements**

- **OS**: Latest versions of Windows, macOS, or Linux
- **RAM**: 8GB or higher
- **Storage**: 2GB free space
- **CPU**: Multi-core processor
- **Network**: Stable broadband connection

### **Browser Compatibility**

- **Chrome**: Version 90+
- **Firefox**: Version 88+
- **Safari**: Version 14+
- **Edge**: Version 90+

## 🚀 Installation Guide

### **Step 1: Download/Clone Project**

#### **Option A: Download ZIP**

1. Download the project ZIP file
2. Extract to your desired location
3. Navigate to the extracted folder

#### **Option B: Git Clone (if using Git)**

```bash
git clone <repository-url>
cd blood-donation-system
```

### **Step 2: Navigate to Project Directory**

```bash
cd blood-donation-system
# or
cd c:\Users\565ga\Documents\Dev\dbms\blood-donation-system
```

### **Step 3: Install Node.js Dependencies**

```bash
# Install all required packages
npm install

# Alternative: Clean install
npm ci
```

#### **What Gets Installed:**

- **express**: Web framework for Node.js
- **mysql2**: MySQL database driver
- **cors**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable loader
- **nodemon**: Development auto-restart (dev dependency)

### **Step 4: MySQL Setup**

#### **4.1 Start MySQL Service**

**Windows:**

```bash
# Method 1: Using Services
services.msc → Find MySQL80 → Start

# Method 2: Command Line (as Administrator)
net start mysql80
# or
net start mysql
```

**macOS:**

```bash
# Using Homebrew
brew services start mysql

# Using System Preferences
System Preferences → MySQL → Start MySQL Server
```

**Linux (Ubuntu/Debian):**

```bash
sudo service mysql start
# or
sudo systemctl start mysql
```

#### **4.2 Verify MySQL is Running**

```bash
# Check if MySQL is listening on port 3306
netstat -an | grep 3306
# or on Windows
netstat -an | findstr :3306
```

#### **4.3 Test MySQL Connection**

```bash
mysql -u root -p
# Enter your MySQL password when prompted
```

If successful, you should see the MySQL prompt:

```
mysql>
```

Type `exit` to close the connection.

### **Step 5: Database Configuration**

The application will automatically create the database and tables on first run. However, you need to configure the connection settings.

#### **5.1 Edit Database Configuration**

Open `backend/db.js` and update the database configuration:

```javascript
const dbConfig = {
  host: "localhost", // MySQL server host
  user: "root", // Your MySQL username
  password: "your_password", // Your MySQL password
  database: "blood_donation_db",
  port: 3306, // MySQL port
};
```

#### **5.2 Common MySQL Credentials**

- **Default XAMPP**: user: `root`, password: `` (empty)
- **Default WAMP**: user: `root`, password: `` (empty)
- **Custom Installation**: Use the credentials you set during installation

## ⚙️ Configuration

### **Environment Variables (Optional but Recommended)**

Create a `.env` file in the project root for secure configuration:

```bash
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=blood_donation_db
DB_PORT=3306

# Server Configuration
PORT=3000
NODE_ENV=development

# Security (for future use)
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here
```

### **Database Configuration Options**

#### **Option 1: Direct Configuration (Default)**

Edit `backend/db.js` directly:

```javascript
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "blood_donation_db",
  port: 3306,
};
```

#### **Option 2: Environment Variables**

If using `.env` file, update `backend/db.js`:

```javascript
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "blood_donation_db",
  port: process.env.DB_PORT || 3306,
};
```

### **Server Configuration**

#### **Default Settings:**

- **Port**: 3000
- **Host**: localhost
- **CORS**: Enabled for all origins
- **Static Files**: Served from `frontend/` directory

#### **Custom Port Configuration:**

Update `backend/server.js`:

```javascript
const PORT = process.env.PORT || 3000; // Change 3000 to your preferred port
```

## 🎯 Running the Application

### **Development Mode (Recommended for Development)**

```bash
npm run dev
```

**Features of Development Mode:**

- ✅ Auto-restart on file changes
- ✅ Detailed error logging
- ✅ Hot reload capability
- ✅ Development middleware enabled

### **Production Mode**

```bash
npm start
```

**Features of Production Mode:**

- ✅ Optimized performance
- ✅ Minimal logging
- ✅ Production error handling
- ✅ Stable operation

### **Manual Start (Alternative)**

```bash
node backend/server.js
```

### **Expected Output**

When the server starts successfully, you should see:

```
Initializing database...
All tables created successfully
Database initialized successfully
🩸 Blood Donation Management System server running on port 3000
📱 Frontend: http://localhost:3000
🔗 API: http://localhost:3000/api
❤️  Health Check: http://localhost:3000/api/health
```

### **Accessing the Application**

#### **Frontend URLs:**

- **Dashboard**: http://localhost:3000/
- **Donor Management**: http://localhost:3000/donors
- **Hospital Management**: http://localhost:3000/hospitals
- **Donation Records**: http://localhost:3000/donations
- **Blood Requests**: http://localhost:3000/requests

#### **API Endpoints** (for testing):

- **Health Check**: http://localhost:3000/api/health
- **All Donors**: http://localhost:3000/api/donors
- **All Hospitals**: http://localhost:3000/api/hospitals
- **All Donations**: http://localhost:3000/api/donations
- **All Requests**: http://localhost:3000/api/requests

## 📖 User Guide

### **Getting Started - First Use**

1. **Open the Application**: Navigate to http://localhost:3000
2. **Explore the Dashboard**: View the main statistics and navigation
3. **Add Your First Hospital**: Go to Hospitals → Add New Hospital
4. **Register a Donor**: Go to Donors → Add New Donor
5. **Record a Donation**: Go to Donations → Record New Donation
6. **Create a Blood Request**: Go to Requests → Create New Request

### **Dashboard Overview**

#### **Key Statistics Cards:**

- **Total Donors**: Shows registered donor count
- **Registered Hospitals**: Shows hospital count
- **Total Donations**: Shows total blood donations
- **Pending Requests**: Shows unfulfilled blood requests

#### **Quick Actions Section:**

- **Add New Donor**: Direct link to donor registration
- **Add Hospital**: Direct link to hospital registration
- **Record Donation**: Direct link to donation entry
- **Blood Requests**: Direct link to request management

#### **Recent Activities:**

- Shows latest 5 donation records
- Displays donor name, blood group, quantity, and hospital
- Real-time updates when new donations are added

#### **Blood Group Statistics:**

- Visual representation of blood collection by type
- Shows donation count and total quantity per blood group
- Color-coded for easy identification

### **Donor Management - Detailed Guide**

#### **Adding a New Donor:**

1. **Navigate to Donors Page**: Click "Donors" in navigation
2. **Click "Add New Donor"**: Opens the registration form
3. **Fill Required Information**:

   - **Full Name**: Enter complete legal name
   - **Age**: Must be between 18-65 years
   - **Gender**: Select Male/Female/Other
   - **Blood Group**: Choose from dropdown (A+, A-, B+, B-, AB+, AB-, O+, O-)
   - **Phone Number**: Enter valid contact number
   - **Email**: Must be unique in the system
   - **Address**: Complete physical address
   - **Last Donation Date**: Optional field for existing donors

4. **Form Validation**:

   - All required fields must be filled
   - Email format validation
   - Age range validation
   - Duplicate email prevention

5. **Submit**: Click "Save Donor" to register

#### **Viewing Donors:**

- **Table View**: All donors displayed in sortable table
- **Search Function**: Real-time search by name, email, or blood group
- **Information Displayed**: Name, age, gender, blood group, contact details, last donation

#### **Editing Donor Information:**

1. **Find the Donor**: Use search or browse the table
2. **Click "Edit"**: Opens the edit form with pre-filled data
3. **Modify Information**: Update any fields as needed
4. **Save Changes**: Click "Save Donor" to update

#### **Deleting a Donor:**

1. **Locate the Donor**: Find in the table
2. **Click "Delete"**: Confirmation dialog appears
3. **Confirm Deletion**: This action cannot be undone
4. **Note**: Deleting a donor also removes their donation history

### **Hospital Management - Detailed Guide**

#### **Registering a New Hospital:**

1. **Go to Hospitals Page**: Click "Hospitals" in navigation
2. **Click "Add New Hospital"**: Opens registration form
3. **Enter Hospital Details**:

   - **Hospital Name**: Official hospital name
   - **Location/Address**: Complete address with city, state
   - **Contact Number**: Main hospital phone number

4. **Submit Registration**: Click "Save Hospital"

#### **Managing Hospitals:**

- **View All Hospitals**: Table showing all registered hospitals
- **Search Hospitals**: Search by name or location
- **Edit Hospital Info**: Update hospital details
- **Delete Hospital**: Remove hospital (also removes associated requests)

### **Blood Donation Records - Detailed Guide**

#### **Recording a New Donation:**

1. **Navigate to Donations**: Click "Donations" in navigation
2. **Click "Record New Donation"**: Opens donation form
3. **Select Donor**: Choose from dropdown list (shows name and blood group)
4. **Select Hospital**: Choose receiving hospital
5. **Set Donation Date**: Usually current date
6. **Enter Quantity**: Blood quantity in milliliters

   - **Standard Amount**: 450ml
   - **Range**: 250ml - 500ml
   - **Step**: 50ml increments

7. **Submit Record**: Click "Record Donation"

#### **Automatic Updates:**

- **Donor's Last Donation Date**: Updated automatically
- **Blood Collection Statistics**: Refreshed in real-time
- **Dashboard Statistics**: Updated immediately

#### **Viewing Donation Records:**

- **Complete History**: All donations in chronological order
- **Search Function**: Search by donor name, hospital, or blood group
- **Filter by Blood Group**: Dropdown filter for specific blood types
- **Sorting**: Click column headers to sort

#### **Blood Collection Statistics:**

- **By Blood Group**: Shows collection totals for each blood type
- **Visual Display**: Color-coded cards for easy reading
- **Real-time Updates**: Automatically refreshes after new donations

### **Blood Request Management - Detailed Guide**

#### **Creating a Blood Request:**

1. **Go to Requests Page**: Click "Requests" in navigation
2. **Click "Create New Request"**: Opens request form
3. **Fill Request Details**:

   - **Hospital**: Select requesting hospital
   - **Blood Group**: Required blood type
   - **Quantity**: Amount needed in milliliters
   - **Request Date**: Date of request (defaults to today)

4. **Submit Request**: Click "Submit Request"

#### **Managing Requests:**

##### **Viewing All Requests:**

- **Complete List**: All requests with status indicators
- **Status Colors**:
  - **Pending**: Yellow/orange highlighting
  - **Fulfilled**: Green highlighting
- **Information Displayed**: Date, hospital, location, blood group, quantity, status

##### **Urgent Pending Requests Section:**

- **Top Priority Display**: Highlighted urgent requests
- **Visual Indicators**: Red warning icons
- **Quick Action**: "Fulfill Request" button for immediate processing

##### **Request Status Management:**

1. **Find the Request**: Locate in the table
2. **Update Status**: Click "Fulfill" for pending requests
3. **Confirmation**: Confirm status change
4. **Automatic Updates**: Dashboard and statistics refresh

##### **Search and Filter Options:**

- **Search Bar**: Search by hospital name or blood group
- **Status Filter**: Filter by Pending/Fulfilled status
- **Blood Group Filter**: Filter by specific blood types

### **Search and Filter Features**

#### **Global Search Functionality:**

- **Real-time Search**: Results appear as you type
- **Multi-field Search**: Searches across multiple data fields
- **Case-insensitive**: Works regardless of capitalization

#### **Advanced Filtering:**

- **Blood Group Filters**: Available on donations and requests pages
- **Status Filters**: For blood requests (Pending/Fulfilled)
- **Date Range Filters**: For donations and requests (future enhancement)

## 🛠️ Technology Stack

- **Node.js** (version 14.0 or higher)
- **MySQL** (version 5.7 or higher)
- **npm** (comes with Node.js)

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd blood-donation-system

# Or extract the downloaded ZIP file
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Configuration

#### Option A: Quick Setup (Default Configuration)

The system will automatically create the database and tables when you first run it. Make sure MySQL is running with these default settings:

- **Host**: localhost
- **Port**: 3306
- **Username**: root
- **Password**: (empty)
- **Database**: blood_donation_db (will be created automatically)

#### Option B: Custom Configuration

If you need to use different MySQL credentials, edit the `backend/db.js` file:

```javascript
const dbConfig = {
  host: "your-mysql-host", // Default: localhost
  user: "your-mysql-username", // Default: root
  password: "your-mysql-password", // Default: (empty)
  database: "blood_donation_db",
  port: 3306,
};
```

### 4. Start MySQL Server

Make sure your MySQL server is running:

**Windows:**

```bash
# Using MySQL Workbench or start from Services
# Or via command line if MySQL is in PATH
mysql -u root -p
```

**Mac/Linux:**

```bash
sudo service mysql start
# or
brew services start mysql
```

### 5. Run the Application

```bash
# Start the server
npm start

# For development with auto-restart
npm run dev
```

The application will be available at: **http://localhost:3000**

## 📖 Usage Guide

### First Time Setup

1. Start the application using `npm start`
2. Open your web browser and navigate to `http://localhost:3000`
3. The database and tables will be created automatically on first run
4. You can now start adding donors, hospitals, and managing donations

### Application Workflow

#### 1. **Dashboard** (`/`)

- View system overview and statistics
- Quick access to all major functions
- Monitor recent activities and pending requests

#### 2. **Donor Management** (`/donors`)

- **Add New Donor**: Click "Add New Donor" and fill in the required information
- **View Donors**: Browse the complete list of registered donors
- **Edit Donor**: Click "Edit" button next to any donor to modify their information
- **Delete Donor**: Remove donors from the system (use with caution)
- **Search**: Use the search bar to find specific donors

#### 3. **Hospital Management** (`/hospitals`)

- **Add Hospital**: Register new hospitals in the system
- **View Hospitals**: See all registered healthcare facilities
- **Edit/Delete**: Manage hospital information as needed

#### 4. **Donation Records** (`/donations`)

- **Record Donation**: Select donor and hospital, enter date and quantity
- **View Records**: Browse all donation history
- **Statistics**: View blood collection statistics by blood group
- **Filter**: Search and filter donations by various criteria

#### 5. **Blood Requests** (`/requests`)

- **Create Request**: Hospitals can request specific blood types and quantities
- **Manage Requests**: View, fulfill, or delete blood requests
- **Urgent Requests**: Pending requests are highlighted for priority handling
- **Status Tracking**: Monitor request fulfillment status

## 🗄️ Database Schema

The system automatically creates the following tables:

### Donor Table

```sql
CREATE TABLE Donor (
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
);
```

### Hospital Table

```sql
CREATE TABLE Hospital (
    hospital_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    contact_number VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### DonationRecord Table

```sql
CREATE TABLE DonationRecord (
    record_id INT PRIMARY KEY AUTO_INCREMENT,
    donor_id INT NOT NULL,
    hospital_id INT NOT NULL,
    date DATE NOT NULL,
    quantity_ml INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES Donor(donor_id) ON DELETE CASCADE,
    FOREIGN KEY (hospital_id) REFERENCES Hospital(hospital_id) ON DELETE CASCADE
);
```

### BloodRequest Table

```sql
CREATE TABLE BloodRequest (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    hospital_id INT NOT NULL,
    blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    quantity_ml INT NOT NULL,
    status ENUM('Pending', 'Fulfilled') DEFAULT 'Pending',
    request_date DATE DEFAULT (CURRENT_DATE),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hospital_id) REFERENCES Hospital(hospital_id) ON DELETE CASCADE
);
```

## 🌐 API Endpoints

### Donors

- `GET /api/donors` - Get all donors
- `GET /api/donors/:id` - Get specific donor
- `POST /api/donors` - Create new donor
- `PUT /api/donors/:id` - Update donor
- `DELETE /api/donors/:id` - Delete donor
- `GET /api/donors/stats/donations` - Get donor statistics

### Hospitals

- `GET /api/hospitals` - Get all hospitals
- `GET /api/hospitals/:id` - Get specific hospital
- `POST /api/hospitals` - Create new hospital
- `PUT /api/hospitals/:id` - Update hospital
- `DELETE /api/hospitals/:id` - Delete hospital

### Donations

- `GET /api/donations` - Get all donation records
- `GET /api/donations/:id` - Get specific donation
- `POST /api/donations` - Create new donation record
- `PUT /api/donations/:id` - Update donation record
- `DELETE /api/donations/:id` - Delete donation record
- `GET /api/donations/stats/bloodgroup` - Get blood group statistics

### Blood Requests

- `GET /api/requests` - Get all blood requests
- `GET /api/requests/:id` - Get specific request
- `POST /api/requests` - Create new blood request
- `PUT /api/requests/:id` - Update blood request
- `PUT /api/requests/:id/status` - Update request status only
- `DELETE /api/requests/:id` - Delete blood request
- `GET /api/requests/status/pending` - Get pending requests only

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. **Database Connection Error**

```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solution**:

- Ensure MySQL server is running
- Check MySQL credentials in `backend/db.js`
- Verify MySQL is listening on port 3306

#### 2. **Port Already in Use**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**:

- Change the port in `backend/server.js`
- Or kill the process using port 3000:

  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <process-id> /F

  # Mac/Linux
  lsof -ti:3000 | xargs kill -9
  ```

#### 3. **Module Not Found Errors**

```
Error: Cannot find module 'express'
```

**Solution**:

- Run `npm install` to install all dependencies
- Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

#### 4. **Database Access Denied**

```
Error: Access denied for user 'root'@'localhost'
```

**Solution**:

- Check MySQL username and password
- Grant necessary privileges to the MySQL user
- Reset MySQL root password if necessary

#### 5. **Tables Not Created**

**Solution**:

- The application automatically creates tables on startup
- Check MySQL logs for any creation errors
- Manually create database: `CREATE DATABASE blood_donation_db;`

### Performance Tips

1. **Large Dataset Handling**

   - The system handles pagination naturally through MySQL queries
   - For very large datasets, consider implementing server-side pagination

2. **Search Optimization**

   - Current search is client-side for simplicity
   - For better performance with large datasets, implement server-side search

3. **Database Optimization**
   - Add indexes on frequently searched columns
   - Regular database maintenance and optimization

## 🔒 Security Considerations

### For Production Deployment

1. **Environment Variables**

   ```bash
   # Create .env file for sensitive data
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=blood_donation_db
   PORT=3000
   ```

2. **Input Validation**

   - The system includes basic validation
   - Consider adding more robust validation for production

3. **Authentication**

   - Current system doesn't include user authentication
   - Implement user roles and authentication for production use

4. **HTTPS**
   - Use HTTPS in production
   - Configure SSL certificates

## 📁 Project Structure

```
blood-donation-system/
├── backend/
│   ├── routes/
│   │   ├── donorRoutes.js      # Donor API endpoints
│   │   ├── hospitalRoutes.js   # Hospital API endpoints
│   │   ├── donationRoutes.js   # Donation API endpoints
│   │   └── requestRoutes.js    # Request API endpoints
│   ├── server.js               # Main server file
│   └── db.js                   # Database connection and setup
├── frontend/
│   ├── css/
│   │   └── style.css           # Main stylesheet
│   ├── js/
│   │   └── main.js             # Frontend JavaScript
│   ├── index.html              # Dashboard page
│   ├── donors.html             # Donor management page
│   ├── hospitals.html          # Hospital management page
│   ├── donations.html          # Donation records page
│   └── requests.html           # Blood requests page
├── package.json                # Node.js dependencies
└── README.md                   # Documentation
```

## 🤝 Contributing

This is a learning project, but improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is created for educational purposes. Feel free to use and modify as needed.

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the console logs for error details
3. Ensure all prerequisites are properly installed
4. Verify database connectivity

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for educational and practical use
- Focuses on clean, maintainable code structure

---

**Happy Coding! 🚀**

_Remember: This system helps save lives by efficiently managing blood donations. Every donation counts!_ ❤️
