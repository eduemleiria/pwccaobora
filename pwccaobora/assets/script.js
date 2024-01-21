$(document).ready(function () {
    var cloneCard = $(".card-caes").clone();
    var petFinderUrl = "Url";

    $("#btn-search").on("click", function () {
        var inputSearch = $("#inputSearch").val();
        $(".search-title").text("Listar cães da raça: " + inputSearch);
        $(".listar-caes").empty();

        $.ajax({
            url: "https://api.petfinder.com/v2/animals?type=dog&breed=" + inputSearch,
            method: "GET",
            beforeSend: function (autho) {
                autho.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJrUkJsSzFkQkJldlpQSFdobk1wMXFlUVFhV0VFWllFaEVrYW9sTG1wRU1WUzZadUsyWSIsImp0aSI6IjY0ZTkwY2IwYjZlNDViMWU5YzhiMWEyZjNjNTQ1MmU1Y2JmZWNhODY4NjRkNWY0NzkwMWE0ZWUxZDMzMmY1Njk0N2IyYTAxYjNhZGFkY2M3IiwiaWF0IjoxNzA1ODYyNzY4LCJuYmYiOjE3MDU4NjI3NjgsImV4cCI6MTcwNTg2NjM2OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.CaJf1RrYGs6bL-zURYAtXwczSeJAtC9Pzu00KMiEfZLMU9KI09U7_zjR_D_UjBunU5oMnjK7nuWzoqgYly_eo-0Rugc1KMYYcMHforXRgdj7Ve9q0csK62OHHD_5Re24C1Szb2bTSh8wDPA2TFTIzQfIixsNq2OTl-MhrQNBs2kO-nzJRDwDzzkuEKum4DUV9-xOvgBsdIY2R5Pe9NbBb30G4Ngfa-BJ1ZEeo8kd9BhfrT6nwOu-Wd73N-dlnJ7gKgijWZqKMHSVe40_XPP3T7CVHTER-cwHC2e9wWIPXNO7QNHopRMQUQRxGVeJGtvcslMYYT3la6gxc1utys5ymQ');
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

// Função para verificar se um cão com o ID fornecido está nos favoritos
function ehFavorito(idCao) {
    var favoritos = JSON.parse(localStorage.getItem("caesFavoritos")) || [];
    return favoritos.some(function (cao) {
        return cao.id === idCao;
    });
}

// Função para salvar um cão nos favoritos na Local Storage
function salvarFavoritos(cao) {
    var favoritos = JSON.parse(localStorage.getItem("caesFavoritos")) || [];
    favoritos.push(cao);
    localStorage.setItem("caesFavoritos", JSON.stringify(favoritos));
}

// Função para remover um cão dos favoritos na Local Storage
function removerFavorito(cao) {
    var favoritos = JSON.parse(localStorage.getItem("caesFavoritos")) || [];
    favoritos = favoritos.filter(function (caoFavorito) {
        return caoFavorito.id !== cao.id;
    });
    localStorage.setItem("caesFavoritos", JSON.stringify(favoritos));
}
