const parrots = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];

let numCartas = 0; 
let baralho = [];
let primeiroCard = null;
let segundoCard = null;
let qtdJogadas = 0;

obterNumCartas();
criarCartas();
embaralharCartas();
inserirCartasNaTela();


function obterNumCartas(){
  numCartas = parseInt(prompt("Com quantas cartas você vai jogar? Insira um número par entre 4 a 14"));

  while(numCartas < 4 || numCartas > 14 || numCartas % 2 !== 0 ){
    numCartas = prompt("Com quantas cartas você vai jogar? Insira um número de 4 a 14");
  }
  
}

function criarCartas() {
  
  for (let i = 0; i < numCartas / 2; i++) {

    const carta = construirCarta(i);

    baralho.push(carta);
    baralho.push(carta);

  }

  return baralho;
}

function construirCarta(index) {

  const parrot = parrots[index];

  const cartaparrot = `
  <div class="card" onclick="selecionarCarta(this)">
    <div class="facecard frente">
      <img src="images/front.png" alt="cover" />
    </div>
    <div class="facecard verso">
      <img src="images/${parrot}.gif" alt="${parrot}" />
    </div>
  </div>
  `;

  return cartaparrot;
  
}

function embaralharCartas() {
  return baralho.sort(comparador);
}
 
function comparador() {
    return Math.random() - 0.5;
}

function inserirCartasNaTela() {

    const container = document.querySelector(".container");

    for (let i = 0; i < baralho.length; i++) {
      container.innerHTML += baralho[i];
    }
}

 
 function selecionarCarta(elemento) {
      
    elemento.classList.add("selecionado");

    if(primeiroCard === null){
      primeiroCard = elemento;
    }
    else{
      segundoCard = elemento;
      qtdJogadas = qtdJogadas + 1;
      verificaIgualdadeCards();
    }
  
}

function verificaIgualdadeCards(){
  if(primeiroCard.innerHTML === segundoCard.innerHTML){
    primeiroCard.classList.add("finalizado");
    segundoCard.classList.add("finalizado");
    primeiroCard = null;
    segundoCard = null;
    setTimeout(verificaFimDoJogo, 500);
  }
  else{
    setTimeout(desvirarCards, 1000);
  }
}


function desvirarCards(){
  primeiroCard.classList.remove("selecionado");
  segundoCard.classList.remove("selecionado");
  primeiroCard = null;
  segundoCard = null;
}


function verificaFimDoJogo(){
  let reiniciar = "n";
  const jogadas = document.querySelectorAll(".finalizado"); 
  if(jogadas.length === numCartas){
    alert(`Fim do Jogo! Você ganhou em ${qtdJogadas} jogadas.`);
    reiniciar = prompt("Deseja reiniciar o jogo? Digite s ou n");
    if(reiniciar === "s" || reiniciar === "S"){
      reiniciarJogo();
    }
  }
}
  
function reiniciarJogo(){
  window.location.reload();
}
