function animate() {
                
                var shift = round(grid.shift);

                pos.x = limitX(goal.x, pos.x + delta.x * shift * speed);
                pos.y = limitY(goal.y, pos.y + delta.y * shift * speed);
            
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