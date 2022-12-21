const CardsCollectionObjects = [
    {id: 1, imagePath: 'imgs/card-KingHearts.png'},
    {id:2, imagePath: 'imgs/card-JackClubs.png' },
    {id:3, imagePath: 'imgs/card-QueenDiamonds.png' },
    {id:4, imagePath: 'imgs/card-AceSpades.png' },
]

const backImagePath = 'imgs/card-back-blue.png';
const cardContainer = document.querySelector(".card-container");


let cards = []

const playGameButton = document.getElementById('playGame');
const collapsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = ".card-pos-a";

const numberOfCards = CardsCollectionObjects.length;
const cardPositions = [];

/*
    A função escrita abaixo (createCard) tem o intuito de criar a estrutura HTML abaixo.
    
<div class="card">
    <div class="inner-card">
        <div class="front-card">
            <img src="imgs/card-AceSpades.png" alt="">
        </div>
        <div class="back-card">
            <img src="imgs/card-back-Blue.png" alt="">
        </div>
    </div>
</div>

*/

loadGame()



function loadGame(){
    createCards()

    cards = document.querySelectorAll('.card')
    console.log(cards)
    playGameButton.addEventListener("click", () => StartGame())

}


function StartGame() {
    initializeNewGame();
    startRound();
}

function initializeNewGame() {

}

function startRound() {
    initializeNewRound();
    colectCards();
    //flipAllCards(true);
    shuffleCards();

}

function initializeNewRound() {

    

}

function colectCards(){
    transformGridArea(collapsedGridAreaTemplate);
    addCardsToShuffleArea(cardCollectionCellClass);
}

function transformGridArea(areas){

    cardContainer.style.gridTemplateAreas = areas;
}


function flipCard(card, flipToBack) {
    const innerCardElem = card.firstChild;

    if (flipToBack && !innerCardElem.classList.contains('flip-it'))
    {
        innerCardElem.classList.add('flip-it');
        
    }
    else if(innerCardElem.classList.contains('flip-it')) {
        innerCardElem.classList.remove('flip-it');
    }

}

function flipAllCards(flipToBack){
    cards.forEach((card, index) => {
        setTimeout(() => {
            flipCard(card, flipToBack)
        }, index * 100);
    })
}

function addCardsToShuffleArea(cellPositionName) {
    const cellPositionElem = document.querySelector(cellPositionName);
    console.log(cellPositionElem);
    cards.forEach((card, index) => {
        addChildElement(cellPositionElem, card);
    }  
    )
}
//iteração responsável pela randomização. Obs a iteração está sendo baseada no metodo "setInterval"
function shuffleCards(){

    const shuffleInterval = setInterval(shuffle, 12);
    let shuffleCount = 0

    function shuffle(){
        randomizeCardsPositions();


        if(shuffleCount == 500){
            clearInterval(shuffleInterval);
            dealCards();
        }
        else {
            shuffleCount++;
        }
    }



}
//algoritimo para randomizar as posições
function randomizeCardsPositions(){
    const random1 = Math.floor(Math.random() * numberOfCards) + 1
    const random2 = Math.floor(Math.random() * numberOfCards) + 1

    const temp = cardPositions[random1 - 1]

    cardPositions[random1 - 1] = cardPositions[random2 - 1]
    cardPositions[random2 - 1] = temp
}

function dealCards(){
    addCardsToAppropriateCell();
    const areaTemplate = returnGridAreasMappedToCardOriginalPos();
    console.log(areaTemplate)
    transformGridArea(areaTemplate);
}

function returnGridAreasMappedToCardOriginalPos() {
    let firstPartOfTheMapString = ""
    let secondPartOfTheMapString = ""
    let areas = ""

    cards.forEach((card, index) => {
        if(cardPositions[index] == 1){
            areas += "a ";
        }else if(cardPositions[index] == 2){
            areas += "b ";
        }else if(cardPositions[index] == 3){
            areas += "c ";
        }else if(cardPositions[index] == 4){
            areas += "d ";
        }if(index == 1) {
            firstPartOfTheMapString = areas.substring(0, areas.length - 1);
            areas = "";
        } else if (index == 3) {
            secondPartOfTheMapString = areas.substring(0, areas.length - 1);
        }

        return `"${firstPartOfTheMapString}" "${secondPartOfTheMapString}"`
    })
}

function addCardsToAppropriateCell(){
    cards.forEach((card) => {
        addCardToGridCell(card);
    })

}

function createCards() {

    CardsCollectionObjects.forEach((cardItem) => {
        createCard(cardItem);
    })
}

function createCard(cardItem) {

    // cria os elementos HTML que irão compor uma "carta".
    const cardElem = document.createElement('div');
    const innerCardElem = document.createElement('div');
    const frontCardElem = document.createElement('div');
    const backCardElem = document.createElement('div');

    // cria as tags IMG que irá linkar as imagens (frente e trás) da carta.
    const frontCardImg = document.createElement('img');
    const backCardImg = document.createElement('img');


    //adciona uma classe e um id para as tags criadas dinamicamente.
    addClassToElement(cardElem, 'card');
    addIdToElement(cardElem, cardItem.id);
    
    addClassToElement(innerCardElem, 'inner-card');
    addIdToElement(innerCardElem, cardItem.id);

    addClassToElement(frontCardElem, 'front-card');
    addIdToElement(frontCardElem, cardItem.id);

    addClassToElement(backCardElem, 'back-card');
    addIdToElement(backCardElem, cardItem.id);


    //adiciona o SRC das tags IMG criadas dinamicamente.
    console.log(cardItem.imagePath)
    addSrcToImgElem(frontCardImg, cardItem.imagePath);
    addSrcToImgElem(backCardImg, backImagePath);

    //adiciona os elementos HTML de imagem abaixo dos elementos div
    addChildElement(frontCardElem, frontCardImg);
    addChildElement(backCardElem, backCardImg);

    //adiciona os elementos HTML de frente e trás ao elemento de inner (composição).
    addChildElement(innerCardElem, frontCardElem);
    addChildElement(innerCardElem, backCardElem);

    //adiciona o innerCard ao cardElement em si.
    addChildElement(cardElem, innerCardElem);


    //adiciona a carta na div de posição (a, b, c, d.. etc).
    addCardToGridCell(cardElem);


    initializeCardPositions(cardElem);

}
function initializeCardPositions(card){
    cardPositions.push(card.id)
    
}

function createElem(elemType) {
    return document.createElement(elemType);
}

function addClassToElement(elem, className){
    elem.classList.add(className);
}

function addIdToElement(elem, id) {
    elem.id = id;
}

function addSrcToImgElem(imgElem, src) {
    imgElem.src = src;
}

function addChildElement(parentElem, childElem) {
    parentElem.appendChild(childElem);
}

function addCardToGridCell(card){
    const cardPositionClassName = mapCardIdToGridCell(card);
    const cardPosElem = document.querySelector(cardPositionClassName);
    
    addChildElement(cardPosElem, card);

}
function mapCardIdToGridCell(card) {
    if (card.id == 1) {
        return '.card-pos-a';
    }
    else if(card.id == 2) {
        return '.card-pos-b';
    }
    else if (card.id == 3) {
        return '.card-pos-c';
    }
    else if(card.id == 4) {
        return '.card-pos-d';
    }
}