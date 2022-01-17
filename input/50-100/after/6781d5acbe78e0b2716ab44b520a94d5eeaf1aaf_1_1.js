function (e) {
            var length = this.sprites.length;
            for(var i = 0; i < length; ++i) {
                var sprite = this.sprites[i];
                if(sprite.onInput) {
                    sprite.onInput(this, e.keyCode);
                }
            }
        }