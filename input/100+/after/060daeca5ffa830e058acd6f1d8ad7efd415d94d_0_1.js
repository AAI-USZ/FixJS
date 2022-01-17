function(name, scene, options) {

            this.supr(name, scene, options);

            var size = scene.grid.get("size");

            this.emote_sprite = new Tilekit.Sprite("/assets/emotes.png", size, size, 0, 0);
            this.layers = Tilekit.extend(this.layers, {

                emote: function() {

                    var emote = this.emote_sprite,
                        pos   = this.get("position"),
                        size  = this.grid.get('size'),
                        which = {

                            // Emotions
                            "surprised" : [0, 0],
                            "sad"       : [32, 0],
                            "love"      : [64, 0],
                            "power"     : [96, 0],
                            "happy"     : [128, 0],
                            "disguise"  : [160, 0],

                            // Events
                            "poison"    : [0, 32],
                            "quest"     : [32, 32],
                            "idea"      : [64, 32],

                            // Sense
                            "see"       : [0, 64],
                            "hear"      : [32, 64]

                        }[this.get("emote")] || false;

                    if (!which) {
                        return false;
                    }

                    emote.setPosition(pos.x, pos.y - (size + (Math.cos( Date.now() / 500) * 2) ) );
                    emote.setOffset( which[0], which[1] );
                    emote.draw(this.ctx);

                },

                renderName: function() {

                    if (!this.showName) {
                        return;
                    }

                    var c = this.ctx,
                        name = this.get("name");

                    c.font = "15px monospace";
                    c.fillStyle = "#000";

                    var textWidth = this.ctx.measureText(name).width;

                    c.fillText(name,
                               (this.tile.x * 32) - (textWidth / 10),
                               (this.tile.y * 31)
                              );
                }
                
            });
        }