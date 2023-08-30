//אנימציה של מעבר מהרשמה להתחברות 
$("#signup").click(function() {
  $(".message").css("transform", "translateX(100%)");
  if ($(".message").hasClass("login")) {
    $(".message").removeClass("login");
  }
  $(".message").addClass("signup");
});

$("#login").click(function() {
  $(".message").css("transform", "translateX(0)");
  if ($(".message").hasClass("login")) {
    $(".message").removeClass("signup");
  }
  $(".message").addClass("login");
});
// כפתור חזרה לעמוד קודם
const previus= document.querySelector('.previus');
previus.onclick=()=>{
history.back();
}

////////// sighn in////////////
// שמירת פירטי לקוח חדש
let ourMembers = JSON.parse(localStorage.getItem('memberDetails')) || [];
const _sighUpButton=document.querySelector('.sighUpButton');
let flag=false;
_sighUpButton.onclick=() =>{
// input שומר את הערך שהוכנס בכל 
const userName= document.getElementById('name').value;
const userAddress= document.getElementById('address').value;
const userPhone= document.getElementById('phone').value;
const userMail= document.getElementById('email').value;
const userPassword= document.getElementById('password').value;
// ולידציות לבדיקת תקינות הקלט 
 if(ValidateEmail(userMail) && phonenumber(userPhone) && allLetter(userName)&& alphanumeric(userAddress)){
  for (let i = 0; i < ourMembers.length; i++) {
    // אם השם הנוכחי קיים כבר 
    if (ourMembers[i].Name=== userName && ourMembers[i].Address === userAddress && ourMembers[i].Phone === userPhone && ourMembers[i].Mail == userMail){
      flag=true;
    }
  }
  // אם השם לא קיים
  //  local storage יוצר אובייקט עם פרטי הלקוח החדש ומכניס ל
  if (flag===false){
    const object={
      Name: userName,
      Address: userAddress,
      Phone: userPhone,
      Mail: userMail,
      Password: userPassword,
    }
    ourMembers.push(object);
    localStorage.setItem('memberDetails', JSON.stringify(ourMembers));
    location.href=`homePage.html`;

    // alert('הפרטים נקלטו בהצלחה')
  }
  else{
    alert('➡ log in -משתמש קיים. עבור ל');
    userMail="";
    userPhone="";
    userPassword="";
    userAddress="";
    userName="";
  }
}
else
    {
      return;
    }   
}
////////// log in////////////
// הצגת פרטי לקוח קיים
//  login אם נכנס ל
// אוטומטית משלים אותו כי הוא שמור במערכת
const _login= document.getElementById('login');
const memberName=document.getElementById('loginNM');
const memberPssword= document.getElementById('loginPW');
// מילוי אוטומטי של שם וסיסמא
_login.onclick=()=>{
if (ourMembers!=[]||ourMembers!=null){
memberName.value=ourMembers[ourMembers.length-1].Name;
memberPssword.value=ourMembers[ourMembers.length-1].Password;
}
}
//  עובר לעמוד ראשי לאחר אישור פרטי חבר
const _logInButton=document.querySelector('.logInButton');
_logInButton.onclick=()=>{

for (let i = 0; i < ourMembers.length; i++) {
  if (memberName.value===ourMembers[i].Name){
    if (allLetter(memberName.value)&& CheckPassword2(memberPssword.value ,i)){
      location.href=`homePage.html`;
    }
  }   
}
}

// mail validation
function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.match(mailformat))
{
return true;
}
else
{
alert("מייל שגוי");
return false;
}
}
// phone vlidation
function phonenumber(inputtxt)
{
var phoneno = /^\d{10}$/;
if((inputtxt.match(phoneno)))
    {
  return true;
    }
else
  {
  alert("טלפון שגוי");
  return false;
  }
}
// name validation
function allLetter(inputtxt)
{
 var letters = /^[a-zA-Zא-ת\s]*$/;
 if(inputtxt.match(letters))
   {
    return true;
   }
 else
   {
   alert("שם שגוי");
   return false;
   }
}
// address validation
function alphanumeric(inputtxt)
{
var letterNumber = /^[0-9a-zA-Zא-ת\s]*$/;
if((inputtxt.match(letterNumber))) 
{
 return true;
}
else
{ 
 alert("כתובת שגויה"); 
 return false; 
}
}
// password validation// לא בשימוש כרגע...
function CheckPassword(inputtxt) 
{ 
var passw=  /^[0-9a-zA-Z]+$/;
if((inputtxt.match(passw)) )
{
 return true;
}
else
{ 
 alert("סיסמא שגויה"); 
 return false; 
}
}
//בדיקת סיסמא בהתאמה לשם משתשמש
function CheckPassword2(inputtxt, i) {
if (inputtxt===ourMembers[i].Password){
return true;
}
else
{
alert('סיסמא לא זהה לסיסמא השמורה')
return false; 
}
}

//empty validation //לא בשימוש כרגע...
function required(inputtx) 
{
if (inputtx.value.length == 0)
 { 
    alert("חובה למלא את כל הפרטים");    
    return false; 
 }    
 return true; 
} 

