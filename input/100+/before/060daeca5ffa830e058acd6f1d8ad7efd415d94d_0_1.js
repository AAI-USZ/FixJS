function(name, scene, options) {
            this.supr(name, scene, options);
            var size = scene.grid.get("size");
            this.emote_sprite = new Tilekit.Sprite("/assets/emotes.png", size, size, 0, 0);
        }