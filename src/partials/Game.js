
	import { SVG_NS, KEYS, PADDLE, SCORE } from '../settings';
	import Board from './Board';
	import Paddle from './Paddle';
	import Ball from './Ball';
	import Score from './Score';
	

	export default class Game {

		constructor(element, width, height) {
			// this.element = element;
			this.width = width;
			this.height = height;

			this.gameElement = document.getElementById(element);
      this.padding = 10;
			this.paddleWidth = PADDLE.width;
			this.paddleHeight = PADDLE.height;
			this.radius = 8;

			document.addEventListener('keydown', event => {
				if (event.key === KEYS.spaceBar) {
					this.pause = !this.pause;
        }
			});
			this.reset();
		}

    reset() {
			this.board = new Board(this.width, this.height);
			this.ball = new Ball(
				this.radius,
				this.width,
				this.height
			)
      this.player1 = new Paddle(
			  this.height,
				this.paddleWidth,
				this.paddleHeight,
				this.padding,
				((this.height - this.paddleHeight) / 2),
		  	KEYS.a,
		  	KEYS.z
		)
      this.player2 = new Paddle(
				this.height,
				this.paddleWidth,
				this.paddleHeight,
				(this.width - this.paddleWidth - this.padding),
				((this.height - this.paddleHeight) / 2),
		    KEYS.up,
			  KEYS.down
		)
    this.player1Score= new Score(this.width/2 -SCORE.distance,SCORE.topDistance,SCORE.size);
		this.player2Score= new Score(this.width/2 +SCORE.distance,SCORE.topDistance,SCORE.size);	
}
			

render() {
			if (this.pause) { return;	}

			if (this.player1.score >= 11) {
				if (confirm('Player 1 Wins! Click OK to play again!')) {
					this.reset();
				} else { (location.reload()) }
			}
			if (this.player2.score >= 11) {
				if (confirm('Player 2 Wins! Click OK to play again!')) {
					this.reset();
				} else { (location.reload()) }
			}

      //render game
			this.gameElement.innerHTML = '';
      let svg = document.createElementNS(SVG_NS, 'svg');
			svg.setAttributeNS(null, 'width', this.width);
			svg.setAttributeNS(null, 'height', this.height);
			svg.setAttributeNS(null, 'fill', `0 0 ${this.width} ${this.height}`);
			this.gameElement.appendChild(svg);


			this.board.render(svg);
			this.player1Score.render(svg, this.player1.score);
			this.player2Score.render(svg, this.player2.score);
      this.player1.render(svg);
			this.player2.render(svg);
			this.ball.render(svg, this.player1, this.player2);


		}

}	