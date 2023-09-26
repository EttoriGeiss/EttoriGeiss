// selecionar os elementos de radio buttons.
const casaButton        = document.getElementById('casa');
const apartamentoButton = document.getElementById('apartamento');
const legend            = document.querySelector('#formDados legend');

// selecionar o botão de criar o recado & criar um evento "on click" para ele.
document.querySelector('#definirImovel').addEventListener('click', formAdicionar);

function formAdicionar(event) {
  event.preventDefault();
  if (casaButton.checked || apartamentoButton.checked) {
    document.querySelector('#formDados').style.display = 'block';
    document.querySelector('#formImovel').style.display = 'none';
    // voltarForm();

    if (casaButton.checked) {
      tipoImovel = 'casa';
      console.log('Casa foi escolhida. tipoImovel = ' + tipoImovel);
      // habilitar inputs específicos.
      document.querySelector('#labelCasa').style.display = '';
      document.querySelector('#terreno').style.display = '';
      document.querySelector('#construida').style.display = '';
      document.querySelector('#submeterDados').style.display = '';
      // desabilitar inputs específicos.
      document.querySelector('#labelApartamento').style.display = 'none';
      document.querySelector('#metragem').style.display = 'none';
      document.querySelector('#condominio').style.display = 'none';
      document.querySelector('#atualizarDados').style.display = 'none';
    } else if (apartamentoButton.checked) {
      tipoImovel = 'apartamento';
      console.log('Apartamento foi escolhido. tipoImovel = ' + tipoImovel);
      // habilitar inputs específicos.
      document.querySelector('#labelApartamento').style.display = '';
      document.querySelector('#metragem').style.display = '';
      document.querySelector('#condominio').style.display = '';
      document.querySelector('#submeterDados').style.display = '';
      // desabilitar inputs específicos.
      document.querySelector('#labelCasa').style.display = 'none';
      document.querySelector('#terreno').style.display = 'none';
      document.querySelector('#construida').style.display = 'none';
      document.querySelector('#atualizarDados').style.display = 'none';
    }
    legend.innerHTML = "Adicionar " + tipoImovel;
    // desmarcar os radio buttons.
    casaButton.checked = false;
    apartamentoButton.checked = false; 
  } else {
    console.warn('Warn, não foi escolhido o tipo do imóvel.');
    addStatus('#933', 'inherit', 'Não foi escolhido o tipo do imóvel :('); 
  }
}

// seletor do botão de atualizar.
document.querySelector('#atualizarDados').addEventListener('click', formAtualizar);

// funcão para atualizar um imóvel.
function formAtualizar(event) {
  event.preventDefault();

  let numero    = document.querySelector('#numero').value;
  let bairro    = document.querySelector('#bairro').value;
  let cep       = document.querySelector('#cep').value;
  let titulo    = document.querySelector('#titulo').value;
  let quartos   = document.querySelector('#quartos').value;
  let banheiros = document.querySelector('#banheiros').value;
  let garagens  = document.querySelector('#garagens').value;
  let preco     = document.querySelector('#preco').value;
  let img       = document.querySelector('#img').value;
  
  if(tipoImovel === 'casa') {
    let terreno    = Number(document.querySelector('#terreno').value);
    let construida = Number(document.querySelector('#construida').value);

    if (!isNaN(numero) && bairro.trim() != "" && cep.trim() != "" && titulo.trim() != "" && !isNaN(quartos) && 
     !isNaN(banheiros) && !isNaN(garagens) && !isNaN(preco) && img.trim() != "" && !isNaN(terreno) && !isNaN(construida)) {
      let casa = new Casa(numero, bairro, cep, titulo, quartos, banheiros, garagens, preco, img, terreno, construida);
      casas.splice(index, 1, casa);
      localStorage.setItem('casas', JSON.stringify(casas));
      addStatus('#393', 'inherit', 'O imóvel foi atualizado :)');
      setTimeout(function () {
        defaultForm(event);
      }, 2000);
    } else {
      console.warn('Há campos em branco ou que não são números.');
      addStatus('#933', 'inherit', 'Há campos em branco ou que não são números :(');     
    }
  } else if (tipoImovel === 'apartamento') {
    let metragem   = Number(document.querySelector('#metragem').value);
    let condominio = document.querySelector('#condominio').value;

    if (!isNaN(numero) && bairro.trim() != "" && cep.trim() != "" && titulo.trim() != "" && !isNaN(quartos) && 
     !isNaN(banheiros) && !isNaN(garagens) && !isNaN(preco) && img.trim() != "" && !isNaN(metragem) && condominio.trim() != "") {
      let apartamento = new Apartamento(numero, bairro, cep, titulo, quartos, banheiros, garagens, preco, img, metragem, condominio);
      apartamentos.splice(index, 1, apartamento);
      localStorage.setItem('apartamentos', JSON.stringify(apartamentos));
      addStatus('#393', 'inherit', 'O imóvel foi atualizado :)');
      setTimeout(function () {
        defaultForm(event);
      }, 2000);
     } else {
      console.warn('Há campos em branco ou que não são números.');
      addStatus('#933', 'inherit', 'Há campos em branco ou que não são números :('); 
    }
  }
}

// função para definir o conteúdo dos inputs para os do imóvel que será editado.
function formPopular(arrayObj) {
  document.querySelector('#numero').value    = arrayObj.numero;
  document.querySelector('#bairro').value    = arrayObj.bairro;
  document.querySelector('#cep').value       = arrayObj.cep;
  document.querySelector('#titulo').value    = arrayObj.titulo;
  document.querySelector('#quartos').value   = arrayObj.quartos;
  document.querySelector('#banheiros').value = arrayObj.banheiros;
  document.querySelector('#garagens').value  = arrayObj.garagens;
  document.querySelector('#preco').value     = arrayObj.preco;
  document.querySelector('#img').value       = arrayObj.img;

  if(tipoImovel == 'casa') {
    document.querySelector('#terreno').value    = arrayObj.terreno;   
    document.querySelector('#construida').value = arrayObj.construida;
  } else {
    document.querySelector('#metragem').value   = arrayObj.metragem;
    document.querySelector('#condominio').value = arrayObj.condominio;
  }
}