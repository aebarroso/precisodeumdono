function plus(id) {
    var quantity = document.getElementById("input" + id).value;
    quantity++;
    document.getElementById("input" + id).value = quantity;
}
function minus(id) {
    var quantity = document.getElementById("input" + id).value;
    if (quantity > 0) {
        quantity--;
        document.getElementById("input" + id).value = quantity;
    }
}
function btnBuy(id) {
    var quantity = document.getElementById("input" + id).value;
    var compras = document.getElementById("produto" + id).innerHTML;
    if (quantity > 0) {
        alert("Comprou " + quantity + " Unidades de " + compras);
    }
    else {
        alert("Não tem produtos adicionados")
    }
    document.getElementById("input" + id).value = 0;
}

