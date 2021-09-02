
// Get the modal
// const modal = document.getElementById("myModal");
// // Get the button that opens the modal
// const btn = document.getElementById("myBtn");
// // When the user clicks on <span> (x), close the modal
// btn.onclick = function() {
//   modal.style.display = "none";
// }

let gamestarted = false;
let amountofWinBoxes = Math.floor(320);
let amountofBadBoxes = Math.floor(120);
let score = 0;
let totalTime = 50;
let TimeDisplay = 50;

window.onload = function () {
  beginGame();
};

AFRAME.registerComponent('change-color-on-hover', {
  schema: {
    color: {default: 'white'}
  },

  init: function () {
    var data = this.data;
    var el = this.el;  // <a-box>
    var defaultColor = el.getAttribute('material').color;

    el.addEventListener('mouseenter', function () {
      score++;
      document.getElementById('score').play();
      console.log(score);
      el.setAttribute('color', data.color);
    });

    el.addEventListener('mouseleave', function () {
      el.setAttribute('color', defaultColor);
    });
  }
});

//reduce score by 1 if touch a blue cube
AFRAME.registerComponent('minus-score', {
  schema: {
  },

  init: function () {
    var data = this.data;
    var el = this.el;  // <a-box>
    el.addEventListener('mouseenter', function () {
      score--;
      document.getElementById('lose').play();
      console.log(score);
    });
  }
});

AFRAME.registerComponent('update-score-every-second', {
  init: function () {
    const el = this.el;
    setInterval(function () {
      el.setAttribute('text', 'value', score.toString());
    }, 1000);
  }
});

AFRAME.registerComponent('update-time-every-second', {
  init: function () {
    const el = this.el;
    setInterval(function () {
      TimeDisplay--;
      el.setAttribute('text', 'value', TimeDisplay.toString());
    }, 1000);
  }
});

function beginGame() {
  gamestarted = true;
  createWinBoxes(amountofWinBoxes);
  createBadBoxes(amountofBadBoxes);
  updateGameState(totalTime);
}

function updateGameState(totalTime) {
  setInterval(function () {
    totalTime--;
    if (totalTime === 0) {
      restart();
    }
  }, 1000);
}

function restart() {
  location.reload();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function createWinBoxes() {
  let i;
  for (i = 0; i < amountofWinBoxes; i++) {
    let winbox = document.createElement('a-sphere');
    let posx = getRandomInt(0,1000);
    let posz = getRandomInt(0, 500);
    let posy = getRandomInt(0, 800);
    let scale = getRandomInt(8, 10);

    let randPosX = getRandomInt(10, 250);
    let randposZ = getRandomInt(200,1200);
    let randposY = getRandomInt(1,250);

    winbox.setAttribute('position', {x: posx, y: posy, z: posz});
    winbox.object3D.scale.set(scale, scale, scale);
    winbox.setAttribute('material', 'color', '#ADD8E6');
    winbox.setAttribute('name', 'winbox');
    winbox.setAttribute('winbox', '');
    winbox.setAttribute('change-color-on-hover', 'color', 'green');
    winbox.setAttribute('class', 'winbox');
    winbox.setAttribute('animation', 'dur: 1200; easing: linear; loop: true; property: position; to:'+randPosX, randposY, randposZ);
    document.querySelector('a-scene').appendChild(winbox);
  }
}

function createBadBoxes() {
  let i;
  for (i = 0; i < amountofBadBoxes; i++) {
    let badbox = document.createElement('a-sphere');
    let posx = getRandomInt(0, 1000);
    let posz = getRandomInt(0, 800);
    let posy = getRandomInt(0, 500);
    let scale = getRandomInt(8, 10);

    let randPosX = getRandomInt(10, 250);
    let randposZ = getRandomInt(200,1200);
    let randposY = getRandomInt(1,250);

    badbox.setAttribute('position', {x: posx, y: posy, z: posz});
    badbox.object3D.scale.set(scale, scale, scale);
    badbox.setAttribute('material', 'color', 'red');
    badbox.setAttribute('name', 'badbox');
    badbox.setAttribute('badbox', '');
    badbox.setAttribute('minus-score', '');
    badbox.setAttribute('class', 'badbox');
    badbox.setAttribute('animation', 'dur: 1200; easing: linear; loop: true; property: position; to:'+randPosX, randposY, randposZ);
    document.querySelector('a-scene').appendChild(badbox);
  }
}


