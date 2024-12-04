// Get references to HTML elements
var form = document.getElementById("myForm"),
  imgInput = document.querySelector(".img"), // Image element to display the uploaded picture
  file = document.getElementById("imgInput"), // File input element for uploading images
  userName = document.getElementById("name"), // Input field for user's name
  age = document.getElementById("age"), // Input field for age
  city = document.getElementById("city"), // Input field for city
  email = document.getElementById("email"), // Input field for email
  phone = document.getElementById("phone"), // Input field for phone
  post = document.getElementById("post"), // Input field for post
  sDate = document.getElementById("sDate"), // Input field for start date
  submitBtn = document.querySelector(".submit"), // Submit button
  userInfo = document.getElementById("data"), // Table body to display user data
  modal = document.getElementById("userForm"), // Modal for form
  modalTitle = document.querySelector("#userForm .modal-title"), // Modal title
  newUserBtn = document.querySelector(".newUser"); // Button to open a new form

// Retrieve stored data from localStorage or initialize as an empty array
let getData = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : [];

// Flags for edit mode
let isEdit = false,
  editId;

// Display the stored data in the table
showInfo();

// Event listener for the "New User" button
newUserBtn.addEventListener("click", () => {
  submitBtn.innerText = "Submit"; // Reset button text
  modalTitle.innerText = "Fill the Form"; // Reset modal title
  isEdit = false; // Set edit mode to false
  imgInput.src = "./image/Profile Icon.webp"; // Reset image preview
  form.reset(); // Clear the form inputs
});

// Handle file input change to preview uploaded image
file.onchange = function () {
  if (file.files[0].size < 1000000) {
    // Check if file size is less than 1MB
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
      imgUrl = e.target.result; // Get file data URL
      imgInput.src = imgUrl; // Set the image source to preview
    };
    fileReader.readAsDataURL(file.files[0]); // Read the file as a Data URL
  } else {
    alert("This file is too large!"); // Alert if file size exceeds limit
  }
};

// Function to display user data in the table
function showInfo() {
  document
    .querySelectorAll(".employeeDetails")
    .forEach((info) => info.remove()); // Clear existing rows
  getData.forEach((element, index) => {
    let createElement = `<tr class="employeeDetails">
            <td>${index + 1}</td>
            <td><img src="${
              element.picture
            }" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.employeePost}</td>
            <td>${element.startDate}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${
                  element.picture
                }', '${element.employeeName}', '${element.employeeAge}', '${
      element.employeeCity
    }', '${element.employeeEmail}', '${element.employeePhone}', '${
      element.employeePost
    }', '${
      element.startDate
    }')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${
      element.picture
    }', '${element.employeeName}', '${element.employeeAge}', '${
      element.employeeCity
    }', '${element.employeeEmail}', '${element.employeePhone}', '${
      element.employeePost
    }', '${
      element.startDate
    }')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;
    userInfo.innerHTML += createElement; // Append new rows to the table
  });
}

// Function to display user data in read-only mode
function readInfo(pic, name, age, city, email, phone, post, sDate) {
  document.querySelector(".showImg").src = pic;
  document.querySelector("#showName").value = name;
  document.querySelector("#showAge").value = age;
  document.querySelector("#showCity").value = city;
  document.querySelector("#showEmail").value = email;
  document.querySelector("#showPhone").value = phone;
  document.querySelector("#showPost").value = post;
  document.querySelector("#showsDate").value = sDate;
}

// Function to populate form for editing a user's data
function editInfo(index, pic, name, Age, City, Email, Phone, Post, Sdate) {
  isEdit = true;
  editId = index;
  imgInput.src = pic;
  userName.value = name;
  age.value = Age;
  city.value = City;
  email.value = Email;
  phone.value = Phone;
  post.value = Post;
  sDate.value = Sdate;
  submitBtn.innerText = "Update";
  modalTitle.innerText = "Update The Form";
}

// Function to delete user data
function deleteInfo(index) {
  if (confirm("Are you sure want to delete?")) {
    getData.splice(index, 1); // Remove user data from the array
    localStorage.setItem("userProfile", JSON.stringify(getData)); // Update localStorage
    showInfo(); // Refresh table
  }
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  const information = {
    picture:
      imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
    employeeName: userName.value,
    employeeAge: age.value,
    employeeCity: city.value,
    employeeEmail: email.value,
    employeePhone: phone.value,
    employeePost: post.value,
    startDate: sDate.value,
  };

  if (!isEdit) {
    getData.push(information); // Add new user data
  } else {
    isEdit = false;
    getData[editId] = information; // Update existing user data
  }

  localStorage.setItem("userProfile", JSON.stringify(getData)); // Save data to localStorage
  submitBtn.innerText = "Submit";
  modalTitle.innerText = "Fill The Form";
  showInfo(); // Refresh table
  form.reset(); // Clear form inputs
  imgInput.src = "./image/Profile Icon.webp"; // Reset image preview
});
