// Card Builder

function cardBuilder(product) {

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

function errorFunc() {

    let titles = document.querySelector('.titles');
    let h2 = titles.querySelector('h2');
    let h1 = titles.querySelector('h1');
    h1.textContent = "";
    h2.textContent = "";
    let items = document.querySelector(".items");
    const h3Error = document.createElement('h3');
    h3Error.innerHTML = ("Une erreur est survenue");
    items.appendChild(h3Error);

}

// GetApi

async function getApi() {

    try {

        let url = "http://localhost:3000/api/products";
        let reponse = await fetch(url);
        let products = await reponse.json();

        for (product of products) {
            cardBuilder(product);
        }

    } catch (error) {
        errorFunc();
    }

}

getApi();