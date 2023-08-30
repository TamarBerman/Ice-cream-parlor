//יצירת כפתורים מה-html
const _packageIceCream= document.querySelector('#packageIceCream');
const _iceCreamBolls=document.querySelector('#iceCreamBolls');
const _belginWaffle=document.querySelector('#belginWaffle');
const _frnchKrep=document.querySelector('#frnchKrep');
const _bioFrozen=document.querySelector('#bioFrozen');
const _fruitFrozen=document.querySelector('#fruitFrozen');
const categories=[];
categories.push(_packageIceCream,_iceCreamBolls,_belginWaffle,_frnchKrep,_bioFrozen,_fruitFrozen);
const _IC=document.querySelector('.IC');
const _FRZ=document.querySelector('.FRZ');
const _SW=document.querySelector('.SW');


// קישורים מה navbar 
_IC.onclick=()=>{
    location.href=`products.html?category=גלידה`;
}
_FRZ.onclick=()=>{
    location.href=`products.html?category=פרוזנים`;
}
_SW.onclick=()=>{
    location.href=`products.html?category=מתוקים`;
}

categories.forEach(category=>{
    category.onclick=()=>{
        location.href=`products.html?category=${category.innerHTML}`;
}})

// טיימר מפעיל modal
const pu=document.querySelector('#popup');
setTimeout(() => {
    pu.click();
  }, "2000")

  //חיפוש
const input = document.getElementById("myInput");
const myBtn=document.getElementById("myBtn");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

//קישור לעמוד תוצאות החיפוש
myBtn.onclick=()=>{
    location.href=`products.html?category=${input.value}`;
}


