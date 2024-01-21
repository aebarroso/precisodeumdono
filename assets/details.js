function load_details(pet) {
    // Use as informações do objeto
    var cloneTable = $(".dog_details").clone();
    var table = cloneTable.clone();
    $(".dog_details").empty();
    if (pet.primary_photo_cropped != null) {
        $(".img-pet", table).attr("src", pet.primary_photo_cropped.medium);
    } else {
        $(".img-pet", table).attr("src", "Img/no-image-available-icon.jpg");
    }
    $(".name-pet", table).text(pet.name);
    $(".age-pet", table).text(pet.age);
    $(".gender-pet", table).text(pet.gender);
    $(".breed-pet", table).text(pet.breeds.primary);
    $(".size-pet", table).text(pet.size);
    $(".desc-pet", table).text(pet.description);
    $(".dog_details").append(table);
}

