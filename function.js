/* CosmiCode JavaScript handles section navigation, the planet game, and the quiz logic. */

document.addEventListener('DOMContentLoaded', () => {
  const quizForm = document.getElementById('quizForm');
  const submitQuizBtn = document.getElementById('submitQuizBtn');
  const scoreValue = document.getElementById('scoreValue');
  const playAgainBtn = document.getElementById('playAgainBtn');

  const resetGameBtn = document.getElementById('resetGameBtn');
  const checkAnswerBtn = document.getElementById('checkAnswerBtn');
  const gameOptions = document.getElementById('gameOptions');
  const gameDisplay = document.getElementById('gameDisplay');
  const gameStatus = document.getElementById('gameStatus');
  const gameHint = document.getElementById('gameHint');
  const gameCorrect = document.getElementById('gameCorrect');
  const gameWrong = document.getElementById('gameWrong');
  const gameTotal = document.getElementById('gameTotal');

  const planetItems = [
    {
      name: 'Sun',
      label: 'The Sun',
      fact: 'The bright center of our Solar System.',
      svg: `<svg viewBox="0 0 160 160" aria-hidden="true"><defs><radialGradient id="gSun" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff9a2"/><stop offset="55%" stop-color="#ffd05b"/><stop offset="100%" stop-color="#ff8a24"/></radialGradient></defs><circle cx="80" cy="80" r="48" fill="url(#gSun)"/><g stroke="#ffd56b" stroke-width="4" stroke-linecap="round"><line x1="80" y1="4" x2="80" y2="18"/><line x1="80" y1="142" x2="80" y2="156"/><line x1="4" y1="80" x2="18" y2="80"/><line x1="142" y1="80" x2="156" y2="80"/><line x1="25" y1="25" x2="35" y2="35"/><line x1="135" y1="25" x2="125" y2="35"/><line x1="25" y1="135" x2="35" y2="125"/><line x1="135" y1="135" x2="125" y2="125"/></g></svg>`
    },
    {
      name: 'Mercury',
      label: 'Mercury',
      fact: 'Closest planet to the Sun.',
      svg: `<svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="42" fill="#9c9aa7"/><circle cx="100" cy="62" r="8" fill="#c7c7d0" opacity="0.85"/><circle cx="64" cy="104" r="6" fill="#d4d4dc" opacity="0.85"/></svg>`
    },
    {
      name: 'Venus',
      label: 'Venus',
      fact: 'The hottest planet with a thick atmosphere.',
      svg: `<svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="44" fill="#f7d589"/><path d="M18,98 C52,132 108,70 138,100" stroke="#e2a713" stroke-width="12" fill="none" opacity="0.6"/><path d="M28,52 C60,84 112,44 132,80" stroke="#d48f08" stroke-width="10" fill="none" opacity="0.5"/></svg>`
    },
    {
      name: 'Earth',
      label: 'Earth',
      fact: 'Our blue home planet with water and life.',
      svg: `<svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="44" fill="#4ebefa"/><path d="M40,62 C52,88 68,58 92,72 C108,84 122,70 136,82" stroke="#70d9b5" stroke-width="14" fill="none"/><path d="M52,106 C70,96 82,120 108,104" stroke="#84cfe7" stroke-width="10" fill="none" opacity="0.82"/></svg>`
    },
    {
      name: 'Mars',
      label: 'Mars',
      fact: 'Known as the Red Planet and dusty world.',
      svg: `<svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="44" fill="#ff7058"/><circle cx="52" cy="58" r="10" fill="#e07350" opacity="0.85"/><circle cx="112" cy="102" r="8" fill="#cc5a41" opacity="0.85"/><path d="M36,104 C68,80 94,112 126,96" stroke="#d8513d" stroke-width="10" fill="none" opacity="0.6"/></svg>`
    },
    {
      name: 'Jupiter',
      label: 'Jupiter',
      fact: 'Largest planet with a giant red storm.',
      svg: `<svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="46" fill="#d99a5d"/><path d="M24,92 C60,108 98,78 136,96" stroke="#c67840" stroke-width="16" fill="none" opacity="0.9"/><path d="M30,74 C64,86 94,68 132,82" stroke="#e1b77e" stroke-width="12" fill="none" opacity="0.55"/><ellipse cx="90" cy="88" rx="16" ry="10" fill="#b1552d" opacity="0.85"/></svg>`
    },
    {
      name: 'Saturn',
      label: 'Saturn',
      fact: 'Famous for its rings and soft yellow color.',
      svg: `<svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="40" fill="#f7d16b"/><ellipse cx="80" cy="82" rx="68" ry="22" fill="rgba(255,255,255,0.28)" transform="rotate(-16 80 82)"/><ellipse cx="80" cy="82" rx="58" ry="18" fill="rgba(217,176,106,0.72)" transform="rotate(-16 80 82)"/></svg>`
    },
    {
      name: 'Uranus',
      label: 'Uranus',
      fact: 'An ice giant that spins on its side.',
      svg: `<svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="40" fill="#94f0ff"/><ellipse cx="80" cy="82" rx="72" ry="16" fill="rgba(255,255,255,0.32)"/><path d="M28,78 C72,56 108,98 132,78" stroke="#aee1ff" stroke-width="10" fill="none" opacity="0.72"/></svg>`
    },
    {
      name: 'Neptune',
      label: 'Neptune',
      fact: 'The farthest blue giant with strong winds.',
      svg: `<svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="40" fill="#3ea0f0"/><path d="M28,90 C62,74 96,102 132,86" stroke="#5fb9ff" stroke-width="12" fill="none" opacity="0.85"/><path d="M32,60 C64,72 92,52 126,68" stroke="#69b6ff" stroke-width="8" fill="none" opacity="0.72"/></svg>`
    }
  ];

  const quizAnswers = {
    q1: 'The Sun',
    q2: 'Mercury',
    q3: 'Mars',
    q4: 'Earth',
    q5: 'Saturn',
    q6: 'Jupiter',
    q7: 'Uranus',
    q8: 'Neptune'
  };

  let gameState = {
    currentItem: null,
    correct: 0,
    wrong: 0,
    total: 0
  };

  function setText(element, text) {
    if (element) element.textContent = text;
  }

  function shuffleArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
  }

  function getRandomPlanetItem() {
    const index = Math.floor(Math.random() * planetItems.length);
    return planetItems[index];
  }

  function createGameOptions(correctName) {
    const wrongItems = planetItems
      .filter((item) => item.name !== correctName)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return shuffleArray([planetItems.find((item) => item.name === correctName), ...wrongItems]);
  }

  function renderGameRound() {
    gameState.currentItem = getRandomPlanetItem();
    const options = createGameOptions(gameState.currentItem.name);

    gameDisplay.innerHTML = `
      <div class="game-planet-card">
        ${gameState.currentItem.svg}
        <p class="mt-3">${gameState.currentItem.fact}</p>
      </div>
    `;

    gameOptions.innerHTML = options
      .map(
        (option, index) => `
      <label class="form-check game-choice p-3 rounded-3 border border-white border-opacity-10 d-block">
        <input class="form-check-input me-2" type="radio" name="planetChoice" value="${option.name}" />
        <span class="form-check-label">${option.label}</span>
      </label>
    `
      )
      .join('');

    setText(gameHint, 'Which planet or star do you think this is?');
    setText(gameStatus, '');
  }

  function updateGameCounters() {
    setText(gameCorrect, gameState.correct);
    setText(gameWrong, gameState.wrong);
    setText(gameTotal, gameState.total);
  }

  function resetGame() {
    gameState = { currentItem: null, correct: 0, wrong: 0, total: 0 };
    updateGameCounters();
    renderGameRound();
  }

  function handleCheckAnswer() {
    const selected = document.querySelector('input[name="planetChoice"]:checked');
    if (!selected) {
      setText(gameStatus, 'Pick an option before checking your answer.');
      return;
    }

    const selectedName = selected.value;
    const rightName = gameState.currentItem.name;

    gameState.total += 1;
    if (selectedName === rightName) {
      gameState.correct += 1;
      setText(gameStatus, `Great job! ${rightName} is correct.`);
    } else {
      gameState.wrong += 1;
      setText(gameStatus, `Nice try! The correct answer is ${rightName}.`);
    }

    updateGameCounters();
    setTimeout(() => renderGameRound(), 1200);
  }

  function handleQuizSubmit(event) {
    event.preventDefault();
    let score = 0;
    const formData = new FormData(quizForm);

    Object.keys(quizAnswers).forEach((questionKey) => {
      const answer = formData.get(questionKey);
      if (answer === quizAnswers[questionKey]) {
        score += 1;
      }
    });

    setText(scoreValue, score);
    goToSection('scoreboard');
  }

  function resetQuiz() {
    const inputs = quizForm.querySelectorAll('input[type="radio"]');
    inputs.forEach((input) => (input.checked = false));
    setText(scoreValue, '0');
  }

  const sectionFrame = document.querySelector('.section-frame');
  const sections = Array.from(document.querySelectorAll('.section-frame > section'));
  const sectionIds = sections.map((section) => section.id);
  let currentSectionIndex = 0;

  function goToSection(sectionId) {
    const index = sectionIds.indexOf(sectionId);
    if (index >= 0 && sectionFrame) {
      // reset internal scroll for all sections
      sections.forEach((s) => {
        try { s.scrollTop = 0; } catch (e) {}
        const c = s.querySelector('.container');
        if (c) try { c.scrollTop = 0; } catch (e) {}
      });

      currentSectionIndex = index;
      // Snap transform without animation so the top of the target section is immediately visible
      const prevTransition = sectionFrame.style.transition || '';
      sectionFrame.style.transition = 'none';
      sectionFrame.style.transform = `translateY(-${index * 100}vh)`;

      // restore transition shortly after to keep future navigations animated
      setTimeout(() => {
        sectionFrame.style.transition = prevTransition || 'transform 0.8s ease';
      }, 30);

      // Ensure target header is scrolled into view inside the section immediately
      const target = sections[index];
      if (target) {
        try {
          const header = target.querySelector('.section-header');
          if (header && typeof header.scrollIntoView === 'function') {
            header.scrollIntoView({ behavior: 'auto', block: 'start' });
          } else {
            target.scrollTop = 0;
          }
        } catch (e) {
          try { target.scrollTop = 0; } catch (err) {}
        }
      }
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const targetId = link.getAttribute('href').slice(1);
    if (targetId) {
      link.addEventListener('click', (event) => {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          event.preventDefault();
          goToSection(targetId);
        }
      });
    }
  });

  function showSectionIndex(index) {
    currentSectionIndex = Math.max(0, Math.min(index, sectionIds.length - 1));
    const targetId = sectionIds[currentSectionIndex];
    if (targetId) {
      goToSection(targetId);
    }
  }

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      showSectionIndex(currentSectionIndex + 1);
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      showSectionIndex(currentSectionIndex - 1);
    }
  });

  if (submitQuizBtn) {
    quizForm.addEventListener('submit', handleQuizSubmit);
  }

  if (resetGameBtn) {
    resetGameBtn.addEventListener('click', resetGame);
  }

  if (checkAnswerBtn) {
    checkAnswerBtn.addEventListener('click', handleCheckAnswer);
  }

  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
      resetQuiz();
      resetGame();
      goToSection('planet-game');
    });
  }

  renderGameRound();
  goToSection('home');
});

