class Imovel {
  constructor(numero, bairro, cep, titulo, quartos, banheiros, garagens, preco, img) {
    this.numero    = numero;
    this.bairro    = bairro;
    this.cep       = cep;
    this.titulo    = titulo;
    this.quartos   = quartos;
    this.banheiros = banheiros;
    this.garagens  = garagens;
    this.preco     = preco;
    this.img       = img;
  }
}

class Casa extends Imovel {
    constructor(numero, bairro, cep, titulo, quartos, banheiros, garagens, preco, img, terreno, construida) {
      super(numero, bairro, cep, titulo, quartos, banheiros, garagens, preco, img);
      this.terreno    = terreno;
      this.construida = construida;
    }
}

class Apartamento extends Imovel {
    constructor(numero, bairro, cep, titulo, quartos, banheiros, garagens, preco, img, metragem, condominio) {
      super(numero, bairro, cep, titulo, quartos, banheiros, garagens, preco, img);
      this.metragem   = metragem;
      this.condominio = condominio;
    }
}

// armazenamentos de dados.
let casas        = [];
let apartamentos = [];
let tipoImovel   = '', index, botaoModificar, botaoRemover;
let stat         = document.querySelector("#status");

// popular as páginas de casas.
if (!localStorage.getItem('casas')) {
  // console.log('NÃO há casas no local storage...');
  casas.push(new Casa(121, 'A', '123456-7', '01', 3, 1, 1, 221500.5,  'img/imoveis/01.jpg', 200, 125));
  casas.push(new Casa(222, 'B', '123456-7', '31', 3, 1, 1, 320520.25, 'img/imoveis/02.jpg', 320, 200));
  casas.push(new Casa(333, 'C', '123456-7', '41', 3, 1, 1, 569000.5,  'img/imoveis/03.jpg', 250, 175));
  localStorage.setItem('casas', JSON.stringify(casas));
  // console.table(JSON.parse(localStorage.getItem("casas")));
} else { // if there is some data into localstorage.
  casas = JSON.parse(localStorage.getItem("casas"));
}

// popular as páginas de apartamentos.
if (!localStorage.getItem('apartamentos')) {
 // console.log('NÃO há apartamentos local storage...');
 apartamentos.push(new Apartamento(52, 'F', '999888-5', '02', 4, 2, 1, 309225.25, 'img/imoveis/04.jpg', 300, 'A'));
 apartamentos.push(new Apartamento(64, 'A', '999888-5', '10', 4, 2, 1, 309225.25, 'img/imoveis/05.jpg', 400, 'B'));
 apartamentos.push(new Apartamento(99, 'D', '999888-5', '22', 5, 2, 1, 450000.25, 'img/imoveis/06.jpg', 500, 'C'));
 localStorage.setItem('apartamentos', JSON.stringify(apartamentos));
 // console.table(JSON.parse(localStorage.getItem("apartamentos")));
} else { // if there is some data into localstorage.
  apartamentos = JSON.parse(localStorage.getItem("apartamentos"));
}

// // criar os cards padrão.
function defaultCards(type, arrayObj) {
  for (let i = 0; i < arrayObj.length; i++) {
    createElements();
    setContent(type, i, arrayObj[i]);
    appendTags();
    buttonCreate('Modificar', modificarImovel, botaoModificar);
    buttonCreate('Remover',   removerImovel,   botaoRemover);
    cardReady(type);
 }
}

// chamar a função para criar os cards iniciais;
defaultCards(1, casas);
defaultCards(2, apartamentos);

// criar os elementos.
function createElements() {
  cartao = document.createElement('div');
  titulo = document.createElement('h2');
  info   = document.createElement('p');
  img    = document.createElement('img');
}

