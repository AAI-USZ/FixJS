function(){
    if(!ball_lock){
	ball_lock = true;
	pongBall.vx = Math.random()*4-2; // X-velocity
	pongBall.vy = 2; // Y-velocity
    }
}