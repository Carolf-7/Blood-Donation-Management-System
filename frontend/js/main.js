// API Base URL
const API_BASE = "/api";

// Utility Functions
function formatDate(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
}

function formatBloodGroup(bloodGroup) {
  const className = bloodGroup.replace("+", "-plus").replace("-", "-minus");
  return `<span class="blood-group ${className}">${bloodGroup}</span>`;
}

function formatStatus(status) {
  return `<span class="status ${status.toLowerCase()}">${status}</span>`;
}

function showError(message) {
  alert("Error: " + message);
}

function showSuccess(message) {
  alert("Success: " + message);
}

// Generic API call function
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

// Dashboard Functions
async function loadDashboardStats() {
  try {
    const [donors, hospitals, donations, requests] = await Promise.all([
      apiCall("/donors"),
      apiCall("/hospitals"),
      apiCall("/donations"),
      apiCall("/requests"),
    ]);

    document.getElementById("total-donors").textContent = donors.length;
    document.getElementById("total-hospitals").textContent = hospitals.length;
    document.getElementById("total-donations").textContent = donations.length;

    const pendingRequests = requests.filter((r) => r.status === "Pending");
    document.getElementById("pending-requests").textContent =
      pendingRequests.length;
  } catch (error) {
    console.error("Failed to load dashboard stats:", error);
  }
}