function setContent(type, i, arrayObj) {
  info.innerHTML = "<span class='spanCard'>Número:</span> "       + arrayObj.numero    +    "<br>" + 
                   "<span class='spanCard'>Bairro:</span> "       + arrayObj.bairro    +    "<br>" +
                   "<span class='spanCard'>CEP:</span> "          + arrayObj.cep       +    "<br>" +
                   "<span class='spanCard'>Título:</span> "       + arrayObj.titulo    +    "<br>" +
                   "<span class='spanCard'>Nº Quartos:</span> "   + arrayObj.quartos   +    "<br>" +
                   "<span class='spanCard'>Nº Banheiros:</span> " + arrayObj.banheiros +    "<br>" +
                   "<span class='spanCard'>Nº Garagens:</span> "  + arrayObj.garagens  +    "<br>" +
                   "<span class='spanCard'>Preço:</span> "        + arrayObj.preco     + " R$<br>";
  if (type == 1) {
    titulo.textContent = "Casa " + Number(i+1);
    info.innerHTML = info.innerHTML +
                     "<span class='spanCard'>Área do terreno:</span> " + arrayObj.terreno    + " m²<br>" +
                     "<span class='spanCard'>Área construida:</span> " + arrayObj.construida + " m²";
  } else if (type == 2){
    titulo.textContent = "Apartamento " + Number(i+1);
    info.innerHTML = info.innerHTML  +
                     "<span class='spanCard'>Metragem:</span> "    + arrayObj.metragem + "<br>" +
                     "<span class='spanCard'>Condominio:</span> "  + arrayObj.condominio;
  }

  img.src = arrayObj.img;
}

// criar botão de modificar e deletar.
function buttonCreate(arg1, arg2, arg3) {
  arg3 = document.createElement('button');
  arg3.textContent = arg1;
  arg3.addEventListener('click', arg2);
  cartao.appendChild(arg3);
}

// juntar as tags a div.
function appendTags() {
  cartao.appendChild(titulo);
  cartao.appendChild(info);
  cartao.appendChild(img);
}

// mostrar o status da operação.
function addStatus(arg1, arg2, arg3) {
  stat.style.color = arg1;
  stat.style.display = arg2;
  stat.innerHTML = arg3;
  setTimeout(hideStatus, 2000);
}

// função para esconder a mensagem de status.
function hideStatus() {
  stat.style.display = 'none';
}

// finalizar a criação do cartão.
function cardReady(arg) {
  // adicionar uma classe ao cartão.
  cartao.classList.add('cartao');

  // adicionar o card ao local apropriado.
  if(arg == 1){ // casa
    document.querySelector("#containerCasas").appendChild(cartao);
  } else if (arg == 2){ // apartamento
    document.querySelector("#containerApartamentos").appendChild(cartao);
  } else {
    console.warn('Aviso: tipoImovel não definido corretamente.');
  }
  resetOperation();
}

// resetar para o padrão de exibição dos forms.
function resetOperation() {
  tipoImovel = '';
  document.querySelector('#formDados').style.display = 'none';
  document.querySelector('#formImovel').style.display = 'block';
}

// selecionar o botão de criar o recado & criar um evento "on click" para ele.
document.querySelector('#submeterDados').addEventListener('click', adicionarImovel);

function adicionarImovel(event) {

  // prevenir o comportamento padrão do form, de atualizar a página após a submissão dos dados.
  event.preventDefault();

  // selecionar o form da página.
  let form = document.querySelector('#formDados');

  // criar os elementos da página.
  createElements();

  // dados do form da classe Imóvel.
  let numero    = document.querySelector('#numero').value;
  let bairro    = document.querySelector('#bairro').value;
  let cep       = document.querySelector('#cep').value;
  let titulo    = document.querySelector('#titulo').value;
  let quartos   = document.querySelector('#quartos').value;
  let banheiros = document.querySelector('#banheiros').value;
  let garagens  = document.querySelector('#garagens').value;
  let preco     = document.querySelector('#preco').value;
  let img       = document.querySelector('#img').value;
  // let img       = document.querySelector('#img').files[0].name;

  // selecionar os dados específicos para cada imóvel.
  if (tipoImovel === 'casa'){
    let terreno    = Number(document.querySelector('#terreno').value);
    let construida = Number(document.querySelector('#construida').value);

    if (!isNaN(numero) && bairro.trim() != "" && cep.trim() != "" && !isNaN(titulo) && !isNaN(quartos) && 
     !isNaN(banheiros) && !isNaN(garagens) && !isNaN(preco) && img.trim() != "" && !isNaN(terreno) && !isNaN(construida)) {
      casas.push(new Casa(numero, bairro, cep, titulo, quartos, banheiros, garagens, preco, img, terreno, construida));
      
      // store into local storage the array "animals".
      localStorage.setItem('casas', JSON.stringify(casas));
      console.table(casas);
      
      // definir o conteúdo dos cards.
      setContent(1, casas.length-1, casas[casas.length-1]); // enviar o array que foi recém criado.
      appendTags();
      
      // criar botões
      buttonCreate('Modificar', modificarImovel, botaoModificar);
      buttonCreate('Remover',   removerImovel,   botaoRemover);

      cardReady(1);
      addStatus('#393', 'inherit', 'Casa adicionada :)');
      form.reset();
    } else {
      console.warn('Há campos em branco ou que não são números.');
      addStatus('#933', 'inherit', 'Há campos em branco ou que não são números :('); 
    }

  } else if (tipoImovel === 'apartamento') {
    let metragem   = Number(document.querySelector('#metragem').value);
    let condominio = document.querySelector('#condominio').value;

    if (!isNaN(numero) && bairro.trim() != "" && cep.trim() != "" && !isNaN(titulo) && !isNaN(quartos) && 
     !isNaN(banheiros) && !isNaN(garagens) && !isNaN(preco) && img.trim() != "" && !isNaN(metragem) && condominio.trim() != "") {
      apartamentos.push(new Apartamento(numero, bairro, cep, titulo, quartos, banheiros, garagens, preco, img, metragem, condominio));
      
      // store into local storage the array "animals".
      localStorage.setItem('apartamentos', JSON.stringify(apartamentos));
      console.table(apartamentos);
      
      // definir o conteúdo dos cards.
      setContent(2, apartamentos.length-1, apartamentos[apartamentos.length-1]); // enviar o array que foi recém criado.
      appendTags();  

      // criar botões
      buttonCreate('Modificar', modificarImovel, botaoModificar);
      buttonCreate('Remover',   removerImovel,   botaoRemover);

      cardReady(2);
      addStatus('#393', 'inherit', 'Apartamento adicionado :)');
      form.reset();
     } else {
      console.warn('Há campos em branco ou que não são números.');
      addStatus('#933', 'inherit', 'Há campos em branco ou que não são números :('); 
     }
  } else {
    console.error("Erro, imóvel não definido.");
    addStatus('#933', 'inherit', 'Imóvel não adicionado :(');
  }
}

