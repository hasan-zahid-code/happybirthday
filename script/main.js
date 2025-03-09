function createGiftBox() {
    // Create container for the gift box
    const giftBoxContainer = document.createElement('div');
    giftBoxContainer.id = 'gift-box-container';
    giftBoxContainer.style.position = 'fixed';
    giftBoxContainer.style.left = '50%';
    giftBoxContainer.style.top = '50%';
    giftBoxContainer.style.transform = 'translate(-50%, -50%)';
    giftBoxContainer.style.width = '120px';
    giftBoxContainer.style.height = '120px';
    giftBoxContainer.style.cursor = 'pointer';
    giftBoxContainer.style.zIndex = '1000';
    giftBoxContainer.style.transition = 'all 0.3s ease';

    // Add hover effect
    giftBoxContainer.addEventListener('mouseenter', () => {
        giftBoxContainer.style.transform = 'translate(-50%, -50%) scale(1.05)';
    });

    giftBoxContainer.addEventListener('mouseleave', () => {
        giftBoxContainer.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Create the gift box HTML structure
    giftBoxContainer.innerHTML = `
        <div id="gift-box" style="position: relative; width: 100%; height: 100%;">
            <div id="gift-box-base" style="position: absolute; bottom: 0; left: 10%; width: 80%; height: 70%; background-color: #e3bae8; border-radius: 5px; z-index: 1;"></div>
            <div id="gift-box-lid" style="position: absolute; top: 0; left: 5%; width: 90%; height: 40%; background-color: #bd6ecf; border-radius: 5px; z-index: 3; transition: transform 0.5s ease, top 0.5s ease;"></div>
            <div id="gift-box-ribbon-vertical" style="position: absolute; top: 0; left: 45%; width: 10%; height: 100%; background-color: #ff69b4; z-index: 4;"></div>
            <div id="gift-box-ribbon-horizontal" style="position: absolute; top: 30%; left: 0; width: 100%; height: 10%; background-color: #ff69b4; z-index: 5;"></div>
            <div id="gift-box-ribbon-knot" style="position: absolute; top: 25%; left: 40%; width: 20%; height: 20%; background-color: #ff69b4; border-radius: 50%; z-index: 6;"></div>
        </div>
        <div id="gift-box-text" style="position: absolute; top: 130%; left: 0; width: 100%; text-align: center; font-family: Arial, sans-serif; font-weight: bold; color: #a68ad6;">Open Surprise</div>
    `;

    // Add to the DOM
    document.body.appendChild(giftBoxContainer);

    // Add click event to open the gift box
    giftBoxContainer.addEventListener('click', function () {
        openGiftBox();
    });

    // Function to open the gift box
    function openGiftBox() {
        // Disable click during animation
        giftBoxContainer.style.pointerEvents = 'none';

        // Get lid element
        const lid = document.getElementById('gift-box-lid');

        // Animate the lid opening
        lid.style.transform = 'rotateX(-180deg)';
        lid.style.top = '-40px';

        // Get ribbon elements
        const ribbonVertical = document.getElementById('gift-box-ribbon-vertical');
        const ribbonHorizontal = document.getElementById('gift-box-ribbon-horizontal');
        const ribbonKnot = document.getElementById('gift-box-ribbon-knot');

        // Fade out ribbons
        setTimeout(() => {
            ribbonVertical.style.transition = 'opacity 0.5s ease';
            ribbonHorizontal.style.transition = 'opacity 0.5s ease';
            ribbonKnot.style.transition = 'opacity 0.5s ease';

            ribbonVertical.style.opacity = '0';
            ribbonHorizontal.style.opacity = '0';
            ribbonKnot.style.opacity = '0';
        }, 300);

        // After lid is open, show surprise (confetti)
        setTimeout(() => {
            // Hide the gift box
            giftBoxContainer.style.opacity = '0';
            giftBoxContainer.style.transform = 'translate(-50%, -50%) scale(0.5)';

            // Clear existing confetti and start new batch
            createConfetti();

            // Start birthday animation
            if (typeof animationTimeline === 'function') {
                animationTimeline();
            }

            // Remove gift box from DOM after animation completes
            setTimeout(() => {
                giftBoxContainer.remove();
            }, 1000);
        }, 1000);
    }

    return giftBoxContainer;
}



function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#bd6ecf', '#e3bae8', '#a68ad6', '#8a65cc', '#ff69b4', '#7dd175', '#347a9d'];

    // Clear any existing confetti
    confettiContainer.innerHTML = '';

    // Create a unique container ID for this batch of confetti
    const containerId = Date.now();

    // Add styles for heart shapes
    let heartStyles = '';

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';

        // Randomly choose between rectangle confetti and hearts
        const isHeart = Math.random() > 0.8;

        if (isHeart) {
            // Create heart shape using pseudo-elements
            const id = `heart-${containerId}-${i}`; // Make IDs unique per container
            confetti.id = id;

            const size = Math.random() * 15 + 10;
            const color = colors[Math.floor(Math.random() * colors.length)];

            confetti.classList.add('heart-shape');
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;

            // Add this heart's style to our collection
            heartStyles += `
                #${id} {
                    position: absolute;
                    transform: rotate(45deg);
                    background-color: ${color};
                }
                
                #${id}::before,
                #${id}::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: ${color};
                    border-radius: 50%;
                }
                
                #${id}::before {
                    top: -50%;
                    left: 0;
                }
                
                #${id}::after {
                    top: 0;
                    left: -50%;
                }
            `;
        } else {
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 5 + 3}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        }

        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-10px';
        confetti.style.opacity = '0.7';
        confetti.style.zIndex = '1';
        confetti.style.animation = `confetti-fall-${containerId}-${i} ${Math.random() * 3 + 2}s linear`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;

        // Add animation for this confetti piece
        heartStyles += `
            @keyframes confetti-fall-${containerId}-${i} {
                0% {
                    transform: translateY(0) rotate(${Math.random() * 360}deg);
                }
                100% {
                    transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                }
            }
        `;

        confettiContainer.appendChild(confetti);
    }

    // Add all styles at once for better performance
    const styleElement = document.createElement('style');
    styleElement.textContent = heartStyles;
    document.head.appendChild(styleElement);

    // Stop the confetti after 10 seconds by removing the elements
    setTimeout(() => {
        const confettiElements = confettiContainer.querySelectorAll('div');
        confettiElements.forEach(element => {
            // Add a fade-out effect
            element.style.transition = 'opacity 1s';
            element.style.opacity = '0';

            // Remove after fade completes
            setTimeout(() => {
                element.remove();
            }, 1000);
        });

        // Clean up the style element after animation is done
        setTimeout(() => {
            styleElement.remove();
        }, 1000);
    }, 10000); // Updated to 10 seconds
}

