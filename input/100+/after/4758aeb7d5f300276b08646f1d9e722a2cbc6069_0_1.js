function () {


	var now = Date.now();
	var delta = now - then;
	time++;
	$('#timer').html(time + "-" + gameOver);	
	

	//aparición paseante
	if(time%500==0){
		paseanteActivo = true;
	}
	//parada del paseante cuando sale de escena
	if(paseante.x>500){
		paseanteActivo = false;
		paseante.x=0;

	}

	//if(lifePoints > 0){
		update(delta / 1000);
		render();
		then = now;
	//}

	if(lifePoints <= 0){
	
		gameOver = true;

	}

	if(gameOver){
		// GAME OVER
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "34px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Game Over", 170, 200);

	
	}

	if(gameOver && (37 in keysDown ||38 in keysDown ||39 in keysDown ||40 in keysDown)){
		gameOver = false;
		lifePoints = 3;
		points = 0;
	}

}