// Memory Card game 

type Card = {
  value: string;
  index: number;
  element: HTMLDivElement | null ;
  isFlipped: boolean;
};

let selectedCards: Card[] = [];


// CARDS

const cards: Card[] = [
  { value: 'a', index: 0, element: null, isFlipped: false },
  { value: 'b', index: 1, element: null, isFlipped: false },
  { value: 'c', index: 2, element: null, isFlipped: false },
  { value: 'a', index: 3, element: null, isFlipped: false },
  { value: 'b', index: 4, element: null, isFlipped: false },
  { value: 'c', index: 5, element: null, isFlipped: false }
];


// SHUFFLE 

const shuffleCards = () => {
  let i = 0, j = 0, temp = null;
  for (i = cards.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = cards[i]
    cards[i] = cards[j]
    cards[j] = temp
  }
};



// GAME CONTAINER
const renderCards = () => {
  const gameContainer = document.querySelector<HTMLDivElement>('.game-container');

  if (!gameContainer) {
    throw new Error("Game container not found");
  }

  gameContainer.innerHTML = '';

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.dataset.index = card.index.toString();

    const frontFace = document.createElement('div');
    frontFace.className = 'face front';
    frontFace.textContent = card.value;

    const backFace = document.createElement('div');
    backFace.className = 'face back';
    backFace.textContent = card.value;

    frontFace.style.display = card.isFlipped ? 'block' : 'none';
    backFace.style.display = card.isFlipped ? 'none' : 'block';

    cardElement.appendChild(frontFace);
    cardElement.appendChild(backFace);

    cardElement.addEventListener('click', () => handleCardClick(card));
    gameContainer.appendChild(cardElement);
    card.element = cardElement;
  });
};


const handleCardClick = (clickedCard: Card) => {


clickedCard.isFlipped = !clickedCard.isFlipped;

if (clickedCard.element) {
  const frontFace = clickedCard.element.querySelector<HTMLDivElement>('.front')
  const backFace = clickedCard.element.querySelector<HTMLDivElement>('.back')

  if (selectedCards.length < 2 && !clickedCard.isFlipped) {
    clickedCard.isFlipped = true;
    selectedCards.push(clickedCard);

    renderCards();

    if (selectedCards.length === 2) {
      setTimeout(() => checkMatch(), 1000);
    }

    if (cards.every(card => card.isFlipped)) {
      alert("Winner Winner, Chichen Dinner!")
      resetButton.style.display = 'block';
      setTimeout(() => 3000);
      clearInterval(timerInterval);
    }
  }

    if (frontFace && backFace) {
      if (clickedCard.isFlipped) {
        // Show the back face
        frontFace.style.display = 'none';
        backFace.style.display = 'block';
      } else {
        // Show the front face
        frontFace.style.display = 'block';
        backFace.style.display = 'none';
      }
    }
  }
};

const checkMatch = () => {
  const [card1, card2] = selectedCards;

  if (card1.value === card2.value) {
    selectedCards = [];
  } else {
    card1.isFlipped = false;
    card2.isFlipped = false;
    selectedCards = [];
    renderCards();
  }
}

const resetCards = () => {
  cards.forEach(card => {
    card.isFlipped = false;
  });
};

const updateTimer = () => {
  seconds++;

  const timerElement = document.querySelector('.timer');
  if (timerElement) {
    timerElement.textContent = `Time: ${seconds} seconds`;
  }
};

const startGame = () => {
  shuffleCards();
  resetCards();
  renderCards();
  seconds = 0;
  timerInterval = setInterval(updateTimer, 1000);
};



// START GAME 
const startButton = document.querySelector<HTMLButtonElement>('.button');
const resetButton = document.querySelector<HTMLButtonElement>('.reset__button');
let timerInterval: NodeJS.Timeout | null = null;
let seconds = 0;

startButton.onclick = startGame;

resetButton.onclick = () => {
  shuffleCards();
  resetCards();
  renderCards();
  clearInterval(timerInterval); 
  seconds = 0; 
  
  const timerElement = document.querySelector('.timer')
  if (timerElement) {
    timerElement.textContent = 'Time: 0 seconds';
  }
}




