function init() {
	canvas = document.getElementById("testCanvas");
	stage = new Stage(canvas);

    stage.addChild(gameContainer);
    gameContainer.alpha=0.1;

	start();
}