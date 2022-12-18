function buscarPokemon(filtro, listaPokemons, pokedex) {
  let carregando = document.getElementById('carregando');
  let ocultos = 0;

  listaPokemons.forEach(
    (item) => {
      let li = document.getElementById(item['indice']);

      if (pokedex.contains(li)) {
        let vTipos = item['tipos'].some((tipo) => {
            return tipo.includes(filtro);
          }
        );
        
        if (filtro.length === 0)
          li.style.display = 'flex';
        else if (item['nome'].toString().includes(filtro))
          li.style.display = 'flex';
        else if (vTipos)
          li.style.display = 'flex';
        else if (item['indice'].toString().includes(filtro) && !isNaN(filtro))
          li.style.display = 'flex';
        else {
            li.style.display = 'none';
            ocultos++;
        }
      }
    }
  );

  if (ocultos === listaPokemons.length) {
    carregando.style.display = 'flex';
    carregando.children[1].innerHTML = 'Nenhum Pokemon Encontrado!';
  } else {
    carregando.style.display = 'none';
    carregando.children[1].innerHTML = 'Carregando...';
  }
}