async function populateDropdown2() {
    
    function arrayRemove(arr, value) { 
        return arr.filter(function (geeks) { 
            return geeks != value; 
        }); 
    } 

    const dropdown1 = document.getElementById("dropdown1");
    const dropdown2 = document.getElementById("dropdown2");
    const selected = dropdown1.value;

    dropdown2.innerHTML = '<option value="">Select Type 2</option>';
    elements = ["normal", "fire", "water", "grass", "flying", "fighting", "poison", "electric", "ground", "rock", "psychic", "ice", "bug", "ghost", "steel", "dragon", "dark", "fairy"];

    if (selected !== "") {
        elements = arrayRemove(elements, selected);
        for (i = 0; i < elements.length; i++) {
            let option = document.createElement("option");
            option.value = elements[i];
            const word = elements[i];
            const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
            option.text = capitalized;
            dropdown2.appendChild(option);
        }

    }
}

async function getPokemon() {
    const type1 = document.getElementById("dropdown1").value;
    const type2 = document.getElementById("dropdown2").value;
    const amountPokemon = document.getElementById("totalpokemon");
    const pokemonContainer = document.getElementById("pokemonContainer");

    pokemonContainer.innerHTML = "";

    if (type1 == "") {
        console.error("No Type Selected");
    }
    else {
        let elements = [type1];
        let urls = [];
        if (type2 !== "")
            elements.push(type2);
        for (let i = 0; i < elements.length; i++) {
            let tempContainer1 = [];
            const response = await fetch('https://pokeapi.co/api/v2/type/' + elements[i] + '/');
            const pokemon = await response.json();
            
            for (let j = 0; j < pokemon['pokemon'].length; j++) {
                if (parseInt(pokemon['pokemon'][j]['pokemon']['url'].slice(34).replace('/', '')) > 1017)
                    break;
                tempContainer1.push(pokemon['pokemon'][j]['pokemon']['url']);
            }

            urls.push(tempContainer1);
        }

        if (urls.length == 2)
            urls = urls[0].filter(value => urls[1].includes(value));
        else
            urls = urls[0];

        console.log(urls.length);
        console.log(urls);
        amountPokemon.textContent = "Pokemon Found: " + urls.length;
        for (let i = 0; i < urls.length; i++) {
            const response = await fetch(urls[i]);
            const pokemon = await response.json();
            let divInner = document.createElement('div');
            let divImg = document.createElement('div');
            let divName = document.createElement('div');
            let small = document.createElement('small');

            divInner.className = "cards-inner"

            // let trPokemon = document.createElement("tr");
            // let cell0 = trPokemon.insertCell(0);
            // let cell1 = trPokemon.insertCell(1);
            // let cell2 = trPokemon.insertCell(2);
            let pokedexNumber = urls[i].slice(34).replace('/', '');

            const word = pokemon['name'];
            const capitalizedName = word.charAt(0).toUpperCase() + word.slice(1);

            divImg.innerHTML = "<img src='" + pokemon['sprites']['front_default'] + "'/>";
            divName.innerHTML = "<h4>" + capitalizedName + "</h4>";
            small.innerHTML = "National Id: " + pokedexNumber;
            divInner.appendChild(divImg);
            divInner.appendChild(divName);
            divInner.appendChild(small);

            // cell0.innerHTML = pokedexNumber;
            // cell1.innerHTML = capitalizedName;
            // cell2.innerHTML = "<img src='" + pokemon['sprites']['front_default'] + "'/>";

            pokemonContainer.appendChild(divInner);
        }
    }
}

// <div class="cards-inner">
//                 <div>
//                   <img class="fab fa-facebook"></img>
//                 </div>
      
//                 <div>
//                   <h4>Pokemon Name</h4>
//                 </div>
//               </div>