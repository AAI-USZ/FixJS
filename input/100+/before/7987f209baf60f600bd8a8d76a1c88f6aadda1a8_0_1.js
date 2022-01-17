function() {
        input.update();  // This needed?
        
        // Calculate time since the last frame
        var thisFrame = Date.now();
        var dt = (thisFrame - lastFrame) / 1000;
        lastFrame = thisFrame;
        timeSinceLastFrame = timeSinceLastFrame - dt;
		
		// Update snake at 25 FPS
		if (timeSinceLastFrame <= 0) {
			timeSinceLastFrame = timeBetweenFrames;
			
			if (dead) {
				updateDeathAnimation();
				return;
			}
			
			var head = snake[0];
			
			if (input.buttons[input.BUTTON_UP] && (direction != UP && direction != DOWN)) {
				direction = UP;
			} else if(input.buttons[input.BUTTON_DOWN] && (direction != UP && direction != DOWN)) {
				direction = DOWN;
			} else if(input.buttons[input.BUTTON_LEFT] && (direction != LEFT && direction != RIGHT)) {
				direction = LEFT;
			} else if(input.buttons[input.BUTTON_RIGHT] && (direction != LEFT && direction != RIGHT)) {
				direction = RIGHT;
			}

			if (add) {
				var newBit = new THREE.Mesh(geometry, material);
				newBit.position.x = head.position.x;
				newBit.position.y = head.position.y;
				scene.add(newBit);
				snake.unshift(newBit);
				add = false;
			}
			
			// Put tail at heads position
			var tail = snake.pop();
			tail.position.x = head.position.x;
			tail.position.y = head.position.y;
			snake.unshift(tail);
			var speed = TILE_SIZE;
			
			switch (direction) {
				case UP:
					tail.position.y += speed;                
					break;
				case DOWN:            
					tail.position.y -= speed;                
					break;
				case LEFT:
					tail.position.x -= speed;                
					break;                
				case RIGHT:
					tail.position.x += speed;                            
					break;
			}
			
			// Check collide with self and outside screen
			head = snake[0];
			var length = snake.length;
			for (var i=1; i<length; i++) {
				var test = snake[i];
				if (head.position.x == test.position.x && head.position.y == test.position.y) {
					die();
				}
				if (head.position.x > SNAKE.X_MAX || head.position.x < SNAKE.X_MIN ||
					head.position.y > SNAKE.Y_MAX || head.position.y < SNAKE.Y_MIN) {
					die();
				}
			}
			
			// Update color hue. Rotating from 0.0 --> 1.0
			var time = Date.now() * 0.00005;
			material.color.setHSV(time % 1, 1, 1);
		}
    }