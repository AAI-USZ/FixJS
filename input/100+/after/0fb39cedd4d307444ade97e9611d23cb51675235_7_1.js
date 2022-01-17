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
	        // jc - defer the drawAll() call for performance reason
            if (context) Crafty.DrawManager.viewportChanged();
            style[axis == '_x' ? "left" : "top"] = v + "px";
        }