// script.js
function toggleCard() {
  const card = document.querySelector(".card");
  card.classList.toggle("opened");
}
// script.js
// function createHeart() {
//   const heartsContainer = document.querySelector(".hearts");
//   const heart = document.createElement("div");
//   heart.classList.add("heart");
//   heart.style.left = Math.random() * 100 + "vw";
//   heart.style.animationDuration = Math.random() * 5 + 5 + "s";

//   heartsContainer.appendChild(heart);

//   setTimeout(() => {
//     heart.remove();
//   }, 10000);
// }

// setInterval(createHeart, 200);

// script.js

function createHeart() {
  const heartsContainer = document.querySelector(".hearts");
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 5 + 5 + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

function createBalloon() {
  const heartsContainer = document.querySelector(".hearts");
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");

  // Random horizontal position
  balloon.style.left = Math.random() * 100 + "vw";

  // Random animation duration
  balloon.style.animationDuration = Math.random() * 5 + 7 + "s";

  // Random balloon size
  const size = Math.random() * 20 + 40; // Size between 40px and 60px
  balloon.style.width = size * 0.66 + "px"; // Adjust width proportionally
  balloon.style.height = size + "px";

  // Random color
  const colors = [
    "#FF69B4",
    "#FFB6C1",
    "#FFD700",
    "#87CEEB",
    "#98FB98",
    "#0A3981",
    "#640D5F",
    "#219B9D",
  ];
  balloon.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];

  heartsContainer.appendChild(balloon);

  setTimeout(() => {
    balloon.remove();
  }, parseFloat(balloon.style.animationDuration) * 1000); // Remove after animation ends
}

setInterval(createHeart, 200);
setInterval(createBalloon, 500);

// script.js
const quizData = [
  {
    question: "What was my expression when I first saw you?",
    options: {
      a: "I was surprised",
      b: "I felt curious",
      c: "I was trying to figure you out",
    },
    correct: "c",
  },
  {
    question: "What is my favorite hobby?",
    options: {
      a: "Playing Cricket",
      b: "Playing Badminton",
      c: "Gardening",
    },
    correct: "a",
  },
  {
    question: "What is my real name?",
    options: {
      a: "Bingshu Roy",
      b: "Binshu Roy",
      c: "Rahul Roy",
    },
    correct: "a",
  },
  // Add more questions as desired
];

function buildQuiz() {
  const quizContainer = document.getElementById("quiz");
  const output = [];

  quizData.forEach((currentQuestion, questionIndex) => {
    const options = [];
    for (letter in currentQuestion.options) {
      options.push(
        `<label>
                    <input type="radio" name="question${questionIndex}" value="${letter}">
                    ${letter}: ${currentQuestion.options[letter]}
                </label>`
      );
    }
    output.push(
      `<div class="question">${currentQuestion.question}</div>
            <div class="answers">${options.join("")}</div>`
    );
  });

  quizContainer.innerHTML = output.join("");
}

