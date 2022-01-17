function move (direction, pan, callback) {
            
            this.set("moving", true);

            callback = callback || function(){};
            
            // At the very least, get the character facing in the intended direction
            this.setFace(direction);

            var grid  = this.grid,
                self  = this,
                
                size  = grid.get('size'),
                speed = this.get("movement_speed"),
                pos   = this.get("position"),
                
                delta = findPoint({ x: 0, y: 0 }, 1, -direction),
                goal  = findPoint(pos, size, -direction);

            this.set("animation", "walk");
            
            // Hit detection
            if (this.detectHit(delta.x * size, delta.y * size) ) {
                return this.halt(true);
            }
            
            function animate() {
                
                var shift = round(grid.shift);

                pos.x += delta.x * shift * speed;
                pos.y += delta.y * shift * speed;

                // Do we pan the screen with this character?
                if (pan) {
                    grid.panTo(self.tile());
                }

                if ( pos.x === goal.x && pos.y === goal.y ) {
                    self.halt(true);
                    return callback.apply(self, [Date.now()]);
                }

                return requestAnimationFrame(animate);

            }

            animate();

            return this;

        }