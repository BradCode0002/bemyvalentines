const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const container = document.querySelector('.container');
const emojiDisplay = document.querySelector('.container .emoji-display');
const successContainer = document.getElementById('successContainer');

const arrowHint = document.getElementById('arrowHint');

let hasHoveredNo = false;

const puppyEmojis = ['🥺', '😢', '🐶', '💔', '😿'];

noBtn.addEventListener('click', () => {
    noBtn.classList.add('hidden');
    arrowHint.classList.remove('hidden');
});

noBtn.addEventListener('mouseover', () => {
  
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

  
    const margin = 50; 
    const maxX = window.innerWidth - btnRect.width - margin;
    const maxY = window.innerHeight - btnRect.height - margin;

  
    const safeMaxX = Math.max(0, maxX);
    const safeMaxY = Math.max(0, maxY);

    const randomX = Math.random() * safeMaxX + (margin / 2);
    const randomY = Math.random() * safeMaxY + (margin / 2);

   
    if (noBtn.parentNode !== document.body) {
        document.body.appendChild(noBtn);
    }

  
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

 
    if (!hasHoveredNo) {
        emojiDisplay.innerText = '🥺';
        container.classList.add('puppy-eyes-active');
       
        hasHoveredNo = true;
    } else {
     
        const randomEmoji = puppyEmojis[Math.floor(Math.random() * puppyEmojis.length)];
        emojiDisplay.innerText = randomEmoji;
    }
});


noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    const event = new Event('mouseover');
    noBtn.dispatchEvent(event);
});

yesBtn.addEventListener('click', () => {
    successContainer.classList.remove('hidden');

  
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

  
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});

