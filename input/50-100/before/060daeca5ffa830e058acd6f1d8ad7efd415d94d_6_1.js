function(ctx) {

                var mouse = this.get("mouse").position,
                    size  = this.get("size");

                ctx.strokeStyle = "white";
                ctx.strokeRect(mouse.x, mouse.y, size, size);
            }