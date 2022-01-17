function(ev)
	{
		//console.log(this+' - dragStart, ev.type = ' + ev.type);
		this._drag = true;
		this.setRadius(F.dradii[this._area]);
		this._setLabelRadius();
		
		set_cursor('move');
		
		stage.update();
		
		var self = this;
		//listen for mouse ups
		stage.onMouseMove = function(e) {self.onDrag(e);};
		stage.onMouseUp = function(e) {self.onDrop(e);};
	}