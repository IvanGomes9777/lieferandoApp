let menu = [
  {
    name: "Hamburger Menü",
    ingredients: "mit Pommes und 1x Softgetränk",
    price: 9,
    currency: "Euro",
    imageAdd: "img/addMenü.png",
    amount: 1,
    note: "",
  },

  {
    name: "Schnitzel Menü",
    ingredients: "Schnitzel nach Wahl, mit Pommes und 1xSoftgetränk",
    price: 10,
    currency: "Euro",
    imageAdd: "img/addMenü.png",
    amount: 1,
    note: "",
  },
  {
    name: "Döner Menü",
    ingredients: "mit 1x Softgetränk",
    price: 7.95,
    currency: "Euro",
    imageAdd: "img/addMenü.png",
    amount: 1,
    note: "",
  },
  {
    name: "Pizza Schnecken",
    ingredients: "mit Pommes, Dip nach Wahl und 1x Softgetränk",
    price: 10,
    currency: "Euro",
    imageAdd: "img/addMenü.png",
    amount: 1,
    note: "",
  },
  {
    name: "Kinder Menü",
    ingredients: "kleines Schnitzel, mit Pommes und Dip nach Wahl",
    price: 6.0,
    currency: "Euro",
    imageAdd: "img/addMenü.png",
    amount: 1,
    note: "",
  },
];

let MIN_ORDER_VALUE = 20;
let shoppingBasket = [];

function returnRender(i,menuItem){
return /*html*/ `
<div class="menü-style">
  <div class="image-container">
    <div class="nameStyle">${menuItem.name}</div>
    <img onclick="addToBasket(${i})" src="${menuItem.imageAdd}" alt="">
  </div>
  <div class="menü-informations">
    <div class="ingrediantsStyle">${menuItem.ingredients}</div>
    <div class="preis-währung">
      <div class="priceStyle">
      <div >${menuItem.price.toFixed(2)}</div>
      <div>${menuItem.currency}</div>
    </div>
    </div>
    <div class="note-container">
      <div style="cursor:pointer;" onclick="toggleNoteField(${i})">Anmerkung hinzufügen</div>
      <textarea id="noteField_${i}" placeholder="mit enter bestätigen" class="note-field hidden" 
        onkeydown="acceptNoteField(event, ${i})"></textarea>
        <p style="font-size:20px;text-decoration:underline;">vor der Auswahl des Menüs Anmerkung hinzufügen</p>
    </div>
  </div>
</div>
`;
}

function render() {
  let content = document.getElementById("menücontainer");
  content.innerHTML = "";
  for (let i = 0; i < menu.length; i++) {
    const menuItem = menu[i];
    content.innerHTML += returnRender(i,menuItem);
  }
}

function acceptNoteField(event, i) {
  if (event.keyCode === 13) {
    const noteField = document.getElementById(`noteField_${i}`);
    const note = noteField.value.trim();

    menu[i].note = note;
    toggleNoteField(i);
  }
}

function toggleNoteField(i) {
  const noteField = document.getElementById(`noteField_${i}`);
  noteField.classList.toggle("hidden");
}

function addToBasket(i) {
  const menuItem = menu[i];
  const existingItem = shoppingBasket.find(
    (item) => item.name === menuItem.name
  );

  if (existingItem) {
    existingItem.amount += 1;
    existingItem.price += menuItem.price;
  } else {
    shoppingBasket.push({
      ...menuItem,
      amount: 1,
    });
  }

  if (shoppingBasket.length > 0) {
    renderBasket();
  }
}

function addAmount(i) {
  shoppingBasket[i].amount++;
  shoppingBasket[i].price += menu[i].price;

  const amountContainer =
    document.getElementsByClassName("amount-container")[i];
  amountContainer.innerHTML =
    shoppingBasket[i].amount + " " + shoppingBasket[i].name;

  const priceContainer = document.getElementsByClassName("price-container")[i];
  priceContainer.innerHTML =
    shoppingBasket[i].price.toFixed(2) + " " + shoppingBasket[i].currency;

  renderBasket();
}