// função para modificar o recado.
function modificarImovel(event) {

  const tipo = (event.target.parentNode).firstChild;
  document.querySelector('#formDados').style.display = 'block';
  document.querySelector('#formImovel').style.display = 'none';

  if(tipo.innerHTML.substr(0, 4) === "Casa") {
    tipoImovel = 'casa';
    index = Number(tipo.innerHTML.substr(5, tipo.innerHTML.length)-1);
    // habilitar inputs específicos.
    document.querySelector('#labelCasa').style.display = '';
    document.querySelector('#terreno').style.display = '';
    document.querySelector('#construida').style.display = '';
    document.querySelector('#atualizarDados').style.display = '';
    // desabilitar inputs específicos.
    document.querySelector('#labelApartamento').style.display = 'none';
    document.querySelector('#metragem').style.display = 'none';
    document.querySelector('#condominio').style.display = 'none';
    document.querySelector('#submeterDados').style.display = 'none';
    formPopular(casas[index]);
  } else {
    tipoImovel = 'apartamento';
    index = Number(tipo.innerHTML.substr(12, tipo.innerHTML.length)-1);
    // habilitar inputs específicos.
    document.querySelector('#labelApartamento').style.display = '';
    document.querySelector('#metragem').style.display = '';
    document.querySelector('#condominio').style.display = '';
    document.querySelector('#atualizarDados').style.display = '';
    // desabilitar inputs específicos.
    document.querySelector('#labelCasa').style.display = 'none';
    document.querySelector('#terreno').style.display = 'none';
    document.querySelector('#construida').style.display = 'none';
    document.querySelector('#submeterDados').style.display = 'none';
    formPopular(apartamentos[index]);
  }
  // modificar o legend do fieldset.
  legend.innerHTML = "Modificar " + tipoImovel + " " + Number(index + 1);
  // voltar ao topo da página para editar o imóvel.
  scroll(0,0);
}

// função para remover o imóvel.
function removerImovel(event) {
  // remover cartão da página.
  const cartao = event.target.parentElement;
  // selecionar o parágrafo com o tipo e índice.
  const tipo = (event.target.parentNode).firstChild;
  cartao.remove();
  if(tipo.innerHTML.substr(0, 4) === "Casa") {
    index = Number(tipo.innerHTML.substr(5, tipo.innerHTML.length)-1);
    casas.splice(index, 1);
    localStorage.setItem('casas', JSON.stringify(casas));
  } else {
    index = Number(tipo.innerHTML.substr(12, tipo.innerHTML.length)-1);
    apartamentos.splice(index, 1);
    localStorage.setItem('apartamentos', JSON.stringify(apartamentos));
  }
  defaultForm(event);
}