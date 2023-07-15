function addToBasket(index) {
    const menuItem = menu[index];
  
    const existingItemIndex = shoppingBasket.findIndex(
      (item) => item.name === menuItem.name
    );
  
    if (existingItemIndex !== -1) {
      shoppingBasket[existingItemIndex].price += menuItem.price;
    } else {
      shoppingBasket.push(menuItem);
      prices.push(menuItem.price);
      names.push(menuItem.name);
    }
  
    let contentBasket = document.getElementById("warenkorbBasket");
    contentBasket.innerHTML = "";
    let totalPrice = 0;
  
    for (let i = 0; i < shoppingBasket.length; i++) {
      const item = shoppingBasket[i];
      contentBasket.innerHTML += /*html*/ `
        <div>${item.name} - ${item.price}</div>
      `;
      totalPrice += item.price;
    }
  
    if (totalPrice < 20) {
      totalPrice += 20;
      contentBasket.innerHTML += /*html*/ `
        <div>Mindestbestellwert 20.00 Euro</div>
      `;
    } else {
      totalPrice += 3;
      contentBasket.innerHTML += /*html*/ `
        <div>Lieferkosten 3.00 Euro</div>
      `;
    }
  
    contentBasket.innerHTML += /*html*/ `
      <div>Gesamtpreis ${totalPrice.toFixed(2)} Euro</div>
    `;
  }