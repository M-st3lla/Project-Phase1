// Function to handle login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem(username));
    
    // Check if the user exists and the password matches
    if (userData && userData.password === password) {
      localStorage.setItem('authenticatedUser', JSON.stringify(userData));
  
      // Hide login page and show main page
      document.getElementById('login-page').style.display = 'none';
      document.getElementById('signup-page').style.display = 'none';
      document.getElementById('main-page').style.display = 'block';
  
      // Check for notifications
      checkNotifications();
    } else {
      alert('Invalid username or password');
    }
  }
  
  // Function to handle signing up
  function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
  
    // Check if username already exists
    if (localStorage.getItem(username)) {
      alert('Username already exists. Please choose a different username.');
      return;
    }
  
    // Save user data to local storage
    const userData = { username, password };
    localStorage.setItem(username, JSON.stringify(userData));
  
    // Automatically log in the new user
    login();
  }
  
  // Function to handle logout
  function logout() {
    localStorage.removeItem('authenticatedUser');
  
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('signup-page').style.display = 'none';
  }
  
  // Function to check for notifications
  function checkNotifications() {
    const hasNotification = window.confirm('Do you want to receive notifications?');
    if (hasNotification) {
      const notificationMessage = 'You have a new gift waiting for you!';
      alert(notificationMessage);
    }
  }
  
  // Check if user is already authenticated
  document.addEventListener('DOMContentLoaded', function() {
    const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
    if (authenticatedUser) {
      document.getElementById('login-page').style.display = 'none';
      document.getElementById('signup-page').style.display = 'none';
      document.getElementById('main-page').style.display = 'block';
  
      // Check for notifications
      checkNotifications();
    }
  });
  

function toggleDropdownMenu() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('show');

    if (dropdownMenu.classList.contains('show')) {
        fetchGiftData(); // Fetch data when the dropdown menu is shown
    }
}

function fetchGiftData() {
    fetch('db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const dropdownMenu = document.getElementById('dropdownMenu');
            dropdownMenu.innerHTML = ''; // Clear existing menu content

            // Loop through each category (Occasions, Age, Cultural Inclination, Financial Budget, Relations)
            Object.entries(data.gifts).forEach(([category, options]) => {
                const categoryHeader = document.createElement('div');
                categoryHeader.textContent = category;
                dropdownMenu.appendChild(categoryHeader);

                const categoryOptions = document.createElement('ul');

                // Loop through each option in the category and create dropdown items
                Object.entries(options).forEach(([subCategory, subOptions]) => {
                    const subCategoryHeader = document.createElement('li');
                    subCategoryHeader.textContent = subCategory;
                    categoryOptions.appendChild(subCategoryHeader);

                    subOptions.forEach(option => {
                        const optionItem = document.createElement('li');
                        optionItem.textContent = option.name; // Display the name of the gift
                        categoryOptions.appendChild(optionItem);
                    });
                });

                dropdownMenu.appendChild(categoryOptions);
            });
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}


document.addEventListener("DOMContentLoaded", function () {
    var containers = document.querySelectorAll(".container-sm");
    containers.forEach(function(container) {
        container.addEventListener("click", function () {
            document.body.classList.add("blurred");
            var popup = document.createElement("div");
            popup.classList.add("popup");
            var containerId = container.id;
            var popupContent = getPopupContent(containerId);
            popup.innerHTML = popupContent;
            document.body.appendChild(popup);
        });
    });
});

function getPopupContent(containerId) {
    switch (containerId) {
        case "container1":
            return `
                <div class="popup-content">
                    <h3>Share With Loved Ones</h3>
                    <label for="age">Age:</label><input type="text" id="age"><br><br>
                    <label for="relationship">Relationship:</label><input type="text" id="relations"><br><br>
                    <label for="occasion">Occasion:</label><input type="text" id="occasion"><br><br>
                    <label for="budget">Budget:</label><input type="text" id="budget"><br><br>
                    <button onclick="submitSelection()">Submit</button>
                </div>
            `;
        case "container2":
            return `
                <div class="popup-content">
                    <h3>Delivery At Your Door</h3>
                    <label for="address">Address:</label><textarea id="address" rows="4" cols="30" placeholder="Enter your delivery address"></textarea><br><br>
                    <button onclick="submitDeliveryAddress()">Submit</button>
                </div>
            `;
        case "container3":
            return `
                <div class="popup-content">
                    <h3>Secure Fast and Flexible Payment</h3>
                    <label for="paymentMethod">Payment Method:</label><input type="text" id="paymentMethod"><br><br>
                    <label for="installments">Installments:</label><input type="text" id="installments"><br><br>
                    <button onclick="submitPaymentDetails()">Submit</button>
                </div>
            `;
        case "container4":
            return `
                <div class="popup-content">
                    <h3>Collaborate with Family and Colleagues</h3>
                    <label for="message">Message:</label><textarea id="message" rows="4" cols="30" placeholder="Enter your message"></textarea><br><br>
                    <label for="enterAccount">Enter account(s):</label><textarea id="enterAccount" rows="4" cols="30" placeholder="Enter account"></textarea><br><br>
                    <button onclick="submitMessage()">Submit</button>
                </div>
            `;
        case "container5":
            return `
                <div class="popup-content">
                    <h3>Bridge the Gap in Support of Charity</h3>
                    <label for="donationAmount">Donation Amount:</label><input type="text" id="donationAmount"><br><br>
                    <label for="paymentMethod">Payment Method:</label><input type="text" id="paymentMethod"><br><br>
                    <button onclick="submitDonation()">Submit</button>
                </div>
            `;
        default:
            return "";
    }
}

function submitSelection() {
    var age = document.getElementById("age").value;
    var relations = document.getElementById("relations").value;
    var occasion = document.getElementById("occasion").value;
    var budget = document.getElementById("budget").value;
    var gender = document.getElementById("gender").value;
    var other = document.getElementById("other").value;

    console.log("Age:", age);
    console.log("Relations:", relations);
    console.log("Occasion:", occasion);
    console.log("Financial Budget:", budget);
    console.log("Gender:", gender);
    console.log("Other(e.g Cultural Inclianation)", other);

}

function submitDeliveryAddress() {
    var address = document.getElementById("address").value;

    console.log("Delivery Address:", address);

    document.body.classList.remove("blurred");
    var popup = document.querySelector(".popup");
    popup.remove();
}

function submitPaymentDetails() {
    var paymentMethod = document.getElementById("paymentMethod").value;
    var installments = document.getElementById("installments").value;

    console.log("Payment Method:", paymentMethod);
    console.log("Installments:", installments);

    document.body.classList.remove("blurred");
    var popup = document.querySelector(".popup");
    popup.remove();
}

function submitMessage() {
    var message = document.getElementById("message").value;
    var enterAccount = document.getElementById("enterAccount").value;

    console.log("Message:", message);
    console.log("Enter Account:", enterAccount);

    document.body.classList.remove("blurred");
    var popup = document.querySelector(".popup");
    popup.remove();
}

function submitDonation() {
    var donationAmount = document.getElementById("donationAmount").value;
    var paymentMethod = document.getElementById("paymentMethod").value;

    console.log("Donation Amount:", donationAmount);
    console.log("Payment Method:", paymentMethod);

    document.body.classList.remove("blurred");
    var popup = document.querySelector(".popup");
    popup.remove();
}
document.addEventListener("DOMContentLoaded", function () {
    var formToggle = document.getElementById("formToggle");
    var formContainer = document.getElementById("formContainer");

    formToggle.addEventListener("click", function () {
        formContainer.classList.toggle("show");
    });
});


