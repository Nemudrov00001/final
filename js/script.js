const form = document.getElementById('form');
const form2 = document.getElementById('form2');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const isActive = document.getElementById('isActiveUser');
var isLogged = localStorage.getItem("isLogged");
var isAdmin = localStorage.getItem("isAdmin"); 
var admin = {
    Email: 'admin@gmail.com',
    Password: 'qwerty123'
};

 var tblPersons = localStorage.getItem("tblPersons"); 
  tblPersons = JSON.parse(tblPersons); 
  if (tblPersons === null) 
      tblPersons = [];

if (isLogged === null) 
      isLogged = false;

if (isAdmin === null) 
      isAdmin = false;

//Functions
function showError(input, message) {
    // Adding class to show red border
    input.parentElement.className = 'formlabel invalid';
    // Adding querySelector to add our error message
    input.parentElement.querySelector('span').innerText = message;
     return false;
}

function showSuccess(input) {
    // Adding class to show green border
    input.parentElement.className = 'formlabel valid';
    console.log(input);
    return true;
}

// To conver error first alphabet capital
function errorMessageName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequiredField(inputArr) {
    // Loop though every array values
      let isValid = false;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            isValid = showError(input, `${errorMessageName(input)} is required`);
        } else {
            isValid = showSuccess(input);
        }
    });
    return isValid;
}

function checkEmail(input) {
    let isValid = false;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        isValid = showSuccess(input);
    } else {
        isValid = show
        (input, 'Please enter a valid email');
    }
    return isValid;
}

function checkLength(input, min, max) {
       let isValid = false;
    if (input.value.length < min) {
        isValid = showError(
            input,
            `${errorMessageName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        isValid = showError(
            input,
            `${errorMessageName(input)} must be less than ${max} characters`
        );
    } else {
        isValid = showSuccess(input);
    }
      return isValid;
}

function checkPasswordMatches(input1, input2) {
    let isValid = true;
    if (input1.value !== input2.value) {
        isValid = showError(input2, 'Password do not matches');
    }
    return isValid;
}

// Event listener
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        checkRequiredField([username, email, password, password2]);
        let a = checkEmail(email);
        let b = checkLength(username, 3, 15);
        let c = checkLength(password, 8, 20);
        let d = checkPasswordMatches(password, password2);
        if (a && b && c && d) {
            let isCreated = create(username, email, password);
            if (isCreated) {
                localStorage.setItem('isLogged', true);
                window.location.href = "main.html";
            }
        }
    });
}

function checkIsAdmin(email, password) {
     if (admin.Email == email.value && admin.Password == password.value) {
         localStorage.setItem('isLogged', true);
         localStorage.setItem('isAdmin', true);
         window.location.href = "main.html";
     }
}
if (form2) {
// Event listener
    form2.addEventListener('submit', function(e) {
        e.preventDefault();
        checkRequiredField([email, password]);
        let a = checkEmail(email);
        if (a) {
            checkIsAdmin(email, password);
           for (var i in tblPersons) {
               var per = JSON.parse(tblPersons[i]);
               console.log(per)
               console.log(per.Email)
               if (per.Email == email.value && per.Password == password.value) {
                    localStorage.setItem('isLogged', true);
                    window.location.href = "main.html";
               } else {
                    $('#loginError').html('error');
               }
            }
        }
    });
}
$(function () {
    console.log(isLogged);
    if(isLogged == true) {
        $('.header__authWrapper').css('display', 'none');
        $('.header__log-out').css('display', 'block');
    }
});
function create(username, email, password, isActive = true) {
   
    var person = JSON.stringify({
       Name: username.value,
        Email:email.value,
       Password: password.value,
       isActive: isActive
    }); 
  
    tblPersons.push(person);
  
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    
    return true;
  }

  $(function () {
  var operation = "C"; 
  var selected_index = -1; 
  var tblPersons = localStorage.getItem("tblPersons"); 
  tblPersons = JSON.parse(tblPersons); 
  if (tblPersons === null) 
      tblPersons = [];

  function Edit() {
    tblPersons[selected_index] = JSON.stringify({
        Name: $("#username").val(),
        Email: $("#email").val(),
        Password: $("#password").val(),
        isActive: $("#isActiveUser").val(),
    });
   
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
   
    return true;
  }

  function Delete() {
   
    tblPersons.splice(selected_index, 1); 
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Think again"); 
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>Name</th>" +
            "<th>Email</th>" +
            "<th>Password</th>" +
            "<th>Is active</th>" +
             
            "<th>Edit</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); 
    for (var i in tblPersons) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.Name + "</td>" +
                "<td>" + per.Email + "</td>" +
                "<td>" + per.Password + "</td>" +
                "<td>" + per.isActive + "</td>" +
                                   
                                   
                 "<td><img src='http://res.cloudinary.com/demeloweb/image/upload/v1497537879/edit_n51oto.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp &nbsp &nbsp<img src='http://res.cloudinary.com/demeloweb/image/upload/v1497537882/delete_ntuxjl.png' alt='Delete" + i + "' class='btnDelete'/></td>" +                  
                
                "</tr>"
                );
    } 
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C") {
           checkRequiredField([username, email, password, isActiveUser]);
        let a = checkEmail(email);
        let b = checkLength(username, 3, 15);
        let c = checkLength(password, 8, 20);
        if (a && b && c) {
           return create(username, email, password, isActiveUser.value);
        }
    }
    else
        return Edit();
  }); 
  
  List();

  $(".btnEdit").bind("click", function () {
    operation = "E"; 
   
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
   
    var per = JSON.parse(tblPersons[selected_index]); 
    $("#email").val(per.Email);
    $("#username").val(per.Name);
    $("#password").val(per.Password);
    $("#isActiveUser").val(per.isActive);
     
  
  });

  $(".btnDelete").bind("click", function () {
    
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Delete(); 
    List(); 
  });
});