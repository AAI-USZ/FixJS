function(name, fn) {

            var self = this;

            this.actions[name] = function() {
                
                if (self.acting) {
                    return false;
                }
                
                self.acting = true;
                
                fn.apply(self, self.ctx, Date.now());
                
                self.sprite.once("iteration", function() {
                    self.acting = false;
                });
                
                return self;
            };

        }