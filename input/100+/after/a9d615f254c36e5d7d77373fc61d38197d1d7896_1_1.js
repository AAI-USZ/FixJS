function(assetManager) {
        this.assetManager = assetManager;
        this.map = new window.Game.Map(MAP_WIDTH, MAP_HEIGHT, TILE_SIZE);
        this.sprites = [];
        this.inputManager = {
            isKeyDown: function(key) {
                return keyState[key] === true;
            },
            isKeyUp: function(key) {
                return keyState[key] === false;
            },
            isHoldingKey: function(key) {
                return prevKeyState[key] === true &&
                       keyState[key] === true;
            },
            isKeyPress: function(key) {
                return prevKeyState[key] === false &&
                       keyState[key] === true;
            },
            isKeyRelease: function(key) {
                return prevKeyState[key] === true &&
                       keyState[key] === false;
            }
        };
        
        for(var key in window.Game.Keys) {
            keyState[key] = false;
            prevKeyState[key] = false;
        }

        this.types = {
            GRASS: 0,
            WALL: 2,
            BRICK: 3,
        };

    var s = "222222222222222" +
            "200000000000002" +
            "202020202020202" +
            "200000000000002" +
            "202020202020202" +
            "200000000000002" +
            "202020202020202" +
            "200000000000002" +
            "202020202020202" +
            "200000000000002" +
            "202020202020202" +
            "200000000000002" +
            "222222222222222";

        this.map.fill(s);
        
        // Initialize the bomber
        var bomber = new window.Game.Bomber();
        bomber.moveTo(1, 1);
        this.addSprite(bomber);
    }