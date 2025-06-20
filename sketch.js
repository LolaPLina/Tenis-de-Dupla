var raquete1, raquete2, parede, edges;
var img_bola1, img_bola2, img_raquete1, img_raquete2;
var vidas = 0;

var pontuacao1 = 0 
var pontuacao2 = 0

var estadoJogo = "inicio";

var tempo = 0;

function preload(){
    img_bola2 = loadImage("Importados/Imagens/ball_tennis1.png");
    img_bola1 = loadImage("Importados/Imagens/ball_tennis2.png");
    img_raquete1 = loadImage("Importados/Imagens/racket_metal.png");
    img_raquete2 = loadImage("Importados/Imagens/racket_wood.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    raquete1 = createSprite(width/3.3,height/1.15,200,20);
    raquete1.addImage(img_raquete1);
    raquete1.scale = 6
    raquete2 = createSprite(width/1.5,height/1.15,200,20);
    raquete2.addImage(img_raquete2);
    raquete2.scale = 6

    parede = createSprite(width/2,650,1,200);
    parede.visible = false;
    edges = createEdgeSprites();

    grupo1 = new Group();
    grupo2 = new Group();
    grupoB = new Group();
}

function draw() {
    background("black");

    if(estadoJogo === "inicio"){
        telaInicio();
        drawSprites();
        /*if(keyDown("space")){
            estadoJogo = "jogar"
        }*/
    }
    else if(estadoJogo === "jogar"){
        telaJogo();
        drawSprites();

        if(frameCount % 60 === 0){
            tempo++;
        }

        if(pontuacao1 >= 5){
            estadoJogo = "fim"
            firstname = "direita"
            pontuacaoFinal = "50 pontos"
            lastname = "ele ganhou!"
        }
        if(pontuacao2 >= 5){
            estadoJogo = "fim"
            firstname = "esquerda"
            pontuacaoFinal = "50 pontos"
            lastname = "ele ganhou!"
        }
        if(pontuacao1 <= -5){
            estadoJogo = "fim"
            firstname = "direita"
            pontuacaoFinal = "-50 pontos"
            lastname = "o jogador da esquerda ganhou!"
        }
        if(pontuacao2 <= -5){
            estadoJogo = "fim"
            firstname = "esquerda"
            pontuacaoFinal = "-50 pontos"
            lastname = "o jogador da direita ganhou!"
        }
    }
    else if(estadoJogo === "fim"){
        telaFim();
        /*if(keyDown("space")){           
            estadoJogo = "inicio"
        }*/
        keyPressed()
    }

    textFont("Arial")
    fill("white")
    textSize(20)
    text("Pontuação: "+pontuacao2,width/3.3,height*0.05)
    textFont("Arial")
    fill("white")
    textSize(20)
    text("Pontuação: "+pontuacao1,width/1.5,height*0.05)

    if(keyDown("left")){
        raquete2.x=raquete2.x-7;
    }
    if(keyDown("right")){
        raquete2.x=raquete2.x+7;
    }
    if(keyDown("a")){
        raquete1.x=raquete1.x-7;
    }
    if(keyDown("d")){
        raquete1.x=raquete1.x+7;
    }

    raquete1.bounceOff(parede);
    raquete2.bounce(parede);
    raquete1.bounce(edges);
    raquete2.bounce(edges);
}

function telaInicio(){
    textFont("Arial")
    fill("white")
    textAlign(CENTER, CENTER);
    textSize(15)
    text("Seja bem vindo ao Tênis de Dupla! Jogador da direita, use as teclas A e D para se locomover e pegar as bolinhas com bordas brancas. Jogador da esquerda, use as setas para coletar as bolinhas verdes.", width/2,325)
}

function telaJogo(){
    bola1();
    bola2();
    addBonus();

    grupo1.forEach(bolinha1 =>{
        if(raquete1.overlap(bolinha1)){
            bolinha1.remove();
            pontuacao1++;
            console.log(vidas);
        }
    })

    grupo2.forEach(bolinha2 =>{
        if(raquete2.overlap(bolinha2)){
            bolinha2.remove();
            pontuacao2++;
            console.log(vidas);
        }
    })

    grupo2.forEach(bolinha2 =>{
        if(raquete1.overlap(bolinha2)){
            bolinha2.remove();
            pontuacao1--;
        }
    })

    grupo1.forEach(bolinha1 =>{
        if(raquete2.overlap(bolinha1)){
            bolinha1.remove();
            pontuacao2--;
        }
    })

    grupoB.forEach(bonus =>{
        if(raquete2.overlap(bonus)){
            bonus.remove();
            pontuacao1+=5;
        }
        if(raquete1.overlap(bonus)){
            bonus.remove();
            pontuacao2+=5;
        }
    })
}

function telaFim(){
    textFont("Arial")
    fill("white")
    textSize(15)
    textAlign(CENTER,CENTER);
    text("Muito bem! Como a pontuação do jogador da "+firstname+" foi igual à "+pontuacaoFinal+", "+lastname+" Aperte na tecla ESPAÇO para reniciar e jogar novamente;)", width/2,height*0.5)

    raquete1.x = 1000;
    raquete2.x = 500;
    grupo1.destroyEach()
    grupo2.destroyEach()
}

function bola1(){
    if(frameCount%30 === 0){
        var bolinha1 = createSprite(random(0,width),0);
        var velocidade = min(6+tempo *0.2, 20);
        bolinha1.addImage(img_bola1);
        bolinha1.velocityY = 2//random(velocidade, velocidade+2);
        bolinha1.scale = 3;
        bolinha1.lifetime = 300;
        grupo1.add(bolinha1);
    }
}

function bola2(){
    if(frameCount%30 === 0){
        var bolinha2 = createSprite(random(0,1450),0);
        var velocidade = min(6+tempo *0.2, 20);
        bolinha2.addImage(img_bola2);
        bolinha2.velocityY = 2//random(velocidade, velocidade+2);
        bolinha2.scale = 3;
        bolinha2.lifetime = 300;
        grupo2.add(bolinha2);
    }
}


function addBonus(){
    if(frameCount%200 === 0){
        var bonus = createSprite(random(0,1450),0,10,10);
        bonus.shapeColor="white";
        //bonus.addImage(img_bola2);
        bonus.velocityY = 9;
        bonus.scale = 3;
        bonus.lifetime = 300;
        grupoB.add(bonus);
    }
}

function keyPressed(){
    if(key === ' '){
        if(estadoJogo === "inicio"){
            estadoJogo = "jogar";
        }
        else if(estadoJogo === "fim"){
            estadoJogo = "inicio";
            pontuacao1 = 0
            pontuacao2 = 0
        }
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    raquete1.position.x=width/2*1.3;
    raquete1.position.y=height/1.15;
    raquete2.position.x=width/3;
    raquete2.position.y=height/1.15;
    bolinha1.position.x=width;
    bolinha1.position.y=0;
    bolinha2.position.x=width;
    bolinha2.position.y=0;
}