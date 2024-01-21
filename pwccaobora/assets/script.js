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
            $.each(data.animals, function (index, dog) {
                if (dog.primary_photo_cropped == null || dog.primary_photo_cropped == undefined || dog.primary_photo_cropped.length == 0) {
                    return; // Continue para o próximo item se a foto não estiver disponível
                }

                var card = cloneCard.clone();
                $(".img-dog", card).attr("src", dog.primary_photo_cropped.small)
                $(".dog-name", card).text(dog.name);
                $(".dog-age", card).text(dog.age);
                $(".dog-size", card).text(dog.size);
                $(".details", card).attr('href', 'detalhes.html?id=' + dog.id);

                // Adiciona aos favoritos
                var favButton = $(".add-fav", card);
                adicionarAosFavoritos(favButton, dog);

                //Colocar cada card a seguir uns aos outros com a função append
                $(".listar-caes").append(card);
            });
        });
    });

});

// Função para adicionar aos favoritos
function adicionarAosFavoritos(botao, cao) {
    botao.on("click", function () {
        var ehCaoFavorito = ehFavorito(cao.id);

        if (ehCaoFavorito) {
            alert("Cão removido dos favoritos");
            removerFavorito(cao);
        } else {
            alert("Cão adicionado aos favoritos");
            salvarFavoritos(cao);
        }
    });
}

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