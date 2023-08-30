$(document).ready(function(){
    
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    
    $(".next").click(function(){
        if(flag===0)
        {
        
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        
        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        
        //show the next fieldset
        next_fs.show(); 
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;
    
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({'opacity': opacity});
            }, 
            duration: 600
        });
    }});
    
    $(".previous").click(function(){
        
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();
        
        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
        
        //show the previous fieldset
        previous_fs.show();
    
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;
    
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({'opacity': opacity});
            }, 
            duration: 600
        });
    });
    
    $('.radio-group .radio').click(function(){
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });
    
    $(".submit").click(function(){
        return false;
    })
        

    // 4: VISA, 51 -> 55: MasterCard, 36-38-39: DinersClub, 34-37: American Express, 65: Discover, 5019: dankort


$(function(){
  
  var cards = [{
    nome: "mastercard",
    colore: "#0061A8",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
  }, {
    nome: "visa",
    colore: "#E2CB38",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2000px-Visa_Inc._logo.svg.png"
  }, {
    nome: "dinersclub",
    colore: "#888",
    src: "http://www.worldsultimatetravels.com/wp-content/uploads/2016/07/Diners-Club-Logo-1920x512.png"
  }, {
    nome: "americanExpress",
    colore: "#108168",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/600px-American_Express_logo.svg.png"
  }, {
    nome: "discover",
    colore: "#86B8CF",
    src: "https://lendedu.com/wp-content/uploads/2016/03/discover-it-for-students-credit-card.jpg"
  }, {
    nome: "dankort",
    colore: "#0061A8",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Dankort_logo.png"
  }];
  
  var month = 0;
  var html = document.getElementsByTagName('html')[0];
  var number = "";
  
  var selected_card = -1;
  
  $(document).click(function(e){
    if(!$(e.target).is(".ccv") || !$(e.target).closest(".ccv").length){
      $(".card").css("transform", "rotatey(0deg)");
      $(".seccode").css("color", "var(--text-color)");
    }
    if(!$(e.target).is(".expire") || !$(e.target).closest(".expire").length){
      $(".date_value").css("color", "var(--text-color)");
    }
    if(!$(e.target).is(".number") || !$(e.target).closest(".number").length){
      $(".card_number").css("color", "var(--text-color)");
    }
    if(!$(e.target).is(".inputname") || !$(e.target).closest(".inputname").length){
      $(".fullname").css("color", "var(--text-color)");
    }
  });
  
  
  //Card number input
  $(".number").keyup(function(event){
    $(".card_number").text($(this).val());
    number = $(this).val();
    
    if(parseInt(number.substring(0, 2)) > 50 && parseInt(number.substring(0, 2)) < 56){
      selected_card = 0;
    }else if(parseInt(number.substring(0, 1)) == 4){
      selected_card = 1;  
    }else if(parseInt(number.substring(0, 2)) == 36 || parseInt(number.substring(0, 2)) == 38 || parseInt(number.substring(0, 2)) == 39){
      selected_card = 2;     
    }else if(parseInt(number.substring(0, 2)) == 34 || parseInt(number.substring(0, 2)) == 37){
      selected_card = 3; 
    }else if(parseInt(number.substring(0, 2)) == 65){
      selected_card = 4; 
    }else if(parseInt(number.substring(0, 4)) == 5019){
      selected_card = 5; 
    }else{
      selected_card = -1; 
    }
    
    if(selected_card != -1){
      html.setAttribute("style", "--card-color: " + cards[selected_card].colore);  
      $(".bankid").attr("src", cards[selected_card].src).show();
    }else{
      html.setAttribute("style", "--card-color: #cecece");
      $(".bankid").attr("src", "").hide();
    }
    
    if($(".card_number").text().length === 0){
      $(".card_number").html("&#x25CF;&#x25CF;&#x25CF;&#x25CF; &#x25CF;&#x25CF;&#x25CF;&#x25CF; &#x25CF;&#x25CF;&#x25CF;&#x25CF; &#x25CF;&#x25CF;&#x25CF;&#x25CF;");
    }

  }).focus(function(){
    $(".card_number").css("color", "white");
  }).on("keydown input", function(){
    
    $(".card_number").text($(this).val());
    
    if(event.key >= 0 && event.key <= 9){
      if($(this).val().length === 4 || $(this).val().length === 9 || $(this).val().length === 14){
        $(this).val($(this).val() +  " ");
      }
    }
  })
  
  //Name Input
  $(".inputname").keyup(function(){  
    $(".fullname").text($(this).val());  
    if($(".inputname").val().length === 0){
        $(".fullname").text("FULL NAME");
    }
    return event.charCode;
  }).focus(function(){
    $(".fullname").css("color", "white");
  });
  
  //Security code Input
  $(".ccv").focus(function(){
    $(".card").css("transform", "rotatey(180deg)");
    $(".seccode").css("color", "white");
  }).keyup(function(){
    $(".seccode").text($(this).val());
    if($(this).val().length === 0){
      $(".seccode").html("&#x25CF;&#x25CF;&#x25CF;");
    }
  }).focusout(function() {
      $(".card").css("transform", "rotatey(0deg)");
      $(".seccode").css("color", "var(--text-color)");
  });
    
  
  //Date expire input
  $(".expire").keypress(function(event){
    if(event.charCode >= 48 && event.charCode <= 57){
      if($(this).val().length === 1){
          $(this).val($(this).val() + event.key + " / ");
      }else if($(this).val().length === 0){
        if(event.key == 1 || event.key == 0){
          month = event.key;
          return event.charCode;
        }else{
          $(this).val(0 + event.key + " / ");
        }
      }else if($(this).val().length > 2 && $(this).val().length < 9){
        return event.charCode;
      }
    }
    return false;
  }).keyup(function(event){
    $(".date_value").html($(this).val());
    if(event.keyCode == 8 && $(".expire").val().length == 4){
      $(this).val(month);
    }
    
    if($(this).val().length === 0){
      $(".date_value").text("MM / YYYY");
    }
  }).keydown(function(){
    $(".date_value").html($(this).val());
  }).focus(function(){
    $(".date_value").css("color", "white");
  });
});
    });


