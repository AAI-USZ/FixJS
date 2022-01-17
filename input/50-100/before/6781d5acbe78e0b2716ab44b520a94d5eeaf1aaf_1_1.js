function (e) {
            for(var i = 0; i < this.sprites.length; ++i) {
                var sprite = this.sprites[i];
                if(sprite.onInput) {
                    sprite.onInput(this, e.keyCode);
                }
            }
        }