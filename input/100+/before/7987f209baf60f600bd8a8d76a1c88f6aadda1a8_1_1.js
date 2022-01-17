function(scene) {
    var that = {};
    
    var X_MIN = -100;
    var X_MAX = 100;
    var Y_MIN = -20;
    var Y_MAX = SNAKE.Y_MAX - 32;
    
    var walls;
    var player;
    var points = 0;
    var fruit;
    
    var createWall = function(position) {
        var color24 = Math.random()*255 << 16 | Math.random()*255 << 8 | Math.random()*255;
        var geometry = new THREE.CubeGeometry(SNAKE.TILE_SIZE, SNAKE.TILE_SIZE, Math.random() * SNAKE.TILE_SIZE + 2);
        var material = new THREE.MeshLambertMaterial({color: color24});
        var wallBit = new THREE.Mesh(geometry, material);
        wallBit.position.x = position.x;
        wallBit.position.y = position.y;
        scene.add(wallBit);
        walls.push(wallBit);
    };
    
    var createWalls = function() {
        walls = [];
        // Top, bottom 
        for (var x=X_MIN; x<X_MAX; x=x+SNAKE.TILE_SIZE) {
            createWall({x:x, y:Y_MAX});
            createWall({x:x, y:Y_MIN});
        }
        // Left, right
        for (var y=Y_MIN; y<Y_MAX; y=y+SNAKE.TILE_SIZE) {
            createWall({x:X_MIN, y:y});
            createWall({x:X_MAX, y:y});
        }    
    };
    
    var createPlayer = function() {
        player = Player(scene, {x:40, y:20});  // % 4 == 0
    };
    
    var createFruit = function() {
        fruit = Fruit(scene, getRandomPosition());
    };
    
    // TODO Something so the snake and fruit get same position grid
    var validX = [];
    for (var x=8; x<X_MAX; x=x+SNAKE.TILE_SIZE) {
        validX.push(x);
    }
    var validY = [];
    for (var y=8; y<Y_MAX; y=y+SNAKE.TILE_SIZE) {
        validY.push(y);
    }
        
    var getRandomPosition = function() {
        var x = validX[Math.round(Math.random() * (validX.length-1))];
        var y = validY[Math.round(Math.random() * (validY.length-1))];

        return {x:x, y:y};            
    };
    
    var initializeLevel = function() {
        createWalls();
        createPlayer();
        createFruit();
    };
    
    initializeLevel();    
      

    /*
    * Pad zeros. (1123, 9) Returns 000001123
    */
    var zeroPad = function(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }

    /*
    * Update
    */
    that.update = function() {
        fruit.update();
        player.update();

        if (player.collidesWith(fruit)) {
            player.addBody();
            points += Math.round(fruit.getRadius() * 1000);
            $('#score span').html(zeroPad(points, 9));
            scene.remove(fruit.getMesh());
            fruit.refresh(getRandomPosition());
        }
        
        checkBounds();
    };
    
    var checkBounds = function() {
        var pos = player.getPosition();
        
        if (pos.x < (X_MIN+SNAKE.TILE_SIZE) || pos.x > (X_MAX-SNAKE.TILE_SIZE) || 
            pos.y < (Y_MIN+SNAKE.TILE_SIZE) || pos.y > Y_MAX) {
            player.die();
        }
    };

    /*
    * Restart level
    */    
    that.restart = function() {
        initializeLevel();
    };

    return that;
}