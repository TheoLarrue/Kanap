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

// Inputs et Regex

let simpleRegex = /^[a-zA-Z-\s ]*$/;
let codePostalRegex = /[0-9]{5}$/;
let mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

let firstName = document.querySelector('#firstName');
let firstNameError = document.querySelector('#firstNameErrorMsg');

let lastName = document.querySelector('#lastName');
let lastNameError = document.querySelector('#lastNameErrorMsg');

let codePostal = document.querySelector('#codePostal');
let codePostalError = document.querySelector('#codePostalErrorMsg');

let city = document.querySelector('#city');
let cityError = document.querySelector('#cityErrorMsg');

let email = document.querySelector('#email');
let emailError = document.querySelector('#emailErrorMsg');

let address = document.querySelector('#address');
let addressError2a = document.querySelector('#addressErrorMsg');

// Validation Prénom

function funcFirstName() {

    if (simpleRegex.test(firstName.value) == false || firstName.value == "") {
        firstNameError.innerHTML = "Le prénom doit être valide";

    } else {
        firstNameError.innerHTML = "";
        return true;
    }
}

// Validation Nom

function funcLastName() {

    if (simpleRegex.test(lastName.value) == false || lastName.value == "") {
        lastNameError.innerHTML = "Le nom doit être valide";

    } else {
        lastNameError.innerHTML = "";
        return true;
    }
}

// Validation Adresse 

function funcAddress() {

    if (address.value == "") {
        addressError2a.innerHTML = "L'adresse doit être valide";

    } else {
        addressError2a.innerHTML = "";
        return true;
    }
}

// Validation Code Postal

function funcCodePostal() {

    if (codePostalRegex.test(codePostal.value) == false || codePostal.value == "") {
        codePostalError.innerHTML = "Le code postal doit être valide";

    } else {
        codePostalError.innerHTML = "";
        return true;
    }
}

// Suggestion Ville via Api GeoApi

async function cityApi() {

    try {
        let apiUrl = `https://geo.api.gouv.fr/communes?codePostal=${codePostal.value}&fields=nom&format=json&geometry=centre`;
        let reponseApi = await fetch(apiUrl);
        let dataApi = await reponseApi.json();

        city.innerHTML = "";

        for (data of dataApi) {
            let option = document.createElement('option');
            city.append(option);
            option.value = data.nom;
            option.innerHTML = data.nom;
        }
    } catch {
        console.log("GeoApi ne répond pas");
    }

}

// Validation Mail

function funcMail() {

    if (mailRegex.test(email.value) == false || email.value == "") {
        emailError.innerHTML = "L'email doit être valide";
    } else {
        emailError.innerHTML = "";
        return true;
    }

}

// Fonction Focus Event

function focus() {
    let orderBtn = document.querySelector('#order');
    orderBtn.disabled = true;
}

// Fonction Blur Event

function blur() {
    let orderBtn = document.querySelector('#order');
    orderBtn.disabled = false;
}

// Evenements sur les inputs

firstName.addEventListener('input', funcFirstName);
lastName.addEventListener('input', funcLastName);
address.addEventListener('input', funcAddress)
codePostal.addEventListener('input', funcCodePostal);
codePostal.addEventListener('input', cityApi);
email.addEventListener('input', funcMail);

firstName.addEventListener('focus', focus);
lastName.addEventListener('focus', focus);
address.addEventListener('focus', focus);
codePostal.addEventListener('focus', focus);
city.addEventListener('focus', focus);
email.addEventListener('focus', focus);

firstName.addEventListener('blur', blur);
lastName.addEventListener('blur', blur);
address.addEventListener('blur', blur);
codePostal.addEventListener('blur', blur);
city.addEventListener('blur', blur);
email.addEventListener('blur', blur);


// Post Order

async function postOrder() {

    let arrayId = [];

    for (product of cart) {
        arrayId.push(product.id);
    }

    let order = {

        contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.options[city.selectedIndex].text,
            email: email.value
        },
        products: arrayId
    }

    let config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    }

    try {
        let reponse = await fetch("http://localhost:3000/api/products/order", config);
        let data = await reponse.json();
        localStorage.clear();
        localStorage.setItem('order', JSON.stringify(data.orderId));
        document.location.href = "confirmation.html";

    } catch {
        console.log(config.body);
        alert('erreur');
    }

}

// Evenement et conditions du bouton Order

let order = document.querySelector('#order');

order.addEventListener('click', function(e) {

    let resFirstName = funcFirstName();
    let resLastName = funcLastName();
    let resAddress = funcAddress();
    let resCodePostal = funcCodePostal();
    let resMail = funcMail();

    if (resFirstName !== true || resLastName !== true || resAddress !== true || resCodePostal !== true || resMail !== true) {
        e.preventDefault();
    } else {
        postOrder();
    }
})