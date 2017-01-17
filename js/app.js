// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // enemy starts from 0 when it reaches end of canvas
    if(this.x >= 505){
      this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,speed){
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt){
  // check if player runs into left, bottom, or right canvas walls
  // prevent player from moving beyond canvas wall boundaries
  //console.log("this.y: "+this.y);
  if(this.y >= 383){
    this.y = 383;
    //console.log("this.x: "+this.x);
  }
  if(this.x > 402.5){
    this.x = 402.5;
  }
  if(this.x < 2.5){
    this.x = 2.5;
  }
  this.checkCollision();
};
Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
  displayScoreAndLevel(score,gameLevel);
};

// var upPressed = false;
// var downPressed = false;
// var leftPressed = false;
// var rightpressed = false;

//function to display score and gameLevel
var canvas = document.getElementByTagName
var displayScoreAndLevel = function(score,gameLevel){
  var canvas = document.getElementsByTagName('canvas');
  var firstCanvasTag = canvas[0];

   // add player score and level to div element created
   scoreLevelDiv.innerHTML = 'Score: ' + score
       + ' / ' + 'Level: ' + gameLevel;
   document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
}

Player.prototype.handleInput = function(event){
  if(event == 'left'){
    this.x -= this.speed;
  }
  if(event == 'right'){
    this.x += this.speed;
  }
  if(event == 'up'){
  //this.y -= this.speed;
    this.y = this.y - 83;
   if (this.y < 50) {
    // alert ("YOU WON");
    score += 1;
    gameLevel += 1;
     IncreaseEnemies(gameLevel);
     this.reset();
   };
  }
  if(event == 'down'){
    this.y += this.speed;
  }
};



// Increase number of enemies as player finishes a level
var IncreaseEnemies = function(enemies){
  console.log(enemies);
  allEnemies.length = 0;
-
  for(var i = 0; i < enemies; i++){
    var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
    allEnemies.push(enemy);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(202.5,383,50);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
console.log(enemy);
allEnemies.push(enemy);

Player.prototype.checkCollision = function(){
  for (var i = 0; i < allEnemies.length; i++) {
    if (allEnemies[i].x + 40 > this.x && this.x + 40 > allEnemies[i].x
      && allEnemies[i].y + 50 > this.y && this.y + 50 > allEnemies[i].y) {
      score = 0;
      gameLevel = 1;
      alert("YOU LOST");
      this.reset();
    };
  };
};

Player.prototype.reset = function(){
  this.x = 200;
  this.y = 392;

}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});
