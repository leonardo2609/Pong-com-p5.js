// Variáveis bolinha
let xBolinha = 300
let yBolinha = 200
let diametro = 13
let raio = diametro / 2

// Velocidade da bolinha
let velocidadeXBolinha = 6
let velocidadeYBolinha = 6

//Variáveis raquete
let xRaquete = 5
let yRaquete = 200
let raqueteComprimento = 10
let raqueteAltura = 90
let colide = false

//Variáveis raquete do oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 200
let velocidadeRaqueteOponente

//Variáveis do placar
let meusPontos = 0
let pontosOponente = 0

//Variáveis dos sons
let ponto
let trilha
let raquetada

function preload(){
  ponto = loadSound("ponto.mp3")
  trilha = loadSound("trilha.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  bolinha()
  mostrarRaquete(xRaquete, yRaquete)
  movimentoRaquete()
  colideRaquete(xRaquete, yRaquete)
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente)
  colideRaquete(xRaqueteOponente, yRaqueteOponente)
  movimentaRaqueteOponente()
  placar()
  pontos()
}

function bolinha(){
  circle(xBolinha, yBolinha, diametro)
  xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha
  
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1
  }
  
  if (yBolinha + raio> height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1
  }
}

function mostrarRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura) 
}

function movimentoRaquete(){
   if(keyIsDown(UP_ARROW)){
    yRaquete += -10
  }
  
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10
  }
}

function colideRaquete(x, y){
  colide = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio)
  
  if (colide) {
    velocidadeXBolinha *= -1
    raquetada.play()
  }
}

function movimentaRaqueteOponente(){
  velocidadeRaqueteOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30
  yRaqueteOponente += velocidadeRaqueteOponente
}

function placar(){
  stroke(255)
  fill(255, 140, 0)
  rect(150, 10, 40, 20)
  rect(450, 10, 40, 20)
  textSize(16)
  fill(255)
  text(meusPontos ,165, 26)
  text(pontosOponente, 465, 26)
}

function pontos(){
  if (xBolinha > 590){
    meusPontos += 1
    ponto.play()
  }
  if (xBolinha < 10){
    pontosOponente += 1
    ponto.play()
  }
}