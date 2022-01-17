function(v, pos) {
		this.splice(pos,0,v);
		if(this.parent) Gibberish.dirty(this.parent);
	}