function(name, scene, options) {

            var grid = scene.grid,
                size = grid.get('size'),
                self = this;

            this.scene = scene;
            this.grid  = scene.grid;
            this.ctx   = scene.grid.stagingCtx;

            this.set("position", {
                x: options.tile.x * size,
                y: options.tile.y * size
            });

            this.sprite = new Sprite(options.image, size, size, 0, 0, 3, 200, this.ctx);

            grid.on('refresh', this.draw.bind(this), this);

            this.on('draw', function() {
                self.renderLayers(self.ctx);
            });

            // Attributes
            // -------------------------------------------------- //

            this.attributes = $.extend(true, {
                name: name,
                created_at: Date.now()
            }, this.attributes, options);

            this.layers = $.extend({}, this.layers);

            // Debug Rendering Methods
            // -------------------------------------------------- //

            if (Tilekit.debug) {

                this.addLayer({

                    renderClipping: function() {

                        var size = this.grid.get('size'),
                            pos  = this.get("position");

                        this.ctx.lineWidth = 1;
                        this.ctx.fillStyle = "rgba(50, 255, 200, 0.3)";
                        this.ctx.strokeStyle = "rgba(50, 255, 200, 0.3)";

                        this.ctx.fillRect(pos.x, pos.y, size, size);
                        this.ctx.strokeRect(pos.x, pos.y, size, size);

                    },

                    renderVision: function() {

                        var ctx    = this.ctx,
                            size   = this.grid.get('size'),
                            pos    = this.get("position"),
                            posX   = pos.x + (size / 2),
                            posY   = pos.y + (size / 2),
                            vision = this.get("vision"),
                            face   = this.get("face"),
                            cone   = this.get("visionCone");

                        if (!vision) {
                            return;
                        }

                        ctx.fillStyle = "rgba(0, 100, 200, 0.3)";
                        ctx.strokeStyle = "rgba(0, 100, 200, 0.5)";
                        ctx.lineWidth = 1;

                        ctx.beginPath();
                        ctx.moveTo(posX, posY);
                        ctx.arc(posX, posY,
                                vision,
                                Geo.toRadians(-face - cone),
                                Geo.toRadians(-face + cone),
                                false);
                        ctx.closePath();
                        ctx.stroke();
                        ctx.fill();
                    },

                    renderHearing: function(ctx) {

                        var size    = this.grid.get("size"),
                            pos     = this.get("position"),
                            hearing = this.get("hearing"),
                            posX    = pos.x + size / 2,
                            posY    = pos.y + (size / 2);

                        if (!hearing) {
                            return;
                        }

                        ctx.fillStyle = "rgba(255, 150, 50, 0.4)";
                        ctx.strokeStyle = "rgba(255, 150, 50, 0.8)";
                        ctx.lineWidth = 1;

                        ctx.beginPath();
                        ctx.arc(posX, posY, hearing, 0, PI * 2);
                        ctx.closePath();
                        ctx.stroke();
                        ctx.fill();
                    }

                });
            }

        }