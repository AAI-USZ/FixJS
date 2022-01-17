function(name, target) {
            
            var self = this;

            if (this.acting) {
                return false;
            }

            this.acting = true;

            this.halt();

            this.set("animation", "spell");
            this.get("spells")[name].apply(this, target, Date.now());
            this.emit("spell", this.get("position"));

            this.sprite.once("iteration", function() {
                self.acting = false;
            });

        }