// Constantes para o pedido do token
const apiKey = "k1rNtNjFow47TcGQKnRKRuziBedJx5VGSNvFDgsJjFuEQcKLmA";
const apiSecret = "Yj4CeBZJDX9p4VJjW2PjzRojHvYfQ46sqzKe0KRz";
const curlApi2 = "https://api.petfinder.com/v2/oauth2/token";
const apiURL = "https://api.petfinder.com/v2/animals";

// Variaveis para a utilização do token
var gender = ['Male', 'Female'];
var apiToken=null;
var clonedCard = $(".card-pet").clone();
$(".card-pets").empty();

// Evento para o carregamento da página
function menuNav(menu) {
    document.location.href = String(menu).split("#")[1] + ".html";
}

// Evento para o carregamento da página
function loadPets() {
    $(".list-pets").empty();
    getPet();
}

// Função para a obtenção do token da api petfinder
function getToken() {
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
            getPet();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getPet() {
    if(token == null){
        getToken();
    }
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
            //console.log(result);
            $.each(result.animals, function (index, pet) {
                console.log(pet);
                cloneCard(index, pet);
            });
            $(".modal-dialog").hide();
        },
        error: function (error) {
            console.log(error);
            getToken();
        }
    });
}
$input = $('input[type="text"]');

$('.btn').on('click', function () {
    $val = $input.val();
    if ($(this).hasClass('btn-minuse')) {
        $input.val(parseInt($val) - 1);
        if (parseInt($val - 1) <= 0) {
            $input.val(0);
        }
    } else {
        $input.val(parseInt($val) + 1);
    }
});

function cloneCard(index, pet) {
    var card = clonedCard.clone();
    if (pet.primary_photo_cropped != null) {
        $(".img-pet", card).attr("src", pet.primary_photo_cropped.medium);
    } else {
        $(".img-pet", card).attr("src", "Img/no-image-available-icon.jpg");
    }
    $(".name-pet", card).text(pet.name);
    $(".desc-pet", card).text(pet.description);
    $(".gender-pet", card).text(pet.gender);
    $(".age-pet", card).text(pet.age);
    $(".list-pets").append(card);

}