async function loadRecentActivities() {
  try {
    const donations = await apiCall("/donations");
    const recentDonations = donations.slice(0, 5);

    const activitiesContainer = document.getElementById("recent-activities");
    if (recentDonations.length === 0) {
      activitiesContainer.innerHTML =
        '<p class="loading">No recent activities</p>';
      return;
    }

    activitiesContainer.innerHTML = recentDonations
      .map(
        (donation) => `
            <div class="activity-item">
                <div class="date">${formatDate(donation.date)}</div>
                <div class="description">
                    ${donation.donor_name} donated ${
          donation.quantity_ml
        }ml of ${donation.blood_group} blood to ${donation.hospital_name}
                </div>
            </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Failed to load recent activities:", error);
    document.getElementById("recent-activities").innerHTML =
      '<p class="loading">Failed to load activities</p>';
  }
}

async function loadBloodGroupStats() {
  try {
    const stats = await apiCall("/donations/stats/bloodgroup");
    const statsContainer = document.getElementById("blood-group-stats");

    if (stats.length === 0) {
      statsContainer.innerHTML =
        '<p class="loading">No donation statistics available</p>';
      return;
    }

    statsContainer.innerHTML = `
            <div class="blood-stats-grid">
                ${stats
                  .map(
                    (stat) => `
                    <div class="blood-stat-item">
                        <h4>${formatBloodGroup(stat.blood_group)}</h4>
                        <span class="count">${stat.donation_count}</span>
                        <span class="quantity">${
                          stat.total_quantity_ml
                        }ml total</span>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  } catch (error) {
    console.error("Failed to load blood group stats:", error);
    document.getElementById("blood-group-stats").innerHTML =
      '<p class="loading">Failed to load statistics</p>';
  }
}

// Donor Management Functions
async function loadDonors() {
  try {
    const donors = await apiCall("/donors");
    const tbody = document.querySelector("#donors-table tbody");

    if (donors.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="8" class="loading">No donors found</td></tr>';
      return;
    }

    tbody.innerHTML = donors
      .map(
        (donor) => `
            <tr>
                <td>${donor.name}</td>
                <td>${donor.age}</td>
                <td>${donor.gender}</td>
                <td>${formatBloodGroup(donor.blood_group)}</td>
                <td>${donor.phone}</td>
                <td>${donor.email}</td>
                <td>${formatDate(donor.last_donation_date)}</td>
                <td>
                    <button class="btn btn-edit" onclick="editDonor(${
                      donor.donor_id
                    })">Edit</button>
                    <button class="btn btn-danger" onclick="deleteDonor(${
                      donor.donor_id
                    })">Delete</button>
                </td>
            </tr>
        `
      )
      .join("");
  } catch (error) {
    console.error("Failed to load donors:", error);
    showError("Failed to load donors");
  }
}

function setupDonorFormHandlers() {
  const addBtn = document.getElementById("add-donor-btn");
  const formSection = document.getElementById("donor-form-section");
  const donorForm = document.getElementById("donor-form");
  const cancelBtn = document.getElementById("cancel-form");
  const searchInput = document.getElementById("search-donors");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      showDonorForm();
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      hideDonorForm();
    });
  }

  if (donorForm) {
    donorForm.addEventListener("submit", handleDonorSubmit);
  }

  if (searchInput) {
    searchInput.addEventListener("input", searchDonors);
  }
}

function showDonorForm(donor = null) {
  const formSection = document.getElementById("donor-form-section");
  const formTitle = document.getElementById("form-title");
  const form = document.getElementById("donor-form");

  if (donor) {
    formTitle.textContent = "Edit Donor";
    populateDonorForm(donor);
  } else {
    formTitle.textContent = "Add New Donor";
    form.reset();
    document.getElementById("donor-id").value = "";
  }

  formSection.style.display = "block";
  formSection.scrollIntoView({ behavior: "smooth" });
}

function hideDonorForm() {
  document.getElementById("donor-form-section").style.display = "none";
  document.getElementById("donor-form").reset();
}

function populateDonorForm(donor) {
  document.getElementById("donor-id").value = donor.donor_id;
  document.getElementById("name").value = donor.name;
  document.getElementById("age").value = donor.age;
  document.getElementById("gender").value = donor.gender;
  document.getElementById("blood-group").value = donor.blood_group;
  document.getElementById("phone").value = donor.phone;
  document.getElementById("email").value = donor.email;
  document.getElementById("address").value = donor.address;
  if (donor.last_donation_date) {
    document.getElementById("last-donation-date").value =
      donor.last_donation_date.split("T")[0];
  }
}

async function handleDonorSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const donorData = Object.fromEntries(formData.entries());
  const donorId = document.getElementById("donor-id").value;

  try {
    if (donorId) {
      await apiCall(`/donors/${donorId}`, {
        method: "PUT",
        body: JSON.stringify(donorData),
      });
      showSuccess("Donor updated successfully");
    } else {
      await apiCall("/donors", {
        method: "POST",
        body: JSON.stringify(donorData),
      });
      showSuccess("Donor added successfully");
    }

    hideDonorForm();
    loadDonors();
  } catch (error) {
    showError(error.message);
  }
}

async function editDonor(donorId) {
  try {
    const donor = await apiCall(`/donors/${donorId}`);
    showDonorForm(donor);
  } catch (error) {
    showError("Failed to load donor details");
  }
}

async function deleteDonor(donorId) {
  if (!confirm("Are you sure you want to delete this donor?")) return;

  try {
    await apiCall(`/donors/${donorId}`, { method: "DELETE" });
    showSuccess("Donor deleted successfully");
    loadDonors();
  } catch (error) {
    showError("Failed to delete donor");
  }
}

function searchDonors() {
  const searchTerm = document
    .getElementById("search-donors")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#donors-table tbody tr");

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchTerm) ? "" : "none";
  });
}

// Hospital Management Functions
async function loadHospitals() {
  try {
    const hospitals = await apiCall("/hospitals");
    const tbody = document.querySelector("#hospitals-table tbody");

    if (hospitals.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="5" class="loading">No hospitals found</td></tr>';
      return;
    }

    tbody.innerHTML = hospitals
      .map(
        (hospital) => `
            <tr>
                <td>${hospital.name}</td>
                <td>${hospital.location}</td>
                <td>${hospital.contact_number}</td>
                <td>${formatDate(hospital.created_at)}</td>
                <td>
                    <button class="btn btn-edit" onclick="editHospital(${
                      hospital.hospital_id
                    })">Edit</button>
                    <button class="btn btn-danger" onclick="deleteHospital(${
                      hospital.hospital_id
                    })">Delete</button>
                </td>
            </tr>
        `
      )
      .join("");
  } catch (error) {
    console.error("Failed to load hospitals:", error);
    showError("Failed to load hospitals");
  }
}

function setupHospitalFormHandlers() {
  const addBtn = document.getElementById("add-hospital-btn");
  const formSection = document.getElementById("hospital-form-section");
  const hospitalForm = document.getElementById("hospital-form");
  const cancelBtn = document.getElementById("cancel-form");
  const searchInput = document.getElementById("search-hospitals");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      showHospitalForm();
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      hideHospitalForm();
    });
  }

  if (hospitalForm) {
    hospitalForm.addEventListener("submit", handleHospitalSubmit);
  }

  if (searchInput) {
    searchInput.addEventListener("input", searchHospitals);
  }
}

function showHospitalForm(hospital = null) {
  const formSection = document.getElementById("hospital-form-section");
  const formTitle = document.getElementById("form-title");
  const form = document.getElementById("hospital-form");

  if (hospital) {
    formTitle.textContent = "Edit Hospital";
    populateHospitalForm(hospital);
  } else {
    formTitle.textContent = "Add New Hospital";
    form.reset();
    document.getElementById("hospital-id").value = "";
  }

  formSection.style.display = "block";
  formSection.scrollIntoView({ behavior: "smooth" });
}

function hideHospitalForm() {
  document.getElementById("hospital-form-section").style.display = "none";
  document.getElementById("hospital-form").reset();
}

function populateHospitalForm(hospital) {
  document.getElementById("hospital-id").value = hospital.hospital_id;
  document.getElementById("name").value = hospital.name;
  document.getElementById("location").value = hospital.location;
  document.getElementById("contact-number").value = hospital.contact_number;
}

async function handleHospitalSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const hospitalData = Object.fromEntries(formData.entries());
  const hospitalId = document.getElementById("hospital-id").value;

  try {
    if (hospitalId) {
      await apiCall(`/hospitals/${hospitalId}`, {
        method: "PUT",
        body: JSON.stringify(hospitalData),
      });
      showSuccess("Hospital updated successfully");
    } else {
      await apiCall("/hospitals", {
        method: "POST",
        body: JSON.stringify(hospitalData),
      });
      showSuccess("Hospital added successfully");
    }

    hideHospitalForm();
    loadHospitals();
  } catch (error) {
    showError(error.message);
  }
}

async function editHospital(hospitalId) {
  try {
    const hospital = await apiCall(`/hospitals/${hospitalId}`);
    showHospitalForm(hospital);
  } catch (error) {
    showError("Failed to load hospital details");
  }
}

async function deleteHospital(hospitalId) {
  if (!confirm("Are you sure you want to delete this hospital?")) return;

  try {
    await apiCall(`/hospitals/${hospitalId}`, { method: "DELETE" });
    showSuccess("Hospital deleted successfully");
    loadHospitals();
  } catch (error) {
    showError("Failed to delete hospital");
  }
}

function searchHospitals() {
  const searchTerm = document
    .getElementById("search-hospitals")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#hospitals-table tbody tr");

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchTerm) ? "" : "none";
  });
}

// Donation Management Functions
async function loadDonations() {
  try {
    const donations = await apiCall("/donations");
    const tbody = document.querySelector("#donations-table tbody");

    if (donations.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="6" class="loading">No donation records found</td></tr>';
      return;
    }

    tbody.innerHTML = donations
      .map(
        (donation) => `
            <tr>
                <td>${formatDate(donation.date)}</td>
                <td>${donation.donor_name}</td>
                <td>${formatBloodGroup(donation.blood_group)}</td>
                <td>${donation.hospital_name}</td>
                <td>${donation.quantity_ml}ml</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteDonation(${
                      donation.record_id
                    })">Delete</button>
                </td>
            </tr>
        `
      )
      .join("");
  } catch (error) {
    console.error("Failed to load donations:", error);
    showError("Failed to load donations");
  }
}

async function loadBloodCollectionStats() {
  try {
    const stats = await apiCall("/donations/stats/bloodgroup");
    const statsContainer = document.getElementById("blood-stats");

    if (stats.length === 0) {
      statsContainer.innerHTML =
        '<p class="loading">No statistics available</p>';
      return;
    }

    statsContainer.innerHTML = stats
      .map(
        (stat) => `
            <div class="blood-stat-item">
                <h4>${formatBloodGroup(stat.blood_group)}</h4>
                <span class="count">${stat.donation_count}</span>
                <span class="quantity">${stat.total_quantity_ml}ml</span>
            </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Failed to load blood collection stats:", error);
  }
}

