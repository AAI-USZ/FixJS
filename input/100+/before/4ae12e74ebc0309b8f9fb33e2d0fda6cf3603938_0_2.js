function detectCollision(){
	if(pongBall.x+pongBall.width >= canvas.width || pongBall.x <= 0){
		pongBall.vx *= -1;
	}
	if(pongBall.y <= rows*brick_height){
		for(var i = 0; i < bricks.length; i++){
			if(pongBall.y <= bricks[i].y+bricks[i].height){
				if(pongBall.x >= bricks[i].x && pongBall.x <= bricks[i].x+bricks[i].width){
					brickSound.play(); 	// Play ball hit brick sound
					bricks.splice(i, 1); 	// Remove affected brick
					score += 50;			// Add 50 points to score
					pongBall.vy *= -1; 		// Reverse Y-velocity
				}
			}
		}
		// Else pong ball hit the back wall
		if(pongBall.y <= 0){
			pongBall.vy *= -1;
		}
	}
	if(pongBall.y+pongBall.height >= canvas.height){
		lives--;
		ball_lock = false;
		// Destroy Ball
		if(lives >= 0){
			resetBall();
		} else{
			// Reset Game
			score = 0;
			lives = 3;
			resetBall();
		}
	}
	if(pongBall.x >= player.x && pongBall.x <= player.x+player.width){
		if(pongBall.y+pongBall.height >= player.y){

			// Modify X-direction of Ball
			var ball_modifier = 1;

			// So that pongball doesn't get velocity X of Zero
			if(pongBall.x > (player.x+player.width)/2){
				// Change ball X velocity depending on where it hits on paddle
				ball_modifier = (pongBall.x - player.x)*.04;
			} else if(pongBall.x < (player.x+player.width)/2){
				ball_modifier = -(pongBall.x - player.x)*.04;
			}

			paddleSound.play(); // Play ball hit paddle sound
			pongBall.vx *= ball_modifier;
			pongBall.vy *= -1;
		}
	}
}