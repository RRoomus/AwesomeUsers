var users = [];

// Create table body
function createTableBody(users) {
  var tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var row = document.createElement("tr");

    var nameCell = document.createElement("td");
    nameCell.textContent = user.name;
    row.appendChild(nameCell);

    var usernameCell = document.createElement("td");
    usernameCell.textContent = user.username;
    row.appendChild(usernameCell);

    var emailCell = document.createElement("td");
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    var phoneCell = document.createElement("td");
    phoneCell.textContent = user.phone;
    row.appendChild(phoneCell);

    var websiteCell = document.createElement("td");
    websiteCell.textContent = user.website;
    row.appendChild(websiteCell);

    // var companyCell = document.createElement("td");
    // companyCell.textContent = user.company;
    // row.appendChild(companyCell);

    var editCell = document.createElement("td");
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", createEditHandler(i));
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    var deleteCell = document.createElement("td");
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", createDeleteHandler(i));
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  }
}

// Filter table based on search input
function filterTable() {
  var searchInput = document.querySelector("#searchInput");
  var filter = searchInput.value.toUpperCase();
  var rows = document.querySelectorAll("#userTable tbody tr");

  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].querySelectorAll("td");
    var found = false;

    for (var j = 0; j < cells.length; j++) {
      var cell = cells[j];
      if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
        found = true;
        break;
      }
    }

    rows[i].style.display = found ? "" : "none";
  }
}

// Show add user form
function showAddUserForm() {
  var addUserForm = document.querySelector("#addUserForm");
  addUserForm.style.display = "block";
}

// Hide add user form
function hideAddUserForm() {
  var addUserForm = document.querySelector("#addUserForm");
  addUserForm.style.display = "none";
}

// Add user to the table
function addUser(event) {
  event.preventDefault();

  var nameInput = document.querySelector("#nameInput");
  var usernameInput = document.querySelector("#usernameInput");
  var emailInput = document.querySelector("#emailInput");
  var phoneInput = document.querySelector("#phoneInput");
  var websiteInput = document.querySelector("#websiteInput");
//   var companyInput = document.querySelector("#companyInput");

  var newUser = {
    name: nameInput.value,
    username: usernameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    website: websiteInput.value,
    // company: companyInput.value
  };

  users.push(newUser);
  createTableBody(users);

  nameInput.value = "";
  usernameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  websiteInput.value = "";
//   companyInput.value = "";

  hideAddUserForm();
}

// Edit user in the table
function createEditHandler(index) {
  return function () {
    var nameCell = document.querySelectorAll("#userTable tbody tr td")[index * 7];
    var usernameCell = document.querySelectorAll("#userTable tbody tr td")[index * 7 + 1];
    var emailCell = document.querySelectorAll("#userTable tbody tr td")[index * 7 + 2];
    var phoneCell = document.querySelectorAll("#userTable tbody tr td")[index * 7 + 3];
    var websiteCell = document.querySelectorAll("#userTable tbody tr td")[index * 7 + 4];
    // var companyCell = document.querySelectorAll("#userTable tbody tr td")[index * 7 + 5];

    var nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = nameCell.textContent;

    var usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.value = usernameCell.textContent;

    var emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.value = emailCell.textContent;

    var phoneInput = document.createElement("input");
    phoneInput.type = "text";
    phoneInput.value = phoneCell.textContent;

    var websiteInput = document.createElement("input");
    websiteInput.type = "text";
    websiteInput.value = websiteCell.textContent;

    // var companyInput = document.createElement("input");
    // companyInput.type = "text";
    // companyInput.value = companyCell.textContent;

    nameCell.textContent = "";
    nameCell.appendChild(nameInput);

    usernameCell.textContent = "";
    usernameCell.appendChild(usernameInput);

    emailCell.textContent = "";
    emailCell.appendChild(emailInput);

    phoneCell.textContent = "";
    phoneCell.appendChild(phoneInput);

    websiteCell.textContent = "";
    websiteCell.appendChild(websiteInput);

    // companyCell.textContent = "";
    // companyCell.appendChild(companyInput);

    var editButton = document.querySelectorAll("#userTable tbody tr td button")[index];
    editButton.textContent = "Save";
    editButton.removeEventListener("click", createEditHandler(index));
    editButton.addEventListener("click", createSaveHandler(index));
  };
}

// Save edited user in the table
function createSaveHandler(index) {
  return function () {
    var nameCell = document.querySelectorAll("#userTable tbody tr td")[index * 7];
    var usernameCell = document.querySelectorAll("#userTable tbody tr td")[index * 7 + 1];
    var emailCell = document.querySelectorAll("#userTable tbody tr td")[index * 7 + 2];
    var phoneCell = document.querySelectorAll("#userTable tbody tr td")[index * 7 + 3];
    var websiteCell = document.querySelectorAll("#userTable tbody tr td")[index * 7 + 4];
    // var companyCell = document.querySelectorAll("#userTable tbody tr td")[index * 7 + 5];

    var nameInput = nameCell.querySelector("input");
    var usernameInput = usernameCell.querySelector("input");
    var emailInput = emailCell.querySelector("input");
    var phoneInput = phoneCell.querySelector("input");
    var websiteInput = websiteCell.querySelector("input");
    // var companyInput = companyCell.querySelector("input");

    var editedUser = {
      name: nameInput.value,
      username: usernameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      website: websiteInput.value,
    //   company: companyInput.value
    };

    users[index] = editedUser;
    createTableBody(users);

    var editButton = document.querySelectorAll("#userTable tbody tr td button")[index];
    editButton.textContent = "Edit";
    editButton.removeEventListener("click", createSaveHandler(index));
    editButton.addEventListener("click", createEditHandler(index));
  };
}

// Delete user from the table
function createDeleteHandler(index) {
  return function () {
    users.splice(index, 1);
    createTableBody(users);
  };
}

// Fetch JSON data
fetch("users.json")
  .then((response) => response.json())
  .then((data) => {
    users = data;
    createTableBody(data);

    // Add event listener to search input
    var searchInput = document.querySelector("#searchInput");
    searchInput.addEventListener("input", filterTable);

    var addUserForm = document.querySelector("#addUserForm");
    addUserForm.addEventListener("submit", addUser);

    var addUserBtn = document.querySelector("#addUserBtn");
    addUserBtn.addEventListener("click", showAddUserForm);
  })
  .catch((error) => console.log(error));
