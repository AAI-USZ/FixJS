f


	/* Constants */

	var WIDTH = 1024, HEIGHT = 640;

	var MS_PER_FRAME = 25;

	var PLANET_RADIUS = 80;

	var BLOCK_WIDTH = 4;

	var PLANET_THRESHOLD = 40;

	var CANNON_THRESHOLD = 30;

	var MAX_LEVELS = 8;

	var NO_BUILD =0, TOWER = 1, CANNON = 2;

	var REBUILD = 0, WAR = 1;

	var SHOOTING_ANGLE = Math.PI; // In radians

	var MISSILE_SPEED = 6, EXPLOSION_RADIUS = 2;

	var NO_COL = 0, COL_PLANET = 1, COL_BUILDINGS = 2, COL_OUTBOUNDS = 3;

	var PLANET1_X = 300, PLANET1_Y = 200, PLANET2_X = 700, PLANET2_Y = 400;

	var PLANET1_COLOR = '#74A4E8', PLANET2_COLOR = 'E9B2F7';

	var CANNON_COLOR = 'E34B4D';

	var SECONDS_PER_ROTATION = 20;

	var RADS_PER_FRAME = (Math.PI * 2 * MS_PER_FRAME) / (SECONDS_PER_ROTATION * 1000);

	

	

	/* Globals */

	var ctx;

	var debug = false;

	var canvasTop, canvasLeft;

	var mouseX, mouseY, mouseAngle, mouseColumn, mouseLevel;

	var planetCirc;

	var mouseInThreshold;

	var buildMode, gameMode;

	var shooting = false, missiles = [], target;

	var cannonList = [], cannonColumns = [], selectedCannon;

	var planetColor = 'black';

	var nColumns, columnAngle;

	

	var planet1, planet2;

	

	

	/************************** Classes ******************************/

	var Point = function(x, y) {

		this.x = x;

		this.y = y;

	};

	

	Point.prototype.distance = function(p) {

		return (Math.sqrt(Math.pow(p.x-this.x, 2) + Math.pow(p.y-this.y,2)));

	};

	

	Point.prototype.add = function(p) {

		this.x += p.x;

		this.y += p.y;

	};

	

	

	var Missile = function(p, d) {

		this.position = p;

		this.direction = d;

	};

	

	/****************************** PLANET ***********************/

	/**

	* The columns array determines what is there in the planet at a certain point. Columns are counted starting from theta = 0 rad

	* (or x=RADIUS, y=0), and advance *counterclockwise*. There are as many columns as PLANET_CIRC / BLOCK_WIDTH. Therefore we can

	* calculate the current column by dividing the angle between nColumns.

	* The contents of the array are arrays themselves, with an entry for each level above the ground. The contents of each element in

	* the second array tell what type of construction is there: 0 -> Nothing, 1 -> tower, 2 -> Cannon

	*/

	

	var Planet = function(p) {

		this.position = p;

		this.columns = Array(nColumns);

		this.rotation = 0;

	};

	

	Planet.prototype.x = function() { return this.position.x; };

	Planet.prototype.y = function() { return this.position.y; };

	

	Planet.prototype.generateEmptyPlanet = function() {

	

		for (var i = 0; i < nColumns; i++) {

			var stack = Array(MAX_LEVELS);

			for (var j = 0; j < MAX_LEVELS; j++) {

				stack[j] = 0;

			}

			this.columns[i] = stack;

		}

	};

	

	Planet.prototype.addRotation = function(rads) {

		this.rotation = (this.rotation + rads) % (Math.PI*2);

	};

	

	Planet.prototype.generateRandomPlanet = function() {



		var nPeaks = 6;

		var width = 10;

		var peak;

		var arr;

		

		this.generateEmptyPlanet();

		

		// choose the initial peaks

		for (var i = 0; i < nPeaks; i++) {

		

			arr = Array(width);

		

			peak = i*Math.floor(nColumns/nPeaks);

			_midpointDispl(arr, 0, width, 1, 0.9);

			

			for(var j=0; j<width; j++) {

				for(var z=0; z<arr[j]; z++) {

					this.columns[peak+j][z] = 1;

				}

			}

			

		}

	};

	

	Planet.prototype.isBlockEmpty = function(column, level) {

		return this.columns[column][level] === 0;

	};

	

	// Perhaps should make it member of Planet

	var _midpointDispl = function(arr, low, high, h, dampen) {

	

		if (low >= high) return;

		

		var mid = low + (Math.floor((high - low) / 2));

		var rand = 4 + Math.floor(Math.random() * 4);

		

		arr[mid] = Math.floor(rand * h);

		

		_midpointDispl(arr, low, mid, h * dampen, dampen);

		_midpointDispl(arr, mid+1, high, h * dampen, dampen);

	

	};

	/************************** Functions *****************************/

	

	var coordsToColumn = function(p, planet) {

	

		var angle, column, dist, level;

		var planetPos = planet.position;

		

		angle = ((Math.atan2(p.y-planetPos.y, p.x-planetPos.x) + Math.PI*2) - planet.rotation) % (Math.PI*2);

		column = ((Math.floor(angle / columnAngle) *columnAngle) * nColumns) / (Math.PI * 2);

		// hack to avoid rounding errors like 24.9999999

		column = Math.floor(column + 0.5);

		//console.log(column);

		

		// another hack to avoid negative indices

		if (column < 0) {

			column = 0;

		}



		dist = p.distance(planetPos);

		level = Math.floor((dist - PLANET_RADIUS) / BLOCK_WIDTH);

		return [column, level];	

	};

	

	var updateMousePosition = function(evt) {

	

		var distToPlanet, mousePos;

		var columns = planet1.columns;

		

		mousePos = new Point(evt.clientX - canvasLeft, evt.clientY - canvasTop);

		

		// find if the mouse is in the corona at PLANET_THRESHOLD distance of the circumference

		distToPlanet = mousePos.distance(planet1.position);

		mouseInThreshold = (distToPlanet > (PLANET_RADIUS - PLANET_THRESHOLD)) && (distToPlanet < (PLANET_RADIUS + PLANET_THRESHOLD));

		

		// if the mouse is in the threshold, calculate the column

		if (mouseInThreshold) {

			var arr = coordsToColumn(mousePos, planet1);

			mouseColumn = arr[0];

			//console.log(arr[1]);

			

			if (gameMode == REBUILD) {

			

				// if in TOWER build mode, calculate the level

				if (buildMode == TOWER) {

					mouseLevel = 0;

					while (mouseLevel < MAX_LEVELS && columns[mouseColumn][mouseLevel] != 0 ) {

						mouseLevel++;

					}

				

					// change this at some point

					if (mouseLevel >= MAX_LEVELS) {

						mouseLevel = 0;

					}

				}

			}

			else if (gameMode == WAR) {

			

				// detect if the mouse is close to a cannon

				if (!shooting) {

					for(var c=0; c<cannonColumns.length; c++) {

						var cp = columnToCoords(2+cannonColumns[c], (BLOCK_WIDTH) +PLANET_RADIUS);

						//alert(cannonColumns[c] + ", " + cp.x + " " + cp.y);

						

						if (mousePos.distance(cp) < CANNON_THRESHOLD) {

							selectedCannon = c;

							return;

						}

					}

					selectedCannon = undefined;

				}

				

			

			}

		}

	};





	

	// all base blocks in the cannon place need to be empty

	var canBuildCannon = function(column) {

	

		for (var i = column; i < column+4; i++) {

			if (!planet1.isBlockEmpty(i%nColumns, 0)) {

				return false;

			}

		}

		

		return true;

	

	};

	

	

	var handleMouseClick = function(evt) {

	

		var columns = planet1.columns;

	

		if (gameMode == REBUILD) {

			if (mouseInThreshold) {

				if (buildMode == TOWER) {

					if (planet1.isBlockEmpty(mouseColumn, mouseLevel)) {

						columns[mouseColumn][mouseLevel] = 1;

						updateMousePosition(evt);

					}

				}

				else if (buildMode == CANNON) {

					if (canBuildCannon(mouseColumn)) {

						var cannonPosition = columnToCoords(2+mouseColumn, (BLOCK_WIDTH) +PLANET_RADIUS);

						cannonPosition.add(planet1.position);

						

						cannonList.push(cannonPosition);

						cannonColumns.push(mouseColumn);

						

						for (var i=mouseColumn; i < mouseColumn + 4; i++) {

							for (var j=0; j < MAX_LEVELS; j++) {

								columns[i][j] = 2;

							}

						}

					}

				}

				

			}

		}

		else if (gameMode == WAR) {

			// shot a missile

			if (!shooting && isCannonSelected()) {

				shooting = true;

				

				// repeated?

				var mousePos = new Point(evt.clientX - canvasLeft, evt.clientY - canvasTop);

				

				

				

				// Shoot a missile from the selected cannon

				var missilePos = columnToCoords(2+cannonColumns[selectedCannon], PLANET_RADIUS + (4*BLOCK_WIDTH));

									

				// direction

				var cp = columnToCoords(2+cannonColumns[selectedCannon], (BLOCK_WIDTH) +PLANET_RADIUS);



				var h = Math.sqrt(Math.pow(mousePos.y - cp.y, 2) + 

								  Math.pow(mousePos.x - cp.x, 2));

				

				var missileDir = new Point((mousePos.x - cp.x)/h,

										   (mousePos.y - cp.y)/h);

										

				

				missiles.push(new Missile(missilePos, missileDir)); //new Point(x, y));

				

				

				

			}

		}

	

	};

	

	var isCannonSelected = function() {

	

		return typeof(selectedCannon) !== 'undefined';

	};

	

	var columnToCoords = function(column, radius, planet) {

	

		var angle, coords;

		planet = planet || planet1;

		angle = (column * columnAngle) + planet.rotation;

		coords = new Point(radius*Math.cos(angle), radius*Math.sin(angle));

		coords.add(planet.position);

		return coords;

	

	};

	

	var toggleBuild = function(mode) {

	

		$("#towerb").removeAttr("disabled");

		$("#cannonb").removeAttr("disabled");

		buildMode = mode;

		

		if (mode == TOWER) {

			$("#towerb").attr("disabled", true);

		}

		else if (mode == CANNON) {

			$("#cannonb").attr("disabled", true);

		}

	};

	

	var toggleMode = function(mode) {

	

		$("#rebuildb").removeAttr("disabled");

		$("#warb").removeAttr("disabled");

		gameMode = mode;

		

		if (mode == REBUILD) {

			$("#rebuildb").attr("disabled", true);

			$("#canvas").removeClass("war");

		}

		else if (mode == WAR) {

			$("#warb").attr("disabled", true);

			$("#canvas").addClass("war");

		}

	};

	

	

	// toggle debug

	var doDebug = function() {

		debug = debug ? false : true;

	};

	

	var start = function() {

		ctx = document.getElementById("canvas").getContext("2d");

		canvasTop = $("canvas").offset().top;

		canvasLeft = $("canvas").offset().left;



		// handlers

		$("canvas").mousemove(updateMousePosition);

		$("canvas").click(handleMouseClick);

		$("#towerb").removeAttr("disabled");

		$("#cannonb").removeAttr("disabled");

		$("#towerb").click(function() { toggleBuild(TOWER); });

		$("#cannonb").click(function() { toggleBuild(CANNON); });

		$("#rebuildb").click(function() {toggleMode(REBUILD); });

		$("#warb").click(function() {toggleMode(WAR); });

		$("#debugb").click(doDebug);

		

		planet1 = new Planet(new Point(PLANET1_X, PLANET1_Y));

		planet2 = new Planet(new Point(PLANET2_X, PLANET2_Y));

		

		planetCirc = 2 * Math.PI * PLANET_RADIUS;

			

		nColumns = Math.floor(planetCirc / BLOCK_WIDTH);

		planet1.generateEmptyPlanet();

		planet2.generateRandomPlanet();

		

			

		columnAngle = Math.PI * 2 / nColumns;

		mouseInThreshold = false;

		buildMode = NO_BUILD;

		shooting = false;

		

		

		toggleMode(REBUILD);



		// start the main loop

		mainLoop();

	};



	// agains which team are we checking?

	var detectCollision = function(p, team) {

	

		var cols, planetPos, distToPlanet, planet;

	

		if (team === 0) {

			cols = planet1.columns;

			planet = planet1;

			planetPos = planet1.position;

		}

		else {

			cols = planet2.columns;

			planet = planet2;

			planetPos = planet2.position;

		}

		

		distToPlanet = p.distance(planetPos);

		

		// check if the collision was against the planet itself

		if ( (p.distance(planet1.position) <= PLANET_RADIUS) || 

			 (p.distance(planet2.position) <= PLANET_RADIUS)) { //distToPlanet <= PLANET_RADIUS) {

			return COL_PLANET;

		}

		

		if (p.x > WIDTH || p.x < 0 || p.y > HEIGHT || p.y < 0) {

			return COL_OUTBOUNDS;

		}

		

		// check if the missile is inside the building area

		if (distToPlanet > PLANET_RADIUS && distToPlanet < (PLANET_RADIUS + (BLOCK_WIDTH * MAX_LEVELS))) {

		

			// check which column and level it collided to

			var arr = coordsToColumn(p, planet);

			var c = arr[0];

			var l = arr[1];

			var c2;

			

			if (l>=0 && l < MAX_LEVELS && cols[c][l] !== 0) {

				//alert("Collision at level " + l);

				for(var i = c - EXPLOSION_RADIUS; i < c + EXPLOSION_RADIUS; i++) {

					c2 = i % nColumns;

					for (var j = l - EXPLOSION_RADIUS; j < l + EXPLOSION_RADIUS; j++) {

							if (j >= 0 && j < MAX_LEVELS) {

								cols[c2][j] = 0;

							}

					}

				}

				

				

				return COL_BUILDINGS;

			}

		}

	

		return NO_COL;

	};

	

	var update = function() {



		var pos, dir, missiles2 = [];

		

		// process missiles

		if (gameMode == WAR) {

			for (var m = 0; m < missiles.length; m++) {

					pos = missiles[m].position;

					dir = missiles[m].direction;

					

					pos.x += (dir.x * MISSILE_SPEED);

					pos.y += (dir.y * MISSILE_SPEED);

					

					// detect collision

					if (detectCollision(pos, 1) !== NO_COL) {

						shooting = false;

					}

					else {

						missiles2.push(missiles[m]);

					}

					

			}

			missiles = missiles2;

		}

		

		// rotate the planets

		planet1.addRotation(RADS_PER_FRAME);

		planet2.addRotation(RADS_PER_FRAME);



	};



	// px and py are the planet's center coordinates

	var drawBlock = function(planet, column, level, color) {

		ctx.save();

		ctx.fillStyle = color;

		var x = ((PLANET_RADIUS + (level * BLOCK_WIDTH))* Math.cos(column*columnAngle + planet.rotation));

		var y = ((PLANET_RADIUS + (level * BLOCK_WIDTH)) * Math.sin(column*columnAngle + planet.rotation));

		ctx.translate(x + planet.x(), y+planet.y());

		ctx.rotate(column*columnAngle + planet.rotation);

		ctx.fillRect(0, 0, BLOCK_WIDTH, BLOCK_WIDTH);

		ctx.restore();

	};

	

	var drawCannon = function(planet, column, color) {

		for (var c = column; c < column + 4; c++) {

			drawBlock(planet, c, 0, color);

		}

		drawBlock(planet, column+1, 1, color);

		drawBlock(planet, column+2, 1, color);

		drawBlock(planet, column+1, 2, color);

		drawBlock(planet, column+2, 2, color);

	};

	

	var drawPlanet = function(planet, color) {

		

		var cols = planet.columns;

		

		color = color || '#eee';

		

		ctx.save();

		ctx.beginPath();

		ctx.strokeStyle = color;

		ctx.arc(planet.x(), planet.y(), PLANET_RADIUS, 0, Math.PI * 2);

		ctx.stroke();

		ctx.fillStyle = color;

		ctx.fill();

		ctx.restore();

		

		// kind of a hack: do not start in a cannon column

		var startColumn = 0;

		while (cols[startColumn][0] == CANNON) {

			startColumn++;

		}

		

		// draw the columns

		for (var i = startColumn; i < nColumns+startColumn; i++) {

		

			var c = i%nColumns;

			

			// if a column has a 2, draw a cannon, then skip three more columns

			if (cols[c][0] == CANNON) {

				drawCannon(planet, c, CANNON_COLOR);

				i += 3;

			}

			else {

				// else, try a tower

				for (var j=0; j < MAX_LEVELS; j++) {

					if (cols[c][j] == 1) {

						drawBlock(planet, c,j, color);

					}

				}

			}

		}

	};

	

	

	var drawMissile = function(point, color) {

		ctx.save();

		//console.log("drawging at " + point.x + " " + point.y);

		ctx.beginPath();

		ctx.strokeStyle = 'red';

		ctx.fillStyle = color;

		ctx.arc(point.x, point.y, 2, 0, Math.PI*2);

		ctx.fill();

		ctx.restore();

	};

	

	var drawShootingArc = function() {

	

		var cc = cannonColumns[selectedCannon];

		// repeated around

		var cpos = columnToCoords(2+cc, (BLOCK_WIDTH) +PLANET_RADIUS);

		ctx.save();

		ctx.fillStyle = 'rgba(255,255,153,0.5';

		ctx.beginPath();

		ctx.arc(cpos.x , cpos.y, 30, 0, Math.PI * 2);

		ctx.fill();

		ctx.restore();

	

	};

	

	var draw = function() {

		

		ctx.clearRect(0, 0, WIDTH, HEIGHT);

		

		// Planet One

		drawPlanet(planet1, PLANET1_COLOR);

		

		// Planet Two

		drawPlanet(planet2, PLANET2_COLOR);

		

		

		

		// draw mouse position

		if (gameMode == REBUILD) {

			if (mouseInThreshold) {

				if (buildMode == TOWER && planet1.isBlockEmpty(mouseColumn, mouseLevel)) {

					drawBlock(planet1, mouseColumn, mouseLevel, 'green');

				}

				else if (buildMode == CANNON && canBuildCannon(mouseColumn)) {

					drawCannon(planet1, mouseColumn, 'orange');

				}

			}

		}

		else if (gameMode == WAR) {

			if (shooting) {



				for (var m = 0; m < missiles.length; m++) {

				

					drawMissile(missiles[m].position, 'gray');

				}

			}

			else if (isCannonSelected()) {

				drawShootingArc();

			}

		}

		

		if (debug) {

		

			

		

		}

		

		//ctx.save();

		//ctx.fillStyle = planetColor;

		//ctx.fill();

		//ctx.restore();

		

		

	};



	var mainLoop = function() {

	

		var startLoop, loopTime;

		

		startLoop = new Date().getTime();

		update();

		draw();

		loopTime = new Date().getTime() - startLoop;

		ctx.fillText(Math.floor((1000/loopTime)) + " FPS", WIDTH - 80, HEIGHT - 20);

		ctx.fillText("Angle: " + mouseAngle, WIDTH - 80, HEIGHT - 40);

		setTimeout(mainLoop, MS_PER_FRAME);

	

	};



	return {

		start: start

	};

};
