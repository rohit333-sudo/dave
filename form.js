// 1. Searching on the bases of first Name
// 2.Dynamic Paging
// 3.form validation
// 4.Sorting data 
//5.Responsive
//6.pagination will be active after 5 records

// ==================   object to store form data  ========================================                  
let array = [];
let data = {
  firstName: "",
  lastName: "",
  mobileNumber: "",
  city: "",
  state: "",
  pincode: "",
  email: "",
  dob: "",
};



//=========================  Handle form data  ===================================== 

function handleForm() {
  data = { ...data, [event.target.name]: event.target.value };
}

// handle pagination data

function fiveItem(i) {
  let start = 5 * (i - 1);
  console.log(start);
  // let arr=[...array]
  filtered(array.slice(start, start + 5));
}

//============================   Dynamic pagination ===========================

function pagination(arr) {
  let page = document.getElementById("pagination");
  // console.log(arr)
  let n = Math.ceil(arr.length / 5);
  // console.log(n)
  page.innerHTML = "";

  for (let i = 1; i <= n; i++) {
    page.innerHTML =
      page.innerHTML +
      `<button style="border-radius: 25px;  background-color: black;
    border: none;
    width:40px;
    color: white;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    // margin: 4px 2px;
    cursor: pointer;" onclick="fiveItem(${i})"><span></span>${i}</button>`;
  }
}

//======================= Handle submmission of form ==========================
function handleSubmit() {
  event.preventDefault();
  let err = validate(data);
  if (Object.keys(err).length == 0) {
    array.push(data);
    array = array.sort((a, b) => a.firstName.localeCompare(b.firstName));
    filtered(array);
    pagination(array);
  } else {
    return;
  }
}
// ===============================Email validation =================================
function validateEmail(email) {
  const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return res.test(String(email).toLowerCase());
}

// ===============================Age validation =================================
function check18(dob) {
  if (2023 - parseInt(dob.slice(0, 4)) < 18) return true;
  else return false;
}

// ===============================Phone Number validation =================================
function checkNumber(val) {
  let c = 0;
  while (val != 0) {
    c++;
    val = Math.floor(val / 10);
  }
  if (c === 10) return false;
  else return true;
}

// ===============================form validation =================================

function validate(data) {
  let err = {};
  let errEmail = document.getElementById("errEmail");
  let errFname = document.getElementById("errFirstName");
  let errPin = document.getElementById("errPincode");
  let errState = document.getElementById("errState");
  let errCity = document.getElementById("errCity");
  let errlast = document.getElementById("errLastName");
  let errMob = document.getElementById("errMobileNumber");
  let errdob = document.getElementById("errDob");
  if (data.email == "" || !validateEmail(data.email)) {
    err.email = "enter a valid email";
    errEmail.innerHTML = err.email;
  } else errEmail.innerHTML = "";
  if (!data.firstName) {
    err.firstName = "enter first Name";

    errFname.innerHTML = err.firstName;
  } else {
    errFname.innerHTML = "";
  }
  if (!data.pincode) {
    err.pincode = "enter Pincode";
    errPin.innerHTML = err.pincode;
  } else errPin.innerHTML = "";

  if (!data.state) {
    err.state = "enter state";
    errState.innerHTML = err.state;
  } else {
    errState.innerHTML = "";
  }
  if (!data.city) {
    err.city = "enter City";
    errCity.innerHTML = err.city;
  } else {
    errCity.innerHTML = "";
  }
  if (!data.lastName) {
    err.lastName = "enter Lastname";
    errlast.innerHTML = err.lastName;
  } else {
    errlast.innerHTML = "";
  }
  if (data.mobileNumber === "" || checkNumber(parseInt(data.mobileNumber))) {
    err.mobileNumber = "Number must have 10 digts";
    errMob.innerHTML = err.mobileNumber;
  } else {
    errMob.innerHTML = "";
  }

  if (data.dob === "" || check18(data.dob)) {
    err.dob = "DOB must be 18";
    errdob.innerHTML = err.dob;
  } else {
    errdob.innerHTML = "";
  }
  return err;
}
// ===============================Searching =================================
 

function search() {
  let key = event.target.value;
  // console.log(key)
  key1=key.toUpperCase()
  let key2=key.toLowerCase()
  let filter = array.filter((val) => {
    if (val.firstName.includes(key1) || val.firstName.includes(key2))  {
      return val;
    }
  });
  searchList(filter);
  if (key === "") {
    // let arr=[...array]
    filtered(array);
    pagination(array);
  }
}
function searchList(data) {
  let table = document.getElementById("table");
  document.getElementById("pagination").innerHTML = "";
  table.innerHTML =
    ` <tr>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Email</th>
  <th>City</th>
  <th>Mobile</th>
   </tr>` + "";
  for (let i = 0; i < data.length; i++) {
    table.innerHTML =
      table.innerHTML +
      `<tr>
    <td>${data[i].firstName}</td>
    <td>${data[i].lastName}</td>
    <td>${data[i].email}</td>
    <td>${data[i].city}</td>
    <td>${data[i].mobileNumber}</td>`;
  }
}
// ===============================Display Table  =================================

function filtered(temp) {
  let table = document.getElementById("table");
  table.innerHTML =
    ` <tr>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Email</th>
  <th>City</th>
  <th>Mobile</th>
   </tr>` + "";
  //  console.log(temp)
  let data = temp;
  if (temp.length > 5) data = temp.slice(0, 5);
  for (let i = 0; i < data.length; i++) {
    table.innerHTML =
      table.innerHTML +
      `<tr>
    <td>${data[i].firstName}</td>
    <td>${data[i].lastName}</td>
    <td>${data[i].email}</td>
    <td>${data[i].city}</td>
    <td>${data[i].mobileNumber}</td>`;
  }
}
