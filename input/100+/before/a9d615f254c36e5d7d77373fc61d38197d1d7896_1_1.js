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

        keyState[window.Game.Keys.UP] = false;
        keyState[window.Game.Keys.DOWN] = false;
        keyState[window.Game.Keys.LEFT] = false;
        keyState[window.Game.Keys.RIGHT] = false;
        keyState[window.Game.Keys.A] = false;

        prevKeyState[window.Game.Keys.UP] = false;
        prevKeyState[window.Game.Keys.DOWN] = false;
        prevKeyState[window.Game.Keys.LEFT] = false;
        prevKeyState[window.Game.Keys.RIGHT] = false;
        prevKeyState[window.Game.Keys.A] = false;

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