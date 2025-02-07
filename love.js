function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = "-50px";
    
    let randomNumber = Math.floor(Math.random() * 5) + 1;
    heart.style.backgroundImage = `url('Heart/heart${randomNumber}.png')`;
    document.body.appendChild(heart);

    let speed = Math.random() * 3 + 2;
    let angle = (Math.random() - 0.5) * 2;
    
    anime({
        targets: heart,
        translateY: window.innerHeight + 50,
        translateX: [
            { value: `+=${angle * 200}`, duration: 3000, easing: 'easeInOutSine' }
        ],
        rotate: {
            value: function() {
                return (Math.random() > 0.5 ? (Math.random() * 6 - 3) : 0) + 'deg'; 
            },
            duration: 3000,
            easing: 'easeInOutSine'
        },
        duration: function() {
            return Math.random() * 2000 + 3000; 
        },
        easing: 'linear',
        complete: function() {
            heart.remove();
        }
    });
}

function createSnakeHeart() {
    const circles = [];
    const heartShape = getHeartShape();

    const questionElement = document.querySelector('.question');
    const gifContainer = document.querySelector('.gif-container');
    const questionRect = questionElement.getBoundingClientRect();

    const centerX = questionRect.left + questionRect.width / 2;
    const centerY = questionRect.top + questionRect.height / 2;

    for (let i = 0; i < heartShape.length; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.position = "absolute";
        circle.style.width = "20px";  
        circle.style.height = "20px";  
        circle.style.borderRadius = "50%";
        circle.style.backgroundColor = "#ff0077"; 
        document.body.appendChild(circle);
        circles.push(circle);
    }

    anime({
        targets: circles,
        translateX: function (el, i) {
            return heartShape[i].x + centerX - window.innerWidth / 2;  
        },
        translateY: function (el, i) {
            return heartShape[i].y + centerY - window.innerHeight / 2; 
        },
        easing: 'easeInOutSine',
        duration: 4000,  
        delay: function (el, i) {
            return i * 50;  
        },
        complete: function () {
            questionElement.textContent = "И я люблю тебя ❤︎";
            anime({
                targets: gifContainer,
                opacity: [0, 1],
                bottom: '20px',  
                easing: 'easeOutExpo',
                duration: 1500,  
            });
            anime({
                targets: '#love-text',
                width: '100%',
                easing: 'easeInOutSine',
                duration: 4000,
            });
        }
    });
}

function getHeartShape() {
    let shape = [];
    const scale = 20;

    for (let t = 0; t < 2 * Math.PI; t += Math.PI / 50) {
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        shape.push({
            x: x * scale, 
            y: -y * scale 
        });
    }
    return shape;
}

document.addEventListener('DOMContentLoaded', function() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');

    yesButton.addEventListener('click', function() {
        createSnakeHeart()
    });

    noButton.addEventListener('mouseover', function() {
        moveButton(noButton);
    });

    function moveButton(button) {
        const x = Math.random() * (window.innerWidth - button.offsetWidth);
        const y = Math.random() * (window.innerHeight - button.offsetHeight);

        anime({
            targets: button,
            left: x,
            top: y,
            duration: 1000, 
            easing: 'easeOutElastic(1, .8)', 
        });
    }
});

setInterval(createHeart, 100);
