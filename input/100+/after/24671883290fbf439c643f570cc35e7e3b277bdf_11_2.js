function TileMap(gs) {

	"use strict";

	var i,j;	// iterators

	var tiles = [

		gs.getImage('grass0.png'),

		gs.getImage('grass1.png'),

		gs.getImage('grass2.png')

	];

	var tileMap;

	

	this.load = function() {

		tileMap = new Array(0|(gs.getWidth()/tiles[0].width)+1);

		for (i=0;i<tileMap.length;i++) {

			tileMap[i] = new Array(0|(gs.getHeight()/tiles[0].height)+1);

			for (j=0;j<tileMap[i].length;j++) {

				if (Math.random()<.6)

					tileMap[i][j] = 0;

				else if (Math.random() < .85)

					tileMap[i][j] = 1;

				else

					tileMap[i][j] = 2;

			}

		}

	};



	this.draw = function() {

		for (i=0; i<gs.getWidth(); i+=32) {

			for (j=0;j<gs.getHeight(); j+=32) {

				gs.drawImage(tiles[tileMap[i/32][j/32]],i,j);

			}

		}

	};

}