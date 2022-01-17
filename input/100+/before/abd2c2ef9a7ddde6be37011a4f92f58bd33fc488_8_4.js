function(Tilekit) {

    "use strict";
    
    var Geo     = window.Geo,
        Sprite  = Tilekit.Sprite;

    var round   = Math.round,
        roundTo = Math.roundTo,
        abs     = Math.abs,
        PI      = Math.PI,

        findDistance = Geo.findDistance,
        findPoint    = Geo.findPoint,
        isWithinCone = Geo.isWithinCone,
        requestAnimationFrame = window.requestAnimationFrame;

    var Unit = Tilekit.Unit = Tilekit.Entity.extend();

    // Defaults
    Unit.statics({

        defaults: {

            animation: "stand",

            face: 270,

            health: 100,
            maxHealth: 100,

            path: [],
            position: { x: 0, y: 0 },

            // Senses
            // ------------------------- //

            hearing: 64,
            vision: 96,
            visionCone: 30,

            // Speed
            // ------------------------- //

            attack_speed: 1,
            movement_speed: 2,

            // Attributes
            // ------------------------- //

            strength: 1,
            dexterity: 1,
            intelligence: 1,
            vitality: 1
            
        }

    });
    
    Unit.methods({
        
        layers: {},

        isUnit: true,

        tile: function() {

            var size = this.grid.get("size"),
                pos  = this.get("position");

            return {
                x: pos.x / size,
                y: pos.y / size
            };

        },

        initialize: function(name, scene, options) {

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
                width: size * 2,
                height: size * 2,
                target: this.ctx,
                padding: size / 2
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
                    self.sprite.iterations = 0;
                    self.sprite.base_offset.x = animation.offset.x || 0;
                    self.sprite.base_offset.y = animation.offset.y || 0;
                    self.sprite.shift = animation.shift || self.sprite.width;
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
                    delta = next - prev;
                
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
                        
                        Tilekit.Rectangle(ctx, pos.x, pos.y, size, size, { 
                            fill: "red",
                            alpha: min(0.6, 0.1 / now),
                            composite: "source-atop"
                        });
                        
                    }, this, 1000);

                } else {

                    // No : Flag Healing

                    this.addLayer("health" + Date.now(), function(ctx, date, birth) {

                        var now = (date.getTime() - birth) / 1000;

                        Tilekit.Rectangle(ctx, pos.x, pos.y, size, size, { 
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
                    frames: 2,
                    duration: 220,
                    offset: {
                        x: size * 2,
                        y: size * 2
                    },
                    shift: size * 2
                },

                attack: {
                    frames: 3,
                    duration: 200,
                    offset: {
                        x: 194,
                        y: size * 2
                    },
                    shift: size * 2,
                    iterations: 1
                },

                spell: {
                    frames: 3,
                    duration: 400,
                    offset: {
                        x: 450,
                        y: size * 2
                    },
                    shift: size * 2,
                    iterations: 1
                }

            };

        }

    });

    // Getters and Setters
    // -------------------------------------------------- //

    Unit.methods({
        getTileFront: function(offset) {
            return findPoint(this.tile(), offset || 1, -this.get("face"));
        },
        getTileBack: function(offset) {
            return findPoint(this.tile(), offset || 1, this.get("face"));
        },
        setFace: function(direction) {

            var face = direction.isUnit ? abs(direction.get("face") - 180) : direction,
                size = this.grid.get('size');

            // What direction are we dealing with?
            switch(direction) {
            case 90  : this.sprite.setOffset(undefined, size * 4); break;
            case 270 : this.sprite.setOffset(undefined, 0); break;
            case 0   : this.sprite.setOffset(undefined, size * 6); break;
            case 180 : this.sprite.setOffset(undefined, size * 2); break;
            }

            this.set("face", face);

            return this;
        }
    });


    // Utilities
    // -------------------------------------------------- //

    Unit.methods({
        toJSON: function() {
            return Tilekit.extend({}, this.attributes, this.tile());
        },
        remove: function() {
            this.grid.removeListener("refresh", this.__boundDraw);
        }
    });

    // Actions
    // -------------------------------------------------- //

    Unit.methods({
        attack: function() {
            this.halt();
            this.set("animation", "attack");
            this.emit("attack", this.getTileFront());
        },
        shoot: function() {
            this.halt();
            this.set("animation", "attack");
            this.emit("attack", this.getTileFront());
        },
        spell: function() {
            this.halt();
            this.set("animation", "spell");
            this.emit("spell", this.tile());
        },
        death: function() {

            var pos = this.get("position"),
                size = this.grid.get("size");

            this.scene.remove(this);

        }
    });

    // Rendering Methods
    // -------------------------------------------------- //

    Unit.methods({

        clear: function() {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        },

        draw: function() {
            
            var pos  = this.get("position"),
                anim = this.animations[this.get("animation")];
            
            this.clear();
            
            if (anim.iterations !== 0 && this.sprite.iterations >= anim.iterations) {
                this.set("animation", "stand");
            }

            this.sprite.animate();
            this.sprite.setPosition(pos.x, pos.y).draw();

            this.emit("draw");
            this.grid.stagingCtx.drawImage(this.canvas, 0,0);
            
        }
    });

    // Movement
    // -------------------------------------------------- //

    Unit.methods({

        halt: function(trigger) {

            var size = this.grid.get('size'),
                pos  = this.get('position'),
                tile = this.tile();

            this.set({
                moving: false,
                position: {
                    x: roundTo(pos.x, size),
                    y: roundTo(pos.y, size)
                },
                path: [],
                animation: "stand"
            });

            if (trigger) {
                this.grid.emit("tile:" + tile.x + "," + tile.y);
                this.grid.emit("tile:*," + tile.y);
                this.grid.emit("tile:" + tile.x + ",*");
            }

        },

        move: function move (direction, pan, callback) {
            
            if (this.get("moving")) {
                return false;
            }
            
            this.set("moving", true);

            // We use this function to make sure we are always
            // moving in the correct direction
            var audit = move.__audit = Date.now();

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

                if ( pos.x === goal.x && pos.y === goal.y || audit !== move.__audit) {
                    self.halt(true);
                    return callback.apply(self, [Date.now()]);
                }
                
                return requestAnimationFrame(animate);

            }

            animate();

            return this;

        },

        setPath: function fn(destination, options) {
            
            // We use this function to make sure we are always
            // moving in the correct direction
            var audit = fn.__audit = Date.now();
            
            options = options || {};

            var self = this,
                tile = this.tile(),
                path;

            if ( this.is("moving") ) {
                this.halt();
            }

            if (destination.isUnit) {
                destination = destination.tile;
            }

            tile = {
                x : round(tile.x),
                y : round(tile.y)
            };

            path = this.set(
                "path", this.grid.plotCourse(tile, destination, this.scene.units)
            );
            
            function traceSteps() {
                if ( path.length && audit === fn.__audit) {
                    self.move(path.shift(), options.pan, traceSteps);
                }
            }

            traceSteps();

        },

        detectHit: function(offsetX, offsetY) {

            var others  = this.scene.units,
                grid    = this.grid,
                size    = grid.get('size'),
                pos     = this.get("position"),
                tile    = this.tile(),
                name    = this.get("name").toLowerCase(),
                blocked = false;

            // Tiles in Focus
            // -------------------------------------------------- //

            var start = {
                x: pos.x + (offsetX || 0),
                y: pos.y + (offsetY || 0)
            };

            var active = {
                x: start.x / size,
                y: start.y / size
            };

            // Check for hits on the blocking layer (1 is the blocking layer)
            // -------------------------------------------------- //

            if ( grid.isBlocking(active) ) {
                this.emit("blocked", active);
                blocked = true;
            }

            // Check for other player movement
            // -------------------------------------------------- //

            for (var c in others) {

                if ( others.hasOwnProperty(c) && others[c] !== this ) {

                    var other   = others[c],
                        end     = other.get("position"),
                        prox    = findDistance(start, end) - size / 2,
                        vision  = other.get("vision") || 0,
                        cone    = other.get("visionCone") || 0,
                        hearing = other.get("hearing") || 0,
                        angle   = other.get("face");

                    // Detect characters in proximity to self
                    // -------------------------------------------------- //

                    if (isWithinCone(end, start, vision, angle, cone)) {
                        other.emit(["see", "see:" + name], this);
                    }

                    if (hearing > prox) {
                        other.emit(["hear", "hear" + name], this);
                    }

                    // Detect characters in blocking distance
                    // -------------------------------------------------- //

                    if (size > prox + size) {

                        var who = other.get("name").toLowerCase();

                        this.emit(["collision", "collision:" + who], other);
                        other.emit(["collision", "collision:" + name], this);

                        blocked = true;
                    }
                }

            }

            return blocked;
        }
    });

}