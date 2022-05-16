// Card Builder

let cardBuilder = function(product) {

    //Creation de la balise <img> et ses attributs
    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.altTxt;

    //Creation du titre <h3>
    const h3 = document.createElement('h3');
    h3.innerHTML = product.name;
    h3.className = "productName";

    //Creation du paragraphe de description
    const p = document.createElement('p');
    p.className = "productDescription";
    p.innerHTML = product.description;

    // Creation de la balise <article>
    const article = document.createElement('article');
    article.append(img, h3, p);


    // Creation de la balise <a>
    const link = document.createElement('a');
    link.append(article);
    link.href = 'product.html?id=' + product._id;


    // Injection du contenu dans la <div> .items
    const items = document.querySelector('.items');
    items.append(link);

}

//Page d'erreur

let errorFunc = function() {
    let items = document.querySelector(".items")
    const h3Error = document.createElement('h3')
    h3Error.innerHTML = ("Une erreur est survenu")
    items.appendChild(h3Error);
}

// GetApi

let getApi = function() {
    let url = "http://localhost:3000/api/products";
    fetch(url).then(res => {
        return res.json();
    }).then(data => {
        let products = data;
        console.log(products)
        for (let i = 0; i < products.length; i++) {
            let product = products[i];
            cardBuilder(product);
        }
    }).catch(function(error) {
        errorFunc();
    })
}

getApi();