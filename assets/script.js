// Constantes para o pedido do token
const apiKey = "k1rNtNjFow47TcGQKnRKRuziBedJx5VGSNvFDgsJjFuEQcKLmA";
const apiSecret = "Yj4CeBZJDX9p4VJjW2PjzRojHvYfQ46sqzKe0KRz";
const curlApi2 = "https://api.petfinder.com/v2/oauth2/token";
const apiURL = "https://api.petfinder.com/v2/animals";

// Variaveis para a utilização do token
//var apiToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJrMXJOdE5qRm93NDdUY0dRS25SS1J1emlCZWRKeDVWR1NOdkZEZ3NKakZ1RVFjS0xtQSIsImp0aSI6ImIzNDUzZTA4NDg2ZWFmZmJmNTVjZjkyYTU3ZmRlZjg4M2RmM2FiNzMxMzJhNWVjOTE4MjM3ZmIzOWE1MTVlMWE3YzA5NzdiYWI0YWI3NTg3IiwiaWF0IjoxNzAyMjM4MzczLCJuYmYiOjE3MDIyMzgzNzMsImV4cCI6MTcwMjI0MTk3Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.MsTcJQqdNm7Kdhsh2Hqr1bksJi4FdbRa0AW7jgxqSoDW4oere71wk1STs3wiU_RmVI_tUNPyA_Bh0w9xKDKs3FrrR4VN89FXOBjfDzuBGqhxWBBUbmzR2wS2fSk4yZYxptJ082Bi0lT82potxyT10TYpWfN8qhBV540trjhKkdSHhzSDhoNod27vwUBgfcyRiwQJtcu4MA6aByhcdrxc_iLQbRTLTlo2BJT4mXJ94msEbUU5RUw8JkB-pxWlpvvk_uSyuhg3my-BNJRi7wxQ6bx5eSwz2s9OoTvykPYdvVYiS08FTqcJ6duStKeiAxzF7QCteMj5lOZdPzktrybIAw";
var apiToken = "";
var gender = ['Male', 'Female'];

function getToken(){
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
    success: function(result){
        console.log(result);
        apiToken = result.access_token;
    },
    error: function(error){
        console.log(error);
    }
});
alert(apiToken);
return apiToken;
}


function menuNav(menu) {
    document.location.href = String(menu).split("#")[1] + ".html";
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
document.addEventListener("DOMContentLoaded", function(){
    apiToken=getToken();
    getPet();
}); 
function findGender(gen){
    $('#petList').empty();
    alert(gen);
    getPet();
}

function getPet(gender){
    alert(apiToken);
    $.ajax({
        url: apiURL,
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorization' : 'Bearer ' + apiToken
        },
        data: {
            type: "Dog",
            gender: gender,
            status: "adoptable"
        },
        success: function(result){
            //console.log(result);
            $.each(result.animals, function(index, pet){
                console.log(pet);
                    $("#petList").append(createCard(index, pet));
            });
        },
        error: function(error){
            console.log(error);
        }
    });
}

function createCard(index, pet){
    let card = document.createElement("div");
    card.className = "card";
    card.style = "width: 18rem;";
    let img = document.createElement("img");
    if(pet.primary_photo_cropped != null){
        img.src = pet.primary_photo_cropped.medium;
    } else {
        img.src = "Img/no-image-available-icon.jpg";
    }
    img.className = "card-img-top";
    img.alt = pet.name+" image";
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = pet.name;
    let cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerHTML = pet.gender;
    let cardButton = document.createElement("a");
    cardButton.className = "btn btn-primary";
    cardButton.innerHTML = "Go somewhere";
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardButton);
    card.appendChild(img);
    card.appendChild(cardBody);
    return card;

}