// Function to create and show countdown
function showCountdown() {
    const unlockDate = new Date("March 11, 2025 00:00:00").getTime();

    // Create countdown container
    const countdownContainer = document.createElement('div');
    countdownContainer.id = 'countdown-container';
    countdownContainer.style.position = 'fixed';
    countdownContainer.style.top = '0';
    countdownContainer.style.left = '0';
    countdownContainer.style.width = '100%';
    countdownContainer.style.height = '100%';
    countdownContainer.style.display = 'flex';
    countdownContainer.style.flexDirection = 'column';
    countdownContainer.style.alignItems = 'center';
    countdownContainer.style.textAlign = 'center';
    countdownContainer.style.justifyContent = 'center';
    countdownContainer.style.fontFamily = 'Poppins, sans-serif';
    countdownContainer.style.zIndex = '10000';

    // Create heading
    const heading = document.createElement('h1');
    heading.textContent = "Birthday Countdown";
    heading.style.marginBottom = '20px';

    // Create countdown timer elements
    const timerContainer = document.createElement('div');
    timerContainer.style.display = 'flex';
    timerContainer.style.gap = '20px';
    timerContainer.style.marginBottom = '30px';
    timerContainer.style.flexWrap = 'wrap';
    timerContainer.style.justifyContent = 'center';

    const timeUnits = ['Days', 'Hours', 'Minutes', 'Seconds'];
    const timeElements = {};

    timeUnits.forEach(unit => {
        const unitContainer = document.createElement('div');
        unitContainer.style.display = 'flex';
        unitContainer.style.flexDirection = 'column';
        unitContainer.style.alignItems = 'center';
        unitContainer.className = 'timer-unit';

        const number = document.createElement('div');
        number.id = unit.toLowerCase();
        number.style.fontSize = '3rem';
        number.style.fontWeight = 'bold';
        number.textContent = '00';
        number.className = 'number';

        const label = document.createElement('div');
        label.textContent = unit;
        label.style.fontSize = '1rem';

        unitContainer.appendChild(number);
        unitContainer.appendChild(label);
        timerContainer.appendChild(unitContainer);

        timeElements[unit.toLowerCase()] = number;
    });

    // Create message
    const message = document.createElement('p');
    message.textContent = "The birthday surprise will unlock on March 11, 2025!";

    // Create "Preview Anyway" button
    const previewButton = document.createElement('button');
    previewButton.textContent = "Preview Anyway";
    previewButton.style.marginTop = '20px';
    previewButton.style.padding = '10px 20px';
    previewButton.style.backgroundColor = '#8a65cc';
    previewButton.style.color = 'white';
    previewButton.style.border = 'none';
    previewButton.style.borderRadius = '30px';
    previewButton.style.cursor = 'pointer';
    previewButton.style.fontFamily = 'Poppins, sans-serif';
    previewButton.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    previewButton.style.transition = 'all 0.3s ease';

    previewButton.addEventListener('mouseenter', () => {
        previewButton.style.backgroundColor = '#a68ad6';
        previewButton.style.transform = 'translateY(-2px)';
    });

    previewButton.addEventListener('mouseleave', () => {
        previewButton.style.backgroundColor = '#8a65cc';
        previewButton.style.transform = 'translateY(0)';
    });

    previewButton.addEventListener('click', () => {
        // Remove countdown and show birthday content
        countdownContainer.remove();
        document.querySelector('.container').style.visibility = 'visible';

        // Initialize music button
        initMusicButton(false);

        // Start the birthday animation
        animationTimeline();

        // Create birthday effects
        createConfetti();
    });

    // Add confetti container to countdown
    const confettiCountdown = document.createElement('div');
    confettiCountdown.id = 'confetti-countdown';
    confettiCountdown.style.position = 'absolute';
    confettiCountdown.style.top = '0';
    confettiCountdown.style.left = '0';
    confettiCountdown.style.width = '100%';
    confettiCountdown.style.height = '100%';
    confettiCountdown.style.pointerEvents = 'none';
    confettiCountdown.style.zIndex = '-1';

    // Assemble the countdown container
    countdownContainer.appendChild(heading);
    countdownContainer.appendChild(timerContainer);
    countdownContainer.appendChild(message);
    countdownContainer.appendChild(previewButton);
    countdownContainer.appendChild(confettiCountdown);
    document.body.appendChild(countdownContainer);

    // Update countdown timer
    function updateCountdown() {
        const currentTime = new Date().getTime();
        const timeRemaining = unlockDate - currentTime;

        if (timeRemaining <= 0) {
            // It's time! Remove countdown and show birthday content
            countdownContainer.remove();
            document.querySelector('.container').style.visibility = 'visible';

            // Initialize music button
            initMusicButton(true);

            // Start the birthday animation
            animationTimeline();

            // Create birthday effects
            createConfetti();

            // Clear interval
            clearInterval(countdownInterval);
            return;
        }

        // Calculate time units
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Update DOM
        timeElements.days.textContent = days.toString().padStart(2, '0');
        timeElements.hours.textContent = hours.toString().padStart(2, '0');

        timeElements.minutes.textContent = minutes.toString().padStart(2, '0');
        timeElements.seconds.textContent = seconds.toString().padStart(2, '0');
    }

    // Initial update
    updateCountdown();

    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Function to handle music toggle
function initMusicButton(autoplay = false) {
    const musicBtn = document.getElementById('music-toggle');
    const song = document.querySelector('.song');

    // Set initial state
    let isPlaying = autoplay;

    // Make song element visible
    song.style.visibility = 'visible';

    if (autoplay) {
        song.play();
        musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        musicBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
    }

    // Add click event
    musicBtn.addEventListener('click', function () {
        if (isPlaying) {
            song.pause();
            musicBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
            isPlaying = false;
        } else {
            song.play();
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            isPlaying = true;
        }
    });
}


// Main animation timeline
function animationTimeline() {
    // Split chars that need to be animated individually
    const textBoxChars = document.querySelector(".hbd-chatbox");
    const hbd = document.querySelector(".wish-hbd");

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    // Define text transitions
    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    };

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    };

    // Create a new timeline using GSAP
    const tl = gsap.timeline();

    // Start the animation sequence
    tl
        .to(".container", { visibility: "visible", duration: 0.6 })
        .from(".one", { opacity: 0, y: 10, duration: 0.7 })
        .from(".two", { opacity: 0, y: 10, duration: 0.4 })
        .to(".one", { opacity: 0, y: 10, duration: 0.7, delay: 3.5 })
        .to(".two", { opacity: 0, y: 10, duration: 0.7 }, "-=1")
        .from(".three", { opacity: 0, y: 10, duration: 0.7 })
        .to(".three", { opacity: 0, y: 10, duration: 0.7, delay: 3 })

        // Show the text box
        .from(".four", { scale: 0.2, opacity: 0, duration: 0.7 })
        .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.05)
        .to(".send-btn", { backgroundColor: "#8a65cc", scale: 0.8, y: 2, duration: 0.2 }, "+=4")
        .to(".send-btn i", { x: 20, opacity: 0, duration: 0.3 }) // Paper plane icon flies away
        .to(".four", { scale: 0.2, opacity: 0, y: -150, duration: 0.5 }, "+=0.5")

        // Show the ideas with original transitions
        .from(".idea-1", { ...ideaTextTrans, duration: 0.7 })
        .to(".idea-1", { ...ideaTextTransLeave, duration: 0.7 }, "+=2.5")
        .from(".idea-2", { ...ideaTextTrans, duration: 0.7 })
        .to(".idea-2", { ...ideaTextTransLeave, duration: 0.7 }, "+=2.5")
        .from(".idea-3", { ...ideaTextTrans, duration: 0.7 })
        .to(".idea-3 strong", { scale: 1.2, x: 10, backgroundColor: "rgb(21, 161, 237)", color: "#fff", duration: 0.5 })
        .to(".idea-3", { ...ideaTextTransLeave, duration: 0.7 }, "+=2.5")
        .from(".idea-4", { ...ideaTextTrans, duration: 0.7 })
        .to(".idea-4", { ...ideaTextTransLeave, duration: 0.7 }, "+=2.5")
        .from(".idea-5", {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
            duration: 0.7
        }, "+=1.5")
        .to(".idea-5 span", { rotation: 90, x: 8, duration: 0.7 }, "+=1.4")
        .to(".idea-5", { scale: 0.2, opacity: 0, duration: 0.7 }, "+=2")
        .staggerFrom(".idea-6 span", 0.8, {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: "expo.out"
        }, 0.2)
        .staggerTo(".idea-6 span", 0.8, {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: "expo.out"
        }, 0.2, "+=1.5")

        // Animate balloons with original upward motion
        .staggerFromTo(".baloons img", 2.5,
            { opacity: 0.9, y: 1400 },
            { opacity: 1, y: -1000 },
            0.2
        )

        // Add profile picture animation
        .from(".profile-picture", {
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
            duration: 0.5
        }, "-=2")

        // Animate hat with original values
        .from(".hat", {
            x: -100,
            y: 350,
            rotation: -180,
            opacity: 0,
            duration: 0.5
        })

        // Animate wish text with elastic easing
        .staggerFrom(".wish-hbd span", 0.7, {
            opacity: 0,
            y: -50,
            rotation: 150,
            skewX: "30deg",
            ease: "elastic.out(1, 0.5)"
        }, 0.1)
        .staggerFromTo(".wish-hbd span", 0.7,
            { scale: 1.4, rotationY: 150 },
            { scale: 1, rotationY: 0, color: "#ff69b4", ease: "expo.out" },
            0.1, "party"
        )
        .from(".wish h5", {
            opacity: 0,
            y: 10,
            skewX: "-15deg",
            duration: 0.5
        }, "party")

        // Add SVG background elements with repeat
        .staggerTo(".eight svg", 1.5, {
            visibility: "visible",
            opacity: 0,
            scale: 80,
            repeat: 3,
            repeatDelay: 1.4
        }, 0.3)

        // Show final message
        .to(".six", { opacity: 0, y: 30, zIndex: "-1", duration: 0.5 })
        .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
        .to(".last-smile", { rotation: 90, duration: 0.5 }, "+=1");

    // Restart Animation on click
    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        tl.restart();
    });
}



// DOM ready event
document.addEventListener('DOMContentLoaded', function () {
    // Create the gift box with a slight delay for better user experience
    setTimeout(createGiftBox, 500);

    // Initialize the gift box automatically
    initGiftBox();

    document.querySelector('.container').style.visibility = 'visible';

    // Initialize music button with autoplay
    initMusicButton(true);

    // Start the birthday animation
    animationTimeline();

    // Create birthday effects
    createConfetti();


});