let ourMembers = JSON.parse(localStorage.getItem('memberDetails')) || [];

//הערכים שהתקבלו מקליטת המשתמש
const email=document.getElementById('email');
const uname=document.getElementById('uname');
const pwd=document.getElementById('pwd');
const cpwd=document.getElementById('cpwd');
const fname=document.getElementById('fname');
const address=document.getElementById('address');
const phno=document.getElementById('phno');
const phno_2=document.getElementById('phno_2');
let flag=0;
//מילוי אוטומטי של השדות
 const oto_fill_account=()=>{
  if (ourMembers.length==0){
    alert('הינך מזוהה כשמשמש חדש במערכת , הינך מועבר להרשמה ולאחר מכן נוכל לבצע את הזמנתך')
    location.href=`signin.html`;
  }
else    {
    email.value=ourMembers[ourMembers.length-1].Mail;
    uname.value=ourMembers[ourMembers.length-1].Name;
    pwd.value=ourMembers[ourMembers.length-1].Password;
  }

 }     
 oto_fill_account();

 //מעבר שלב 1 
const nextstep_1=document.getElementById('nextstep_1');
nextstep_1.onclick=()=>{
    //אם מדובר באותו חשבון
    if(email.value===ourMembers[ourMembers.length-1].Mail){
        //אימות סיסמא
        if (!(cpwd.value===pwd.value)){
        alert('oops, the password is not ok');
        flag=1;
        }
        else{
        flag=0;
        }
        //אתחול שאר המשתנים לפי localStorage
    fname.value=ourMembers[ourMembers.length-1].Name;
    address.value=ourMembers[ourMembers.length-1].Address;
    phno_2.value=ourMembers[ourMembers.length-1].Phone;
    }
    //אם החשבון הוחלף
    else{
          //אימות סיסמא
          if (!(cpwd.value===pwd.value)){
            alert('oops, the password is not ok');
            flag=1;
            }
            else{
            flag=0;
            }  
      }

    }

    //מעבר שלב 2
const nextstep_2=document.getElementById('nextstep_2');
nextstep_2.onclick=()=>{
if(ourMembers.length==0||address.value!=ourMembers[ourMembers.length-1].Address){
    const object={
        Name: uname.value,
        Address: address.value,
        Phone: phno_2.value,
        Mail: email.value,
        Password: pwd.value,
      }
      ourMembers.push(object);
      localStorage.setItem('memberDetails', JSON.stringify(ourMembers));

}
}
let myAdrs=address.value;

//מעבר שלב 3-תשלום
const nextstep_3=document.getElementById('nextstep_3');
nextstep_3.onclick=()=>{
  debugger
  if(valid_creditholder() && valid_creditnum() && valid_date_ex() && valid_cvcpwd())
  {
  flag=0;
  }
  else
  {
    alert("");
    flag=1;
  }
}

//פונקציות ולידציה תשלום
const holdername=document.getElementById('holdername');
const cardno=document.getElementById('cardno');
const cvcpwd=document.getElementById('cvcpwd');
const month=document.getElementById('month');
const year=document.getElementById('year');

//ולידציה בעל האשראי
function valid_creditholder(){
  if(holdername.value.match(/^[a-zA-Zא-ת\s]*$/)){
  return true;
  }
  else
  {      
     alert('שם לא תקין');   
      return false;
  }
}
//ולידציה מספר האשראי
function valid_creditnum(){
  if(cardno.value.match(/^4[0-9]{12}(?:[0-9]{3})?$/)){
  return true;
  }
  else
  {
    alert('מספר אשראי לא תקין');
    holdername.classList.add('eror');
    return false;
  }
}

//ולידציה cvv
function valid_cvcpwd(){
  if(cvcpwd.value.length===3 && cvcpwd.value.match(/^\d{3}$/)){
  return true;
  }
  else
  {
    alert('אינו תקין cvv');
    return false;
  }
}

//ולידציה תוקף
function valid_date_ex(){
  if(month.value!="Month" && year.value!="Year"){
  return true;
  }
  else
  {
    alert('בחר תוקף');
    return false;
  }
}
const myOrder= document.getElementById('order');
myOrder.innerHTML= `הזמנתך תגיע תוך 5 ימי עסקים לכתובת: ${ourMembers[ourMembers.length-1].Address}`;

