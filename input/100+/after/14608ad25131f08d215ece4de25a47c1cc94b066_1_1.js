function() {
            if(this.inputManager.isKeyPress(window.Game.Keys.D)) {
                window.Game.Debugging = !window.Game.Debugging;
            }

            for(var i = 0; i < this.sprites.length; ++i) {
                var sprite = this.sprites[i];
                if(sprite.update) {
                    sprite.update(this);
                }
            }

            for(var key in keyState) {
                prevKeyState[key] = keyState[key];
            }
        }