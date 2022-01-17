function(){

		STAGE = new Kinetic.Stage({
			container: "container",
			width: WIDTH,
			height: HEIGHT
		});
		document.getElementById("container").style.height = HEIGHT + "px"; // So the bottom banner can freaking appear

		LAYER = new Kinetic.Layer();
		BULLETLAYER = new Kinetic.Layer();
		MSGLAYER = new Kinetic.Layer();
		STAGE.add(LAYER);
		STAGE.add(BULLETLAYER);
		STAGE.add(MSGLAYER);

		Setup();

		STAGE.onFrame(function(){ draw(); });

		// Start the fight!
		restart();
		STAGE.start();
		draw();
	}