document.addEventListener('DOMContentLoaded', () => {
    const pokemonList = document.getElementById('pokemonList');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const popup = document.getElementById('myPopup');
    const closePopupButton = document.getElementById('closePopupButton');

    const maxRecords = 151;
    const limit = 10;
    let offset = 0;

    function convertPokemonToLi(pokemon) {
        return `
            <li class="pokemon" data-id="${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `;
    }

    function loadPokemonItems(offset, limit) {
        pokeApi.getPokemons(offset, limit).then((pokemons) => {
            const newHtml = pokemons.map(convertPokemonToLi).join('');
            pokemonList.innerHTML += newHtml;

            const pokemonElements = document.querySelectorAll('.pokemon');
            pokemonElements.forEach((pokemon) => {
                pokemon.addEventListener('click', () => {
                    const pokemonId = pokemon.dataset.id;
                    fillPopupWithPokemonDetails(pokemonId);
                    popup.style.display = 'block';
                });
            });
        });
    }

    function fillPopupWithPokemonDetails(pokemonId) {
        pokeApi.getPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((pokemonDetails) => {
            const popupPokemonImage = document.getElementById('popupPokemonImage');
            const popupPokemonName = document.getElementById('popupPokemonName');
            const popupPokemonNumber = document.getElementById('popupPokemonNumber');
            const popupPokemonWeight = document.getElementById('popupPokemonWeight');
            const popupPokemonHeight = document.getElementById('popupPokemonHeight');
            // Adicione variáveis para os outros elementos do popup conforme necessário

            popupPokemonImage.src = pokemonDetails.photo;
            popupPokemonName.textContent = pokemonDetails.name;
            popupPokemonNumber.textContent = `#${pokemonDetails.number}`;
            popupPokemonWeight.textContent = `#${pokemonDetails.weight}`;
            popupPokemonHeight.textContent = `#${pokemonDetails.height}`;
            // Preencha outras informações do popup com base nos detalhes do Pokémon
        });
    }

    loadPokemonItems(offset, limit);

    loadMoreButton.addEventListener('click', () => {
        offset += limit;
        const qtdRecordsWithNextPage = offset + limit;

        if (qtdRecordsWithNextPage >= maxRecords) {
            const newLimit = maxRecords - offset;
            loadPokemonItems(offset, newLimit);
            loadMoreButton.parentElement.removeChild(loadMoreButton);
        } else {
            loadPokemonItems(offset, limit);
        }
    });

    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });
});
