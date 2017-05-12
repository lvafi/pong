import {SVG_NS} from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    //centr the Ball in board initially
    this.reset();
   
  }
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    //generate a random number between -5 and 5,that is not zero
    this.vy = 0;

    while( this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    
    // a number between -5 and 5, based on the vy
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallColision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <=0;
    const hitBottom = this.y +this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom){
      this.vy = -this.vy;
    }
  }

 //if moving toward right... 
 paddleCollision(player1, player2) {
  if (this.vx > 0) {
    //check for collision on player 2
    let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
    // if the right edge of the ball is  >= left edge of the paddleCollision
    //&& the right edge  bal <= right edge paddleCollision
    // && the ball y is >= the top edge of the paddle
    //&& the ball is <= the bottom edge of the paddle



  } else {
    //check for collision on player 1
  }
}

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallColision();

    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'cx', this.x),
    circle.setAttributeNS(null, 'cy', this.y),
    circle.setAttributeNS(null, 'r', this.radius),
    circle.setAttributeNS(null, 'fill', 'white'),
    
    svg.appendChild(circle);

  }

}