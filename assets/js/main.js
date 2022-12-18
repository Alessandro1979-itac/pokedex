const pokedex = document.getElementById('pokedex-lista');
const pokeAPI = new PokeAPI(pokedex);
pokeAPI.inicializar();

const buscar = [
  document.getElementById('buscar-barra'),
  document.getElementById('buscar-flutuante'),
];
const btnBuscar = document.getElementById('buscar-icone');
const inputBusca = document.createElement('input');
inputBusca.id = 'buscar-texto';
inputBusca.type = 'search';
inputBusca.placeholder = 'Buscar...';
inputBusca.disabled = true;
let buscaFlutuante;
let textoBusca = '';

let mediaQuerry = window.matchMedia('(max-width: 500px)');
alternarInputBusca(mediaQuerry.matches);

let elementoBusca = document.getElementById('buscar-texto');

btnBuscar.addEventListener('click', () => {
  ativarBuscaFlutuante(!buscaFlutuante);
});

mediaQuerry.addEventListener('change', () => {
  alternarInputBusca(mediaQuerry.matches);
});

let aguardar = false;
elementoBusca.addEventListener('input', () => {
  buscarPokemon(
      elementoBusca.value.toLowerCase(),
      pokeAPI.listaPokemons,
      pokedex,
  );
  textoBusca = elementoBusca.value;
});

function alternarInputBusca(valor) {
  ativarBuscaFlutuante(false);

  if (!valor) {
      buscar[0].appendChild(inputBusca);
  } else {
      buscar[1].appendChild(inputBusca);
  }
}

function ativarBuscaFlutuante(valor) {

  (mediaQuerry.matches)
      ? (textoBusca.length > 0)
          ? valor = true
          : valor
      : valor;

  if (valor && mediaQuerry.matches) {
      buscar[1].style.display = 'block';
  } else {
      buscar[1].style.display = 'none';
  }

  buscaFlutuante = valor;
}