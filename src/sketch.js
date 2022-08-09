
window.arcade=true
window.arcade1=false

var player;
var computer;
var ball;
var playerServe;
var goalWaitPeriod = false;
// for sparks effect on goal
var sparks = [];
// for lightning effect before serve
var lightningForge;
// for paddle animations
var isPlayerForcePush = false;
var isCompForcePush = false;
var xoff = 0.0;
let sketch = function(p) {

  var height = window.innerHeight <= 542 ? window.innerHeight - 20 : 522;
  var width = window.innerWidth <= 957 ? window.innerWidth - 20 : 937;
  p.setup = function() {
  var c = p.createCanvas(width, height);
  c.parent('p5Div');

  player = new Player();
  computer = new Computer();
  ball = new Ball(width / 2, height / 2);
  scoreboard = new Scoreboard();
  playerServe = true;
  // indicator animation that a serve is coming
  lightningForge = new LightningForge();

  p.textSize(32);
  p.textFont("Futura");
}

p.draw = function() {
  if (goalWaitPeriod) {
    // Screen Shakes (number 13 chosen for extra spookiness)
    p.translate(p.random(-13, 13), p.random(-13, 13));
  }

  p.background(25);

  p.stroke(255);
  p.line(width / 2, 0, width / 2, height);

  player.update();
  if (p.keyIsDown(p.UP_ARROW)) {
    player.move(0, -7);
  } else if (p.keyIsDown(p.DOWN_ARROW)) {
    player.move(0, 7);
  }

  player.show();
  if (isPlayerForcePush) {
    player.paddle.forceUpdate("player");
  }

  computer.update();
  if (isCompForcePush) {
    computer.paddle.forceUpdate("computer");
  }
  computer.show();

  p.text(scoreboard.playerScore + " / 7", width / 2 - 140, 60);
  p.text(scoreboard.computerScore + " / 7", width / 2 + 60, 60);

  for (var i = sparks.length - 1; i >= 0; i--) {
    sparks[i].update();
    sparks[i].show();
    if (sparks[i].done()) {
      sparks.splice(i, 1);
    }
  }

  if (scoreboard.gameOver()) {
    p.fill(25, 123);
    p.noStroke();
    p.rect(0, 0, width, height);
    p.fill(255);
    var result =
      scoreboard.playerScore > scoreboard.computerScore
        ? "You win! "
        : "You lose! ";
        p.text(
      result + scoreboard.playerScore + " to " + scoreboard.computerScore + ".",
      width / 2 - 130,
      height / 2 - 40
    );
    // p.text("Press spacebar to play again.", width / 2 - 220, height / 2);
  } else {
    if (!goalWaitPeriod) {
      if (lightningForge.forgeIsFormed()) {
        ball.update();
        ball.show();
      } else {
        lightningForge.update();
        lightningForge.show();
      }
    }
  }
}
keyPressed = function() {
  // if game over and spacebar is pressed
  if (scoreboard.gameOver && keyCode === 32) {
   console.log('zebiiiiiiiiiiiiiiiiiiiiiii');
    scoreboard.resetScore();
  }
}

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.xspeed = 0;
  this.yspeed = 0;
  this.forcePushTime = 0;

  this.show = function () {
    if (isPlayerForcePush) {
      p.fill(255);
    } else {
      p.fill(240);
    }
    p.rect(this.x, this.y, this.width, this.height, 5);
  };

  this.forceUpdate = function (pType) {
    if (this.forcePushTime < 6) {
      this.x -= 1;
      this.width += 2;
      this.y -= 1;
      this.height += 2;
      this.forcePushTime += 1;
    } else if (this.forcePushTime < 12) {
      this.x += 1;
      this.width -= 2;
      this.y += 1;
      this.height -= 2;
      this.forcePushTime += 1;
    } else {
      if (pType === "player") {
        isPlayerForcePush = false;
      } else {
        isCompForcePush = false;
      }
      this.forcePushTime = 0;
    }
  };
}

function Scoreboard() {
  this.playerScore = 0;
  this.computerScore = 0;

  this.gameOver = function () {
    return this.playerScore === 7 || this.computerScore === 7;
  };

  this.resetScore = function () {
    this.playerScore = 0;
    this.computerScore = 0;
  };

  this.playerScored = function () {
    this.playerScore += 1;
  };

  this.computerScored = function () {
    this.computerScore += 1;
  };
}

