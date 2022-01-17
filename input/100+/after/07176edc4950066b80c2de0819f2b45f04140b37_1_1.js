function ($, Game, Grid, Polygon, Dot) {

		"use strict";

		

		var player = new Dot({x: 0, y: 0, rotation: 0, size: 10}),

			cursor = new Dot({x: 0, y: 0, rotation: 0, size: 10});

		

		player.update = function (duration, inputManager, entityManager) {

			Game.singletonInstance.writeLine("test this", inputManager.x, inputManager.y);

			this.rotation -= 0.02;

			

			if (inputManager.isPressed(inputManager.left)) {

				this.x -= 1;

			}

			

			if (inputManager.isPressed(inputManager.right)) {

				this.x += 1;

			}

			

			if (inputManager.isPressed(inputManager.up)) {

				this.y -= 1;

			}

			

			if (inputManager.isPressed(inputManager.down)) {

				this.y += 1;

			}

		};

		

		cursor.update = function (duration, inputManager, entityManager) {

			Game.singletonInstance.writeLine("test this", inputManager.x, inputManager.y);

			this.rotation += 0.02;

			

			if (inputManager.isPressed(inputManager.left)) {

				this.x -= 1;

			}

			

			if (inputManager.isPressed(inputManager.right)) {

				this.x += 1;

			}

			

			if (inputManager.isPressed(inputManager.up)) {

				this.y -= 1;

			}

			

			if (inputManager.isPressed(inputManager.down)) {

				this.y += 1;

			}

			

			if (inputManager.isPressed(inputManager.buttonOne)) {

				this.color = "#f00";

			}

			

			if (inputManager.isPressed(inputManager.buttonTwo)) {

				this.color = "#0f0";

			}

			

			if (inputManager.isPressed(inputManager.buttonThree)) {

				this.color = "#00f";

			}

			

			this.scale += inputManager.wheelDelta() * 0.2;

			

			this.x = inputManager.x;

			this.y = inputManager.y;

			

			var wheelDelta = inputManager.wheelDelta();

			if (wheelDelta != 0) {

				this.size += wheelDelta;

			}

		};

		

		new Game()

			.add(new Grid())

			.add(cursor)

			.run();

				

	}