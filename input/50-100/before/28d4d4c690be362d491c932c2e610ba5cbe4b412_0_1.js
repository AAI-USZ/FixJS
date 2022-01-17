function(data) {
	    obj.data.shift();
	    obj.data.push(obj.updateNextValue(data));
	    obj.redraw();
	}