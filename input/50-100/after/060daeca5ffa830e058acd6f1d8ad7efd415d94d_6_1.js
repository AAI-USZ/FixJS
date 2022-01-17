function(ctx) {

                var mouse = this.get("mouse"),
                    pos   = mouse? mouse.position : { x:0, y:0 },
                    size  = this.get("size");

                ctx.strokeStyle = "white";
                ctx.strokeRect(pos.x, pos.y, size, size);
            }