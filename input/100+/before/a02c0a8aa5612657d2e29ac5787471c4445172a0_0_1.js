function(game) {
            var moving = false;

            if(game.inputManager.isKeyUp(window.Game.Keys.UP)) {
                this.directionY = 0;
            }

            if(game.inputManager.isKeyUp(window.Game.Keys.DOWN)) {
                this.directionY = 0;
            }

            if(game.inputManager.isKeyUp(window.Game.Keys.LEFT)) {
                this.directionX = 0;
            }

            if(game.inputManager.isKeyUp(window.Game.Keys.RIGHT)) {
                this.directionX = 0;
            }

            if(game.inputManager.isKeyDown(window.Game.Keys.UP)) {
                this.direction = window.Game.Direction.NORTH;
                this.directionY = -1;
                moving = true;
            }
            
            if(game.inputManager.isKeyDown(window.Game.Keys.DOWN)) {
                this.direction = window.Game.Direction.SOUTH;
                this.directionY = 1;
                moving = true;
            }
            
            if(game.inputManager.isKeyDown(window.Game.Keys.LEFT)) {
                this.direction = window.Game.Direction.WEST;
                this.directionX = -1;
                moving = true;
            }            
            
            if(game.inputManager.isKeyDown(window.Game.Keys.RIGHT)) {
                this.direction = window.Game.Direction.EAST;
                this.directionX = 1;
                moving = true;
            }
            
            if(moving) {
                if(!this.moving) {
                    this.moving = true;
                    this.frameLength = game.assetManager.getMetadata(this).frames[this.direction].length;
                    this.movingTicks = 0;
                }
                else {
                    this.movingTicks++;
                    if(this.movingTicks % FRAME_RATE === 0) {
                        this.activeFrameIndex = (this.activeFrameIndex + 1) % this.frameLength;
                    }
                }
            }
            else {
                this.directionY = 0;
                this.directionX = 0;
                this.moving = false;
                this.activeFrameIndex = 0;
            }

            if(game.inputManager.isKeyPress(window.Game.Keys.A) || 
               game.inputManager.isKeyDown(window.Game.Keys.A)) {
                this.createBomb(game);
            }
        }