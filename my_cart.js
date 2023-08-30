const row = document.querySelector('#row');
const finalp = document.querySelector('.subtotal');
let my_bag = JSON.parse(localStorage.getItem('mybag')) || [];
let product_item=document.querySelector('.product_item');
let removeAll = document.querySelector('.remove_all');
let Checkout = document.querySelector('.Checkout');
const tbody=document.querySelector('tbody');
const apply_button=document.getElementById('apply_button');
const apply_input=document.getElementById('apply_input');
let ourMembers = JSON.parse(localStorage.getItem('memberDetails')) || [];
//הצגה של המוצרים בסל
const my_cart = (my_bag) => {
    let finalPrice =0;
    tbody.innerHTML='';
    for (let i = 0; i < my_bag.length; i++) {
        const tr=document.createElement('tr');
        const td_1= document.createElement('td');
        const td_2= document.createElement('td');
        td_2.classList.add("text-center","text-lg","text-medium")
        const input_num=document.createElement('input');
        input_num.type="number";
        input_num.min=1;
        input_num.value=1;
        input_num.style.width="220px";
        input_num.classList.add("mb-auto", "ml-auto" ,"mr-2");
        td_2.appendChild(input_num);
        const td_3= document.createElement('td');
        td_3.classList.add("text-center","text-lg","text-medium")
        const td_4= document.createElement('td');
        td_4.classList.add("text-center")
        tbody.append(td_1, td_2, td_3, td_4);
        finalPrice +=parseInt(my_bag[i].price);
        const div_h4= document.createElement('div');
        div_h4.classList.add('product-info');
        const _h4= document.createElement('h5');
        _h4.style.fontFamily="height_font";
        _h4.innerHTML = my_bag[i].name;
        _h4.classList.add('product-title');
        div_h4.append(_h4);
        const image = document.createElement('img');
        image.src=`imgs/${my_bag[i].image}`;
        image.classList.add('img_prod');
        image.style.width="100px";
        const imag_name_div = document.createElement('div');
        imag_name_div.append(image);
        imag_name_div.append(div_h4);
        imag_name_div.classList.add("product_item","me-3");
        td_1.append(imag_name_div);
        const price_unit=document.createElement('p');
        price_unit.innerHTML=my_bag[i].price;
        finalp.innerHTML= finalPrice;
        //הוספה של כמות ממוצר מסוים
        input_num.onchange=()=>{
            price_unit.innerHTML= (my_bag[i].price*input_num.value),
            finalp.innerHTML= ((my_bag[i].price*input_num.value) -parseInt(my_bag[i].price) + finalPrice);
        }
        td_3.append(price_unit);
        const remove = document.createElement('button');
        remove.classList.add("fa-solid","fa-trash","fs-2","p-3","image_button", "brown");
        td_4.append(remove);
        //כפתור מחיקה
        remove.onclick = () => {
            my_bag.splice(i,1);
            localStorage.setItem('mybag', JSON.stringify(my_bag));
            my_cart(my_bag);
        }
        tr.append(td_1, td_2, td_3, td_4);
        tbody.append(tr);
        }
    }
my_cart(my_bag);
//כפתור למעבר לעמוד הקודם
const previus=  document.querySelector('.previus');
previus.onclick=()=>{
history.back();
}
//מחיקת כל המוצרים בסל
removeAll.onclick = () => {
    finalPrice = 0;
    my_bag = [];
    localStorage.setItem('mybag', JSON.stringify(my_bag));
    bag.remove();
    finalp.innerHTML=0;
    my_cart(my_bag);
}
Checkout.onclick = () => {  
    location.href=`payment.html?pay_page`;
}
