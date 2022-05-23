// Accès au panier

function getCart() {
    let cart = localStorage.getItem("items");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

let productData = []

// Cart Builder

function cartBuilder(item) {

    let cartItems = document.querySelector('.cart__items');

    const article = document.createElement('article');
    article.className = "cart__item";
    article.append(cartItems);

    const div1 = document.createElement('div');
    div1.className = "cart__item__img";
    div1.append(article);

    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.altTxt;
    img.append(div1);

    const div2 = document.createElement('div');
    div2.className = "cart__item__content";
    div2.append(article);

    const div3 = document.createElement('div');
    div3.className = "cart__item__content__description";
    div3.append(div2);

    const h2 = document.createElement('h2');
    h2.innerHTML = item.name;
    h2.append(div3);

    const pColor = document.createElement('p');
    pColor.innerHTML = item.color;
    pColor.append(div3);

    const pPrice = document.createElement('p');
    pPrice.innerHTML = item.price;
    pPrice.append(div3);

    const div4 = document.createElement('div');
    div4.className = "cart__item__content__settings"
    div4.append(div2);

    const div5 = document.createElement('div');
    div5.className = "cart__item__content__settings__quantity";
    div5.append(div4);

    const pQuantity = document.createElement('p');
    pQuantity.innerHTML = item.quantity;
    pQuantity.append(div5);

    const input = document.createElement('input');
    input.type = "number";
    input.className = "itemQuantity";
    input.name = "itemQuantity"
    input.min = "1";
    input.max = "100";
    input.value = "42";
    input.append(div5);

    const div6 = document.createElement('div');
    div6.className = "cart__item__content__settings__delete";
    div6.append(div4);

    const pDelete = document.createElement('p');
    pDelete.className = "deleteItem";
    pDelete.innerHTML = "Supprimer";
    pDelete.append(div6)
}

let items = getCart();
console.log(items);


for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let apiUrl = "http://localhost:3000/api/products/" + item.id;
    fetch(apiUrl).then(res => {
        return res.json();
    }).then(data => {
        productData.push(data);
        console.log(productData)
        let newItem = productData.map(el => ({ name: el.name, price: el.price }));
        console.log(newItem);




    }).catch(function(error) {
        console.log('error');
    })
}