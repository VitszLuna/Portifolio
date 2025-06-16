document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.login__input');
    const login__button = document.querySelector('.login__button');
    const form = document.querySelector('.login-form');
    const gameArea = document.querySelector('main');
    const spanPlayer = document.querySelector('.player');
    const timer = document.querySelector('.timer');
    const grid = document.querySelector('.grid');
    let loop;
  
    const characters = [
      'animal1', 
      'animal2', 
      'animal3', 
      'animal4', 

    ];
  
    const validateInput = ({ target }) => {
      if (target.value.trim().length > 0) {
        login__button.removeAttribute('disabled');
      } else {
        login__button.setAttribute('disabled', '');
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      spanPlayer.innerHTML = input.value.trim();
      form.style.display = 'none';
      gameArea.style.display = 'flex';
      startTimer();
      loadGame();
    };
  
    const startTimer = () => {
      loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
      }, 1000);
    };
  
    const createElement = (tag, className) => {
      const element = document.createElement(tag);
      element.className = className;
      return element;
    };
  
    let firstCard = '';
    let secondCard = '';
  
    const checkEndGame = () => {
      const disabledCards = document.querySelectorAll('.disabled-card');
      if (disabledCards.length === 8) {
        clearInterval(loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
      }
    };
  
    const checkCards = () => {
      const firstCharacter = firstCard.getAttribute('data-character');
      const secondCharacter = secondCard.getAttribute('data-character');
  
      if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';
        checkEndGame();
      } else {
        setTimeout(() => {
          firstCard.classList.remove('reveal-card');
          secondCard.classList.remove('reveal-card');
          firstCard = '';
          secondCard = '';
        }, 500);
      }
    };
  
    const revealCard = ({ target }) => {
      if (target.parentNode.className.includes('reveal-card')) return;
  
      if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
      } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
      }
    };
  
    const createCard = (character) => {
      const card = createElement('div', 'card');
      const front = createElement('div', 'face front');
      const back = createElement('div', 'face back');
    
      front.style.backgroundImage = `url(img/${character}.png)`; // a imagem fica oculta no início
    
      card.appendChild(front);
      card.appendChild(back);
    
      card.addEventListener('click', revealCard);
      card.setAttribute('data-character', character);
    
      return card;
    };
    
    const loadGame = () => {
      const duplicateCharacters = [...characters, ...characters];
      const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
  
      shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
      }); 
    };
  
    input.addEventListener('input', validateInput);
    form.addEventListener('submit', handleSubmit);
  });
  
  function reiniciarPagina() {
    location.reload();
  }
  
  