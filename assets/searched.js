

function isSearched(id) {
    //A função parse() converte de string p objecto JSON
    //Função some da return true ou false com o loop for que faz isso sozinho 
    var searched = JSON.parse(localStorage.getItem("searched")) || [];
    console.log("searched  "+searched);
    return searched.some(pet => pet.id === id);
}

function updateSearched(button, pet) {
    if (!button.hasClass("procurado")) {
        button.addClass("procurado");
        button.on("click", function () {
            if (isSearched(pet.id)) {
                removeSearched(pet);
            }
            else {
                addSearched(pet);
            }
        });
    }}

    function addSearched(pet) 
    {
        var searched = JSON.parse(localStorage.getItem("searched")) || [];
        searched[0] = pet;
        localStorage.setItem("searched", JSON.stringify(searched));
        window.location.href = ("dogdetails.html");
    }
    function removeSearched(pet)
    {
        var searched = JSON.parse(localStorage.getItem("searched")) || [];
        searched = searched.filter(function (item) {
            return item.id !== pet.id;
        });
        localStorage.setItem("searched", JSON.stringify(searched));
    }

    function lerSearched() {
        var searched = JSON.parse(localStorage.getItem("searched")) || {};
        $(".list-pets").empty();
        $.each(searched, function (index, pet) {
            console.log(pet);
            load_details(pet);
        });
        $(".modal-dialog").hide();}