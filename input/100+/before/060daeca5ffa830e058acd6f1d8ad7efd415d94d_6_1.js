function(Tilekit) {

    Tilekit.Grid.methods({

        layers: {
            
            __debug: function(ctx) {
                var center = this.findCenter();
                ctx.drawImage(this.debug, center.x, center.y);
            },

            __debug_highlight_mouse: function(ctx) {

                var mouse = this.get("mouse").position,
                    size  = this.get("size");

                ctx.strokeStyle = "white";
                ctx.strokeRect(mouse.x, mouse.y, size, size);
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

}