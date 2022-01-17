function startGame() {
		
		stage = new Stage(canvas);
		screen_width = canvas.width;
		screen_height = canvas.height;
		
		blockSS = new SpriteSheet({
			images:[blockSpriteSheetAsset],
			frames: {width:20, height:20, regX:10, regY:10, numFrames:6},
			animations: {
				red: [0],
				yellow: [1],
				blue: [2],
				red_virus: [3],
				yellow_virus: [4],
				blue_virus: [5]
			}
		});
		//create temp game border
		var g = new Graphics();
		g.beginStroke(Graphics.getRGB(0,0,0)).drawRect(0,0,160,320);
		tempBorder = new Shape(g);
		tempBorder.x = 220;
		tempBorder.y = 140;

		//create grid
		testGrid = new Grid(230,150);
		testGrid.initViruses(0,blockSS);
		stage.addChild(testGrid);
		stage.update();
		testGrid.print();
		
		//create test pill
		testPill = new Pill(blockSS,290,150,"red","blue");
		stage.addChild(tempBorder,testPill);
		stage.update();
		
		Ticker.useRAF = true;
		Ticker.setFPS(60);
		Ticker.addListener(window);
	}