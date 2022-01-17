function(Tilekit) {

    var PI = Math.PI,
        Geo = window.Geo;

    Tilekit.Grid.methods({

        layers: {
            
            __debug_layer: function(ctx) {
                var center = this.findCenter();
                ctx.drawImage(this.debug, center.x, center.y);
            },

            __debug_highlight_mouse: function(ctx) {

                var mouse = this.get("mouse"),
                    pos   = mouse? mouse.position : { x:0, y:0 },
                    size  = this.get("size");

                ctx.strokeStyle = "white";
                ctx.strokeRect(pos.x, pos.y, size, size);
            },

            // Game performance
            // -------------------------------------------------- //

            __debug_calc_fps: function() {
                
                var snapshot = this.get("__debug_snapshot") || Date.now(),
                    frames   = this.get("__debug_frames") || 0,
                    fps      = this.get("__debug_fps") || 30;
                
                var timestamp = Date.now() - snapshot;

                if (timestamp / 1000 <= 1) {
                    frames++;
                } else {
                    fps      = frames;
                    frames   = 0;
                    snapshot = Date.now();
                }

            },

            __debug_render_fps: function(ctx, date) {

                var fps = this.get("__debug_fps") || 30;

                ctx.font = "italic 12pt Helvetica";
                ctx.fillStyle = "#ae0";

                var offset = ctx.measureText("FPS: " + fps).width + 20;

                if (fps < 30) ctx.fillStyle = "#ee0";
                if (fps < 20) ctx.fillStyle = "#fa0";
                if (fps < 10) ctx.fillStyle = "#f00";

                ctx.fillText("FPS: " + fps,
                             document.width - offset,
                             document.height- 30);
            }
            
        }

    });


    Tilekit.Unit.methods({

        layers: {

            __debug_renderClipping: function() {

                var size = this.grid.get('size'),
                    pos  = this.get("position");

                this.ctx.lineWidth = 1;
                this.ctx.fillStyle = "rgba(50, 255, 200, 0.3)";
                this.ctx.strokeStyle = "rgba(50, 255, 200, 0.3)";

                this.ctx.fillRect(pos.x, pos.y, size, size);
                this.ctx.strokeRect(pos.x, pos.y, size, size);

            },

            __debug_renderVision: function() {

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

           __debug_renderHearing: function(ctx) {

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

        }
    });

}