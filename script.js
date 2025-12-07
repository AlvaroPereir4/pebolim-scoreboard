let scoreBlack = 0;
let scoreRed = 0;

const scoreBlackEl = document.getElementById('score-black');
const scoreRedEl = document.getElementById('score-red');
const goalButtons = document.querySelectorAll('.goal-button');

let isCoolingDown = false;

function triggerConfetti(team, event) {
    const rect = event.target.getBoundingClientRect();
    const origin = {
        x: (rect.left + rect.right) / 2 / window.innerWidth,
        y: (rect.top + rect.bottom) / 2 / window.innerHeight
    };

    const colors = team === 'black' ? ['#000000', '#FFFFFF'] : ['#d92027', '#FFFFFF'];
    
    confetti({
        particleCount: 100,
        spread: 70,
        origin: origin,
        colors: colors
    });
}

function addGoal(team, event) {
    if (isCoolingDown) {
        return;
    }

    if (team === 'black') {
        scoreBlack++;
        scoreBlackEl.textContent = scoreBlack;
    } else if (team === 'red') {
        scoreRed++;
        scoreRedEl.textContent = scoreRed;
    }

    triggerConfetti(team, event);

    isCoolingDown = true;
    goalButtons.forEach(button => button.classList.add('disabled'));

    setTimeout(() => {
        isCoolingDown = false;
        goalButtons.forEach(button => button.classList.remove('disabled'));
    }, 500);
}

function resetScores() {
    scoreBlack = 0;
    scoreRed = 0;
    scoreBlackEl.textContent = scoreBlack;
    scoreRedEl.textContent = scoreRed;
}

const style = document.createElement('style');
style.innerHTML = `
.goal-button.disabled {
    opacity: 0.6;
    cursor: not-allowed;
}`;
document.head.appendChild(style);