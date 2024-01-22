var cloneCard;
var isFirst = true;

$(document).ready(function(){
    cloneCard = $(".card-caes").clone();
    var petFinderUrl = "Url"
    $("#btn-search").on("click", function () {
        //Vai buscar o valor do input
        var inputSearch = $("#inputSearch").val();
        $(".search-title").text("Listar cães da raça: "+inputSearch);
    
        //Limpar o HTML dentro do lista cães
        $(".listar-caes").empty();
        $.ajax({
            url: "https://api.petfinder.com/v2/animals?type=dog&breed="+inputSearch,
            method: "GET",
            beforeSend: function (autho){
                autho.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJrUkJsSzFkQkJldlpQSFdobk1wMXFlUVFhV0VFWllFaEVrYW9sTG1wRU1WUzZadUsyWSIsImp0aSI6ImIwMGY2MmVhMzU3ZjlkZWI0NWIzYTU0OThmZDJhNTQ4N2I0Y2I0ZmE1MjM5NTI0N2E3ZDRhNjNiZDhjZmQ5MDRlODQ4MjE2Yjc4MDk1OTI2IiwiaWF0IjoxNzA1ODg1NDY2LCJuYmYiOjE3MDU4ODU0NjYsImV4cCI6MTcwNTg4OTA2Niwic3ViIjoiIiwic2NvcGVzIjpbXX0.Y1Uo-Bxzx4-SCH9W1A3GKG33DLuBg4kp6XRSSiRc1BlKiFKclSE_uQCQxpJ_1Xh00i9c3QeKUq4bS-OluPUkUSN1zug6AOxs1c9vE2D4hekxldHFDwTWkJa3JtnXe48unNBGmu4sJdbvOCkGySIN9jFmN9t-32ZDJe6ub82KONEuFSNlHm-bakshd10G5EXUyB8Xmqtsffv8xe9IY5Bd9DcwxX3qSFSBFotBsc4RCL7yDlbAkCnM5gabiXl7ILrkNq3NGqCD4EEOgzqUPn6cFN6IPhdacskrRTMBh9eIMGy9o4SLop1uMejSEB35eJeyPcwVYXK-X24Vmr7syyH5fw');
            }

        }).done(function (data) {
            console.log(data.animals);
            $.each(data.animals, function(index, dog){
                //Preencher o card
                if (dog.primary_photo_cropped == null || dog.primary_photo_cropped == undefined || dog.primary_photo_cropped.length == 0){
                             
                }else{
                    var card = cloneCard.clone();
                    $(".img-dog", card).attr("src", dog.primary_photo_cropped.small);
                    $(".dog-name", card).text(dog.name);
                    $(".dog-age", card).text(dog.age);
                    $(".dog-size", card).text(dog.size);
                    $(".details", card).attr('href', 'detalhes.html?id='+dog.id);
                    $(".add-fav", card).data("dog",dog);
                    if(isFavorite(dog.id)){
                        updateFavButtonVisual($(".add-fav", card), dog);
                    }
                }

                //Colocar cada card a seguir uns aos outros com a função append
                $(".listar-caes").append(card);
            });
        });
    });

    $(document).ready(function() {
        $('#sucesso').on('click', function() {
            alert("Obrigado por efetuar a compra!"); 
        });
    });
});

function updateFavButtonVisual(favButton, dog){
    //Verifica se isto está na Local Storage
    var mFavorite = isFavorite(dog.id);
    if(mFavorite === true){
        favButton.text("Remover Favoritos");
        favButton.removeClass("btn-warning");
        favButton.addClass("btn-danger");
    }else{
        favButton.text("Favoritar");
        favButton.addClass("btn-warning");
        favButton.removeClass("btn-danger");
    }
}

function isFavorite(id){
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    var isFav = false;
    favorites.forEach((element) => {
        if (element.id == id)
            isFav = true;
    })
    if (isFav)
        return true;
    else return false;
}

var id;

//Função para ir buscar os detalhes

