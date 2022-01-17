function(next, prev) {

                if (prev === next) {
                    self.sprite.iterations = 0;
                    return;
                }
                
                var animation = self.animations[next];

                if (animation) {
                    self.sprite.keyframe = animation.keyframe || 1;
                    self.sprite.iterations = 0;
                    self.sprite.base_offset.x = animation.offset.x || 0;
                    self.sprite.base_offset.y = animation.offset.y || 0;
                    self.sprite.setFrames(animation.frames || 1);
                    self.sprite.setDuration(animation.duration || 1);
                }

            }