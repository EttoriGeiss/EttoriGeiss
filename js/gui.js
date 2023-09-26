// padrão de cores.
let ui = 0, corUi, tag;

// obter o ui definido, se houver.
if (!localStorage.getItem('ui')) {
  localStorage.setItem('ui', ui);
} else {
  ui = localStorage.getItem("ui");
}

// remover redundâncias de código.
function sameCrap(arg) {
  tag = document.querySelector(arg);
  corUi = tag.style.backgroundColor;
  tag.style.backgroundColor = "#444";
}

// remover redundâncias de código.
function moreCrap(arg) {
  document.querySelector(arg).style.backgroundColor = corUi;
}

// armazenar as classes que seram modificadas em um array.
let array = [".headerA", ".page", "#menuLeft", "#menuRight", ".footerLinks"];

// corUies padrão.
function uiReset() {
  for (let i = 0; i < array.length; i++) {
    moreCrap(array[i]);
  };
  const menuTitles = document.querySelectorAll('.menuTitle');
  menuTitles.forEach(function (tag) {
    tag.style.color = corUi;
  });
}

//corUies modificadas.
function uiChange() {
  for (let i = 0; i < array.length; i++) {
    sameCrap(array[i]);
  };
  const menuTitles = document.querySelectorAll('.menuTitle');
  menuTitles.forEach(function (tag) {
    tag.style.color = "#fff";
  });
}

// ao carregar a página, modificar corUies
if (ui == 0) {
  uiReset();
} else {
  uiChange();
}

// evento do botão para mudar a corUi.
document.querySelector('#color').addEventListener('click', clique);
function clique() {
  if (ui == 0) {
    ui = 1;
    uiChange();
  } else {
    ui = 0;
    uiReset();
  }
  localStorage.setItem("ui", ui);
};

// esconder os menus laterais e aumentar a largura do corpo da página.
document.addEventListener('DOMContentLoaded', function () {
  const menuLeft = document.querySelector("#menuLeft");
  const menuRight = document.querySelector("#menuRight");
  const body = document.querySelector("body");
  let stateMenus, bodyWidth;

  if (!localStorage.getItem('casas')) {
    // Fazer alguma coisa se 'casas' não estiver no localStorage.
  }

  if (!localStorage.getItem('stateMenus')) {
    stateMenus = 0;
    localStorage.setItem('stateMenus', JSON.stringify(stateMenus));
  } else {
    stateMenus = JSON.parse(localStorage.getItem("stateMenus"));
  }

  document.querySelector('#hide').addEventListener('click', modificar);

  function showMenus() {
    menuLeft.style.display  = 'none';
    menuRight.style.display = 'none';
    bodyWidth               = body.style.width;
    body.style.width        = '100%';
  }

  function hideMenus() {
    menuLeft.style.display  = '';
    menuRight.style.display = '';
    body.style.width        = bodyWidth;
  }

  function modificar(event) {
    console.log("modificar event: " + event);
    if (stateMenus === 0) { // hide
      stateMenus = 1;
      hideMenus();
    } else { // show
      stateMenus = 0;
      showMenus();
    }
    localStorage.setItem("stateMenus", stateMenus);
  }

  // Chamar a função para exibir ou esconder os menus com base no estado atual.
  if (stateMenus == 1) {
    hideMenus();
  } else {
    showMenus();
  }
});