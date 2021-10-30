const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      //descendo
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactos() {
  const cactos = document.createElement("div");
  let cactosPosition = 10000;
  let randomTime = Math.random() * 6000;
  cactos.classList.add("cactos");
  cactos.style.left = 10000 + "px";
  background.appendChild(cactos);

  let leftInterval = setInterval(() => {
    cactosPosition -= 10;
    cactos.style.left = cactosPosition + "px";
    if (cactosPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactos);
    } else if (cactosPosition > 0 && cactosPosition < 60 && position < 60) {
      //Game Over
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
    } else {
      cactosPosition -= 10;
      cactos.style.left = cactosPosition + "px";
    }
  }, 20);
  setTimeout(createCactos, randomTime);
}

createCactos();
document.addEventListener("keyup", handleKeyUp);
