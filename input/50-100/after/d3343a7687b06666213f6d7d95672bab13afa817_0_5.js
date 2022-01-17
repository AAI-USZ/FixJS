function (o) { //I may rename this to addChild in the future. Hmm...
		var t = this;
		o.scene = this;
		//It is a good idea to never allow an item to be in the render queue more than once.
		//Trust me.
		for (var i = 0; i < t.rQ.length; i += 1) {
			if (t.rQ[i] === o) {
				return false;
			}
		}
		if (o.onAdd !== undefined) {o.onAdd();}
		t.rQ.push(o);
	}