function LoadingMode(loadingFunctions,gs) {

	"use strict";

	var halt = 0;

	var frameCount = 0;



	gs.ctx.textAlign="center";

	gs.ctx.font="30px sans-serif";

	gs.ctx.fillStyle="rgb(255,255,255)";



	this.init = function() {

		gs.setScreen(loadScreen);

	};



	function loadScreen() {

		if (!halt) {

			if (frameCount && frameCount<=loadingFunctions.length) {

				gs.ctx.fillText(loadingFunctions[frameCount-1][1],gs.getWidth()/2,gs.getHeight()/2+20);

				loadingFunctions[frameCount-1][0]();

			}

			frameCount++;

		}

	}



	LoadingMode.waitFor = function(img) {

		halt++;

		if (img.complete)

			halt--;

		else {

			img.onload = function() {

				halt--;

			};

		}

	}

}