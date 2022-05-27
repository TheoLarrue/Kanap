// Fonction panier vide

function emptyCart() {

    if (cart.length > 0) {
        console.log('ok');
    } else {
        let cartItems = document.querySelector('#cart__items');
        let h3 = document.createElement('h3');
        cartItems.append(h3);
        h3.innerHTML = "Le panier est vide";
        h3.style.textAlign = "center";
    }
}

// Fonction : Accès au panier

function getCart() {
    let cart = localStorage.getItem("items");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

// Sauvegarde du panier

function saveCart(items) {
    localStorage.setItem('items', JSON.stringify(items));
}

// Récupère les données du panier dans un variable

let cart = getCart();

// Fonction Cart Builder

function cartBuilder(item) {
    let cartItems = document.querySelector('#cart__items');
    let content = `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
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
                      <p>Qté : </p>
                     <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
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

// Function Supprimer un article

function remove() {

    let articles = document.querySelectorAll('article');

    for (article of articles) {
        let deleteItem = article.querySelector('.deleteItem');
        let color = article.dataset.color
        let id = article.dataset.id;



        deleteItem.addEventListener('click', () => {

            let check = cart.find(p => p.id == id && p.color == color)
            if (check !== undefined) {
                console.log(check);
                if (window.confirm(`Voulez vous supprimer ${check.quantity} ${check.name} de votre panier ?`)) {

                    let newCart = cart.filter(c => c.id !== id && c.color !== color);
                    saveCart(newCart);
                    location.reload();

                }
            }
        })
    }
}

// Fonction Changer une quantité

function quantity() {

    let articles = document.querySelectorAll('article');

    for (article of articles) {
        let input = article.querySelector('input');
        let color = article.dataset.color
        let id = article.dataset.id

        input.addEventListener('change', () => {

            let check = cart.find(p => p.id == id && p.color == color);
            if (check !== undefined) {
                check.quantity = input.value;
                saveCart(cart);
            }
        })
    }
}

// Function Run

async function run() {

    emptyCart();

    for (item of cart) {
        await getAndBuild(item);
        await quantity();
        await remove();
    }
}

run();