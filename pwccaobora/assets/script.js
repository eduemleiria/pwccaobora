$(document).ready(function(){
    var cloneCard = $(".card-caes").clone();
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
                autho.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJrUkJsSzFkQkJldlpQSFdobk1wMXFlUVFhV0VFWllFaEVrYW9sTG1wRU1WUzZadUsyWSIsImp0aSI6ImEwMjIzOTdkMDIzY2U2MDM0M2FmN2Y4MTk3NTYwNTRkYWJhMTA0ZTM0YmFhYzU2MWIyYzJmMmQ3NzdiZDYwZTA0MzdhOWE5ODQxYmQ2YmZiIiwiaWF0IjoxNzA1ODY2MjcwLCJuYmYiOjE3MDU4NjYyNzAsImV4cCI6MTcwNTg2OTg3MCwic3ViIjoiIiwic2NvcGVzIjpbXX0.rQ1ZA1Fzh4_j0rxZHUKabaNQqY8HwW1PP92xrD-iAbgNYwidCseo793g3S9Ge_SRwRVIGj8nYd5_dWWfAeOSnRQ_BHXZ4IoGKhmDAd0Rw3p10VbbO8NtZ8TwokpFWFEgatNQ5CkCJradqNhCJYz21FyUDbyTXjmChkvOAMxjt6s1Y-2VrhIchWR1y5xpPBPk9uiMdehqtfhLPjxDWWzX8A7ezYnXwfeeENzjWwuCyYid7NGLVAUJCjiAFxzVt0zNY2icv4YOMbTE757OJz_w9Ima5ipkU186NkcdTbXXO7L3DRP6Ws0lk-r1d6rDqYYbNDfSUNXOR_CeZwT-vVPf3w');
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
                    var favButton = $(".add-fav", card);   
                }

                //Chama a função para mudar o visual
                //updateFavButtonVisual(favButton, movie);
                //Chama função para atualizar o estado do botão
                //updateFavorite(favButton, movie);

                //Colocar cada card a seguir uns aos outros com a função append
                $(".listar-caes").append(card);
            });
        });
    });
    
    /*function updateFavButtonVisual(favButton, movie){
        //Verifica se isto está na Local Storage
        var mFavorite = isFavorite(movie.imdbID);
        if(mFavorite === true){
            favButton.text("Remover Favoritos");
            favButton.removeClass("btn-primary");
            favButton.addClass("btn-danger");
        }
    }

    function isFavorite(imdbID){
        /*vai a local storage à procura de uma variavel chamada 
        "favorites" e vê se tem algum valor

        var favorites = JSON.parse(localStorage.getItem("favorites")) || []; 

        //Vai pesquisar no objeto filter se ele existe algum filme com este id
        favorites = favorites.some(function(movie){
            /* Estou a verificar se o imdbID que estou a passar na função existe 
            no localStorage com o mesmo ID se existir o return devolve true se não existir o return devolve false
            return movie.imdbID !== imdbID;
        });
    }

    function updateFavorite(button, movie){
        //Verificar se já foi ou não adicionado aos favoritos
        if(!button.hasClass("adicionado")){
            //Verificar se o evento click já foi adicionado
            button.addClass("adicionado");

            //Adicionar a ação click
            button.on("click", function(){
                //Alternar o estado se é remover ou adicionar 
                var Favoritos = isFavorite(movie.imdbID);
                if(Favoritos === true){
                    //Aqui fica a função para remover
                    alert("removido");
                }else{
                    //Aqui fica a função para adicionar
                    alert("adicionado");
                    saveFavoritos(movie);
                }
            })
        }
    }
    
    function saveFavoritos(movie){
        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }*/

    $(document).ready(function() {
        $('#sucesso').on('click', function() {
            alert("Obrigado por efetuar a compra!"); 
        });
    });
});

var id;

function getDetails(){
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        id = urlParams.get('id');
        console.log(id);
        $.ajax({
            url: "https://api.petfinder.com/v2/animals/"+id,
            method: "GET",
            beforeSend: function (autho){
                autho.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJrUkJsSzFkQkJldlpQSFdobk1wMXFlUVFhV0VFWllFaEVrYW9sTG1wRU1WUzZadUsyWSIsImp0aSI6ImEwMjIzOTdkMDIzY2U2MDM0M2FmN2Y4MTk3NTYwNTRkYWJhMTA0ZTM0YmFhYzU2MWIyYzJmMmQ3NzdiZDYwZTA0MzdhOWE5ODQxYmQ2YmZiIiwiaWF0IjoxNzA1ODY2MjcwLCJuYmYiOjE3MDU4NjYyNzAsImV4cCI6MTcwNTg2OTg3MCwic3ViIjoiIiwic2NvcGVzIjpbXX0.rQ1ZA1Fzh4_j0rxZHUKabaNQqY8HwW1PP92xrD-iAbgNYwidCseo793g3S9Ge_SRwRVIGj8nYd5_dWWfAeOSnRQ_BHXZ4IoGKhmDAd0Rw3p10VbbO8NtZ8TwokpFWFEgatNQ5CkCJradqNhCJYz21FyUDbyTXjmChkvOAMxjt6s1Y-2VrhIchWR1y5xpPBPk9uiMdehqtfhLPjxDWWzX8A7ezYnXwfeeENzjWwuCyYid7NGLVAUJCjiAFxzVt0zNY2icv4YOMbTE757OJz_w9Ima5ipkU186NkcdTbXXO7L3DRP6Ws0lk-r1d6rDqYYbNDfSUNXOR_CeZwT-vVPf3w');
            }
        }).done(function (data){
            console.log(data);
            $(".dog-name").text(data.animal.name);
            $(".dog-age").text(data.animal.age);
            $(".dog-gender").text(data.animal.gender);
            $(".dog-breed").text(data.animal.breed);
            $(".dog-desc").text(data.animal.description);
            $(".img-dog").attr("src", data.animal.primary_photo_cropped.medium);
            $(".dog-tag").text(data.animal.tags);
        });
}