function Player() {
  this.paddle = new Paddle(30, height / 2 - 25, 20, 70);

  this.update = function () {
    this.paddle.xspeed = 0;
    this.paddle.yspeed = 0;
  };

  this.move = function (x, y) {
    this.paddle.x += x;
    this.paddle.y += y;
    this.paddle.xspeed = x;
    this.paddle.yspeed = y;
    if (this.paddle.y < 0) {
      // all the way to the top
      this.paddle.y = 0;
      this.paddle.yspeed = 0;
    } else if (this.paddle.y + this.paddle.height > height) {
      // all the way to the bottom
      this.paddle.y = height - this.paddle.height;
      this.paddle.yspeed = 0;
    }
  };

  this.show = function () {
    this.paddle.show();
  };
}

function Computer() {
  this.paddle = new Paddle(width - 50, height / 2 - 25, 20, 70);

  this.move = function (x, y) {
    this.paddle.x += x;
    this.paddle.y += y;
    this.paddle.xspeed = x;
    this.paddle.yspeed = y;
    if (this.paddle.y < 0) {
      // all the way to the top
      this.paddle.y = 0;
      this.paddle.yspeed = 0;
    } else if (this.paddle.y + this.paddle.height > height) {
      // all the way to the bottom
      this.paddle.y = height - this.paddle.height;
      this.paddle.yspeed = 0;
    }
  };

  this.update = function () {
    var yPos = ball.y;
    var diff = -(this.paddle.y + this.paddle.height / 2 - yPos);
    if (diff < 0 && diff < -4) {
      // max speed up
      diff = -8;
    } else if (diff > 0 && diff > 4) {
      // max speed down
      diff = 8;
    }
    this.move(0, diff);
    if (this.paddle.y < 0) {
      this.paddle.y = 0;
    } else if (this.paddle.y + this.paddle.height > height) {
      this.paddle.y = height - this.paddle.height;
    }
  };

  this.show = function () {
    this.paddle.show();
  };
}

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.xspeed = -6;
  this.yspeed = p.random(-1, 1);
  this.vel = p.createVector(this.xspeed, this.yspeed);
  this.radius = 40;
  this.yoff = p.random(1000);

  this.resetBall = function () {
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed = playerServe ? -6 : 6;
    this.yspeed = p.random(-1, 1);
    this.vel.x = this.xspeed;
    this.vel.y = this.yspeed;
  };

  this.inDangerZone = function (x, y) {
    return x < 200 || x > width - 200;
  };

  this.update = function () {
    this.x += this.xspeed;
    this.y += this.yspeed;
    this.vel.x = this.xspeed;
    this.vel.y = this.yspeed;

    if (this.y - this.radius <= 0) {
      // hitting the top wall
      this.y = this.radius;
      this.yspeed = -this.yspeed;
    } else if (this.y + this.radius > height) {
      // hitting the bottom wall
      this.y = height - this.radius;
      this.yspeed = -this.yspeed;
    }

    // a point was scored
    if (this.x - this.radius / 2 < 0 || this.x + this.radius / 2 > width) {
      var xSpot = this.x - this.radius / 2 < 0 ? 0 : width;
      p.shootSparks(xSpot, this.y, -this.xspeed);
      goalWaitPeriod = true;
      setTimeout(function () {
        goalWaitPeriod = false;
        lightningForge.resetLightningForge();
      }, 500);
      xSpot === 0 ? scoreboard.computerScored() : scoreboard.playerScored();
      playerServe = !playerServe;
      this.resetBall();
    }

    var paddle1 = player.paddle;
    var paddle2 = computer.paddle;
    if (
      this.y + this.radius / 2 >= paddle1.y &&
      this.y - this.radius / 2 <= paddle1.y + paddle1.height &&
      this.x - this.radius / 2 <= paddle1.x + paddle1.width
    ) {
      // hit the player's paddle
      this.yspeed += paddle1.yspeed / 2;

      isPlayerForcePush = true;
      this.xspeed = 10;

      this.x += this.xspeed;
    }

    if (
      this.y + this.radius / 2 >= paddle2.y &&
      this.y - this.radius / 2 <= paddle2.y + paddle2.height &&
      this.x + this.radius / 2 >= paddle2.x
    ) {
      isCompForcePush = true;
      this.xspeed = -10;
      // hit the computer's paddle
      this.yspeed += paddle2.yspeed / 2;
      this.x += this.xspeed;
    }
  };

  this.show = function () {
    if (!goalWaitPeriod) {
      p.noStroke();
      p.fill(100);

      var danger = this.inDangerZone(this.x, this.y);
      p.push();
      p.translate(this.x, this.y);
      p.rotate(this.vel.heading() - 80);

      // Outer Rectangle
      var rect_offset = 0.0 * this.radius;
      p.fill(226, 228, 236);
      p.rectMode(p.CENTER);
      p.rect(rect_offset, rect_offset, 80, 60, 15, 15, 15);

      // Inner Rectangle
      p.fill(2, 44, 80);
      p.rectMode(p.CENTER);
      p.rect(rect_offset, rect_offset, 60, 40, 15, 15, 15);

      // EYES
      this.yoff += 0.08;

      var eyeOffset = 0.23 * this.radius;

      p.stroke(3, 253, 255);
      p.fill(3, 253, 255);
      if (danger) {
        p.text("^", -eyeOffset * 2, 10);
        p.text("^", eyeOffset / 2, 10);
      } else {
        p.ellipse(
          -eyeOffset,
          -eyeOffset + 7,
          0.26 * this.radius,
          0.5 * this.radius
        );
        p.ellipse(
          eyeOffset,
          -eyeOffset + 7,
          0.26 * this.radius,
          0.5 * this.radius
        );
      }

      p.pop();
    }
  };
}

