// Emplacement du OrderId dans le Html

let orderIdHtml = document.querySelector('#orderId');

// Récupère orderId dans le LocalStorage

function getId() {
    let id = localStorage.getItem("order");
    return JSON.parse(id);
}

// Affiche l'id dans le Html et vide le LocalStorage

function idFunc() {

    let id1N = getId();
    orderIdHtml.innerHTML = id1N;
    localStorage.clear();
}

idFunc();