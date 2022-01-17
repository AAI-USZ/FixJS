function(name, scene, options) {

            var grid = scene.grid,
                size = grid.get('size'),
                self = this;

            this.scene = scene;
            this.grid  = scene.grid;

            this.canvas = document.createElement("canvas");
            this.ctx    = this.canvas.getContext('2d');

            this.canvas.width = 2000;
            this.canvas.height = 2000;

            options = options || {};

            if (options.tile) {

                this.set("position", {
                    x: options.tile.x * size,
                    y: options.tile.y * size
                });

            }

            this.sprite = new Sprite(options.image, {
                width: size * 3,
                height: size * 3,
                target: this.ctx,
                padding: size
            });

            if (grid) {
                this.__boundDraw = this.draw.bind(this);
                grid.on('refresh', this.__boundDraw, this);
            }
            
            this.on('draw', function() {
                self.renderLayers(self.ctx);
            });

            this.on("change:animation", function(next, prev) {

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

            });

            this.on("change:health", function(next, prev) {
                
                var pos   = this.get("position"),
                    size  = this.grid.get("size"),
                    min   = Math.min,
                    max   = Math.max,
                    ratio = min(1, max(0.01, next / this.get("maxHealth")) ),
                    delta = next - prev,
                    sprite = this.sprite;
                
                if (next <= 0) {
                    this.death();
                }
                
                // Did we lose health?
                if (next < prev) {
                    
                    // Yes : Flag Damage

                    this.addLayer("pain-" + Date.now(), function(ctx, date, birth) {
                        
                        var now = (date.getTime() - birth) / 1000;
                        
                        Tilekit.Text(ctx, delta, pos.x + (size / 2), pos.y - size * now, { 
                            alpha: min(0.8, 0.1 / now),
                            align: "center",
                            color: "red",
                            font: 8 + (now * 10) + "pt Helvetica"
                        });

                    }, this, 1000);
                    
                    this.addLayer("healthchange", function(ctx, date, birth) {
                        
                        var now = (date.getTime() - birth) / 1000;
                        
                        Tilekit.Rectangle(ctx, sprite.position.x, sprite.position.y, sprite.width, sprite.height, { 
                            fill: "red",
                            alpha: min(0.6, 0.1 / now),
                            composite: "source-atop"
                        });
                        
                    }, this, 1000);

                } else {

                    // No : Flag Healing

                    this.addLayer("health" + Date.now(), function(ctx, date, birth) {

                        var now = (date.getTime() - birth) / 1000;

                        Tilekit.Rectangle(ctx, sprite.position.x, sprite.position.y, sprite.width, sprite.height, { 
                            fill: "aquamarine",
                            alpha: min(0.6, 0.1 / now),
                            composite: "source-atop"
                        });
                        
                    }, this, 1000);

                    this.addLayer("pleasure-" + Date.now(), function(ctx, date, birth) {
                        
                        var now = (date.getTime() - birth) / 1000;
                        
                        Tilekit.Text(ctx, delta, pos.x + (size / 2), pos.y - size * now, { 
                            alpha: min(0.8, 0.1 / now),
                            align: "center",
                            color: "green",
                            font: 8 + (now * 10) + "pt Helvetica"
                        });

                    }, this, 1000);
                }

                var color = ["red", "crimson", "crimson", 
                             "orange", "orange", "gold", "yellow",
                             "lime", "lime", "lime"
                            ][round(ratio * 9)];
                
                this.addLayer("healthbar", function(ctx, date, birth) {
                    
                    var pos = this.get("position"),
                        now = (date.getTime() - birth) / 1000;
                    
                    Tilekit.Rectangle(ctx, pos.x, pos.y - size / 4, size, size / 8, { 
                        fill: "black",
                        alpha: 0.7
                    });
                    
                    Tilekit.Rectangle(ctx, pos.x, pos.y - size / 4, size * ratio, size / 8, { 
                        fill: color,
                        stroke: "rgba(0,0,0,0.25)",
                        alpha: 0.7
                    });
                    
                }, this, 1500);
                
            });

            // Attributes
            // -------------------------------------------------- //

            this.attributes = Tilekit.extend({}, Unit.defaults, {
                name: name,
                created_at: Date.now()
            }, this.attributes, options);

            this.layers = Tilekit.extend({}, this.layers);

            this.setFace(this.get("face"));
            

            // Animations
            // -------------------------------------------------- //

            this.animations = {

                stand: {
                    offset: {
                        x: 0,
                        y: 0
                    }
                },

                walk: {
                    frames: 3,
                    duration: 220,
                    offset: {
                        x: 0,
                        y: 0
                    }
                },

                melee: {
                    frames: 9,
                    keyframe: 3,
                    duration: 350,
                    offset: {
                        y: size * 13
                    },
                    iterations: 1
                },

                range: {
                    frames: 7,
                    keyframe: 6,
                    duration: 500,
                    offset: {
                        y: size * 26
                    },
                    iterations: 1
                },

                spell: {
                    frames: 11,
                    duration: 400,
                    offset: {
                        y: size * 39
                    },
                    iterations: 1
                }

            };

        }