let timer = document.querySelector('.timer');
let timeLeft = 600;
let timerInterval;

function timerDisplay() {
    let hours = Math.floor(timeLeft / 3600);
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timer.textContent = hours + " : " + minutes + " : " + seconds;
}

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;

        if (timeLeft < 0) {
            timeLeft = 600;
        }
        timerDisplay();
    }, 1000);
}

timerDisplay();
startTimer();

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container_diamond_environment');
    const items = document.querySelectorAll('.environment_item');
    const itemCount = items.length;

    const baseRadius = container.offsetWidth / 2 - items[0].offsetWidth / 2;

    const angleIncrement = 360 / itemCount;

    items.forEach((item, index) => {
        const angle = index * angleIncrement;
        const radian = angle * Math.PI / 180;
        const radiusReduction = 100;

        let radius = baseRadius - radiusReduction;
        const x = radius * Math.cos(radian) + container.offsetWidth / 2 - item.offsetWidth / 2;

        let y = radius * Math.sin(radian) + container.offsetHeight / 2 - item.offsetHeight / 2; // по умолчанию
        if (item.dataset.index === "4" || item.dataset.index === "5") {
            y = -15;
        }

        if (item.dataset.index === "0" || item.dataset.index === "3") {
            y = 100;
        }

        if (item.dataset.index === "1" || item.dataset.index === "2") {
            y = 215;
        }

        item.style.left = x + 'px';
        item.style.top = y + 'px';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const parallaxElements = document.querySelectorAll('.wrapper');
    const container = document.querySelector('.main');

    if (!container) {
        console.error("Container not found!");
        return;
    }

    if (parallaxElements.length === 0) {
        console.warn("No parallax elements found!");
        return;
    }

    container.addEventListener('mousemove', function (e) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const mouseX = e.clientX - container.offsetLeft;
        const mouseY = e.clientY - container.offsetTop;

        const parallaxStrength = 0.1;
        const translateX = (mouseX - containerWidth / 2) * parallaxStrength;
        const translateY = (mouseY - containerHeight / 2) * parallaxStrength;

        parallaxElements.forEach(element => {
            element.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });

    container.addEventListener('mouseleave', function () {
        parallaxElements.forEach(element => {
            element.style.transform = 'translate(0, 0)';
        });
    });
});