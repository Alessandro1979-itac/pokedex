function adicionarBotoes() {
  const btnDetalhar = document.querySelectorAll('.pokemon');

  btnDetalhar.forEach(botao => {
    botao.addEventListener('click', () => {
      const id = botao.id;
      const pokemon = pokeAPI.listaPokemons.find((pokemon) => {

        if (pokemon['indice'] == id)
          return pokemon;
      });

      apresentarDetalhes(pokemon, pokeAPI.atributosMax);
    });
  });
}

function apresentarDetalhes(pokemon, atributosMax) {
  let pokemonDetalhes = document.getElementById('pokemon-detalhes');

  let olPokemon = document.createElement('ol');
  olPokemon.className = 'lista-detalhes';
  olPokemon.style.backgroundColor = pokemon['corTipo'][0];

  let liVoltar = document.createElement('li');
  liVoltar.className = 'voltar-detalhes';

  let liCabecalho = document.createElement('li');
  liCabecalho.className = 'cabecalho-detalhes';

  let liImagem = document.createElement('li');
  liImagem.className = 'imagem-detalhes';

  let liDescricao = document.createElement('li');
  liDescricao.className = 'descricao-detalhes';

  let imgVoltar = document.createElement('img');
  imgVoltar.src = './assets/imagens/seta_voltar.svg';
  imgVoltar.alt = 'Imagem Voltar';
  imgVoltar.id = 'imagem-voltar-detalhes';
  imgVoltar.addEventListener('click', () => {
    document.getElementById('pokemon-lista').style.display = 'flex';
    document.getElementById('pokemon-detalhes').style.display = 'none';
    olPokemon.remove();
  });

  liVoltar.appendChild(imgVoltar);

  let divNomeTipos = document.createElement('div');
  divNomeTipos.className = 'nome-tipos-detalhes';

  let spanNome = document.createElement('span');
  spanNome.className = 'nome-detalhes';
  spanNome.textContent = pokemon['nome'];

  divNomeTipos.appendChild(spanNome);

  let divTipos = document.createElement('div');
  divTipos.className = 'tipos-detalhes';

  pokemon['tipos'].forEach((tipo, indice) => {
    let spanTipo = document.createElement('span');
    spanTipo.className = 'slot-tipo-detalhes';
    spanTipo.textContent = tipo;
    spanTipo.style.backgroundColor = pokemon['corTipo'][indice];

    (indice === 0)
      ? spanTipo.style.backgroundColor = '#FFFFFF'
      : spanTipo.style.backgroundColor = pokemon['corTipo'][indice];

    (indice === 0)
      ? spanTipo.style.color = pokemon['corTipo'][0]
      : spanTipo.style.color = '#FFFFFF';

    divTipos.appendChild(spanTipo);

  });

  divNomeTipos.appendChild(divTipos);

  let spanIndice = document.createElement('span');
  spanIndice.className = 'indice-detalhes';
  spanIndice.textContent = '#' + pokemon['indice'];

  liCabecalho.appendChild(divNomeTipos);
  liCabecalho.appendChild(spanIndice);

  let imgPokemon = document.createElement('img');
  imgPokemon.src = pokemon['imagem'];
  imgPokemon.alt = 'Imagem Pokemon';

  liImagem.appendChild(imgPokemon);

  let olAtributos = document.createElement('ol');
  olAtributos.className = 'atributos-detalhes';

  let liAltura = document.createElement('li');
  liAltura.textContent = 'Altura';

  olAtributos.appendChild(liAltura);

  let liAlturaValor = document.createElement('li');
  liAlturaValor.textContent = pokemon['altura'].toFixed(2).replace('.', ',') + ' m';

  olAtributos.appendChild(liAlturaValor);

  let liPeso = document.createElement('li');
  liPeso.textContent = 'Peso';

  olAtributos.appendChild(liPeso);

  let liPesoValor = document.createElement('li');
  liPesoValor.className = 'separar';
  liPesoValor.textContent = pokemon['peso'].toFixed(2).replace('.', ',') + ' kg';

  olAtributos.appendChild(liPesoValor)

  let ordemAtributos = [
    'vida',
    'ataque',
    'defesa',
    'ataqueEspecial',
    'defesaEspecial',
    'velocidade',
    'total',
  ];

  ordemAtributos.forEach((atributo, indice) => {
    let titulo = [
      'Vida',
      'Ataque',
      'Defesa',
      'Atq. Esp.',
      'Def. Esp.',
      'Velocidade',
      'Total',
    ];

    let liTitulo = document.createElement('li');
    liTitulo.textContent = titulo[indice];

    olAtributos.appendChild(liTitulo);

    let liValor = document.createElement('li');

    let divPontos = document.createElement('div');
    divPontos.className = 'pontos-detalhes';

    let spanValor = document.createElement('span');
    spanValor.textContent = pokemon[atributo];

    divPontos.appendChild(spanValor);

    let divBarra = document.createElement('div');
    divBarra.className = 'barra-detalhes';

    let porcentagem = (100 * pokemon[atributo]) / atributosMax[atributo];

    let divBarraValor = document.createElement('div');
    divBarraValor.className = 'valor-barra-detalhes';
    divBarraValor.style.width = porcentagem + '%';

    divBarra.appendChild(divBarraValor);
    divPontos.appendChild(divBarra);
    liValor.appendChild(divPontos);
    olAtributos.appendChild(liValor);
  });

  liDescricao.appendChild(olAtributos);

  olPokemon.appendChild(liVoltar);
  olPokemon.appendChild(liCabecalho);
  olPokemon.appendChild(liImagem);
  olPokemon.appendChild(liDescricao);

  pokemonDetalhes.appendChild(olPokemon);

  document.getElementById('pokemon-detalhes').style.display = 'flex';
  document.getElementById('pokemon-lista').style.display = 'none';
}