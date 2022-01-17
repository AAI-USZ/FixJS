function GameState(width, height, FRAME_RATE) {

	"use strict";

	var gs = this,

		i, j, k, n;	// iterator variables

	// PUBLIC

	// input variables

	gs.mousePosition = new Array(2);

	gs.mouseDown = false;

	gs.mousePressed = false;

	gs.keysDown = new Array(256);

	gs.keysPressed = [];

	// display management

	gs.ctx = null;						// the drawing canvas context

	gs.style = null;					// the handle for the style of the game container div



	// PRIVATE

	var

	// ---framerate management---

	// constants

		// FRAME_RATE						// frames per second

	// variables

		currentScreen = null,				// stores the current loop of the game. null if nothing is set to run

		time = null,						// a Date object storing the current time

		oldTime = null,						// the time at which the last frame was run, as a Date object

		timeRem = 0,						// if the game ends up taking more time than it should on a frame, it should try to catch up on subsequent frames.

												// this is especially important because javascript only allows frames to be run at millisecond counts divisible by 5.

												// at 60 fps, frames need to be run every 16.666... milliseconds

												// this variable lets us accurately maintain any framerate (provided the CPU can handle it)

		fpsPeriod = 1000 / FRAME_RATE,		// the time, in milliseconds, between frames



	// ---display resolution---

	// variables

		// width						// width of the drawing buffer, in pixels. if the game resolution is changed, this number should adjust to accurately reflect the aspect ratio.

		// height						// height of the drawing buffer, in pixels. if the game resolution is changed this number will NOT change.

											// instead, the canvas will be scaled so that the apparent height matches the resolution y value.

											// these width and height numbers contrast with ctx.canvas.width and ctx.canvas.height, which are the size of the canvas as it is drawn on the screen

											// width and height represent the space that the program has to draw on.

											// for example, if this.width == 600, this.height = 400, ctx.canvas.width == 1200, and ctx.canvas.height == 800

											// then a 50x50 square drawn from the canvas origin will appear as a 100x100 square on the screen

											// and a 600x600 square drawn from the origin will appear as a 1200x800 rectangle to the user because it will be cropped



	// modes

		modes = {},

	// user interaction

		collisionMap = [],

	// drawing

		currentMode = '',

		layout = []

	;



	// *************FUNCTIONS*****************

	// PUBLIC FUNCTIONS



	// this function fills the style and ctx variables that the game uses for all of its graphics operations

	// it also handles the error message for users whose browsers don't support HTML5

	// in the event that the browser doesn't support HTML5, this function will return false

	gs.init = function(containerID) {

		var canvas, container = document.getElementById(containerID);

		try {	// we don't want users without HTML5 support to see browser-generated error messages, so we'll put our canvas-making attempts in a try/catch block

			gs.style = container.style;



			canvas = document.createElement('canvas');

			while(container.hasChildNodes())

				container.removeChild(container.firstChild);

			container.appendChild(canvas);



			gs.ctx = canvas.getContext('2d');



			gs.setResolution(width, height);

		} catch(e) {

			return false;

		}



		window.addEventListener('mousemove',

			function(e) {

				gs.mousePosition = [(e.pageX - gs.ctx.canvas.parentNode.offsetLeft) * width / gs.ctx.canvas.width, (e.pageY - gs.ctx.canvas.parentNode.offsetTop) * height / gs.ctx.canvas.height];

			}, false);



		window.addEventListener('mousedown',

			function() {

				if (!gs.mouseDown)

					gs.mousePressed = true;

				else

					gs.mouseDown = true;

			}, false);



		window.addEventListener('mouseup',

			function() {

				gs.mouseDown = false;

			}, false);



		window.addEventListener('keydown',

			function(e) {

				if (!gs.keysDown[e.keyCode])

					gs.keysPressed[e.keyCode] = true;

				gs.keysDown[e.keyCode] = true;

			}, false);



		window.addEventListener('keyup',

			function(e) {

				gs.keysDown[e.keyCode] = false;

			}, false);



		for (i = 0; i < gs.keysDown.length; i++)

			gs.keysDown[i] = false;



		gs.clearCollisionMap();

		return true;

	};



	function checkFrame() {

		time = new Date();

		if ((timeRem + time.valueOf() - oldTime.valueOf()) >= (0|fpsPeriod)) {

			timeRem += time.valueOf() - oldTime.valueOf() - fpsPeriod;

			while (timeRem > 2 * fpsPeriod)

				timeRem -= fpsPeriod;

			oldTime = time;

			requestAnimationFrame(runFrame);

		}

		setTimeout(checkFrame,1);

	}



	function runFrame() {

		gs.ctx.clearRect(0, 0, width, height);

		currentScreen();

		gs.keysPressed = [];

		gs.mousePressed = false;

	}



	if (!window.requestAnimationFrame)

		window.requestAnimationFrame = runFrame;



	// this function begins the game loop using the current screen.

	// once this function is run, the game should continue its logic through the use of its modes and screens

	gs.start = function() {

		if (!oldTime) {			// if oldTime is defined, that means start has already been called. We don't want to allow start to be called multiple times

			oldTime = new Date();

			checkFrame();

		}

	};



	gs.loadMode = function(mode,modeName) {

		modes[modeName]=mode;

	};



	gs.unloadMode = function(modeName) {

		gs.loadMode(null,modeName);

	};



	gs.setMode = function(modeName) {

		currentMode = modeName;

		gs.clearCollisionMap();

		modes[modeName].init();

	};



	Audio.prototype.stop = function() {

		this.pause();

		this.currentTime = 0;

	};



	Audio.prototype.playSound = Audio.prototype.play;



	Audio.prototype.play = function() {

		if (this.currentTime)

			this.currentTime = 0;

		this.playSound();

	};



	gs.drawImage = function(img, x, y, flip, rotation, scaling) {

		if (!flip)

			flip = false;

		if (!scaling)

			scaling = 1;

		gs.ctx.save();

		gs.ctx.translate(x+scaling*img.width/2, y+scaling*img.height/2);

		gs.ctx.rotate(rotation);

		gs.ctx.scale(scaling*(1-2*flip),scaling);

		gs.ctx.drawImage(img, -img.width/2, -img.height/2);

		gs.ctx.restore();

	};



	gs.getWidth = function() {

		return width;

	};



	gs.getHeight = function() {

		return height;

	};



	gs.setScreen = function(screen) {

		currentScreen = screen;

	};



	// sets the resolution of the game to the x and y arguments

	// if fs is set, then the game will be scaled to fit the browser window

	// if stretch is also set, then both dimensions will scale to fill up all of the space even if the aspect ratios of the canvas and browser window do not match

	// the fs and stretch arguments should be treated as optional (ie setResolution(500,500) and setResolution(500,500,true) are both valid)

	gs.setResolution = function(x,y,fs,fill) {

		if (fs) {

			x = window.innerWidth;

			y = window.innerHeight;

			if (fill)

				width = 0|(height * x/y);

			else {

				if (window.innerWidth/width > window.innerHeight/height)

					x = 0|(width * y/height);

				else

					y = 0|(height * x/width);

			}

		}

		width = 0|((height * x/y)+.5);

		gs.ctx.canvas.width = x;

		gs.ctx.canvas.height = y;

		gs.ctx.scale(x/width,y/height);



		// changing the size of the canvas resets the canvas styles, so we have to set them again every time we resize

		gs.style.left="50%";

		gs.style.top="50%";

		gs.style.width=gs.ctx.canvas.width+"px";

		gs.style.height=gs.ctx.canvas.height+"px";

		gs.style.marginLeft="-"+(gs.ctx.canvas.width/2)+"px";

		gs.style.marginTop="-"+(gs.ctx.canvas.height/2)+"px";

	};



	gs.setLayout = function(layoutName) {

		layout = [];

		for (k in GameState.layouts[currentMode][layoutName])

			layout[k] = new LayoutElement(GameState.layouts[currentMode][layoutName][k]);

	};



	gs.drawLayoutElement = function(ID, override) {

		layout[ID].draw(override);

	};

	

	gs.clearLayout = function() {

		layout = [];

	};



	gs.setCollision = function(x, y, v) {

		if (x >= 0 && y >= 0 && x < width && y < height)

			collisionMap[(0|y) * width + (0|x)] = v;

	};



	gs.getCollision = function(x, y) {

		if (x >= 0 && y >= 0 && x < width && y < height)

			return collisionMap[(0|y) * width + (0|x)];

		else

			return null;

	};

	

	gs.clearCollisionMap = function() {

		for (i=0; i < width; i++)

			for (j=0; j <= height; j++)

				collisionMap[j*width+i] = null;

	};

	

	gs.drawCollisionMap = function() {

		var id = gs.ctx.createImageData(width,height);

		for (i=0; i<width*height*4; i+=4) {

			if (collisionMap[i/4]!==null) {

				id.data[i+0] = 0;

				id.data[i+1] = 255;

				id.data[i+2] = 255;

				id.data[i+3] = 255;

			}

		}

		gs.ctx.putImageData(id,0,0);

	};



	function LayoutElement(obj) {

		// we only declare the variables we need when we need them

		// for example, images don't need to declare txt properties

		var

			//img, txt,

			//size,

			//color,

			x, y,

			//hitbox,

			//textbox

			output		// when we override the content of the element, we want to make sure not to make the override permanent. so, we use an extra variable to hold whatever the element is displaying

		;

		x = width/2 + obj.x;



		if (obj.valign)

			y = height/2 + obj.y;

		else

			y = obj.y;



		if (obj.img) {

			var img = gs.getImage(obj.img);

			if (!obj.halign)

				x -= img.width/2;

			y -= img.height/2;

		}

		else if (obj.txt) {

			var

				size = obj.size,

				txt = obj.txt,

				color

			;

			gs.ctx.font = size + "px Arial";

			if (!obj.halign)

				x -= gs.ctx.measureText(txt).width/2;

			y -= size/2;

			if (obj.color)

				color = obj.color;

			else

				color = "#FFFFFF";

			if (obj.textbox)

				var textbox = obj.textbox;

		}



		// some objects may not need any hitboxes. otherwise, do hitbox math

		if (obj.hitbox) {

			var hitbox = {};

			if (typeof(obj.hitbox) === 'object') {

				hitbox = obj.hitbox;

			}

			else {

				hitbox.x = hitbox.w = x;

				hitbox.y = hitbox.h = y;

				hitbox.value = obj.hitbox;

				if (img) {

					hitbox.w += img.width;

					hitbox.h += img.height;

				}

				else if (txt) {

					hitbox.w += gs.ctx.measureText(txt).width;

					hitbox.h += size;

				}

			}

		}



		this.draw = function(override) {

			if (hitbox) {

				for (i=hitbox.x; i<hitbox.w; i++) {

					for (j=hitbox.y; j<hitbox.h; j++) {

						collisionMap[(0|j)*width+(0|i)]=hitbox.value;

					}

				}

			}



			if (override)

				output = override;

			else if (img)

				output = img;

			else if (txt)

				output = txt;



			if (output instanceof Image)

				gs.drawImage(output, x, y, false, 0, 1);

			else {

				gs.ctx.font = size + "px Arial";

				gs.ctx.textAlign = "start";

				gs.ctx.textBaseline = "top";

				gs.ctx.fillStyle = color;

				if (textbox) {

					var measure, string;

					i = 0;

					string = output;

					while (string) {

						measure = string;

						if (gs.ctx.measureText(measure).width > textbox) {

							while (gs.ctx.measureText(measure).width > textbox)

								measure = measure.slice(0, -1);

							if (measure.search(' ') > -1)

								while (measure[measure.length-1] !== ' ')

									measure = measure.slice(0, -1);

						}

						string = string.slice(measure.length);

						gs.ctx.fillText(measure, x, y+i);

						i += size;

					}

				}

				else

					gs.ctx.fillText(output, x, y);

			}

		};

	}

	

	this.Sprite = function(anims) {

		var curAnim, nextAnim;



		this.setAnim = function(animName) {

			curAnim = anims[animName];

			curAnim.reset();

		};



		this.draw = function(x,y,rotation,flip,scaling) {

			curAnim.draw(x,y,rotation,flip,scaling);

			nextAnim = curAnim.nextFrame();

			if (nextAnim)

				this.setAnim(nextAnim);

		};

	}

	

	this.Animation = function(frames, info) {

		// frames - stores an array of the images that the animation consists of

		// imgDurs - stores an array of the duration of each image in the animation

		// imgOrgs - stores an array of the origins of each image in the animation

		// the indices of each array correspond to each other; frames[n] lasts imgDurs[n] frames and has an origin of imgOrgs[n]

		var

			imgID = 0,

			frameCount = 0,



			nextName = info.next,

			imgDurs = [],

			imgOffs = []

		;



		for (k=0; k<info.images; k++) {

			imgDurs.push(info.durations[k]);

			imgOffs.push(new Array(2));

			imgOffs[k][0] = info.offsets[k][0];

			imgOffs[k][1] = info.offsets[k][1];

		}



		this.reset = function() {

			imgID = 0;

			frameCount = 0;

		};



		this.nextFrame = function() {

			frameCount++;

			if (frameCount>=imgDurs[imgID]) {

				frameCount=0;

				imgID++;

				if (imgID==frames.length) {

					imgID = 0;

					return nextName;

				}

			}

			return false; // if the animation is complete, this function returns the name of the next animation instead

		};



		this.draw = function(x,y,flip,rotation,scaling) {

			if (!flip)

				flip = false;

			if (!scaling)

				scaling = 1;

			gs.drawImage(frames[imgID],x+imgOffs[imgID][0]-(imgOffs[imgID][0]*flip),y+imgOffs[imgID][1],flip,rotation,scaling);

		};

	}

}