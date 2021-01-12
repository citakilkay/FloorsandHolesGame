/*var elipsXone = 20;
var elipsYone = 50;
var elipsXtwo = 50;
var elipsYtwo = 80;
var elipsXthree = 100;
var elipsYthree = 120;
var bounceX = true;
var bounceY = true;
var redColor = 10;
var greenColor = 200;
var blueColor = 70;*/
function setup() {
    createCanvas(1500, 800);
}

function draw() {
    const redColor = map(mouseX,0,width,0,255);
    const greenColor = map(mouseY,0,height,0,255);
    const blueColor = map(mouseX,mouseY, height,0,255);
    fill(redColor,blueColor,greenColor);
    noStroke();
   /* var bounceBall = function(posX,posY){
        if (bounceX) {
        posX = posX + 5;
        redColor = (redColor + 1) % 256;
        greenColor = (greenColor + 1) % 256;
        if (posX >= width) {
            bounceX = false;
        }
    } else if (!bounceX) {
        redColor = (redColor + 2) % 256;
        greenColor = (greenColor + 1) % 256;
        posX = posX - 5;
        if (posX <= 0) {
            bounceX = true;
        }
    }
    if (bounceY) {
        blueColor = (blueColor + 1) % 256;
        posY = posY + 5;
        if (posY >= height) {
            bounceY = false;
        }
    } else if (!bounceY) {
        blueColor = (blueColor + 2) % 256;
        posY = posY - 5;
        if (posY <= 0) {
            bounceY = true;
        }
    }
    }
    bounceBall(elipsXone,elipsYone);
    bounceBall(elipsXtwo,elipsYtwo);
    bounceBall(elipsXthree,elipsYthree);
    background(150, 140, 135);
    
    noStroke();
    fill(redColor,greenColor,blueColor);
    strokeWeight(4);
    ellipse(elipsXone, elipsYone, 35);
    ellipse(elipsXtwo,elipsYtwo,70);
    ellipse(elipsXthree,elipsYthree,120);*/

    translate(mouseX,mouseY);
    const rotation = map(mouseY,0,width,0,TWO_PI);
    rotate(rotation);
    strokeWeight(2);
    stroke(greenColor,redColor,blueColor);
    line(-100,0,150,0);

}