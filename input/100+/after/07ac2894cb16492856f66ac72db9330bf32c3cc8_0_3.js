function(){
	game = new enchant.nineleap.memory.Game(880, 760);
	game.fps = 30;
	game.preload(ImagePaths);
	game._debug = false;
    //enchant.nineleap.memory.LocalStorage.DEBUG_MODE = true;
    game.memory.player.preload();
    game.memories.ranking.preload();
    enchant.Sound.enabledInMobileSafari = true;
    
	game.onload = function(){
		var stage = new Stage();
		game.currentScene.addChild(stage);
        var start_screen = new StartScreen(stage.getManager("input"), stage.getManager("task"), stage.getManager("xml"), stage.getPanel().field);
        game.currentScene.addChild(start_screen);
        game.shows_conversation = true;                              //ピースが消えるときにエフェクトをかけるかどうか
	};

	game.keybind(32, 'a');
	game.keybind(80, 'b');
	game.keybind(77, 'c');

	['c'].forEach(function(type){
		this.addEventListener(type + 'buttondown', function(e) {
			if (!this.input[type]) {
				this.input[type] = true;
			}
		});
		this.addEventListener(type + 'buttonup', function(e) {
			if (this.input[type]) {
				this.input[type] = false;
			}
		});
	}, game);

	game.start();
}