// this.show = function() {
//   if (!goalWaitPeriod) {
//     noStroke();
//     fill(255);
//     var danger = this.inDangerZone(this.x, this.y);
//     push();
//     translate(this.x, this.y);
//     rotate(this.vel.heading() - 80);
//     beginShape();
//     var xoff = 0;
//     for (var a = 0; a < TWO_PI; a += 0.1) {
//       var offset;
//       if (a > PI/6 && a < 5 * PI/6) {
//         offset = map(noise(xoff, this.yoff), 0, 1, -0.31 * this.radius, 0.78 * this.radius);
//       } else {
//         offset = map(noise(xoff, this.yoff), 0, 1, -0.08 * this.radius, 0.08 * this.radius);
//       }
//       var r = this.radius + offset;
//       var x = r * cos(a);
//       var y = r * sin(a);
//       vertex(x, y);
//       xoff += 0.1;
//     }
//     endShape(CLOSE);

//     this.yoff += 0.08;

//     var eyeOffset = 0.23 * this.radius;

//     stroke(54);
//     fill(54);
//     if (danger) {
//       text(">", -eyeOffset * 2, 0);
//       text("<", eyeOffset/2, 0);
//     } else {
//       ellipse(-eyeOffset, -eyeOffset, 0.26 * this.radius, 0.5 * this.radius);
//       ellipse(eyeOffset, -eyeOffset, 0.26 * this.radius, 0.5 * this.radius);
//     }
//     pop();
//   }
// }
// };
p.shootSparks = function(x, y, xVel) {
  for (var i = 0; i < 50; i++) {
    var s = new Spark(x, y, xVel);
    sparks.push(s);
  }
}

function Spark(x, y, xVel) {
  this.pos = p.createVector(x, y);
  this.lifespan = 255;

  this.vel = p.createVector(p.random(0, xVel), p.random(-xVel, xVel));
  // we just want the direction
  this.vel.normalize();
  // then add random speed
  this.vel.mult(p.random(0, 10));

  this.update = function () {
    this.vel.mult(0.95);
    this.lifespan -= 5;
    this.pos.add(this.vel);
  };

  this.done = function () {
    return this.lifespan < 0;
  };

  this.show = function () {
    if (!this.done()) {
      p.noStroke();
      p.fill(255, this.lifespan);
      p.rect(this.pos.x, this.pos.y, this.lifespan / 20, this.lifespan / 20, 3);
    }
  };
}

function LightningForge() {
  this.x = width / 2;
  this.y = height / 2;
  this.lifespan = 355;
  this.history = [];

  this.resetLightningForge = function () {
    this.x = width / 2;
    this.y = height / 2;
    this.lifespan = 355;
    this.history = [];
  };

  this.forgeIsFormed = function () {
    return this.lifespan < 0;
  };

  this.update = function () {
    this.lifespan -= 5;

    for (var i = 0; i < this.history.length; i++) {
      this.history[i].x += p.random(-2, 2);
      this.history[i].y += p.random(-5, 5);
    }

    var v = p.createVector(this.x, this.y);
    this.history.push(v);
    if (this.history.length > 100) {
      this.history.splice(0, 1);
    }
  };

  this.show = function () {
    p.push();
    p.stroke(255);
    p.strokeWeight(4);
    p.line(width / 2, 0, width / 2, height);
    p.noFill();
    p.beginShape();
    for (var i = 0; i < this.history.length; i++) {
      var pos = this.history[i];
      p.vertex(pos.x, pos.y);
    }
    p.endShape(p.CLOSE);
    p.pop();
  };
}

}
// myp5 = new p5(sketch);
setInterval(function() {
  console.log("arcade:",window.arcade);
  console.log("arcade1:",window.arcade1);
  if(window.arcade===false && window.arcade1===false) {  myp5 = new p5(sketch);
    console.log('wael');
    window.arcade1=true
  }
  if(window.arcade===true && window.arcade1===true){
    myp5.remove()
    window.arcade1=false

  }
}, 1000/60);
