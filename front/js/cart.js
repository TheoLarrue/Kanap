// Accès au panier

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

//Pour chaque objets dans le Local Storage récupère les données de l'Api et construit le Html

async function getAndBuild(item) {

    let apiUrl = "http://localhost:3000/api/products/" + item.id;
    let reponse = await fetch(apiUrl);
    let data = await reponse.json();

    let price = data.price;
    let url = data.imageUrl;
    let alt = data.altTxt;
    let name = data.name;

    let cartItems = document.querySelector('#cart__items');
    let content = `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
                <div class="cart__item__img">
                  <img src="${url}" alt="${alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${name}</h2>
                    <p>${item.color}</p>
                    <p>${price} €</p>
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

// Supprimer un article

function remove() {

    let articles = document.querySelectorAll('article');

    for (article of articles) {
        let deleteItem = article.querySelector('.deleteItem');
        let color = article.dataset.color
        let id = article.dataset.id;
        let name = article.querySelector('h2').textContent;



        deleteItem.addEventListener('click', () => {

            let check = cart.find(p => p.id == id && p.color == color)
            if (check !== undefined) {
                let newCart = cart.filter(c => c !== check);
                saveCart(newCart);
                location.reload();
            }
        })
    }
}

// Changer une quantité

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
                displayTotal();
            }
        })
    }
}

// Affiche le total quantité et total prix du panier 

async function displayTotal() {

    let totalQuantity = [];
    let totalPrice = [];

    for (item of cart) {

        let apiUrl = "http://localhost:3000/api/products/" + item.id;
        let reponse = await fetch(apiUrl);
        let data = await reponse.json();

        let price = parseInt(data.price);
        let quantity = parseInt(item.quantity);
        let priceTotal = (price * quantity);

        totalQuantity.push(quantity);
        totalPrice.push(priceTotal);

    }

    let sommeQuantity = 0;
    let sommePrice = 0

    for (let i = 0; i < totalQuantity.length; i++) {
        sommeQuantity += totalQuantity[i];
    }

    for (let i = 0; i < totalPrice.length; i++) {
        sommePrice += totalPrice[i];
    }

    let quantityHtml = document.querySelector('#totalQuantity');
    quantityHtml.innerHTML = sommeQuantity;

    let priceHtml = document.querySelector('#totalPrice');
    priceHtml.innerHTML = sommePrice;

}

// Run

async function run() {

    if (cart.length > 0) {

        for (item of cart) {
            await getAndBuild(item);
        }
        await quantity();
        await remove();
        await displayTotal();

    } else {
        let cartItems = document.querySelector('#cart__items');
        let h3 = document.createElement('h3');
        cartItems.append(h3);
        h3.innerHTML = "Le panier est vide";
        h3.style.textAlign = "center";
    }

}

run();

// Formulaire

function form() {

    let firstName = document.querySelector('#firstName');
    let firstNameError = document.querySelector('#firstNameErrorMsg')

    let lastName = document.querySelector('#lastName');
    let lastNameError = document.querySelector('#lastNameErrorMsg')

    let nameRegex = /^[a-zA-Z-\s]+$/;

    if (nameRegex.test(firstName.value) == false) {
        firstNameError.innerHTML = "Le prenom ne doit contenir que des lettres";
        submit.preventdefault();
    } else if (nameRegex.test(lastName.value) == false) {
        firstNameError.innerHTML = "Le nom ne doit contenir que des lettres";
        submit.preventdefault();
    } else if (nameRegex.test(firstName.value) == true) {
        console.log("c'est ok ")
        submit.preventdefault();
    }
}


let submit = document.querySelector('#order');
submit.addEventListener('submit', form);