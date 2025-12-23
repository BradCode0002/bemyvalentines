const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const container = document.querySelector('.container');
const emojiDisplay = document.querySelector('.container .emoji-display');
const successContainer = document.getElementById('successContainer');

const arrowHint = document.getElementById('arrowHint');

// State to track if we've shown the puppy eyes yet
let hasHoveredNo = false;

const puppyEmojis = ['🥺', '😢', '🐶', '💔', '😿'];

noBtn.addEventListener('click', () => {
    noBtn.classList.add('hidden');
    arrowHint.classList.remove('hidden');
});

noBtn.addEventListener('mouseover', () => {
    // 1. Move the button
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate available space boundaries with margin
    const margin = 50; // Keep away from edges
    const maxX = window.innerWidth - btnRect.width - margin;
    const maxY = window.innerHeight - btnRect.height - margin;

    // Ensure we don't get negative values if screen is small
    const safeMaxX = Math.max(0, maxX);
    const safeMaxY = Math.max(0, maxY);

    const randomX = Math.random() * safeMaxX + (margin / 2);
    const randomY = Math.random() * safeMaxY + (margin / 2);

    // IMPORTANT: Move button to body to avoid container stacking contexts (transform/backdrop-filter)
    // interfering with fixed positioning, which causes it to fly off screen on large monitors.
    if (noBtn.parentNode !== document.body) {
        document.body.appendChild(noBtn);
    }

    // Set fixed position to move it freely around the screen
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // 2. Show Puppy Eyes Animation/Emoji
    if (!hasHoveredNo) {
        emojiDisplay.innerText = '🥺';
        container.classList.add('puppy-eyes-active');
        // Optional: Change text?
        // document.querySelector('.question').innerText = "Please? 🥺";
        hasHoveredNo = true;
    } else {
        // Cycle through sad emojis
        const randomEmoji = puppyEmojis[Math.floor(Math.random() * puppyEmojis.length)];
        emojiDisplay.innerText = randomEmoji;
    }
});

// Fallback for mobile touch (tap to move)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent click
    // Trigger same logic
    const event = new Event('mouseover');
    noBtn.dispatchEvent(event);
});

yesBtn.addEventListener('click', () => {
    successContainer.classList.remove('hidden');

    // Launch confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Continuous confetti for a bit
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
