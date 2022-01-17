function(tile, amount) {
            
            var target, health;
            target = tile instanceof TK.Unit ? tile : this.scene.findAt(tile);
            
            if (target) {
                health = target.get("health");
                target.set("health", health - amount);
            }
            
        }