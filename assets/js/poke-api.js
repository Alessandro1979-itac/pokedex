class PokeAPI {
  URL;
  pokedex;
  listaPokemons;
  atributosMax;

  constructor(pokedex) {
    this.URL = 'https://pokeapi.co/api/v2/pokemon/';
    this.pokedex = pokedex;
    this.listaPokemons = [];
    this.atributosMax = {};
  }

  inicializar(inicial, limite) {
    (limite === undefined || limite < 1)
      ? limite = 999999
      : limite;

    (inicial === undefined || inicial < 0 || inicial > limite)
      ? inicial = 0
      : inicial;

    fetch(this.URL.concat('?offset=' + inicial + '&limit=' + limite + ''))
      .then((response) => response.json())
      .then((responseJson) => responseJson['results'])
      .then((resoltado) => resoltado.map(this.listarRequisicoes))
      .then((listaRequisicao) => Promise.all(listaRequisicao))
      .then((resultados) => resultados.map(this.instanciarPokemon))
      .then((listaObjetos) => {
        this.listaPokemons = listaObjetos;
        this.atributosMax = this.atribuirAtributosMax(listaObjetos);
        this.apresentrarListaPokemon(listaObjetos);
      })
      .catch((erro) => console.log('(Estagio 1) Erro: ' + erro))
      .finally(() => {
        let itensPokedex = document.querySelectorAll('.pokemon');
        let carregado = itensPokedex.length === this.listaPokemons.length;

        if (carregado) {
            document.getElementById('carregando').style.display = 'none';
            document.getElementById('buscar-texto').disabled = false;
            adicionarBotoes();
        }
      });
  }

  async listarRequisicoes(item) {
    try {
      const response = await fetch(item['url']);
      return await response.json();
    } catch (erro) {
      return console.log('(Estagio 2) Erro: ' + erro);
    }
  }

  instanciarPokemon(pokemon) {
    let indice, nome, imagem, tipos, corTipo, altura, peso, total;
    let vida, ataque, defesa, ataqueEspecial, defesaEspecial, velocidade;

    // Indice
    (pokemon['id'] === undefined || pokemon['id'] === null)
      ? indice = 'Null'
      : indice = pokemon['id'];

    // Nome
    (pokemon['name'] === undefined || pokemon['name'] === null)
      ? nome = 'Null'
      : nome = pokemon['name'];

    // Imagem
    let opcoesImagem = [
      pokemon['sprites']['other']['official-artwork']['front_default'],
      pokemon['sprites']['other']['home']['front_default'],
      pokemon['sprites']['other']['dream_world']['front_default'],
      pokemon['sprites']['front_default'],
    ];

    opcoesImagem.forEach((localImagem, indice) => {

      if (imagem === undefined) {
          if (localImagem !== undefined && localImagem !== null)
            imagem = localImagem;
          else if (indice === (opcoesImagem.length - 1))
            imagem = './assets/img/pokeball.png';
      }
    });

    // Tipos
    if (pokemon['types'] !== undefined || pokemon['types'] === null) {
      tipos = [];
      pokemon['types'].forEach(tipo => {
        let valorTipo;

        (tipo['type']['name'] === undefined || tipo['type']['name'] === null)
          ? valorTipo = 'Null'
          : valorTipo = tipo['type']['name'];

        tipos.push(valorTipo);
    });
    } else 
        tipos = ['Null'];

    // Cor Tipo
    corTipo = [];
    tipos.map(
      (tipo) => {
        switch (tipo) {
          case 'Null': corTipo.push('#999EA0'); break;
          case 'normal': corTipo.push('#999EA0'); break;
          case 'fighting': corTipo.push('#D8425B'); break;
          case 'flying': corTipo.push('#9EB8E8'); break;
          case 'fire': corTipo.push('#FFA450'); break;
          case 'water': corTipo.push('#5FA9DD'); break;
          case 'ground': corTipo.push('#D78656'); break;
          case 'grass': corTipo.push('#5EBC5F'); break;
          case 'electric': corTipo.push('#F3CD22'); break;
          case 'ice': corTipo.push('#7DD3C8'); break;
          case 'poison': corTipo.push('#B263CD'); break;
          case 'psychic': corTipo.push('#FC8B88'); break;
          case 'bug': corTipo.push('#96C22E'); break;
          case 'rock': corTipo.push('#CCBE8E'); break;
          case 'ghost': corTipo.push('#5B6CB5'); break;
          case 'dragon': corTipo.push('#086FC0'); break;
          case 'dark': corTipo.push('#636274'); break;
          case 'steel': corTipo.push('#5498A4'); break;
          case 'fairy': corTipo.push('#ED93E4'); break;
        }
      }
    );

    // Altura
    (pokemon['height'] === undefined || pokemon['height'] === null)
      ? altura = 0
      : altura = (pokemon['height'] / 10);

    // Peso
    (pokemon['weight'] === undefined || pokemon['weight'] === null)
      ? peso = 0
      : peso = pokemon['weight'];

    // Estatisticas
    if (pokemon['stats'] !== undefined || pokemon['stats'] === null) {
      pokemon['stats'].forEach(estatistica => {
        let nomeAtributo = estatistica['stat']['name'];
        let valorBase;
        let valorAdd;

        (estatistica['base_stat'] === undefined || pokemon['base_stat'] === null)
          ? valorBase = 0
          : valorBase = estatistica['base_stat'];

        (estatistica['effort'] === undefined || pokemon['effort'] === null)
          ? valorAdd = 0
          : valorAdd = estatistica['effort'];

        switch (nomeAtributo) {
          case 'hp':
            vida = valorBase + valorAdd;
            break;
          case 'attack':
            ataque = valorBase + valorAdd;
            break;
          case 'defense':
            defesa = valorBase + valorAdd;
            break;
          case 'special-attack':
              ataqueEspecial = valorBase + valorAdd;
              break;
          case 'special-defense':
            defesaEspecial = valorBase + valorAdd;
            break;
          case 'speed':
            velocidade = valorBase + valorAdd;
            break;
        }
      });
    }

    (vida === undefined)
      ? vida = 0
      : vida;

    (ataque === undefined)
      ? ataque = 0
      : ataque;

    (defesa === undefined)
      ? defesa = 0
      : defesa;

    (ataqueEspecial === undefined)
      ? ataqueEspecial = 0
      : ataqueEspecial;

    (defesaEspecial === undefined)
      ? defesaEspecial = 0
      : defesaEspecial;

    (velocidade === undefined)
      ? velocidade = 0
      : velocidade;

    // Somando o Total de pontos
    total = (vida + ataque + defesa + ataqueEspecial + defesaEspecial + velocidade);

    // Atribuir Objeto
    let objeto = {
      indice: indice,
      nome: nome,
      imagem: imagem,
      tipos: tipos,
      corTipo: corTipo,
      altura: altura,
      peso: peso,
      total: total,
      vida: vida,
      ataque: ataque,
      defesa: defesa,
      ataqueEspecial: ataqueEspecial,
      defesaEspecial: defesaEspecial,
      velocidade: velocidade,
    };

    return objeto;
  }

  apresentrarListaPokemon(listaPokemons) {
    listaPokemons.forEach(pokemon => {
      let liPokemon = document.createElement('li');
      liPokemon.id = pokemon['indice'];
      liPokemon.className = 'pokemon';
      liPokemon.style.backgroundColor = pokemon['corTipo'][0];

      let spanIndice = document.createElement('span');
      spanIndice.className = 'indice';
      spanIndice.textContent = '#' + pokemon['indice'];

      let spanNome = document.createElement('span');
      spanNome.className = 'nome';
      spanNome.textContent = pokemon['nome'];

      let divDetalhes = document.createElement('div');
      divDetalhes.className = 'detalhes';

      let olTipos = document.createElement('ol');
      olTipos.className = 'tipos';

      pokemon['tipos'].forEach((tipo, indice) => {
        let liTipo = document.createElement('li');
        liTipo.className = 'slot-tipos';

        (indice === 0)
          ? liTipo.style.backgroundColor = '#FFFFFF'
          : liTipo.style.backgroundColor = pokemon['corTipo'][indice];

        let spanTipo = document.createElement('span');
        spanTipo.textContent = tipo;

        (indice === 0)
          ? spanTipo.style.color = pokemon['corTipo'][0]
          : spanTipo.style.color = '#FFFFFF';

        liTipo.appendChild(spanTipo);
        olTipos.appendChild(liTipo);

      });

      let imagem = document.createElement('img');
      imagem.src = pokemon['imagem'];
      imagem.alt = 'Imagem do Pokemon';

      divDetalhes.appendChild(olTipos);
      divDetalhes.appendChild(imagem);

      liPokemon.appendChild(spanIndice);
      liPokemon.appendChild(spanNome);
      liPokemon.appendChild(divDetalhes);

      this.pokedex.appendChild(liPokemon);
    });
  }

  atribuirAtributosMax(listaPokemons) {
    let objeto = {
      total: 0,
      vida: 0,
      ataque: 0,
      defesa: 0,
      ataqueEspecial: 0,
      defesaEspecial: 0,
      velocidade: 0,
    };

    listaPokemons.forEach(pokemon => {
      (pokemon['total'] > objeto['total'])
        ? objeto['total'] = pokemon['total']
        : objeto['total'];

      (pokemon['vida'] > objeto['vida'])
        ? objeto['vida'] = pokemon['vida']
        : objeto['vida'];

      (pokemon['ataque'] > objeto['ataque'])
        ? objeto['ataque'] = pokemon['ataque']
        : objeto['ataque'];

      (pokemon['defesa'] > objeto['defesa'])
        ? objeto['defesa'] = pokemon['defesa']
        : objeto['defesa'];

      (pokemon['ataqueEspecial'] > objeto['ataqueEspecial'])
        ? objeto['ataqueEspecial'] = pokemon['ataqueEspecial']
        : objeto['ataqueEspecial'];

      (pokemon['defesaEspecial'] > objeto['defesaEspecial'])
        ? objeto['defesaEspecial'] = pokemon['defesaEspecial']
        : objeto['defesaEspecial'];

      (pokemon['velocidade'] > objeto['velocidade'])
        ? objeto['velocidade'] = pokemon['velocidade']
        : objeto['velocidade'];

    });

    return objeto;
  }
}