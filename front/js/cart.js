let productData = [];

// Fonction : Accès au panier

function getCart() {
    let cart = localStorage.getItem("items");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}


async function testBuilder(item) {
    let cartItems = document.querySelector('#cart__items');
    let content = `<article class="cart__item" data-id="{${item.id}}" data-color="{${item.color}}">
                <div class="cart__item__img">
                  <img src="${item.imageUrl}" alt="${item.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${item.name}</h2>
                    <p>${item.color}</p>
                    <p>${item.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${item.quantity}</p>
                     
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`

    cartItems.insertAdjacentHTML("beforeend", content);
}


// Fonction : Cart Builder

async function cartBuilder(item) {

    let cartItems = document.querySelector('#cart__items');

    const article = document.createElement('article');
    article.className = "cart__item";
    article.append(cartItems);

    const div1 = document.createElement('div');
    div1.className = "cart__item__img";
    div1.append(article);

    const img = document.createElement('img');
    img.alt = item.altTxt;
    img.src = item.imageUrl;
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

// Fonction : Creation d'un nouveau tableau produit avec le local storage et data de l'API

function combo(item1, item2) {
    let newItem = Object.assign(item1, item2);
    productData.push(newItem);
}


// Récupère les données du panier dans un variable

let items = getCart();

// Boucle analyse Local Storage et récupère les données de l'API

for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let apiUrl = "http://localhost:3000/api/products/" + item.id;
    fetch(apiUrl).then(res => {
        return res.json();
    }).then(data => {
        let dataApi = data;
        let dataNP = {
            name: dataApi.name,
            price: dataApi.price,
            imageUrl: dataApi.imageUrl,
            altTxt: dataApi.altTxt,
            description: dataApi.description
        };
        combo(dataNP, item);
        for (let i = 0; i < productData.length; i++) {
            let item = productData[i];
            testBuilder(item);
        }

    }).catch(function(error) {
        console.log('error');
    })
}

console.log(productData);