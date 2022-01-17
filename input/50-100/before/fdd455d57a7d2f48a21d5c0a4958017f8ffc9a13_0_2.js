function(ev)
	{
		stage.onMouseMove = null;
		stage.onMouseUp = null;
		
		this.parent.onDrop(this);
		set_cursor();
		this.animate({radius: F.radii[this._area],});
		p = this.globalToLocal(ev.stageX, ev.stageY);
		
		if(!this.hitTest(p.x,p.y))
			this._drag = false;
		this._mousedownEvent = null;
	}