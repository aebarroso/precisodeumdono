function cloneCard(index, pet) {
    var card = clonedCard.clone();
    if (pet.primary_photo_cropped != null) {
        $(".img-pet", card).attr("src", pet.primary_photo_cropped.medium);
    } else {
        $(".img-pet", card).attr("src", "Img/no-image-available-icon.jpg");
    }
    $(".name-pet", card).text(pet.name);
    $(".gender-pet", card).text(pet.gender);
    $(".age-pet", card).text(pet.age);
    $(".list-pets").append(card);
    

    var favBtn = $(".add_favoritos", card);
    var detBtn = $(".btn-details", card);
    updateVisual(favBtn, pet);
    updateFavorites(favBtn, pet);
    updateSearched(detBtn, pet);
}

function cloneCardCart(index, product) {
    var card = clonedCard.clone();
    $(".img-product", card).attr("src", pet.primary_photo_cropped.medium);
    $(".name-product", card).text(pet.name);
    $(".desc-product", card).text(pet.gender);
    $(".list-cart").append(card);
    
    var cartBtn = $(".btn-cart", card);
    
    updateCartVisual(cartBtn, product);
    updateCarted(cartBtn, product);
}


function carouselConstructorHeading(pet, count) {
    if (count > 0) {
        $(".carousel-indicators").append('<button type="button" class="indicator-item" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="' + count + '" aria-current="true" aria-label="Slide ' + count + 1 + '"></button>');
        $(".carousel-inner").append('<div class="carousel-item dog-show-' + count + '" data-bs-interval="2000">');
    } else {
        $(".carousel-inner").prepend('<div class="carousel-item active dog-show-' + count + '" data-bs-interval="10000">');
        $(".carousel-indicators").append('<button type="button" class="indicator-item active" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="' + count + '" aria-current="true" aria-label="Slide ' + count + '"></button>');
    }
}
function carouselConstructor(pet, count) {

    $(".dog-show-" + count).append('<img class="img-thumbnail img-index w-100 img-pet btn-details" src="' + pet.primary_photo_cropped.medium + '" alt="Image of ' + pet.name + '">');
    var carouselCaption = $('<div class="carousel-caption d-md-block backg btn-details" >')
    carouselCaption.append('<h5>' + pet.name + '</h5>');
    carouselCaption.append('<p>Clique para detalhes</p>');
    $(".dog-show-" + count).append(carouselCaption)
    var detBtn = $(".btn-details", $(".dog-show-" + count));
    updateSearched(detBtn, pet);
    $(".carousel-inner").append("</div></div>");
}

$(document).ready(function () {
    var carouselContainer = $("#carouselExampleDark");
    var prevButton = $("<button type='button' class='carousel-control-prev' aria-label='Previous'><span aria-hidden='true' class='carousel-control-prev-icon'></span></button>");
    var nextButton = $("<button type='button' class='carousel-control-next' aria-label='Next'><span aria-hidden='true' class='carousel-control-next-icon'></span></button>");
   
    carouselContainer.append(prevButton);
    carouselContainer.append(nextButton);
    
    prevButton.click(function () {
        var carouselItems = $(".carousel-item");
        var activeItem = carouselItems.filter(".active");
        var prevItemIndex = activeItem.index() - 1;
        var carouselIndicators = $(".indicator-item");
        var activeIndicator = carouselIndicators.filter(".active");
        var prevIndicatorIndex = activeIndicator.index() - 1;

        if (prevItemIndex < carouselItems.length) {
            var prevItem = carouselItems.eq(prevItemIndex);
            activeItem.removeClass("active");
            prevItem.addClass("active");
            var prevIndicator = carouselIndicators.eq(prevIndicatorIndex);
            activeIndicator.removeClass("active");
            prevIndicator.addClass("active");

        }
    });

    nextButton.click(function () {
        var carouselItems = $(".carousel-item");
        var activeItem = carouselItems.filter(".active");
        var nextItemIndex = activeItem.index() + 1;
        var carouselIndicators = $(".indicator-item");
        var activeIndicator = carouselIndicators.filter(".active");
        var nextIndicatorIndex = activeIndicator.index() + 1;

        if (nextItemIndex < carouselItems.length) {
            var nextItem = carouselItems.eq(nextItemIndex);
            activeItem.removeClass("active");
            nextItem.addClass("active");
            var nextIndicator = carouselIndicators.eq(nextIndicatorIndex);
            activeIndicator.removeClass("active");
            nextIndicator.addClass("active");

        }

    });
    carouselContainer.carousel();
});