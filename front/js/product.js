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