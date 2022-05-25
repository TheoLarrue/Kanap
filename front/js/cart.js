// Fonction : Accès au panier

function getCart() {
    let cart = localStorage.getItem("items");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

// Récupère les données du panier dans un variable

let items = getCart();

// Fonction Cart Builder

function cartBuilder(item) {
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

// Récupère les données de l'Api pour chaque objets dans le Local Storage et lance la fonction Cart Builder

async function getAndBuild(item) {

    let apiUrl = "http://localhost:3000/api/products/" + item.id;
    let reponse = await fetch(apiUrl);
    let data = await reponse.json();


    let dataNP = {
        name: data.name,
        price: data.price,
        imageUrl: data.imageUrl,
        altTxt: data.altTxt,
        description: data.description
    };

    let newItem = Object.assign(item, dataNP);

    cartBuilder(newItem);
}

// Fonction getAndBuild pour chaque objets du Local Storage

for (item of items) {
    getAndBuild(item);
}