async function loadFormOptions() {
  try {
    const [donors, hospitals] = await Promise.all([
      apiCall("/donors"),
      apiCall("/hospitals"),
    ]);

    const donorSelect = document.getElementById("donor-select");
    const hospitalSelect = document.getElementById("hospital-select");

    if (donorSelect) {
      donorSelect.innerHTML =
        '<option value="">Select Donor</option>' +
        donors
          .map(
            (donor) =>
              `<option value="${donor.donor_id}">${donor.name} (${donor.blood_group})</option>`
          )
          .join("");
    }

    if (hospitalSelect) {
      hospitalSelect.innerHTML =
        '<option value="">Select Hospital</option>' +
        hospitals
          .map(
            (hospital) =>
              `<option value="${hospital.hospital_id}">${hospital.name}</option>`
          )
          .join("");
    }
  } catch (error) {
    console.error("Failed to load form options:", error);
  }
}

function setupDonationFormHandlers() {
  const addBtn = document.getElementById("add-donation-btn");
  const formSection = document.getElementById("donation-form-section");
  const donationForm = document.getElementById("donation-form");
  const cancelBtn = document.getElementById("cancel-form");
  const searchInput = document.getElementById("search-donations");
  const bloodGroupFilter = document.getElementById("blood-group-filter");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      showDonationForm();
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      hideDonationForm();
    });
  }

  if (donationForm) {
    donationForm.addEventListener("submit", handleDonationSubmit);
  }

  if (searchInput) {
    searchInput.addEventListener("input", searchDonations);
  }

  if (bloodGroupFilter) {
    bloodGroupFilter.addEventListener("change", filterDonationsByBloodGroup);
  }
}

