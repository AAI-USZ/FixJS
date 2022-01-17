function (duration, inputManager, entityManager) {

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

			

			Game.singletonInstance.writeText({text: "player - x:" + this.x + " y:" + this.y, x: this.x, y: this.y});

		}