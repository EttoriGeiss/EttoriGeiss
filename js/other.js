// mudar a cor de fundo dos botões conforme sua função.
const buttons = document.querySelectorAll("button");
let corBotao;

// criar eventos para cada ".menuTitle" e também passar o índice de cada um presente na lista "menu" para a função "display".
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('mouseover', addCor.bind(null, i));
  buttons[i].addEventListener('mouseout',  subCor.bind(null, i));
}

// mudar a cor.
function addCor(aux) {
  corBotao = buttons[aux].style.backgroundColor; // armazenar a cor original.
  if(buttons[aux].innerHTML === "Adicionar"){
    buttons[aux].style.backgroundColor = '#393';
  } else if(buttons[aux].innerHTML === "Modificar") {
    buttons[aux].style.backgroundColor = '#339';
  } else if(buttons[aux].innerHTML === "Remover") {
    buttons[aux].style.backgroundColor = '#933';
  } else {
    buttons[aux].style.backgroundColor = '#234';
  }
}

// voltar a cor original.
function subCor(aux) {
  buttons[aux].style.backgroundColor = corBotao;
}

// class ".required"
const required = document.querySelectorAll(".required");

// adicionar um event listerner para todos os requireds.
required.forEach(function (element) {
  element.addEventListener('mouseover', addTitle);
  element.addEventListener('mouseout',  subTitle);
});

// add title
function addTitle() {
  const alvo = event.target;
  alvo.title = "Campo requerido obrigatoriamente!";
}

// remove title
function subTitle() {
  const alvo = event.target;
  alvo.title = "";
}

// hide/show both side bars.
const menu = document.querySelectorAll(".menuTitle");

// criar eventos para cada ".menuTitle" e também passar o índice de cada um presente na lista "menu" para a função "display".
for (let i = 0; i < menu.length; i++) {
  menu[i].addEventListener('click', display.bind(null, i)); // enviar o índice dos items da lista "menu" para a função display.
}

let state = 0;

// maximizar ou minimizar os menus das laterais.
function display(aux) {
  let alvo = event.target.nextElementSibling;
  let content = menu[aux].innerHTML.substr(3, menu[aux].innerHTML.length); // extrair a parte sem [-] ou [+] 

  if (state == 0) {
    state = 1;
    alvo.style.display = "none";
    menu[aux].innerHTML = "[+]" + content;
    menu[aux].title = "Maximizar o menu."
  } else {
    state = 0;
    alvo.style.display = "";
    menu[aux].innerHTML = "[-]" + content;
    menu[aux].title = "Minimizar o menu."
  }
}