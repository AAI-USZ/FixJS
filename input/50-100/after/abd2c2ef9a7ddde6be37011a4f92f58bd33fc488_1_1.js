function(origin, actor) {
            
            var target, health;
            target = origin instanceof TK.Unit ? origin : this.scene.findAt(origin);
            
            if (target && target !== actor) {
                health = target.get("health");
                target.set("health", health - actor.get("strength"));
            }
            
        }