function updateVisual(button, pet) {
    console.log(pet.id);
    if (isFavorite(pet.id)) {
        button.text("Remover Favoritos");
        button.removeClass("btn btn-success");
        button.addClass("btn btn-danger");
        button.addClass("bi bi-trash");
    } else {
        button.text("Adicionar Favoritos");
        button.removeClass("btn btn-danger");
        button.addClass("btn btn-success");
        button.removeClass("bi bi-trash");
    }
}

function isFavorite(id) {
    //A função parse() converte de string p objecto JSON
    //Função some da return true ou false com o loop for que faz isso sozinho 
    var favorites = JSON.parse(localStorage.getItem("favoritos")) || [];
    console.log("favoritos  " + favorites);
    return favorites.some(pet => pet.id === id);
}

function updateFavorites(button, pet) {
    if (!button.hasClass("adicionado")) {
        button.addClass("adicionado");
        button.on("click", function () {
            if (isFavorite(pet.id)) {
                //Se esta nos favoritos chama o remover
                removeFavoritos(pet);
                if (window.location.pathname.split("/").pop() == "favorites.html") {
                    location.reload();
                }
            }
            else {
                //Se NAO esta nos favoritos chama o adicionar
                addFavoritos(pet);
            }
            updateVisual(button, pet);
        });
    }
}

function addFavoritos(pet) {
    var favorites = JSON.parse(localStorage.getItem("favoritos")) || [];
    //Preparar o array ( PUSH array)
    favorites.push(pet);
    //Vamos guardar na localStorage
    localStorage.setItem("favoritos", JSON.stringify(favorites));
}
function removeFavoritos(pet) {
    var favorites = JSON.parse(localStorage.getItem("favoritos")) || [];
    favorites = favorites.filter(function (item) {
        return item.id !== pet.id;
    });
    localStorage.setItem("favoritos", JSON.stringify(favorites));

}

function lerFavoritos() {
    var favorites = JSON.parse(localStorage.getItem("favoritos")) || {};
    if (Object.keys(favorites).length === 0) {
        $("#noFavoritesMsg").prepend("<h1 id='noFavoritesMsg'>Não existem animais nos favoritos neste momento</h1>");
        $("#noFavoritesMsg").show();
        $(".titulo-favoritos").hide();
        $(".list-pets").empty();
        $(".modal-dialog").hide();

    } else {
        $("#noFavoritesMsg").hide();
        $(".list-pets").empty();
    }
    $.each(favorites, function (index, pet) {
        console.log(pet);
        cloneCard(index, pet);
    });
    $(".modal-dialog").hide();
}