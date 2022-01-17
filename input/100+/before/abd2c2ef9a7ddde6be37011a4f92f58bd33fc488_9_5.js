function () {
            
            if (this.get("paused")) {
                return;
            }
            
            this.set("paused", true);

            var ctx = this.ctx,
                canvas = this.canvas;
            
            TK.Rectangle(ctx, 0, 0, document.width, document.height, { fill: "rgba(0,0,0,0.6)" });

            TK.Text(ctx, "PAUSED", canvas.width / 2, canvas.height / 2 + 1, { align: "center", color: "#000" });
            TK.Text(ctx, "PAUSED", canvas.width / 2, canvas.height / 2,     { align: 'center', color: "#fff" });

        }