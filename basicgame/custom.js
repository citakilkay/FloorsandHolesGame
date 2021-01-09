var character = document.getElementById("character");
var interval;
var both = 0;
var game = document.getElementById("game");
var sayac = 0;
var floorSpace = 0;
var currentFloor = [];
var gameover = false;
var gameSpeed = 0.1;
var fgameSpeed = setInterval(function () {
    gameSpeed = gameSpeed + 0.1;
}, 3000);


function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > 10) {
        character.style.left = left - 2 + "px";
    }

}

function moveRight() {

    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < 460) {
        character.style.left = left + 2 + "px";
    }
}
document.addEventListener("keydown", event => {
    if (both == 0) {
        both++;
        if (event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1);
        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1);
        }
    }
});
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both = 0;
});
var floors = setInterval(function () {
    var lastFloor = document.getElementById("floorId" + (sayac - 1));
    var lastHole = document.getElementById("holeId" + (sayac - 1));
    if (sayac > 0) {
        var floorLastTop = parseInt(window.getComputedStyle(lastFloor).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(lastHole).getPropertyValue("top"));
    }

    if (floorLastTop < 600 || sayac == 0) {
        var floor = document.createElement("div");
        var hole = document.createElement("div");
        floor.setAttribute("class", "floorClass");
        hole.setAttribute("class", "holeClass");
        floor.setAttribute("id", "floorId" + sayac);
        hole.setAttribute("id", "holeId" + sayac);
        floor.style.top = floorLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        var random = Math.floor(Math.random() * 455);
        hole.style.left = random + "px";
        game.appendChild(floor);
        game.appendChild(hole);
        currentFloor.push(sayac);
        sayac++;
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if (characterTop <= 0) {
        alert("Game over. Score: " + ((sayac - 3) * 10));
        clearInterval(floors);
        location.reload("Start");
    }

    for (let i = 0; i < currentFloor.length; i++) {
        let current = currentFloor[i];
        let ifloor = document.getElementById("floorId" + current);
        let ihole = document.getElementById("holeId" + current);
        let ifloorTop = parseFloat(window.getComputedStyle(ifloor).getPropertyValue("top"));
        let iholeTop = parseFloat(window.getComputedStyle(ihole).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        ifloor.style.top = ifloorTop - gameSpeed + "px";
        ihole.style.top = iholeTop - gameSpeed + "px";
        if (ifloorTop < -20) {
            currentFloor.shift();
            ifloor.remove();
            ihole.remove();
        }
        if (ifloorTop - 20 < characterTop && ifloorTop > characterTop) {
            drop++;
            if (iholeLeft <= characterLeft && iholeLeft + 40 > characterLeft) {

                drop = 0;
            }
        }
    }
    if (drop == 0) {
        if (characterTop < 670) {
            character.style.top = characterTop + 4 + "px";
        }
    } else {
        character.style.top = characterTop - gameSpeed + "px";
    }

}, 1);