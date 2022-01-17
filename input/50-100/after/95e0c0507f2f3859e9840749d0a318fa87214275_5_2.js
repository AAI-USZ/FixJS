function() {
            
            if (this.acting) {
                return false;
            }
            
            this.acting = true;
            
            var self = this;

            this.halt();
            this.set("animation", "melee");

            this.sprite.once("keyframe", function() {
                Tilekit.emit("damage", self.getPositionFront(), self);
            });
            
            this.sprite.once("iteration", function() {
                self.acting = false;
            });
        }