function subtractAmount(i) {
  if (shoppingBasket[i].amount > 1) {
    shoppingBasket[i].amount--;
    shoppingBasket[i].price -= menu[i].price;

    const amountContainer =
      document.getElementsByClassName("amount-container")[i];
    amountContainer.innerHTML =
      shoppingBasket[i].amount + " " + shoppingBasket[i].name;

    const priceContainer =
      document.getElementsByClassName("price-container")[i];
    priceContainer.innerHTML =
      shoppingBasket[i].price.toFixed(2) + " " + shoppingBasket[i].currency;
  } else if (shoppingBasket[i].amount === 1) {
    shoppingBasket.splice(i, 1);
  }

  renderBasket();
}
function returnRenderBasket(i, basketItem,formatttedPrice) {
  return  `
  <div class="basketAll">
    <div class="amount-price">
      <div class="amount-container">
        ${basketItem.amount} ${basketItem.name}
      </div>
      <div class="price-container">
        ${formatttedPrice} ${basketItem.currency}
      </div>
    </div>
    <div class="ingredients-container">
      ${basketItem.ingredients}
    </div>
    <div class="note-container">
      <div>Anmerkung: ${basketItem.note}</div>
    </div>
    <div class="plus-minus-container">
      <img onclick="subtractAmount(${i})" src="img/minus.icon.png" alt="">
      <img onclick="addAmount(${i})" src="img/plus.icon.png" alt="">
    </div>
  </div>
`;
}
function returnFirstInnerHTMLRenderBasket(){
return `
<div class="">
  <h1>Warenkorb</h1>
</div>
`;
}

function renderBasket() {
  let contentBasket = document.getElementById("warenkorbBasket");
  contentBasket.innerHTML = returnFirstInnerHTMLRenderBasket();

  let subtotal = 0;

  for (let i = 0; i < shoppingBasket.length; i++) {
    const basketItem = shoppingBasket[i];
    let formatttedPrice = basketItem.price.toFixed(2).replace(".", ",");
    contentBasket.innerHTML +=returnRenderBasket(i, basketItem, formatttedPrice);
    subtotal += basketItem.price;
  }

  const deliveryCost = 2.5;
  const total = subtotal + deliveryCost;

  if (total < MIN_ORDER_VALUE) {
    contentBasket.innerHTML += `
      <div class="min-order-value">
        Mindestbestellwert: ${MIN_ORDER_VALUE.toFixed(2).replace(".", ",")} ${
      shoppingBasket[0].currency
    }
      </div>
    `;
  } else {
    contentBasket.innerHTML += `
      <div class="subtotal">
        Zwischensumme: ${subtotal.toFixed(2).replace(".", ",")} ${
      shoppingBasket[0].currency
    }
      </div>
      <div class="delivery-cost">
        Lieferkosten: ${deliveryCost.toFixed(2).replace(".", ",")} ${
      shoppingBasket[0].currency
    }
      </div>
      <div class="total">
        <b style="color:green;font-weight:900;">Gesamtsumme</b>: ${total
          .toFixed(2)
          .replace(".", ",")} ${shoppingBasket[0].currency}
      </div>
      <button class="orderButton" onclick="placeOrder()">Bestellen</button>
    `;
  }
}

function placeOrder() {
  let contentBasket = document.getElementById("warenkorbBasket");
  contentBasket.innerHTML = `
    <div class="">
      <h1>Danke für Ihre Bestellung!</h1>
    </div>
  `;
  shoppingBasket = [];
}

function back() {
  let selectionBar = document.getElementById("search-section");
  selectionBar.scrollLeft -= 200;
}

function forward() {
  let selectionBar = document.getElementById("search-section");
  selectionBar.scrollLeft += 200;
}

function star() {
  saveIcon = document.getElementById("stern");
  let oldStar = "img/stern.png";
  let newStar = "img/star.png";

  if (saveIcon.getAttribute("src") === oldStar) {
    saveIcon.setAttribute("src", newStar);
  } else {
    saveIcon.src = oldStar;
  }
}

function showWarenkorb(){
  document.getElementById('basketresponsiv').style=`display:block;`;
}
  

function responsiveCloseButton(){
document.getElementById('basketresponsiv').style=`display:none;`;
}