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

function calculateRadius() {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const radiusPercentage = 29;
    const radius = (radiusPercentage / 100) * viewportWidth;
    return radius;
}


function updatePositions() {
    const container = document.querySelector('.container_diamond_environment');
    const items = document.querySelectorAll('.environment_item');
    if (!container || !items.length) {
        return;
    }
    const itemCount = items.length;

    const baseRadius = container.offsetWidth / 2 - items[0].offsetWidth / 2;

    const angleIncrement = 360 / itemCount;

    items.forEach((item, index) => {
        const angle = index * angleIncrement;
        const radian = angle * Math.PI / 180;
        // const radiusReduction = 320;
        const radiusReduction = calculateRadius();
        let radius = baseRadius - radiusReduction;
        const x = radius * Math.cos(radian) + container.offsetWidth / 2 - item.offsetWidth / 2;

        let y = radius * Math.sin(radian) + container.offsetHeight / 2 - item.offsetHeight / 2;
        if (item.dataset.index === "4" || item.dataset.index === "5") {
            y = -20;
        }

        if (item.dataset.index === "0" || item.dataset.index === "3") {
            y = 92;
        }

        if (item.dataset.index === "1" || item.dataset.index === "2") {
            y = 207;
        }

        item.style.left = x + 'px';
        item.style.top = y + 'px';
    });
}

function checkMediaQuery() {
    if (window.matchMedia("(min-width: 321px)").matches) {

        updatePositions();
    } else {

        const items = document.querySelectorAll('.environment_item');
        items.forEach(item => {
            item.style.left = '';
            item.style.top = '';
            item.style.position = '';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkMediaQuery();

    window.addEventListener('resize', checkMediaQuery);
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

document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const slideCount = slides.length;
    let currentSlide = 0;

    function showSlide(index) {

        document.querySelectorAll('input[name="slider"]').forEach(input => {
            input.checked = false;
        });

        document.getElementById(`slide${index + 1}`).checked = true;

        slidesContainer.style.transform = `translateX(-${(100 / slideCount) * index}%)`;

        currentSlide = index;
    }

    document.querySelectorAll('input[name="slider"]').forEach((radio, index) => {
        radio.addEventListener('change', () => {
            showSlide(index);
        });
    });

});