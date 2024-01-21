$(document).ready(function(){
    var cloneCard = $(".card-caes").clone();
    var petFinderUrl = "Url"
    $("#btn-search").on("click", function () {
        //Vai buscar o valor do input
        var inputSearch = $("#inputSearch").val();
        $(".search-title").text("Listar cães da raça: "+inputSearch);
    
        //Limpar o HTML dentro do lista filmes
        $(".listar-caes").empty();
        $.ajax({
            url: "https://api.petfinder.com/v2/animals?type=dog&breed="+inputSearch,
            method: "GET",
            beforeSend: function (autho){
                autho.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJrUkJsSzFkQkJldlpQSFdobk1wMXFlUVFhV0VFWllFaEVrYW9sTG1wRU1WUzZadUsyWSIsImp0aSI6ImE2ZjA3YzU5YzBlMmUxMDllYmJjMTBjOTVmZDIwYTBlZjJmNjI2NDMzMjA3ZTc0M2I0ZGYxMmYwZDhjNzkzODdlYzAxNWJlM2MwZjQ0YzA2IiwiaWF0IjoxNzA1ODAwNjYxLCJuYmYiOjE3MDU4MDA2NjEsImV4cCI6MTcwNTgwNDI2MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.T46ZPrLB4AZkcmdk7uv3pIV-mC5mw8szzkFbHnV6W1bVl0V-r3J3NkLboN1MizQOZ5ubiBppWPdQ973Rs3ZBGDPe2JqLw_Lsr6wwuD5qFHHFU44Rb2PzFUpiKqtFgRCBFOcxAqJbS7YIdjHfK2H1PyLoGz7E2UTtWRrmVRJMI5DaeDo6Mdbstpw_I_8WllkiUFbhYSWZCz_S5B85-N1Cbt6G7nIcdCkmxETR8RjDYurVhlbrwDHeRf8tb4-p-GQin-SVarni2jTEaKy-7mxY5KWN3GW2S7xjAx9utM7sXEh1t4VURGm0lROrzlgb-0iHQZF98BPyGrGjXbmaeyLhrA');
            }
        }).done(function (data) {
            console.log(data.animals);
            $.each(data.animals, function(index, dog){
                var card = cloneCard.clone();
    
                //Preencher o card
                $(".img-dog", card).attr("src", dog.primary_photo_cropped.small);
                $(".dog-name", card).text(dog.name);
                $(".dog-age", card).text(dog.age);
                $(".dog-size", card).text(dog.size);
                var favButton = $(".add-fav", card);

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
});