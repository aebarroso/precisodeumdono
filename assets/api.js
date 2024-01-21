// Constantes para o pedido do token
const apiKey = "k1rNtNjFow47TcGQKnRKRuziBedJx5VGSNvFDgsJjFuEQcKLmA";
const apiSecret = "Yj4CeBZJDX9p4VJjW2PjzRojHvYfQ46sqzKe0KRz";
const curlApi2 = "https://api.petfinder.com/v2/oauth2/token";
const apiURL = "https://api.petfinder.com/v2/animals";

// Variaveis para a utilização do token
var gender = ['Male', 'Female'];
var apiToken;
if(window.location.pathname.split("/").pop() == "foradoption.html" || window.location.pathname.split("/").pop() == "favorites.html"){
    var clonedCard = $(".card-pet").clone();
}

// Evento para o carregamento da página
function loadPets() {
    $(".list-pets").empty();
    getToken(apiToken);

}
// Funcao para carregar pets
function loadPetsIndex() {
    $(".carousel-inner").empty();
    getToken(apiToken);
}

// Função para a obtenção do token da api petfinder
function getToken(apiToken) {
    $(".modal-dialog").show();
    $.ajax({
        url: curlApi2,
        type: "POST",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        data: {
            grant_type: 'client_credentials',
            client_id: apiKey,
            client_secret: apiSecret
        },
        success: function (result) {
            apiToken = result.access_token;
            getPet(apiToken);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getPet(apiToken) {
    $.ajax({
        url: apiURL,
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + apiToken
        },
        data: {
            type: "Dog",
            gender: gender,
            status: "adoptable"
        },
        success: function (result) {
            var count = 0;
            var addedPetNames = [];
            $.each(result.animals, function (index, pet) {
                if (addedPetNames.includes(pet.name)) {
                    return; 
                }
                addedPetNames.push(pet.name); 
                if (window.location.pathname.split("/").pop() == "foradoption.html" || window.location.pathname.split("/").pop() == "favorites.html") {
                    cloneCard(index, pet);
                }
                if (window.location.pathname.split("/").pop() == "index.html") {
                        carouselConstructorHeading(pet, count);
                        carouselConstructor(pet, count);
                        count++;
                }
            });
            $(".modal-dialog").hide();
        },
        error: function (error) {
            console.log(error);
        }
    });
}