function showResults() {
  const answerContainers = document.querySelectorAll(".answers");
  let score = 0;

  quizData.forEach((currentQuestion, questionIndex) => {
    const answerContainer = answerContainers[questionIndex];
    const selector = `input[name=question${questionIndex}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correct) {
      score++;
      answerContainer.style.color = "green";
    } else {
      answerContainer.style.color = "red";
    }
  });

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = `You got ${score} out of ${quizData.length} correct!`;
}

buildQuiz();
// script.js
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute("href"));
    targetElement.scrollIntoView({ behavior: "smooth" });
  });
});

/* script.js */

/* Existing code for other functionalities */

// Your other JavaScript code (e.g., typewriter effect, hearts and balloons, etc.)

/* Fireworks Animation Code */

// Self-invoking function to encapsulate the fireworks code
(function () {
  const canvas = document.getElementById("fireworksCanvas");
  const ctx = canvas.getContext("2d");
  let fireworks = [];
  let particles = [];
  const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];

  // Resize canvas to fit the window
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Utility functions
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function calculateDistance(x1, y1, x2, y2) {
    const xDistance = x1 - x2;
    const yDistance = y1 - y2;
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  }

  // Firework class
  class Firework {
    constructor(x, y, targetX, targetY) {
      this.x = x;
      this.y = y;
      this.targetX = targetX;
      this.targetY = targetY;
      this.distanceToTarget = calculateDistance(x, y, targetX, targetY);
      this.distanceTraveled = 0;
      this.coordinates = [];
      this.coordinateCount = 3;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
      this.angle = Math.atan2(targetY - y, targetX - x);
      this.speed = 2;
      this.acceleration = 1.05;
      this.brightness = random(50, 70);
      this.targetRadius = 1;
    }

    update(index) {
      // Remove last coordinate and add current position
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);

      // Accelerate the firework
      this.speed *= this.acceleration;

      // Calculate velocity components
      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;

      // Update distance traveled
      this.distanceTraveled = calculateDistance(
        this.x,
        this.y,
        this.x + vx,
        this.y + vy
      );

      // Check if the firework has reached the target
      if (this.distanceTraveled >= this.distanceToTarget) {
        createParticles(this.targetX, this.targetY);
        fireworks.splice(index, 1);
      } else {
        this.x += vx;
        this.y += vy;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(
        this.coordinates[this.coordinates.length - 1][0],
        this.coordinates[this.coordinates.length - 1][1]
      );
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = "hsl(" + this.brightness + ", 100%, 50%)";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(this.targetX, this.targetY, this.targetRadius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // Particle class
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.coordinates = [];
      this.coordinateCount = 5;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
      this.angle = random(0, Math.PI * 2);
      this.speed = random(1, 10);
      this.friction = 0.95;
      this.gravity = 1;
      this.hue = random(0, 360);
      this.brightness = random(50, 80);
      this.alpha = 1;
      this.decay = random(0.015, 0.03);
    }

    update(index) {
      // Remove last coordinate and add current position
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);

      // Apply friction and gravity
      this.speed *= this.friction;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;

      // Fade out
      this.alpha -= this.decay;

      // Remove particle if faded
      if (this.alpha <= this.decay) {
        particles.splice(index, 1);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(
        this.coordinates[this.coordinates.length - 1][0],
        this.coordinates[this.coordinates.length - 1][1]
      );
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle =
        "hsla(" +
        this.hue +
        ", 100%, " +
        this.brightness +
        "%, " +
        this.alpha +
        ")";
      ctx.stroke();
    }
  }

  // Create particle explosion
  function createParticles(x, y) {
    let particleCount = 30;
    while (particleCount--) {
      particles.push(new Particle(x, y));
    }
  }

  // Main animation loop
  function loop() {
    requestAnimationFrame(loop);

    // Set composite operation to create trail effect
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";

    // Draw and update fireworks
    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].draw();
      fireworks[i].update(i);
    }

    // Draw and update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].draw();
      particles[i].update(i);
    }

    // Launch fireworks automatically at random intervals
    if (Math.random() < 0.3) {
      const startX = canvas.width / 2;
      const startY = canvas.height;
      const targetX = random(0, canvas.width);
      const targetY = random(0, canvas.height / 2);
      fireworks.push(new Firework(startX, startY, targetX, targetY));
    }

    // Limit the number of particles and fireworks for performance
    if (particles.length > 500) {
      particles.splice(0, particles.length - 500);
    }

    if (fireworks.length > 50) {
      fireworks.splice(0, fireworks.length - 50);
    }
  }

  // Event listener for user clicks to launch fireworks
  canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const startX = canvas.width / 2;
    const startY = canvas.height;
    const targetX = event.clientX - rect.left;
    const targetY = event.clientY - rect.top;
    fireworks.push(new Firework(startX, startY, targetX, targetY));
  });

  // Start the animation loop
  window.onload = function () {
    loop();
    // If you have other onload functions, ensure they are called here
  };
})();

/* Existing code for other functionalities */
