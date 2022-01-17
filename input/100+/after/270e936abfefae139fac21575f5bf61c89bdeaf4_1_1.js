function Game() {

		if (Game.prototype.singletonInstance) {

			return Game.prototype.singletonInstance;

		}

		

		Game.prototype.singletonInstance = this;

		this.canvas = document.getElementById("canvas");

		this.context = this.canvas.getContext("2d");

		

		this.EntityManager = {};

		this.InputManager = {};

		this.textBuffer = [];

		

		this.initialized = false;

		this.paused = false;

		this.exit = false;

		

		this.init = function () {

			if (this.InputManager.init) {

				this.InputManager.init();

			}

		};

		

		this.run = function (duration) {

		/// <summary>

		/// application loop, request animation frame.  

		/// </summary>

			var self = Game.prototype.singletonInstance;

			

			if (!self.initialized) {

				self.init();

				self.initialized = true;

			}

			

			self.gameLoop(duration, self, self.InputManager, self.EntityManager);

			

			if (!self.exit) {

				requestAnimFrame(self.run);

			}

		};

		

		this.gameLoop = function (duration, game, inputManager, entityManager) {

		/// <summary>

		/// Internal game loop, all context passed in externally making this method testable.

		/// </summary>

			game.clear();

			

			entityManager.each(function (entity) {

				if (!game.paused) {

					entity.update(duration, inputManager, entityManager);

				}

				if (entity.render) {

					entity.render(game);			

				}

			});

			game.renderText(duration, game);

		};

		

		this.clear = function () {

			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		};

		

		this.renderText = function (duration, game) {

			var i = 0,

				ctx = game.context,

				options;

				

			for (i = 0; i < game.textBuffer.length; i++) {

				options = game.textBuffer[i];

				ctx.font = options.font;

				ctx.fillText(options.text, options.x, options.y);

			}

			game.textBuffer.length = 0;

		};

		

		this.writeText = function (options) {

		///<summary>

		/// Utility function to write text to the canvas.

		/// options { text, x, y, font }

		///<summary>

			if (typeof options === "string") {

				options = { text: options };

			}

			if (!options || !options.text) {

				return;

			}

			

			this.textBuffer.push({

				text : options.text,

				x : options.x || 0,

				y : options.y || 0,

				font : options.font || "bold 12px sans-serif"

			});

		};

		

		this.pointInConvexPolygon = function (point, vertices) {

			function crossProduct(a, b) {

				return a[0] * b[1] - a[1] * b[0];

			}

			

			function subtract(a, b) {

				return [a[0] - b[0], a[1] - b[1]];

			}

			

			var i = 0,

				sign = 0,

				segment, affineSegment, affinePoint, k;

			

			for (i = 0; i < vertices.length; i++) {

				segment = [vertices[i], vertices[(i + 1) % vertices.length]];

				affineSegment = subtract(segment[1] - segment[0]);

				affinePoint = subtract(point, segment[0]);

				k = crossProduct(affineSegment, affinePoint);

				

				if (k === 0) {

					return true;

				}

				

				if (k * sign < 0 !== 0) {

					return k * sign < 0;

				}

				

			}

		};

		

		this.reset = function () {

			this.EntityManager.clear();

			this.textBuffer.length = 0;

			this.initialized = false;

		};

	}