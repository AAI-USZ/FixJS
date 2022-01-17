function(data) {
	    obj.data.shift();
	    while (data.length < obj.cpu_count) {
		data.push({user: 0, system: 0})
            }
	    obj.data.push(obj.updateNextValue(data));
	    obj.redraw();
	}