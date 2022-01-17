function PlayMode(gs) {

	"use strict";

	var music = gs.getSong('game.ogg');

	var tileMap = new TileMap(gs);

	var coins = new Array(5);

	var pauseImg = gs.getImage('pause.png');

	for (var i=0; i<coins.length; i++)

		coins[i] = new Coin(gs);

	var character = new Character(50,50,gs);



	this.init = function() {

		tileMap.load();

		gs.unloadMode('load');

		gs.setScreen(playScreen);

		music.play();

	};



	function playScreen() {

		character.move(1*(gs.keysDown[39]-gs.keysDown[37]),1*(gs.keysDown[40]-gs.keysDown[38]));

		draw();

		for (i=0; i<coins.length; i++)

			if (coins[i].collide())

				coins[i] = new Coin(gs);

		gs.clearCollisionMap();

	}



	function pauseScreen() {

		draw();

	}



	function loseScreen() {

	}



	function draw() {

		tileMap.draw();

		character.draw();

		for (i=0; i<coins.length; i++)

			coins[i].draw();

	}

}