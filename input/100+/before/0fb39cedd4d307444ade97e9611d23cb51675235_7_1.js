function (axis, v) {
            v = Math.floor(v);
            var change = v - this[axis], //change in direction
                context = Crafty.canvas.context,
                style = Crafty.stage.inner.style,
                canvas;

            //update viewport and DOM scroll
            this[axis] = v;
            if (axis == '_x') {
                if (context) context.translate(change, 0);
            } else {
                if (context) context.translate(0, change);
            }
            if (context) Crafty.DrawManager.drawAll();
            style[axis == '_x' ? "left" : "top"] = v + "px";
        }