function getDetails(){
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        id = urlParams.get('id');
        console.log(id);
        $.ajax({
            url: "https://api.petfinder.com/v2/animals/"+id,
            method: "GET",
            beforeSend: function (autho){
                autho.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJrUkJsSzFkQkJldlpQSFdobk1wMXFlUVFhV0VFWllFaEVrYW9sTG1wRU1WUzZadUsyWSIsImp0aSI6ImIwMGY2MmVhMzU3ZjlkZWI0NWIzYTU0OThmZDJhNTQ4N2I0Y2I0ZmE1MjM5NTI0N2E3ZDRhNjNiZDhjZmQ5MDRlODQ4MjE2Yjc4MDk1OTI2IiwiaWF0IjoxNzA1ODg1NDY2LCJuYmYiOjE3MDU4ODU0NjYsImV4cCI6MTcwNTg4OTA2Niwic3ViIjoiIiwic2NvcGVzIjpbXX0.Y1Uo-Bxzx4-SCH9W1A3GKG33DLuBg4kp6XRSSiRc1BlKiFKclSE_uQCQxpJ_1Xh00i9c3QeKUq4bS-OluPUkUSN1zug6AOxs1c9vE2D4hekxldHFDwTWkJa3JtnXe48unNBGmu4sJdbvOCkGySIN9jFmN9t-32ZDJe6ub82KONEuFSNlHm-bakshd10G5EXUyB8Xmqtsffv8xe9IY5Bd9DcwxX3qSFSBFotBsc4RCL7yDlbAkCnM5gabiXl7ILrkNq3NGqCD4EEOgzqUPn6cFN6IPhdacskrRTMBh9eIMGy9o4SLop1uMejSEB35eJeyPcwVYXK-X24Vmr7syyH5fw');
            }
        }).done(function (data){
            console.log(data);
            $(".dog-name").text(data.animal.name);
            $(".dog-age").text(data.animal.age);
            $(".dog-gender").text(data.animal.gender);
            $(".dog-breed").text(data.animal.breeds.primary);
            $(".dog-desc").text(data.animal.description);
            $(".img-dog").attr("src", data.animal.primary_photo_cropped.medium);
            $(".dog-tag").text(data.animal.tags);
            $(".add-fav").data("dog",data);
            if(isFavorite(data.id)){
                updateFavButtonVisual($(".add-fav", card), data);
            }
        });
}

//Função para remover o objeto dos favoritos

function removeFavoritos(dog){
    var favoritesDogs = JSON.parse(localStorage.getItem("favorites")) || [];
    var isFav = [];
    favoritesDogs.forEach((element) => {
        if (element.id != dog.id){
            isFav.push(element);
        }    
    })
   localStorage.setItem("favorites", JSON.stringify(isFav));
   alert("Removido dos favoritos!");
}

//Função para adicionar o objeto aos favoritos

function saveFavoritos(dog){
    console.log("Adicionado");
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(dog);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Adicionado aos favoritos!");
}

function getFavorites(){
    console.log(cloneCard);
    if(cloneCard == undefined || cloneCard == null){
        console.log("a");
        cloneCard = $(".card-caes").clone();  
    }
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    $(".listar-caes").empty();
    $.each(favorites, function(index, dog){             
        //Preencher o card
        if (dog.primary_photo_cropped == null || dog.primary_photo_cropped == undefined || dog.primary_photo_cropped.length == 0){
                     
        }else{
            var card = cloneCard.clone();
            $(".img-dog", card).attr("src", dog.primary_photo_cropped.small);
            $(".dog-name", card).text(dog.name);
            $(".dog-age", card).text(dog.age);
            $(".dog-size", card).text(dog.size);
            $(".details", card).attr('href', 'detalhes.html?id='+dog.id);
            $(".add-fav", card).data("dog",dog);
            if(isFavorite(dog.id)){
                updateFavButtonVisual($(".add-fav", card), dog);
            }
        }

        //Colocar cada card a seguir uns aos outros com a função append
        $(".listar-caes").append(card);
    });
}

//Função que chama as funções dos favoritos

function toggleFavorite(elem){
    if (isFavorite($(elem).data("dog").id)) {
        removeFavoritos($(elem).data("dog"));
    } else {
        saveFavoritos($(elem).data("dog"));
    }
    updateFavButtonVisual($(elem), $(elem).data("dog"));
}