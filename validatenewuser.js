const lastname = document.querySelector("#lastname");
const firstname = document.querySelector("#firstname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const form = document.querySelector("#newuser-form");

const validLastname = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 \.'\-]+$/
const validFirstname = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 \.'\-]+$/
const validEmail = /^[A-Za-z0-9\._\-]+@[A-Za-z]+[A-Za-z0-9\-]+[A-Za-z]+(\.[A-Za-z0-9\-]+)+$/

 
 
form.setAttribute("novalidate",true)
form.onsubmit = submitForm  
 
 
function submitForm(event){
    console.log("hello")
    event.preventDefault()  //prevent the form from autosubmitting//
 
    
 
 
if (inputValid(validLastname,lastname)&&inputValid(validEmail,email)&&inputValid(validFirstname,firstname)
) {
    console.log(`Lastname: ${lastname.value}\n Email: ${email.value}\n Firstname:${firstname.value}\n 
    `)
    console.log(form);
   
 
console.log (`input is correct`)
      
    
 
} else{
console.log('Input are incorrect, try again.')}}
 
 function isEmpty(input) {return input.trim().length;}
 
function inputValid(regex,input) {
    return regex.test(input.value)
}
 
 
 
closeform.addEventListener('click', () => {
     document.getElementById("newuser-form").reset();
})
