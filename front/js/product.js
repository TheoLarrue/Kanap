// Récupération de l'id du produit

let src = window.location.href;
let url = new URL(src);
let idProduct = url.searchParams.get("id");
console.log(idProduct);


// Constructeur de page

let productBuilder = function(product) {

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

let errorFuncProduct = function() {

    let item = document.querySelector('.item__content');
    item.innerHTML = "";
    let h3 = document.createElement('h3');
    item.append(h3);
    h3.innerHTML = "Un erreur est survenue";
    h3.style.textAlign = "center";

}

// GetApi Produit

let getApiProduct = function() {
    let apiUrl = "http://localhost:3000/api/products/" + idProduct;
    console.log(apiUrl);
    fetch(apiUrl).then(res => {
        return res.json();
    }).then(data => {
        let product = data;
        console.log(product);
        productBuilder(product);
    }).catch(function(error) {
        errorFuncProduct();
    })
}


getApiProduct();


// Ajout data au localStorage

let addToCart = function() {
    let selectColor = document.querySelector('#colors');
    let valueColor = selectColor.value;
    let selectQuantity = document.querySelector('#quantity');
    valueQuantity = selectQuantity.value;

    if (valueColor !== "") {
        localStorage.setItem("color", colors.value);
    } else {
        alert('Merci de choisir une couleur');
    }

    if (valueQuantity >= 1 && valueQuantity <= 100) {
        localStorage.setItem("quantity", quantity.value);
    } else {
        alert('Merci de choisir une quantité');
    }

}

let btn = document.querySelector('#addToCart');
btn.addEventListener('click', addToCart);