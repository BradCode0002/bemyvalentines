const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const emojiDisplay = document.querySelector('.emoji-display');
const successContainer = document.getElementById('successContainer');
const confirmModal = document.getElementById('confirmModal');
const closeModal = document.getElementById('closeModal');
const loveInput = document.getElementById('loveInput');
const finalConfirmBtn = document.getElementById('finalConfirmBtn');
const errorMessage = document.getElementById('errorMessage');

const puppyEmojis = ['😞', '🥺', '💔', '😫', '🤧'];

const noButtonHirit = [
    "Ay, ayaw mo? 🙄",
    "Pakipot pa siya oh... 💅",
    "Wrong button, bes. ❌",
    "Sige, habulin mo ko! 🏃‍♀️",
    "Libre naman mangarap. ☁️",
    "Wala kang choice! 😤",
    "Ouch ha! 💔",
    "Asa ka pa! 😜"
];

const sarcasticTagalogMessages = [
    "Typo? O sadyang ayaw mo lang talaga? 🤨",
    "Grabe, 'I love you' na nga lang, namali pa. 💔",
    "Keyboard warrior ka 'di ba? Ayusin mo! ⌨️",
    "Isang pagkakamali pa, blocked ka na sa puso ko. 🙅‍♂️",
    "Ano 'yan? Jeje language? 🙄",
    "Wala na, finish na. Wrong answer! 🏁",
    "Pag-ibig ba 'yan o typo error? 😵‍💫",
    "Seryoso ba 'to? Mali pa rin?! 🤦‍♀️"
];

const emptyFieldHirit = [
    "Ghosting agad? May i-type ka naman! 👻",
    "Blank space? Taylor Swift yarn? 🎤",
    "I-type mo, huwag mo titigan. 👁️👄👁️",
    "Hindi ako mind reader, i-type mo dali! 🔮",
    "Nakalimutan mo na agad? 'I love you' lang naman eh! 🧠"
];

const moveNoButton = () => {
    const btnRect = noBtn.getBoundingClientRect();
    const margin = 50;
    const maxX = window.innerWidth - btnRect.width - margin;
    const maxY = window.innerHeight - btnRect.height - margin;
    
    const randomX = Math.max(margin, Math.random() * maxX);
    const randomY = Math.max(margin, Math.random() * maxY);
    
    if (noBtn.parentNode !== document.body) {
        document.body.appendChild(noBtn);
    }
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    noBtn.innerText = noButtonHirit[Math.floor(Math.random() * noButtonHirit.length)];
    emojiDisplay.innerText = puppyEmojis[Math.floor(Math.random() * puppyEmojis.length)];
};

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

yesBtn.addEventListener('click', () => {
    confirmModal.classList.remove('hidden');
    loveInput.value = '';
    loveInput.focus();
});

closeModal.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
    errorMessage.classList.add('hidden');
});

finalConfirmBtn.addEventListener('click', () => {
    const userInputRaw = loveInput.value;
    const userInput = userInputRaw.trim().toLowerCase();
    

    if (userInput === "") {
        const randomEmpty = emptyFieldHirit[Math.floor(Math.random() * emptyFieldHirit.length)];
        showError(randomEmpty);
        return;
    }
    
    const validPattern = /^(i\s?lov[eu]\s?you)$/i;
    
    if (validPattern.test(userInput)) {
        confirmModal.classList.add('hidden');
        successContainer.classList.remove('hidden');
        triggerConfetti();
    } else {
        const randomMsg = sarcasticTagalogMessages[Math.floor(Math.random() * sarcasticTagalogMessages.length)];
        showError(randomMsg);
    }
});

function showError(msg) {
    errorMessage.innerText = msg;
    errorMessage.classList.remove('hidden');
    errorMessage.classList.remove('shake');
    void errorMessage.offsetWidth;
    errorMessage.classList.add('shake');
}

function triggerConfetti() {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    const end = Date.now() + 3000;
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}
