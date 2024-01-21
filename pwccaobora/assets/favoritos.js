document.addEventListener("DOMContentLoaded", function () {
    // Recuperar favoritos da Local Storage
    var favoritosContainer = $("#favoritosContainer");
    if (favoritosContainer.length === 0) {
        console.error("Elemento com o ID 'favoritosContainer' não encontrado.");
    } else {
        // Se houver favoritos, criar elementos HTML para cada um e adicionar à página
        favoritos.forEach(function (cao) {
            var card = criarCard(cao);
            document.getElementById("favoritosContainer").append(card);
        });
    }

    // Função auxiliar para criar um elemento de card para um cão
    function criarCard(cao) {
        var cardCol = document.createElement("div");
        cardCol.classList.add("col-md-4", "my-3", "py-2");

        var card = document.createElement("div");
        card.classList.add("card");

        var img = document.createElement("img");
        img.src = cao.imagem; // Substitua "imagem" pelo nome correto da propriedade da imagem no objeto do cão
        img.classList.add("card-img-top", "object-fit-cover", "img-dog");
        img.alt = "Imagem do Cão";

        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        var titulo = document.createElement("h5");
        titulo.classList.add("card-title", "dog-name");
        titulo.textContent = cao.nome; // Substitua "nome" pelo nome correto da propriedade do nome no objeto do cão

        var texto = document.createElement("p");
        texto.classList.add("card-text", "dog-age");
        texto.textContent = cao.idade; // Substitua "idade" pelo nome correto da propriedade da idade no objeto do cão

        var detalhesLink = document.createElement("a");
        detalhesLink.href = "detalhes.html?id=" + cao.id; // Substitua "detalhes.html" pela página de detalhes apropriada
        detalhesLink.classList.add("btn", "btn-primary");
        detalhesLink.textContent = "Detalhes";

        // Adicione os elementos ao card
        cardBody.append(titulo);
        cardBody.append(texto);
        cardBody.append(detalhesLink);

        card.append(img);
        card.append(cardBody);

        cardCol.append(card);

        return cardCol;
    }
});
