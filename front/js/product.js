// Récupération de l'id du produit

let src3n = window.location.href;
let url = new URL(src3n);
let idProduct = url.searchParams.get("id");

// Constructeur de page

function productBuilder(product) {

    // Image du produit
    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    const imgItem = document.querySelector('.item__img');
    imgItem.append(img);

    // Titre du produit 
    const title = document.querySelector('#title');
    title.innerHTML = product.name;

    // Prix du produit
    const price = document.querySelector('#price');
    price.innerHTML = product.price;

    // Description du produit
    const description = document.querySelector('#description');
    description.innerHTML = product.description

    // Option de couleur
    let colors = product.colors;
    for (let i = 0; i < colors.length; i++) {
        let color = colors[i];
        let option = document.createElement('option');
        option.value = color;
        option.innerHTML = color;
        let colorsHtml = document.querySelector('#colors');
        colorsHtml.append(option)
    }

}

// Erreur Produit

function errorFuncProduct() {

    let item = document.querySelector('.item__content');
    item.innerHTML = "";
    let h3 = document.createElement('h3');
    item.append(h3);
    h3.innerHTML = "Un erreur est survenue";
    h3.style.textAlign = "center";

}

// GetApi Produit

async function getApiProduct() {

    try {

        let apiUrl = "http://localhost:3000/api/products/" + idProduct;
        let response = await fetch(apiUrl);
        let productData = await response.json();

        productBuilder(productData);

    } catch (error) {

        errorFuncProduct();

    }
}


getApiProduct();


// Sauvegarde du panier

function saveCart(items) {
    localStorage.setItem('items', JSON.stringify(items));
}

// Accès au panier

function getCart() {
    let cart = localStorage.getItem("items");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}


// Ajout au panier

function addToCart(product) {

    let selectColor = document.querySelector('#colors');
    let valueColor = selectColor.value;
    let selectQuantity = document.querySelector('#quantity');
    let valueQuantity = selectQuantity.value;
    let title = document.querySelector('#title').textContent;



    if (valueColor == "") {
        alert("Merci de choisir une couleur");
    } else if (valueQuantity < 1 || valueQuantity > 100) {
        alert("Merci de choisir une quantité valide")
    } else {
        let product = {
            id: idProduct,
            quantity: valueQuantity,
            color: valueColor
        }

        let cart = getCart();

        let productCheck = cart.find(p => p.id == product.id && p.color == product.color);

        if (productCheck !== undefined) {

            if ((parseInt(productCheck.quantity) + parseInt(valueQuantity)) <= 100) {
                productCheck.quantity = parseInt(productCheck.quantity) + parseInt(valueQuantity);
                if (window.confirm(`Voulez vous ajouter ${valueQuantity} ${title} à votre panier ?`)) {
                    saveCart(cart);
                }
            } else {
                alert('La quantité ne peut pas être supérieure à 100');
            }

        } else {
            cart.push(product);
            if (window.confirm(`Voulez vous ajouter ${valueQuantity} ${title} à votre panier ?`)) {
                saveCart(cart);
            }
        }
    }
}

// Event du bouton

let btn = document.querySelector('#addToCart');
btn.addEventListener('click', addToCart);