function(ev)
	{
		stage.onMouseMove = null;
		stage.onMouseUp = null;
		
		this.parent.onDrop(this);
		this._drag = false;
		this._mousedownEvent = null;
	    set_cursor();
		this.animate({radius: F.radii[this._area],});
	}