function showDonationForm() {
  const formSection = document.getElementById("donation-form-section");
  const form = document.getElementById("donation-form");

  form.reset();
  document.getElementById("donation-date").value = new Date()
    .toISOString()
    .split("T")[0];
  document.getElementById("quantity").value = 450; // Default donation amount

  formSection.style.display = "block";
  formSection.scrollIntoView({ behavior: "smooth" });
}

function hideDonationForm() {
  document.getElementById("donation-form-section").style.display = "none";
  document.getElementById("donation-form").reset();
}

async function handleDonationSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const donationData = Object.fromEntries(formData.entries());

  try {
    await apiCall("/donations", {
      method: "POST",
      body: JSON.stringify(donationData),
    });
    showSuccess("Donation record created successfully");
    hideDonationForm();
    loadDonations();
    loadBloodCollectionStats();
  } catch (error) {
    showError(error.message);
  }
}

async function deleteDonation(recordId) {
  if (!confirm("Are you sure you want to delete this donation record?")) return;

  try {
    await apiCall(`/donations/${recordId}`, { method: "DELETE" });
    showSuccess("Donation record deleted successfully");
    loadDonations();
    loadBloodCollectionStats();
  } catch (error) {
    showError("Failed to delete donation record");
  }
}

function searchDonations() {
  const searchTerm = document
    .getElementById("search-donations")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#donations-table tbody tr");

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchTerm) ? "" : "none";
  });
}

function filterDonationsByBloodGroup() {
  const selectedBloodGroup = document
    .getElementById("blood-group-filter")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#donations-table tbody tr");

  rows.forEach((row) => {
    if (!selectedBloodGroup) {
      row.style.display = "";
    } else {
      const bloodGroupCell = row.cells[2];
      const bloodGroup = bloodGroupCell
        ? bloodGroupCell.textContent.toLowerCase()
        : "";
      row.style.display = bloodGroup.includes(selectedBloodGroup) ? "" : "none";
    }
  });
}

// Request Management Functions
async function loadRequests() {
  try {
    const requests = await apiCall("/requests");
    const tbody = document.querySelector("#requests-table tbody");

    if (requests.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="7" class="loading">No blood requests found</td></tr>';
      return;
    }

    tbody.innerHTML = requests
      .map(
        (request) => `
            <tr>
                <td>${formatDate(request.request_date)}</td>
                <td>${request.hospital_name}</td>
                <td>${request.location}</td>
                <td>${formatBloodGroup(request.blood_group)}</td>
                <td>${request.quantity_ml}ml</td>
                <td>${formatStatus(request.status)}</td>
                <td>
                    ${
                      request.status === "Pending"
                        ? `<button class="btn btn-success" onclick="fulfillRequest(${request.request_id})">Fulfill</button>`
                        : ""
                    }
                    <button class="btn btn-danger" onclick="deleteRequest(${
                      request.request_id
                    })">Delete</button>
                </td>
            </tr>
        `
      )
      .join("");
  } catch (error) {
    console.error("Failed to load requests:", error);
    showError("Failed to load requests");
  }
}

