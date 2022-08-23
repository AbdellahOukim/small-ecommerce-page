const price = document.getElementById("price");
const buy = document.getElementById("Buy");
const closeBtn = document.getElementById("close");
const products_content = document.getElementById("products_content");
const price_content = document.getElementById("price_content");
const total = document.getElementById("total");
const search = document.getElementById("search");
const searchIcon = document.getElementById("searchIcon");
const searchBar = document.querySelector(".search-bar");
let count = document.getElementById("count");
let countCart = 0;
let divShow;
let totalPrice = 0;

// Styles for price_div

buy.onclick = function(){
  price.classList.toggle("show");
  products_content.classList.toggle('move') ;
}

closeBtn.onclick = function(){
  price.classList.remove("show");
  products_content.classList.remove('move') ;
}  

searchIcon.onclick = function () {
  search.style.display = 'inline-block' ;
  searchBar.style.width = "200px";
  search.style.width = "150px";
  searchBar.style.border = "1px solid #FF6A3D";
  searchBar.style.borderRadius = '0' ;
  search.focus() ;
};

search.onblur = function () {
  search.style.display = 'none' ;
  search.style.width = "0px";
  searchBar.style.width = "30px";
  searchBar.style.border = "none";
};

// CREATE PRODUCTS

let namePro = [
  "Nokia",
  "Samsung",
  "Iphone 12",
  "Infinix",
  "Tecno",
  "Oppo",
  "Relmi X",
  "Itel",
  "Xiaomi 10t",
  "Redmi",
  "Huawei",
  "Vivo",
];
let imgs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let pices = [
  500, 1200, 12000, 1250, 700, 3000, 2300, 1700, 4900, 1550, 1390, 1200,
];

// ADD DATA TO ARRAY

let myProduct = [];

for (let i = 0; i < namePro.length; i++) {
  let prodObj = {
    name: namePro[i],
    img: imgs[i],
    price: pices[i],
  };
  myProduct.push(prodObj);

  // FUNCTION CREATE PRODUCTS

  function createProducts(pName = "Product", pImg, pPri = 0, count) {
    // Create main elements
    let mainDiv = document.createElement("div");
    mainDiv.className = "prod-box";
    let h2 = document.createElement("h2");
    let img = document.createElement("img");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    p2.className = 'prix' ;
    let btnAdd = document.createElement("button");
    btnAdd.setAttribute("onclick", `addToCart(${count})`);
    btnAdd.setAttribute("id", `add${count}`);
    let btnRem = document.createElement("button");
    btnRem.className = "btnDel";
    btnRem.setAttribute("id", `rem${count}`);
    btnRem.setAttribute("onclick", `removeProdCart(${count})`);
    let span = document.createElement("span");
    span.className = "count";
    // Create text node
    let heading = document.createTextNode(`${pName}`);
    let para1 = document.createTextNode(`Buy ${pName} now !!`);
    let para2 = document.createTextNode(`${pPri} DH`);
    let btnContentAdd = document.createTextNode(`ADD NOW`);
    let btnContentRem = document.createTextNode(`REMOVE`);
    let counterSpan = document.createTextNode('NEW');
    // Append text to elements
    h2.appendChild(heading);
    p1.appendChild(para1);
    img.src = pImg;
    p2.appendChild(para2);
    btnAdd.appendChild(btnContentAdd);
    btnRem.appendChild(btnContentRem);
    span.appendChild(counterSpan);
    // Append elements to  main div
    mainDiv.appendChild(h2);
    mainDiv.appendChild(img);
    mainDiv.appendChild(p1);
    mainDiv.appendChild(p2);
    mainDiv.appendChild(btnAdd);
    mainDiv.appendChild(btnRem);
    mainDiv.appendChild(span);
    // Append main div to our section
    products_content.appendChild(mainDiv);
  }

  createProducts(
    myProduct[i].name,
    `img/${myProduct[i].img}.jpg`,
    myProduct[i].price,
    i + 1
  );
}

// ADD PRODUCT TO CART

function addToCart(ind) {
  countCart++;
  count.innerHTML = countCart;
  addedProd(ind);
  setTimeout(showProduct, 500, ind);
  calacTotal(ind);
}

// MODIFY BUTTON

function addedProd(ind) {
  let btnAdd = document.getElementById(`add${ind}`);
  let btnRem = document.getElementById(`rem${ind}`);
  btnAdd.innerHTML = 'ADDED <i class="fa fa-check-circle"></i>';
  btnAdd.style.background = "green";
  btnAdd.style.pointerEvents = "none";
  btnRem.style.display = "inline-block";
}

// Remove PRODUCT FROM CART

function removeProdCart(ind) {
  let btnAdd = document.getElementById(`add${ind}`);
  let btnRem = document.getElementById(`rem${ind}`);
  countCart--;
  count.innerHTML = countCart;
  btnRem.style.display = "none";
  btnAdd.innerHTML = "ADD NOW";
  btnAdd.style.background = "#FF6A3D";
  btnAdd.style.pointerEvents = "all";
  setTimeout(removeProduct, 500, ind);
}

// ADD PRODUCT TO ASIDE BAR

function showProduct(ind) {
  divShow = `
  <div class="prod-box box${ind}">
  <h2>${myProduct[ind - 1].name}</h2>
  <img src="img/${myProduct[ind - 1].img}.jpg">
  <p>${myProduct[ind - 1].price} DH</p>
  <p>Buy now  ${myProduct[ind - 1].name} !!</p>
  <button>Buy now</button>
  `;

  price_content.innerHTML += divShow;
}

// REMOVE PRODUCT FROM ASIDE BAR

function removeProduct(ind) {
  let box = document.querySelector(`.box${ind}`);
  box.remove();
  totalPrice -= myProduct[ind - 1].price;
  total.innerHTML = totalPrice + ' DH';
}

// CALC TOTAL

function calacTotal(ind) {
  totalPrice += myProduct[ind - 1].price;
  total.innerHTML = totalPrice + " DH";
}

// Search products

function searchProduct() {
  products_content.innerHTML = "";
  let checker = false;
  for (let i = 0; i < myProduct.length; i++) {
    if (
      myProduct[i].name.toUpperCase().startsWith(search.value.trim().toUpperCase())
    ) {
      createProducts(
        myProduct[i].name,
        `img/${myProduct[i].img}.jpg`,
        myProduct[i].price,
        i+1  
      );
      checker = true;
    }
  }
  if (checker === false) {
    let notFound = `<h1 style = "color : red ; text-align: center; margin : 20px auto ;">Sorry !! This Product Not Found </h1>
    `;
    products_content.innerHTML = notFound;
  }
}

search.addEventListener("input", searchProduct);
