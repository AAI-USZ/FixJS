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
        }