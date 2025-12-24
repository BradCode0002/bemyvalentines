const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const emojiDisplay = document.querySelector('.emoji-display');
const successContainer = document.getElementById('successContainer');
const confirmModal = document.getElementById('confirmModal');
const closeModal = document.getElementById('closeModal');
const loveInput = document.getElementById('loveInput');
const finalConfirmBtn = document.getElementById('finalConfirmBtn');
const errorMessage = document.getElementById('errorMessage');

const puppyEmojis = ['😞', '🥺', '😫', '🤧', '💔'];

const noButtonHirit = [
    "Ay, ayaw mo? 🙄", "Pakipot pa siya oh... 💅", "Wrong button, bes. ❌", "Sige, habulin mo ko! 🏃‍♀️",
    "Libre naman mangarap. ☁️", "Wala kang choice! 😤", "Ouch ha! 💔", "Asa ka pa! 😜",
    "Try again later! 😂", "Bawal tumanggi! 🚫", "Pag-isipan mo uli. 🤔", "Error: No is not allowed. 🛑",
    "Dito ka sa Yes! 👉", "Huli ka pero 'di ka kulong. 🚔", "Mapapagod ka lang. 🏃", "Missed me! 💨",
    "Ang bilis ko 'di ba? ⚡", "Iwas-pusoy yarn? 🃏", "Huwag pilitin ang ayaw. 😂", "Keep trying! 🎣"
];

const emptyFieldHirit = [
    "Ghosting agad? May i-type ka naman! 👻", "Blank space? Taylor Swift yarn? 🎤", "I-type mo, huwag mo titigan. 👁️",
    "Hindi ako mind reader. 🔮", "Nakalimutan mo na agad? 🧠", "Pipi ba 'yung keyboard mo? ⌨️",
    "Huwag mo 'kong i-seen! 🤐", "Empty parang heart mo? Char! 💔", "Takot ka ba mag-type? 😨",
    "Wait ko 'yung words, hindi 'yung hangin. 🌬️", "I-type mo na, dali! ⏳", "Anuna? Nganga? 😮",
    "Pindot ka nang pindot, wala namang sulat. ✍️", "Silent treatment? 🤫", "Huwag mo 'kong tulugan. 😴"
];


const numberSarcasm = [
    "Math teacher ba hanap mo? 🔢🙄", "I-type mo 'yung salita, hindi sweldo mo! 💸", "Gcash number ba 'to? 📱",
    "Calculated error yarn? 🧮", "Nakalimutan mo na bang magbasa? 📚", "Hindi 'to Lotto results. 🎰",
    "I-text mo 'yan sa 8888. 📲", "Ano 'to, date ng birthday mo? 🎂", "Pass sa math, love ang usapan. ❤️",
    "Sudoku ba nilalaro natin? 🧩", "Wala 'yang value sa puso ko. 📉", "Binary yarn? 💻",
    "Hindi 'to calculator, Cupid 'to! 🏹", "Numbers are for work, letters are for love. 💌", "Wrong digits, bes. 📞"
];

const missingHirit = [
    "Kulang-kulang parang pag-ibig mo! 😤💔", "Muntik na, pero bitin pa rin. 🤏", "Kulang ang words mo, parang effort mo lang. 🙄",
    "Hala, may nakalimutan siya. 🧠", "Wala 'yung isang word, parang ikaw... walang tayo. 🤡", "Bitin na bitin, parang pangarap ko sa'yo. ☁️",
    "Kulang ang letra, parang pasensya ko. 📉", "Don't leave me hanging! 🧗", "Completo dapat, parang meal sa Jollibee. 🍔",
    "Ayusin mo, may kulang pa! 🛠️", "Huwag mo 'kong tipirin sa words. 💰", "Maling spelling, maling feeling. ❌",
    "Check mo uli, may naiwan ka. 🎒", "Parang puzzle, may kulang na piraso. 🧩", "Half-hearted yarn? ❤️‍🩹"
];

const genericSarcasm = [
    "Typo? O sadyang ayaw mo lang talaga? 🤨", "Keyboard warrior ka 'di ba? Ayusin mo! ⌨️", "Ano 'yan? Jeje language? 🙄",
    "Seryoso ba 'to? Mali pa rin?! 🤦‍♀️", "I-uninstall mo na 'yung keyboard mo. 🗑️", "Pag-ibig ba 'yan o typo error? 😵‍💫",
    "Wala na, finish na. 🏁", "Try harder, bes! 🔥", "Mali na naman, sanay ka na siguro? 🤡", "Gising na, nagkakamali ka na. ☕",
    "Hala siya, 'di marunong mag-type. 👶", "Error 404: Correct answer not found. 🚫", "Google Translate mo na 'yan. 🌐",
    "Wrong move, checkmate ka na. ♟️", "Huwag mo na ipilit, mali talaga. 🙅"
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
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoButton(); });

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
    
    const validPattern = /^(i\s?lov[eu]\s?you|143)$/i;
    if (validPattern.test(userInput)) {
        confirmModal.classList.add('hidden');
        successContainer.classList.remove('hidden');
        triggerConfetti();
        return;
    }

    if (!isNaN(userInput) && userInput !== "143") {
        const randomNum = numberSarcasm[Math.floor(Math.random() * numberSarcasm.length)];
        showError(randomNum);
        return;
    }

    const hasI = userInput.includes("i");
    const hasLove = (userInput.includes("lov") || userInput.includes("luv"));
    const hasYou = userInput.includes("you");

    if (hasI || hasLove || hasYou) {
        let missing = [];
        if (!hasI) missing.push("'I'");
        if (!hasLove) missing.push("'Love/Luv'");
        if (!hasYou) missing.push("'You'");

        if (missing.length > 0) {
            const randomMiss = missingHirit[Math.floor(Math.random() * missingHirit.length)];
            showError(`Nasaan ang ${missing.join(" at ")}? ${randomMiss}`);
            return;
        }
    }
    
    const randomMsg = genericSarcasm[Math.floor(Math.random() * genericSarcasm.length)];
    showError(randomMsg);
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
