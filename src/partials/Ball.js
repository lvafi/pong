  import { SVG_NS } from '../settings';

  export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/pong-01.wav');
    

    //centr the Ball in board initially
    this.reset();

  }
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    //generate a random number between -5 and 5,that is not zero
    this.vy = 0;

    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    // a number between -5 and 5, based on the vy
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallColision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  //if moving toward right... 
  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      //check for collision on player 2
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x + this.radius >= leftX  // if the right edge of the ball is  >= left edge of the paddleCollision
        && this.x + this.radius <= rightX  //&& the right edge  bal <= right edge paddleCollision
        && this.y >= topY  // && the ball y is >= the top edge of the paddle
        && this.y <= bottomY    //&& the ball is <= the bottom edge of the paddle)
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }

    } else {
      //check for collision on player 1
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        this.x - this.radius <= rightX //left edge of the ball is <= right edge of the paddle
        && this.x + this.radius >= leftX//left edge of the ball is >= left edge of the paddle
        && this.y >= topY //&& ball Y >= paddle top
        && this.y <= bottomY // &&ball Y<= paddle bottom
      ){
        this.vx = -this.vx;
          this.ping.play();
      }
    }
  }

  goal(player) {
    player.score++;
    this.reset();

  }


  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallColision();
    this.paddleCollision(player1, player2);

    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'cx', this.x),
      circle.setAttributeNS(null, 'cy', this.y),
      circle.setAttributeNS(null, 'r', this.radius),
      circle.setAttributeNS(null, 'fill', 'white'),

        svg.appendChild(circle);
        //Detect goal
        const rightGoal = this.x + this.radius >= this.boardWidth;
        const leftGoal = this.x - this.radius <=0;
        
      if ( rightGoal ) {
        this.goal(player1);
        this.direction = 1;
        console.log('hitright');

      } else if( leftGoal ) {
        this.goal(player2);
        this.direction = -1;
        console.log('hitleft');
      }
  }

  }