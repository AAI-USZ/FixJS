function TitleMode(gs) {

	// CONSTRUCTOR

	// this is the image of the game logo

	var title = {

		"x":gs.getWidth()/2,

		"y":20,

		"img":gs.getImage('title.png')

	};



	// these are the buttons which will be displayed on the main title screen

	var titleButtons = {

		"play":{

			"x":gs.getWidth()/2,

			"y":gs.getHeight()/2+20

		},

		"options":{

			"x":gs.getWidth()/2,

			"y":gs.getHeight()/2+60

		}

	};



	// these are the buttons which will be displayed on the options screen

	var optionButtons = {

		"fullscreen":{

			"x":gs.getWidth()/2,

			"y":gs.getHeight()/2+20

		},

		"actual":{

			"x":gs.getWidth()/2,

			"y":gs.getHeight()/2+60

		},

		"back":{

			"x":gs.getWidth()/2-200,

			"y":gs.getHeight()/2+40

		}

	};



	for (img in titleButtons)

		titleButtons[img].img = gs.getImage(img+'_button.png');

	for (img in optionButtons)

		optionButtons[img].img = gs.getImage(img+'_button.png');

		

	var menuSound = gs.getSound('menu.wav');

	var music = gs.getSong('title.ogg');

	// END CONSTRUCTOR



	// INIT FUNCTION

	this.init = function() {

		gs.unloadMode('load');

		setButtons(titleButtons);

		gs.setScreen(titleScreen);

		music.play();

	};



	// SCREENS

	function titleScreen() {

		if (gs.mousePressed) {

			var button = gs.getCollision(gs.mousePosition[0],gs.mousePosition[1]);

			switch (button)

			{

			case 'play':

				menuSound.stop();

				menuSound.play();

				music.stop();

				gs.loadMode(new LoadingMode([

						[function() {

							gs.loadMode(new PlayMode(gs),'play');

						},'Loading Resources...'],

						[function() {

							gs.setMode('play');

							gs.unloadMode('title');

						},'Starting Game...']

					],gs),'load');

				gs.setMode('load');

				break;

			case 'options':

				menuSound.stop();

				menuSound.play();

				gs.clearCollisionMap();

				setButtons(optionButtons);

				gs.setScreen(optionsScreen);

				break;

			}

		}

		title.img.draw(title.x-title.img.width/2,title.y);

		for (img in titleButtons)

			titleButtons[img].img.draw(titleButtons[img].x-titleButtons[img].img.width/2,titleButtons[img].y-titleButtons[img].img.height/2);

	}



	function optionsScreen() {

		if (gs.mousePressed) {

			var button = gs.getCollision(gs.mousePressed[0],gs.mousePressed[1]);

			switch (button)

			{

			case 'fullscreen':

				menuSound.stop();

				menuSound.play();

				gs.style.border='none';

				gs.setResolution(gs.getWidth(),gs.getHeight(),true);

				break;

			case 'actual':

				menuSound.stop();

				menuSound.play();

				gs.style.border='ridge';

				gs.setResolution(gs.getWidth(),gs.getHeight());

				break;

			case 'back':

				menuSound.stop();

				menuSound.play();

				gs.clearCollisionMap();

				setButtons(titleButtons);

				gs.setScreen(titleScreen);

				break;

			}

		}

		title.img.draw(title.x-title.img.width/2,title.y);

		for (img in optionButtons)

			optionButtons[img].img.draw(optionButtons[img].x-optionButtons[img].img.width/2,optionButtons[img].y-optionButtons[img].img.height/2);

	}

	// END SCREENS



	// sets the collision map to the name of the buttons where they are drawn

	function setButtons(buttons) {

		for (img in buttons) {

			for (var i=buttons[img].x-buttons[img].img.width/2; i<buttons[img].x+buttons[img].img.width/2; i++) {

				for (var j=buttons[img].y-buttons[img].img.height/2; j<buttons[img].y+buttons[img].img.height/2; j++) {

					gs.setCollision(i,j,img);

				}

			}

		}

	}



	// DESTRUCTOR

	this.destroy = function() {

		title.img.destroy();

		for (img in titleButtons)

			titleButtons[img].img.destroy();

		for (img in optionButtons)

			optionButtons[img].img.destroy();

		delete title;

		delete titleButtons;

		delete optionButtons;

		menuSound.destroy();

		delete this;

	};

}