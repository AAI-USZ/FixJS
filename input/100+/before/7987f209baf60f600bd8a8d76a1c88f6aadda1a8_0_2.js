function(scene, startPosition) {
    var that = {};

    var UP = 0;
    var DOWN = 1;
    var LEFT = 2;
    var RIGHT = 3;
    
    var input = playerInput();

	/*
	* Creates snake
	*/
    var createSnake = function(length) {
        var head = new THREE.Mesh(geometry, material);
        
        // Start in middle of screen facing right
        head.position.x = startPosition.x;
        head.position.y = startPosition.y;
        scene.add(head);
        snake.push(head);
        
        // Add length body parts
        for (var i=0; i<length; i++) {
            var body = new THREE.Mesh(geometry, material);
			body.position.x = snake[i].position.x - TILE_SIZE;
			body.position.y = snake[i].position.y;
            scene.add(body);
            snake.push(body);
        }
    };
	
	/*
	* Returns the distance between two positions. Sum of shortest sides of the triangle
	*/
	var manhattanDistance = function(pos1, pos2) {
		return Math.abs(pos1.x-pos2.x) + Math.abs(pos1.y-pos2.y);
	};
    
    var pythagorasDistance = function(pos1, pos2) {
        var dx = pos2.x - pos1.x;
        var dy = pos2.y - pos1.y;
        
        return Math.sqrt(dx*dx + dy*dy);
    };
	
	/*
	* Returns if player collides with fruit = distance < fruit radius
	*/
	that.collidesWith = function(fruit) {
		return (fruit && pythagorasDistance(snake[0].position, fruit.getPosition()) < fruit.getRadius());
	};
	
	/*
	* Adds a body part at beginning of snake, before setting tail to head in update
	*/
	that.addBody = function() {
		add = true;
		// 5 % faster 
		timeBetweenFrames -= 0.002;
	};

	var timeBetweenFrames = 1/15;
    var timeSinceLastFrame = timeBetweenFrames;
	var lastFrame = Date.now();  // Not IE? 
	
	/*
	* Update
	*/	
    that.update = function() {
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
    };
	
	var updateDeathAnimation = function() {
		var length = snake.length;
		for (var i=0; i<length; i++) {
			var bodyPart = snake[i];
			bodyPart.position.x += bodyPart.vx;
			bodyPart.position.y += bodyPart.vy;
			bodyPart.position.z += bodyPart.vz;
			bodyPart.rotation.x += 0.03;
		}
		
		// Update color hue. Rotating from 0.0 --> 1.0
		var time = Date.now() * 0.00005;
		material.color.setHSV(time % 1, 1, 1);
	};
	
	that.die = function() {
        if (dead) {
            return;
        }
        
		var length = snake.length;
		
		var head = snake[0];
		head.vx = 0;
		head.vy = 0;
		head.vz = 4;
			
		for (var i=1; i<length; i++) {
			var bodyPart = snake[i];
			bodyPart.vx = Math.random() * 2 * (Math.random() > 0.5 ? -1 : 1);
			bodyPart.vy = Math.random() * 2 * (Math.random() > 0.5 ? -1 : 1);
			bodyPart.vz = Math.random() * 3 * (Math.random() > 0.5 ? -1 : 1);
		}
		
		dead = true;
		
		// Show game over box
		$('#gameover span').html($('#score span').html());
		$('#gameover').show('slow');
	};
    
    that.getPosition = function() { return snake[0].position; };    
    
	// Snake color, material etc
    var snake = [];
	var TILE_SIZE = 4;
	var color24 = Math.random()*255 << 16 | Math.random()*255 << 8 | Math.random()*255;
	var material = new THREE.MeshLambertMaterial({color: color24});
	var geometry = new THREE.CubeGeometry(TILE_SIZE, TILE_SIZE, TILE_SIZE);
    var direction = RIGHT;
	var add = false;
	var dead = false;
	
	createSnake(3);
	
    return that;
}