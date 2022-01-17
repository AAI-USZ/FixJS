function(cache) { 
	    //    cache.put(this, true);
	    var buffer = [];
	    var i;
	    buffer.push("(");
	    buffer.push(this._constructorName);
	    for(i = 0; i < this._fields.length; i++) {
		buffer.push(" ");
		buffer.push(toWrittenString(this._fields[i], cache));
	    }
	    buffer.push(")");
	    return buffer.join("");
	}