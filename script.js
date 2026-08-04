function register(){


let pass = document.getElementById("pass").value;

let confirmPass = document.getElementById("confirmPass").value;


// Check PaSs match

if(pass !== confirmPass){

    alert("Pass and Confirm Pass mismatched ⚠️❗");

    return;

}



let student = {

    name: document.getElementById("name").value,

    email: document.getElementById("email").value,

    pass: pass

};



fetch("/register",{

    method:"POST",

    headers:{
        "Content-Type":"application/json"
    },

    body:JSON.stringify(student)

})

.then(response => response.json())

.then(data => {

    window.location.href = "study.html";

});


}