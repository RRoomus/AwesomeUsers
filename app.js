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

      var addressCell = document.createElement("td");
      addressCell.textContent = user.address.city + ', ' + user.address.street;
      row.appendChild(addressCell);

      var phoneCell = document.createElement("td");
      phoneCell.textContent = user.phone;
      row.appendChild(phoneCell);

      var websiteCell = document.createElement("td");
      websiteCell.textContent = user.website;
      row.appendChild(websiteCell);

      var companyCell = document.createElement("td");
      companyCell.textContent = user.company.name;
      row.appendChild(companyCell);
  
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
  
  // Fetch JSON data
  fetch("users.json")
    .then(response => response.json())
    .then(data => {
        createTableBody(data);
    
        // Add event listener to search input
        var searchInput = document.querySelector("#searchInput");
        searchInput.addEventListener("input", filterTable);
      })
      .catch(error => console.log(error));