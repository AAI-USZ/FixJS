function (x, y) {
		    x = Math.floor(x);
		    y = Math.floor(y);
		    var context = Crafty.canvas.context,
			    style = Crafty.stage.inner.style,
			    canvas;

		    var dx = x - this._x;
		    var dy = y - this._y;

		    //update viewport and DOM scroll
		    this._x = x;
		    this._y = y;
		    if (context)
		    {
			    context.translate(dx, dy);
			    // jc - defer the drawAll() call for performance reason
			    Crafty.DrawManager.viewportChanged();
		    }
		    style["left"] = x + "px";
		    style["top"] = y + "px";
	    }