async function loadPendingRequests() {
  try {
    const pendingRequests = await apiCall("/requests/status/pending");
    const container = document.getElementById("pending-requests");

    if (pendingRequests.length === 0) {
      container.innerHTML = '<p class="loading">No pending requests</p>';
      return;
    }

    container.innerHTML = pendingRequests
      .map(
        (request) => `
            <div class="urgent-request">
                <h4>${request.hospital_name}</h4>
                <div class="details">
                    <strong>Blood Group:</strong> ${request.blood_group}<br>
                    <strong>Quantity:</strong> ${request.quantity_ml}ml<br>
                    <strong>Location:</strong> ${request.location}<br>
                    <strong>Request Date:</strong> ${formatDate(
                      request.request_date
                    )}
                </div>
                <button class="btn btn-success" onclick="fulfillRequest(${
                  request.request_id
                })">Fulfill Request</button>
            </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Failed to load pending requests:", error);
  }
}

async function loadHospitalsForRequests() {
  try {
    const hospitals = await apiCall("/hospitals");
    const hospitalSelect = document.getElementById("hospital-select");

    if (hospitalSelect) {
      hospitalSelect.innerHTML =
        '<option value="">Select Hospital</option>' +
        hospitals
          .map(
            (hospital) =>
              `<option value="${hospital.hospital_id}">${hospital.name}</option>`
          )
          .join("");
    }
  } catch (error) {
    console.error("Failed to load hospitals for requests:", error);
  }
}

function setupRequestFormHandlers() {
  const addBtn = document.getElementById("add-request-btn");
  const formSection = document.getElementById("request-form-section");
  const requestForm = document.getElementById("request-form");
  const cancelBtn = document.getElementById("cancel-form");
  const searchInput = document.getElementById("search-requests");
  const statusFilter = document.getElementById("status-filter");
  const bloodGroupFilter = document.getElementById("blood-group-filter");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      showRequestForm();
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      hideRequestForm();
    });
  }

  if (requestForm) {
    requestForm.addEventListener("submit", handleRequestSubmit);
  }

  if (searchInput) {
    searchInput.addEventListener("input", searchRequests);
  }

  if (statusFilter) {
    statusFilter.addEventListener("change", filterRequestsByStatus);
  }

  if (bloodGroupFilter) {
    bloodGroupFilter.addEventListener("change", filterRequestsByBloodGroup);
  }
}

function showRequestForm() {
  const formSection = document.getElementById("request-form-section");
  const form = document.getElementById("request-form");

  form.reset();
  document.getElementById("request-date").value = new Date()
    .toISOString()
    .split("T")[0];

  formSection.style.display = "block";
  formSection.scrollIntoView({ behavior: "smooth" });
}

function hideRequestForm() {
  document.getElementById("request-form-section").style.display = "none";
  document.getElementById("request-form").reset();
}

async function handleRequestSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const requestData = Object.fromEntries(formData.entries());

  try {
    await apiCall("/requests", {
      method: "POST",
      body: JSON.stringify(requestData),
    });
    showSuccess("Blood request created successfully");
    hideRequestForm();
    loadRequests();
    loadPendingRequests();
  } catch (error) {
    showError(error.message);
  }
}

async function fulfillRequest(requestId) {
  if (!confirm("Mark this request as fulfilled?")) return;

  try {
    await apiCall(`/requests/${requestId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status: "Fulfilled" }),
    });
    showSuccess("Request marked as fulfilled");
    loadRequests();
    loadPendingRequests();
  } catch (error) {
    showError("Failed to update request status");
  }
}

async function deleteRequest(requestId) {
  if (!confirm("Are you sure you want to delete this request?")) return;

  try {
    await apiCall(`/requests/${requestId}`, { method: "DELETE" });
    showSuccess("Request deleted successfully");
    loadRequests();
    loadPendingRequests();
  } catch (error) {
    showError("Failed to delete request");
  }
}

function searchRequests() {
  const searchTerm = document
    .getElementById("search-requests")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#requests-table tbody tr");

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchTerm) ? "" : "none";
  });
}

function filterRequestsByStatus() {
  const selectedStatus = document
    .getElementById("status-filter")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#requests-table tbody tr");

  rows.forEach((row) => {
    if (!selectedStatus) {
      row.style.display = "";
    } else {
      const statusCell = row.cells[5];
      const status = statusCell ? statusCell.textContent.toLowerCase() : "";
      row.style.display = status.includes(selectedStatus) ? "" : "none";
    }
  });
}

function filterRequestsByBloodGroup() {
  const selectedBloodGroup = document
    .getElementById("blood-group-filter")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#requests-table tbody tr");

  rows.forEach((row) => {
    if (!selectedBloodGroup) {
      row.style.display = "";
    } else {
      const bloodGroupCell = row.cells[3];
      const bloodGroup = bloodGroupCell
        ? bloodGroupCell.textContent.toLowerCase()
        : "";
      row.style.display = bloodGroup.includes(selectedBloodGroup) ? "" : "none";
    }
  });
}
