function(src, options) {
            
            Tilekit.extend(this, {

                width: 0,
                height: 0,

                offset: {
                    x : 0,
                    y: 0
                },

                base_offset: {
                    x: 0,
                    y: 0
                },
                
                padding: 0,

                position: {
                    x: 0,
                    y: 0
                },
                base_position: {
                    x: 0,
                    y: 0
                },
                
                frames: 1, 
                currentFrame: 0,
                iterations: 0,
                keyframe: 1,

                duration: 1,
                spritesheet: null,
                shadow: null,
                shown: true,
                zoomLevel: 1,
                target: null,
                timer: new Tilekit.Timer()
                
            }, options);            
            
            this.setSpritesheet(src);
            this.created_at = this.timer.getMilliseconds();

            var d = new Date();

            if (this.duration > 0 && this.frames > 0) {
                this.ftime = d.getTime() + (this.duration / this.frames);
            } else {
                this.ftime = 0;
            }
        }