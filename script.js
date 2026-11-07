
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const counter = document.getElementById("counter");
const replayBtn = document.getElementById("replayBtn");

let currentSlide = 0;

function showSlide(index) {

    currentSlide = Math.max(
        0,
        Math.min(index, slides.length - 1)
    );

    slides.forEach((slide, i) => {
        slide.classList.toggle(
            "active",
            i === currentSlide
        );
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle(
            "active",
            i === currentSlide
        );
    });

    counter.textContent =
        `0${currentSlide + 1} / 0${slides.length}`;

    prevBtn.disabled = currentSlide === 0;

    nextBtn.disabled =
        currentSlide === slides.length - 1;

    nextBtn.textContent =
        currentSlide === slides.length - 1
        ? "The End ♡"
        : "Next ✦";
}

prevBtn.addEventListener("click", () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener("click", () => {
    showSlide(currentSlide + 1);
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showSlide(index);
    });
});

replayBtn.addEventListener("click", () => {
    showSlide(0);
    celebrate();
});

// MOBILE SWIPE

let startX = 0;

document.querySelector(".story")
.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].screenX;
}, { passive: true });

document.querySelector(".story")
.addEventListener("touchend", (e) => {

    let difference =
        e.changedTouches[0].screenX - startX;

    if (Math.abs(difference) > 50) {

        if (difference < 0) {
            showSlide(currentSlide + 1);
        } else {
            showSlide(currentSlide - 1);
        }
    }

}, { passive: true });


// SPARKLE BACKGROUND

const canvas = document.getElementById("sparkles");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {

    const ratio = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    stars = Array.from({ length: 65 }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        size: Math.random() * 2,
        phase: Math.random() * 7
    }));
}

function animateStars() {

    ctx.clearRect(
        0, 0,
        innerWidth,
        innerHeight
    );

    stars.forEach(star => {

        star.phase += .025;

        let opacity =
            .2 + Math.abs(Math.sin(star.phase)) * .7;

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,235,184,${opacity})`;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ffdc94";

        ctx.fill();
    });

    requestAnimationFrame(animateStars);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animateStars();


// CELEBRATION EFFECT

function celebrate() {

    const colors = [
        "#ffe7a3",
        "#ffbd59",
        "#ffffff",
        "#f5a7dd"
    ];

    for (let i = 0; i < 65; i++) {

        const piece = document.createElement("div");

        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 180;

        piece.style.cssText = `
            position:fixed;
            z-index:20;
            left:50%;
            top:50%;
            width:6px;
            height:9px;
            background:${colors[
                Math.floor(Math.random() * colors.length)
            ]};
            border-radius:2px;
            pointer-events:none;
            --x:${Math.cos(angle) * distance}px;
            --y:${Math.sin(angle) * distance}px;
            animation:burst 1.4s ease-out forwards;
        `;

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 1500);
    }
}

const animationStyle = document.createElement("style");

animationStyle.textContent = `
@keyframes burst {
    to {
        transform:translate(var(--x),var(--y))
        rotate(720deg);
        opacity:0;
    }
}`;

document.head.appendChild(animationStyle);

showSlide(0);
function revealSurprise() {
    const message = document.getElementById("secretMessage");
    const button = document.getElementById("surpriseBtn");

    message.classList.toggle("show");

    button.textContent = message.classList.contains("show")
        ? "💖 Hide Surprise"
        : "💌 Open Your Secret Surprise";
}
function startSurprise() {
    const welcome = document.getElementById("welcomeScreen");

    welcome.classList.add("hide");

    setTimeout(() => {
        welcome.style.display = "none";
    }, 1000);
}