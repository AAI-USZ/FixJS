function(){
	
	//This entire thing needs to be improved, this is a really brute force way to do things
	preloader('Sprites/Background.png',
				'Sprites/Bed.png',
				'Sprites/Water.png',
				'Sprites/Ladder.png',
				'Sprites/Bike.png',
				'Sprites/Food_Pellets.png',
				'Sprites/Drawer.png',
				'Sprites/Table.png',
				'Sprites/Chair.png',
				'Sprites/Thermostat.png'
			);
	
	//setup some of the external css for the dialogueScreen
	var rule = helper.findCSSRule('.speech');
	rule.style.width = parseInt($('#origins').css('width')) - 20 + 'px';
	rule.style.height = parseInt($('#origins').css('height'))  / 4 + 'px';
	
	/*
	 * Loading scripts this way is ok for production but not for developement
	 * as all files imported this way don't appear in the debugger
	 */
	/*
	var importer = ["<script type='text/javascript' src='klass.min.js'></script>",
					"<script type='text/javascript' src='Screen.js'></script>",
					"<script type='text/javascript' src='Sprite.js'></script>",
					"<script type='text/javascript' src='input.js'></script>",
					"<script type='text/javascript' src='DialogueScreen.js'></script>"].join("\n");
	
	$('head').append(importer);
	*/
	
	var mainScreen = new Screen('mainScreen', topZIndex);
	mainScreen.activeScreen = true;
	screenCollection[mainScreen.id] = mainScreen;
	
	var talkScreen = new DialogueScreen('talkScreen', bottomZIndex, 'IntroDial.xml');
	helper.ajaxGet(talkScreen);
	// talkScreen.activate();
	screenCollection[talkScreen.id] = talkScreen;
	
	var dialogueScreens = new Array();
	
	helper.altAjaxGet(dialogueScreens, 'IntroObjMainRm.xml');
	for(key in dialogueScreens){
		screenCollection[dialogueScreens[key].id] = dialogueScreens[key];
	}
	
	mainScreen.addSprite(new Sprite(0, 0, 'Sprites/Background.png', 'background'));
	mainScreen.addSprite(new dialogueSprite(999, 0, 'Sprites/Bed.png', 'Bed', dialogueScreens['sleeps']));
	mainScreen.addSprite(new dialogueSprite(199, 100, 'Sprites/Water.png', 'Water', dialogueScreens['water']));
	mainScreen.addSprite(new dialogueSprite(799, 300, 'Sprites/Bike.png', 'Bike', dialogueScreens['bike']));
	mainScreen.addSprite(new dialogueSprite(699, 0, 'Sprites/Ladder.png', 'Ladder', dialogueScreens['ladder']));
	mainScreen.addSprite(new dialogueSprite(99, 99, 'Sprites/Food_Pellets.png', 'Food_Pellets', dialogueScreens['food']))
	mainScreen.addSprite(new dialogueSprite(0, 349, 'Sprites/Drawer.png', 'Drawer', dialogueScreens['bookshelf']));
	mainScreen.addSprite(new dialogueSprite(350, 250, 'Sprites/Table.png', 'Table', dialogueScreens['table']));
	mainScreen.addSprite(new dialogueSprite(299, 300, 'Sprites/Chair.png', 'Chair', dialogueScreens['chair']));
	mainScreen.addSprite(new dialogueSprite(0, 49, 'Sprites/Thermostat.png', 'Thermostat', dialogueScreens['smallmonitor']));
	
	// console.log(screenCollection);
	
	startGame();
}