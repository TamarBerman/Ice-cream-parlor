const productsContainer=document.querySelector('.myProducts');
let productsArray=[];

let url=new URL (location.href)
document.title= url.searchParams.get('category') + " | MOVENPICK" ||url.searchParams.get('main_category') + " | MOVENPICK" ;

let my_bag= JSON.parse(localStorage.getItem('mybag'))||[];
let counter_bag=0

const _product_title=document.querySelector('.product_title');

let title_name="";
let products=[];


const printProducts=()=>{
  if (url.searchParams.get('category')==='כדורים'||url.searchParams.get('category')==='מארזים'||url.searchParams.get('category')==='גלידה'){
    title_name=" ice cream";
  }
  else if (url.searchParams.get('category')==='פרוזן פירות'||url.searchParams.get('category')==='פרוזן ביו'||url.searchParams.get('category')==='פרוזנים')
  {
    title_name=" frout frozen yogurt"
  }
  else if (url.searchParams.get('category')==='קרפ צרפתי'||url.searchParams.get('category')==='וופל בלגי'||url.searchParams.get('category')==='מתוקים')
  {
    title_name=" daserts"
  }
  else{
    title_name=" sweets"
  }
  const h1=document.createElement('h1');
  h1.innerHTML="Our best "+title_name;
  h1.classList.add("below","text-header")
  _product_title.append(h1);
  if (products.length==0){
    const p= document.createElement('p');
    p.innerHTML= "לא נמצאו תוצאות .."
    productsContainer.append(p);

  }

    products.forEach(pro => {
        const div= document.createElement('div');
        div.classList.add('styleproducts');
        div.classList.add('col-lg-4');
        div.classList.add('col-sm-3');
        div.classList.add('col-md-1');
        div.classList.add('m-2');
        const innerdiv = document.createElement('div');
        div.classList.add('position-relative');
        innerdiv.classList.add("position-absolute","styleproductsinner","top-30",
        "start-50","translate-middle");
        const image= document.createElement('img');
        const p= document.createElement('p');
        p.classList.add('styleproductsname');
        p.classList.add('fs-4');
        p.classList.add('position-absolute');
        p.classList.add('bottom-0');
        p.classList.add('start-50');
        p.classList.add('translate-middle-x');
        image.src = `imgs/${pro.image}`;
        image.classList.add("w-90","position-absolute","top-50","start-50"
        ,"translate-middle");
        //תמונות בגודל טוב
        if (pro.category==="וופל בלגי"){
          image.classList.add("h-50");
        }
        p.innerHTML = pro.name+" "+"  |  "+" "+ pro.price+ ' ש"ח';
        innerdiv.appendChild(image);
        innerdiv.appendChild(p);
        div.append(innerdiv);

        // לחצן הוספה לסל
        const button_cart= document.createElement('button');
        button_cart.classList.add("fa-solid","fa-cart-plus","fs-2","p-3","position-absolute",
        "bottom-0","start-30","image_button");
        div.appendChild(button_cart); 

        // לחצן לתצוגה מקדימה ותיאור
        const button_view= document.createElement('button');
        button_view.classList.add("fa-regular","fa-image","fs-2","p-3","position-absolute",
        "bottom-0","end-30","image_button");
        div.appendChild(button_view); 

        //לחצן מציג אם המוצר נבחר
        const button_add= document.createElement('button');
        button_add.classList.add("fa-solid","fa-circle-plus","fs-2","p-3","position-absolute",
        "top-0","start-0","brown","image_button");
        div.appendChild(button_add); 
        productsContainer.append(div);

        //localstorag-פונקציה הוספה לסל ועדכון ב 
          button_cart.onclick=()=>{
            my_bag.push(pro);
            localStorage.setItem('mybag', JSON.stringify(my_bag));
            // alert('added to cart susccesfully');
            button_add.classList.add('selectcolor');    
            bag_count.innerHTMl=counter_bag++;
        }
    }
);}
  let x=0;
//שליפה
const loadProducts = () => {
  let p = $.ajax({
      method: 'GET',
      url: './database.json',
      success: (data) => {
        debugger
          let url=new URL(location.href);
          products.push(...data.products.filter(product =>product.category===url.searchParams.get('category')||product.main_category===url.searchParams.get('category')|| product.name.includes(url.searchParams.get('category'))));
          printProducts();
      }
  });
}
loadProducts();

$("button").on("click", function(){
  $($(this).attr("data-target")).modal("show");
});
